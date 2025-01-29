import React, { useEffect, useState } from 'react';
// React Router の各フック & コンポーネント
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

// Amplify関連
import { Amplify } from 'aws-amplify';
import { Hub } from '@aws-amplify/core';
import awsconfig from './aws-exports';
import { fetchAuthSession, signOut } from '@aws-amplify/auth';

// Amplify UI (UIライブラリ)
import {
  Authenticator,
  ThemeProvider as AmplifyThemeProvider,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Material UI
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

// ページコンポーネント（例）
import StaffShiftPage from './pages/StaffShiftPage';
import BookingPage from './pages/BookingPage';
import ShiftListPage from './pages/ShiftListPage';
import StaffCalendarPage from './pages/StaffCalendarPage';
import MyReservationsPage from './pages/MyReservationsPage';

// Amplify初期化
Amplify.configure(awsconfig);

// Material UI テーマ設定
const muiTheme = createTheme({
  palette: {
    primary: { main: '#e91e63' }, // ピンク
    secondary: { main: '#ffa726' },
  },
  typography: {
    fontFamily: ['"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});

// Amplify UIテーマ設定
const amplifyTheme = {
  name: 'custom-amplify-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          '10': '#fce4ec', // 薄いピンク
          '80': '#e91e63', // 濃いピンク
        },
      },
    },
  },
};

// ログイン画面（Authenticator を使う例）
function LoginPage() {
  return (
    <Box sx={{ maxWidth: '400px', margin: '40px auto' }}>
      <Authenticator
        signUpAttributes={['family_name', 'given_name', 'phone_number']}
        formFields={{
          signUp: {
            family_name: {
              label: '姓',
              placeholder: '例）山田',
              order: 1,
            },
            given_name: {
              label: '名',
              placeholder: '例）太郎',
              order: 2,
            },
            'custom:family_name_kana': {
              label: '姓（フリガナ）',
              placeholder: '例）ヤマダ',
              order: 3,
              isRequired: false,
            },
            'custom:given_name_kana': {
              label: '名（フリガナ）',
              placeholder: '例）タロウ',
              order: 4,
              isRequired: false,
            },
            phone_number: {
              label: '日本の電話番号',
              placeholder: '例）+81XXXXXXXXXX',
              order: 5,
              dialCode: '+81',
            },
            email: {
              order: 6,
            },
            password: {
              order: 7,
            },
            confirm_password: {
              order: 8,
            },
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

  // React Router でプログラム遷移するためのフック
  const navigate = useNavigate();

  // Cognitoログインセッション確認
  const checkCurrentUser = async () => {
    try {
      const session = await fetchAuthSession();
      const payload = session.tokens.idToken.payload;
      // ユーザーグループ
      const groups = payload['cognito:groups'] || [];
      // ユーザー名 (例として email)
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

  // Hubイベント（signIn/signUp/signOutなど）を監視
  useEffect(() => {
    // Hub.listen() は解除用関数 unsubscribe を返す
    const unsubscribe = Hub.listen('auth', async (data) => {
      const { payload } = data;
      console.log('=== Hub event ===', payload.event, payload);
      if (['signedIn'].includes(payload.event)) {
        // 再度セッション取得
        await checkCurrentUser();
        // ログインが完了したらすぐにトップページへ
        navigate('/');
      } else if (payload.event === 'signOut') {
        setIsAuthenticated(false);
        setUsername('');
        setUserGroups([]);
      }
    });

    // マウント時に一度だけセッションチェック
    checkCurrentUser();

    // アンマウント時にリスナー解除
    return () => {
      unsubscribe(); // Hub.remove() は使わず、返り値の関数で解除する
    };
  }, [navigate]);

  // サインアウト
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

  // Admin判定 (例)
  const isAdmin = userGroups.includes('Admin');

  return (
    <AmplifyThemeProvider theme={amplifyTheme}>
      <MuiThemeProvider theme={muiTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              助産院 予約管理アプリ
            </Typography>

            {/* 右側のメニュー */}
            <Button color="inherit" component={Link} to="/">
              シフト一覧
            </Button>

            <Button color="inherit" component={Link} to="/booking">
              予約
            </Button>

            {isAdmin && (
              <Button color="inherit" component={Link} to="/staff-shift">
                予約登録
              </Button>
            )}

            {isAuthenticated && (
              <Button color="inherit" component={Link} to="/my-reservations">
                マイ予約
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
                ログイン中: {username}{' '}
                {isAdmin ? '(管理者)' : '(一般ユーザー)'}
              </Typography>
            ) : (
              <Typography variant="body2" color="textSecondary">
                ログインしていません
              </Typography>
            )}
          </Box>

          <Routes>
            {/* トップページ */}
            <Route path="/" element={<ShiftListPage />} />

            {/* スタッフ別カレンダー */}
            <Route
              path="/calendar/:staffId"
              element={
                isAuthenticated ? (
                  <StaffCalendarPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* 予約ページ */}
            <Route
              path="/booking"
              element={
                isAuthenticated ? (
                  <BookingPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* スタッフ管理ページ (Adminのみ) */}
            <Route
              path="/staff-shift"
              element={isAdmin ? <StaffShiftPage /> : <Navigate to="/" />}
            />

            {/* マイ予約確認ページ */}
            <Route
              path="/my-reservations"
              element={
                isAuthenticated ? (
                  <MyReservationsPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* ログインページ */}
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" /> : <LoginPage />
              }
            />
          </Routes>
        </Container>
      </MuiThemeProvider>
    </AmplifyThemeProvider>
  );
}

export default App;
