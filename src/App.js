/***************************************************************************
 * App.js (または App.jsx)
 ***************************************************************************/
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Amplify関連
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { fetchAuthSession } from '@aws-amplify/auth';

// Amplify UI
import {
  withAuthenticator,
  ThemeProvider as AmplifyThemeProvider
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// ページコンポーネント
import StaffShiftPage from './pages/StaffShiftPage';
import BookingPage from './pages/BookingPage';
import CalendarPage from './pages/CalendarPage';

// Material UI
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Container } from '@mui/material';

// Amplify初期化
Amplify.configure(awsconfig);

// MUIのテーマ設定（必要に応じてブランドカラーなど変更）
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ffa726',
    },
  },
  typography: {
    fontFamily: ['"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});

// Amplify UIテーマ（お好みで拡張）
const amplifyTheme = {
  name: 'custom-amplify-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          '10': '#e3f2fd',
          '80': '#1976d2',
        },
      },
    },
  },
};

/**
 * メインアプリ
 */
function App({ signOut, user }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminGroup();
  }, []);

  // 「Admin」グループかどうかをチェック (Access トークン側を参照)
  const checkAdminGroup = async () => {
    try {
      const session = await fetchAuthSession();
      const groups = session.tokens.accessToken?.payload?.['cognito:groups'] || [];
      if (groups.includes('Admin')) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error checking user groups:', error);
    }
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              助産院 予約管理アプリ
            </Typography>

            {/* 管理者 (isAdmin = true) の場合のみ「シフト入力」ボタンを表示 */}
            {isAdmin && (
              <Button color="inherit" component={Link} to="/">
                シフト入力
              </Button>
            )}
            <Button color="inherit" component={Link} to="/booking">
              予約
            </Button>
            <Button color="inherit" component={Link} to="/calendar">
              カレンダー
            </Button>

            {/* サインアウト */}
            <Button color="inherit" onClick={signOut}>
              サインアウト
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary">
              ログイン中: {user?.username} {isAdmin ? '(管理者)' : '(一般ユーザー)'}
            </Typography>
          </Box>

          <Routes>
            {/*
              管理者でなければ "/" (シフトページ) には行けず /booking にリダイレクト
              管理者なら StaffShiftPage (シフト入力) を表示
            */}
            <Route
              path="/"
              element={isAdmin ? <StaffShiftPage /> : <Navigate to="/booking" />}
            />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </Container>
      </Router>
    </MuiThemeProvider>
  );
}

/**
 * withAuthenticator 設定
 * - signUpAttributes でサインアップ時に取得する属性を指定
 * - formFields で各フォームフィールドを日本語ラベルにする
 */
const AppWithAuth = withAuthenticator(App, {
  variation: 'modal', // ログイン画面をモーダルで表示
  // 1) Cognitoで取り扱うユーザー属性を指定 (標準 + カスタム)
  //    ここで指定した属性がサインアップ画面に表示される
  signUpAttributes: [
    'email',            // メールアドレス (ID扱い)
    'family_name',      // 姓
    'given_name',       // 名
    'custom:furiganaFamily', // フリガナ(姓)
    'custom:furiganaGiven',  // フリガナ(名)
    // 必要に応じて phone_number など追加
  ],

  // 2) 実際のラベルやプレースホルダを上書き
  formFields: {
    signUp: {
      email: {
        label: 'メールアドレス',
        placeholder: 'example@example.com',
        required: true,
      },
      family_name: {
        label: '姓',
        placeholder: '例）山田',
        required: true,
      },
      given_name: {
        label: '名',
        placeholder: '例）太郎',
        required: true,
      },
      'custom:furiganaFamily': {
        label: 'フリガナ(姓)',
        placeholder: '例）ヤマダ',
        required: true,
      },
      'custom:furiganaGiven': {
        label: 'フリガナ(名)',
        placeholder: '例）タロウ',
        required: true,
      },
      password: {
        label: 'パスワード',
        placeholder: 'パスワードを入力',
        required: true,
      },
      confirm_password: {
        label: 'パスワード（確認）',
        placeholder: '再度パスワードを入力',
        required: true,
      },
    },
  },
});

// Amplify UI の ThemeProvider で全体を包む
function AppWrapper() {
  return (
    <AmplifyThemeProvider theme={amplifyTheme}>
      <AppWithAuth />
    </AmplifyThemeProvider>
  );
}

export default AppWrapper;
