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

Amplify.configure({
  ...awsconfig,
  API: {
    REST: {
      // "ReservationEmailAPI" という名前で、エンドポイントとリージョンを明示的に設定する
      ReservationEmailAPI: {
        endpoint: "https://o6zm3tdzxf.execute-api.ap-northeast-1.amazonaws.com/dev",
        region: "ap-northeast-1"
      }
    }
  }
});

const muiTheme = createTheme({
  palette: {
    primary: { main: '#e91e63' },
    secondary: { main: '#ffa726' },
  },
  typography: {
    fontFamily: ['"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});

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

function LoginPage() {
  return (
    <Box sx={{ maxWidth: '400px', margin: '40px auto' }}>
      <Authenticator
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const checkCurrentUser = async () => {
    try {
      const session = await fetchAuthSession();
      const payload = session.tokens.idToken.payload;
      const groups = payload['cognito:groups'] || [];
      const currentUsername = payload.email || '';
      setUserGroups(groups);
      setUsername(currentUsername);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('checkCurrentUser error:', error);
      setIsAuthenticated(false);
      setUserGroups([]);
      setUsername('');
    }
  };

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', async (data) => {
      const { payload } = data;
      console.log('=== Hub event ===', payload.event, payload);
      if (payload.event === 'signIn' || payload.event === 'signUp') {
        await checkCurrentUser();
        navigate('/');
      } else if (payload.event === 'signOut') {
        setIsAuthenticated(false);
        setUsername('');
        setUserGroups([]);
      }
    });
    checkCurrentUser();
    return () => {
      unsubscribe();
    };
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
            <Route path="/" element={<ShiftListPage />} />
            <Route path="/calendar/:staffId" element={isAuthenticated ? <StaffCalendarPage /> : <Navigate to="/login" />} />
            <Route path="/staff-shift" element={isAdmin ? <StaffShiftPage /> : <Navigate to="/" />} />
            <Route path="/my-reservations" element={isAuthenticated ? <MyReservationsPage /> : <Navigate to="/login" />} />
            <Route path="/questionnaire/:reservationId" element={isAuthenticated ? <QuestionnaireFormPage /> : <Navigate to="/login" />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
            {isAdmin && <Route path="/admin/questionnaires" element={<AdminQuestionnaireListPage />} />}
          </Routes>
        </Container>
      </MuiThemeProvider>
    </AmplifyThemeProvider>
  );
}

export default App;
