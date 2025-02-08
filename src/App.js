import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Hub } from '@aws-amplify/core';
import awsconfig from './aws-exports';
import { fetchAuthSession, signOut } from '@aws-amplify/auth';
import { Authenticator, ThemeProvider as AmplifyThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import StaffShiftPage from './pages/StaffShiftPage';
import ShiftListPage from './pages/ShiftListPage';
import StaffCalendarPage from './pages/StaffCalendarPage';
import MyReservationsPage from './pages/MyReservationsPage';
import QuestionnaireFormPage from './pages/QuestionnaireFormPage';
import AdminQuestionnaireListPage from './pages/AdminQuestionnaireListPage';

// Amplify の設定（aws-exports の内容に加え、REST API の設定）
Amplify.configure({
  ...awsconfig,
  API: {
    REST: {
      ReservationEmailAPI: {
        endpoint: "https://o6zm3tdzxf.execute-api.ap-northeast-1.amazonaws.com/dev",
        region: "ap-northeast-1"
      }
    }
  }
});

// Material-UI 用のテーマ設定
const muiTheme = createTheme({
  palette: {
    primary: { main: '#e91e63' },
    secondary: { main: '#ffa726' },
  },
  typography: {
    fontFamily: ['"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});

// Amplify UI 用のカスタムテーマ設定
const amplifyTheme = {
  name: 'custom-amplify-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          '10': '#fce4ec',
          '80': '#e91e63',
        },
      },
    },
  },
};

// ログインページコンポーネント
function LoginPage() {
  const navigate = useNavigate();
  console.log('LoginPage rendered at', new Date());
  return (
    <Box sx={{ maxWidth: '400px', margin: '40px auto' }}>
      <Authenticator
        // onAuthUIStateChange により認証状態が変化したときにログ出力し、"signedin" または "signedIn" ならリダイレクト
        onAuthUIStateChange={(nextAuthState, authData) => {
          console.log("onAuthUIStateChange fired:", nextAuthState, authData, "at", new Date());
          if (nextAuthState === 'signedin' || nextAuthState === 'signedIn') {
            console.log("User signed in detected via onAuthUIStateChange. Redirecting to '/' at", new Date());
            navigate('/');
          } else {
            console.log("Auth state changed to:", nextAuthState);
          }
        }}
        signUpAttributes={['family_name', 'given_name', 'phone_number']}
        formFields={{
          signUp: {
            family_name: { label: '姓', placeholder: '例）山田', order: 1 },
            given_name: { label: '名', placeholder: '例）太郎', order: 2 },
            'custom:family_name_kana': { label: '姓（フリガナ）', placeholder: '例）ヤマダ', order: 3, isRequired: false },
            'custom:given_name_kana': { label: '名（フリガナ）', placeholder: '例）タロウ', order: 4, isRequired: false },
            phone_number: { label: '日本の電話番号', placeholder: '例）+81XXXXXXXXXX', order: 5, dialCode: '+81' },
            email: { order: 6 },
            password: { order: 7 },
            confirm_password: { order: 8 },
          },
        }}
      />
    </Box>
  );
}

// 認証済みの場合のみ子コンポーネントをレンダリングするラッパー
function PrivateRoute({ children, isAuthenticated }) {
  console.log("PrivateRoute: isAuthenticated =", isAuthenticated, "at", new Date());
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// 管理者グループの場合のみ子コンポーネントをレンダリングするラッパー
function AdminRoute({ children, isAdmin }) {
  console.log("AdminRoute: isAdmin =", isAdmin, "at", new Date());
  return isAdmin ? children : <Navigate to="/" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  console.log('App 初期化: isAuthenticated =', isAuthenticated, "at", new Date());

  // 現在のユーザー状態をチェックする関数
  const checkCurrentUser = async () => {
    console.log('checkCurrentUser: Checking current user at', new Date());
    try {
      const session = await fetchAuthSession();
      console.log('checkCurrentUser: Session:', session, "at", new Date());
      if (session.tokens && session.tokens.idToken) {
        const payload = session.tokens.idToken.payload;
        const groups = payload['cognito:groups'] || [];
        const currentUsername = payload.email || '';
        console.log('checkCurrentUser: User authenticated. Username:', currentUsername, 'Groups:', groups, "at", new Date());
        setUserGroups(groups);
        setUsername(currentUsername);
        setIsAuthenticated(true);
      } else {
        console.log('checkCurrentUser: No valid idToken found at', new Date());
        setIsAuthenticated(false);
        setUserGroups([]);
        setUsername('');
      }
    } catch (error) {
      console.error('checkCurrentUser: Error occurred:', error, "at", new Date());
      setIsAuthenticated(false);
      setUserGroups([]);
      setUsername('');
    }
  };

  useEffect(() => {
    console.log('useEffect: Setting up Hub listener at', new Date());
    const unsubscribe = Hub.listen('auth', async (data) => {
      const { payload } = data;
      console.log('Hub Event:', payload.event, "at", new Date(), "Payload:", payload);
      // ここで "signedIn" もチェックするように修正
      if (['signIn', 'signedIn', 'signUp'].includes(payload.event)) {
        await checkCurrentUser();
        console.log('Hub Event: Navigating to "/" after sign in/up at', new Date());
        navigate('/');
      } else if (payload.event === 'signOut') {
        console.log('Hub Event: signOut event received at', new Date());
        setIsAuthenticated(false);
        setUsername('');
        setUserGroups([]);
      }
    });
    checkCurrentUser();
    return () => {
      console.log('useEffect: Cleaning up Hub listener at', new Date());
      unsubscribe();
    };
  }, [navigate]);

  // サインアウト処理
  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUsername('');
      setUserGroups([]);
      console.log('handleSignOut: Successfully signed out at', new Date());
    } catch (error) {
      console.error('handleSignOut: Sign out error:', error, "at", new Date());
    }
  };

  const isAdmin = userGroups.includes('Admin');

  return (
    <AmplifyThemeProvider theme={amplifyTheme}>
      <MuiThemeProvider theme={muiTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>助産院 予約管理アプリ</Typography>
            <Button color="inherit" component={Link} to="/">シフト一覧</Button>
            {isAdmin && <Button color="inherit" component={Link} to="/staff-shift">予約管理</Button>}
            {isAdmin && <Button color="inherit" component={Link} to="/admin/questionnaires">問診票一覧</Button>}
            {isAuthenticated && <Button color="inherit" component={Link} to="/my-reservations">マイ予約</Button>}
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleSignOut}>サインアウト</Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">ログイン</Button>
            )}
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Box sx={{ mb: 2 }}>
            {isAuthenticated ? (
              <Typography variant="body2" color="textSecondary">
                ログイン中: {username} {isAdmin ? '(管理者)' : '(一般ユーザー)'}
              </Typography>
            ) : (
              <Typography variant="body2" color="textSecondary">ログインしていません</Typography>
            )}
          </Box>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <ShiftListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar/:staffId"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <StaffCalendarPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/staff-shift"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AdminRoute isAdmin={isAdmin}>
                    <StaffShiftPage />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/my-reservations"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <MyReservationsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/questionnaire/:reservationId"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <QuestionnaireFormPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
            <Route
              path="/admin/questionnaires"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AdminRoute isAdmin={isAdmin}>
                    <AdminQuestionnaireListPage />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </MuiThemeProvider>
    </AmplifyThemeProvider>
  );
}

export default App;
