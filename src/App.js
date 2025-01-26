// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from '@aws-amplify/auth'; // v6 Amplify ではモジュールimport
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

// ページコンポーネント
import StaffShiftPage from './pages/StaffShiftPage';
import BookingPage from './pages/BookingPage';
import CalendarPage from './pages/CalendarPage';

// Material UI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

Amplify.configure(awsconfig);

function App({ signOut, user }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminGroup();
    // eslint-disable-next-line
  }, []);

  // 「Admin」グループかどうかをチェックする
  const checkAdminGroup = async () => {
    try {
      // 現在のセッションを取得し、accessToken.payload の "cognito:groups" を確認
      const session = await fetchAuthSession();
      const groups = session.accessToken?.payload?.['cognito:groups'] || [];
      if (groups.includes('Admin')) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error checking user groups:', error);
    }
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            助産院 予約管理アプリ
          </Typography>

          {/*
            管理者 (isAdmin = true) の場合のみ「シフト入力」ボタンを表示
            → 一般ユーザーには表示しない
          */}
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

      <Box sx={{ p: 2 }}>
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
          element={
            isAdmin ? <StaffShiftPage /> : <Navigate to="/booking" />
          }
        />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App);
