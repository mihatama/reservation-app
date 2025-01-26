import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Amplify関連
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { fetchAuthSession } from '@aws-amplify/auth'; 

// Amplify UI
import { withAuthenticator, ThemeProvider as AmplifyThemeProvider } from '@aws-amplify/ui-react';
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

function App({ signOut, user }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminGroup();
  }, []);

  // 「Admin」グループかどうかをチェック
  const checkAdminGroup = async () => {
    try {
      const session = await fetchAuthSession();
  
      // 取得した session 全体をまずコンソールに出してみる
      console.log('=== Cognito Session ===', session);
  
      // IDトークン / Accessトークン それぞれの payload を出力してみる
      console.log('=== session.idToken.payload ===', session.idToken?.payload);
      console.log('=== session.accessToken.payload ===', session.accessToken?.payload);
  
      // IDトークン側のグループを取得してみる
      const groupsFromIdToken = session.idToken?.payload?.['cognito:groups'] || [];
      console.log('=== Groups from ID token ===', groupsFromIdToken);
  
      // Accessトークン側のグループを取得してみる
      const groupsFromAccessToken = session.accessToken?.payload?.['cognito:groups'] || [];
      console.log('=== Groups from Access token ===', groupsFromAccessToken);
  
      // 実際に isAdmin をセットするときは IDトークン・Accessトークンのどちらかを利用
      if (groupsFromIdToken.includes('Admin') || groupsFromAccessToken.includes('Admin')) {
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

// withAuthenticator の第2引数で variation や他のオプションを指定
const AppWithAuth = withAuthenticator(App, {
  variation: 'modal', // ログイン画面をモーダル表示させる例
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
