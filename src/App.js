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
import { Authenticator } from '@aws-amplify/ui-react';
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

/**
 * 実際のアプリ部分
 * ログインユーザー (user), サインアウト (signOut) が渡される前提
 */
function App({ signOut, user }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminGroup();
  }, []);

  // 「Admin」グループに属しているか判定
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
 * Authenticator で App を包んで認証を提供するコンポーネント
 * サインアップ画面のフォーム項目をカスタマイズ
 */
export default function AppWrapper() {
  return (
    <Authenticator
      // 初期表示をサインアップにしたい場合は下記コメントを外す
      // initialState="signUp"

      // サインアップ画面のフィールドを日本語化・並び替え
      formFields={{
        signUp: {
          family_name: {
            label: '姓名',       // Cognito上: family_name
            placeholder: '例）山田',
            isRequired: true,
            order: 1,
          },
          given_name: {
            label: '名前',      // Cognito上: given_name
            placeholder: '例）太郎',
            isRequired: true,
            order: 2,
          },
          "custom:furigana": {
            label: 'フリガナ',  // Cognito上: custom:furigana
            placeholder: '例）ヤマダタロウ',
            isRequired: true,
            order: 3,
          },
          phone_number: {
            label: '電話番号',  // Cognito上: phone_number
            placeholder: '例）+818012345678',
            isRequired: true,
            order: 4,
          },
          email: {
            label: 'メールアドレス',  // Cognito上: email
            placeholder: '例）example@example.com',
            isRequired: true,
            order: 5,
          },
          password: {
            label: 'パスワード',
            placeholder: 'パスワードを入力',
            isRequired: true,
            order: 6,
          },
          confirm_password: {
            label: 'パスワード（確認）',
            placeholder: '再度パスワードを入力',
            isRequired: true,
            order: 7,
          },
        },
      }}
    >
      {({ signOut, user }) => <App signOut={signOut} user={user} />}
    </Authenticator>
  );
}
