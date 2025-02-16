// File: src/App.js

import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Hub } from '@aws-amplify/core';
import awsconfig from './aws-exports';

// Amplify Auth 周り
import { fetchAuthSession, signOut } from '@aws-amplify/auth';

import { Authenticator, ThemeProvider as AmplifyThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

// ページコンポーネント
import StaffShiftPage from './pages/StaffShiftPage';
import ShiftListPage from './pages/ShiftListPage';
import StaffCalendarPage from './pages/StaffCalendarPage';
import MyReservationsPage from './pages/MyReservationsPage';
import QuestionnaireFormPage from './pages/QuestionnaireFormPage';
import AdminQuestionnaireListPage from './pages/AdminQuestionnaireListPage';
import EditQuestionnairePage from './pages/EditQuestionnairePage';
import MedicalRecordPage from './pages/MedicalRecordPage'; // ← 電子カルテ
// import BookingPage from './pages/BookingPage'; // 必要なら追加

// --- 修正箇所: Identity Pool 無効化のため Auth で上書き ---
Amplify.configure({
  ...awsconfig,
  Auth: {
    // ここで identityPoolId を無効化する
    identityPoolId: undefined,
  },
  API: {
    REST: {
      ReservationEmailAPI: {
        endpoint: "https://4gdvu4xlob.execute-api.ap-northeast-1.amazonaws.com/mamascare",
        region: "ap-northeast-1"
      }
    }
  }
});
// --- 修正箇所ここまで ---

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

// Amplify UI 用のテーマ
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

// ログインページ
function LoginPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: '400px', margin: '40px auto' }}>
      <Authenticator
        onAuthUIStateChange={(nextAuthState) => {
          if (nextAuthState === 'signedin' || nextAuthState === 'signedIn') {
            navigate('/');
          }
        }}
        signUpAttributes={['family_name', 'given_name', 'phone_number']}
        formFields={{
          signUp: {
            family_name: { label: '姓', placeholder: '例）山田', order: 1, isRequired: true },
            given_name: { label: '名', placeholder: '例）太郎', order: 2, isRequired: true },
            'custom:family_name_kana': { label: '姓（フリガナ）', placeholder: '例）ヤマダ', order: 3, isRequired: true },
            'custom:given_name_kana': { label: '名（フリガナ）', placeholder: '例）タロウ', order: 4, isRequired: true },
            phone_number: { label: '日本の電話番号', placeholder: '例）+81XXXXXXXXXX', order: 5, dialCode: '+81', isRequired: true },
            email: { order: 6, isRequired: true },
            password: { order: 7, isRequired: true },
            confirm_password: { order: 8, isRequired: true },
          },
        }}
      />
    </Box>
  );
}

// ログイン必須のルート
function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// 管理者権限必須のルート
function AdminRoute({ children, isAdmin }) {
  return isAdmin ? children : <Navigate to="/" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const checkCurrentUser = async () => {
    try {
      const session = await fetchAuthSession();
      if (session.tokens && session.tokens.idToken) {
        const payload = session.tokens.idToken.payload;
        const groups = payload['cognito:groups'] || [];
        const currentUsername = payload.email || '';
        setUserGroups(groups);
        setUsername(currentUsername);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUserGroups([]);
        setUsername('');
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserGroups([]);
      setUsername('');
    }
  };

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', async (data) => {
      const { payload } = data;
      if (['signIn', 'signedIn', 'signUp'].includes(payload.event)) {
        await checkCurrentUser();
        navigate('/');
      } else if (payload.event === 'signOut') {
        setIsAuthenticated(false);
        setUsername('');
        setUserGroups([]);
      }
    });
    checkCurrentUser();
    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUsername('');
      setUserGroups([]);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const isAdmin = userGroups.includes('Admin');

  return (
    <AmplifyThemeProvider theme={amplifyTheme}>
      <MuiThemeProvider theme={muiTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              助産院 予約管理アプリ
            </Typography>

            {/* ナビゲーション例 */}
            <Button color="inherit" component={Link} to="/">
              予約
            </Button>
            {isAdmin && (
              <Button color="inherit" component={Link} to="/staff-shift">
                予約管理
              </Button>
            )}
            {isAdmin && (
              <Button color="inherit" component={Link} to="/admin/questionnaires">
                問診票一覧
              </Button>
            )}
            {isAuthenticated && (
              <Button color="inherit" component={Link} to="/my-reservations">
                マイ予約
              </Button>
            )}
            {isAdmin && (
              <Button color="inherit" component={Link} to="/medical-record">
                電子カルテ入力
              </Button>
            )}

            {isAuthenticated ? (
              <Button color="inherit" onClick={handleSignOut}>
                サインアウト
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                ログイン
              </Button>
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
              <Typography variant="body2" color="textSecondary">
                ログインしていません
              </Typography>
            )}
          </Box>

          <Routes>
            {/* 一般ユーザー or 管理者共通 */}
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
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
            />

            {/* 管理者専用 */}
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
              path="/admin/questionnaires"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AdminRoute isAdmin={isAdmin}>
                    <AdminQuestionnaireListPage />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-questionnaire/:questionnaireId"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AdminRoute isAdmin={isAdmin}>
                    <EditQuestionnairePage />
                  </AdminRoute>
                </PrivateRoute>
              }
            />

            {/* 管理者用の電子カルテページ */}
            <Route
              path="/medical-record"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AdminRoute isAdmin={isAdmin}>
                    <MedicalRecordPage />
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
