import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';

// Amplify関連
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

// Auth 関連（分割インポート）
import { fetchAuthSession, signOut } from '@aws-amplify/auth';

// Amplify UI
import {
  Authenticator,
  ThemeProvider as AmplifyThemeProvider,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// ページコンポーネント
import StaffShiftPage from './pages/StaffShiftPage';
import BookingPage from './pages/BookingPage';
import ShiftListPage from './pages/ShiftListPage'; // トップページをスタッフ一覧に変更
import StaffCalendarPage from './pages/StaffCalendarPage'; // スタッフごとのカレンダー表示
import MyReservationsPage from './pages/MyReservationsPage'; // ログインユーザーの予約一覧

// Material UI
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Container } from '@mui/material';

// Amplify初期化
Amplify.configure(awsconfig);

// MUIのテーマ設定（青色→ピンクに変更）
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#e91e63', // ピンク
    },
    secondary: {
      main: '#ffa726',
    },
  },
  typography: {
    fontFamily: ['"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});

// Amplify UIテーマ（青色→ピンクに変更）
const amplifyTheme = {
  name: 'custom-amplify-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          '10': '#fce4ec', // 薄いピンク
          '80': '#e91e63', // メインのピンク
        },
      },
    },
  },
};

// ログイン画面（★ユーザー登録画面を拡張）
function LoginPage() {
  return (
    <Box sx={{ maxWidth: '400px', margin: '40px auto' }}>
      <Authenticator
        // サインアップ時に要求する標準属性
        signUpAttributes={['family_name', 'given_name', 'phone_number']}
        // 各フィールドのラベルやプレースホルダなどをカスタマイズ
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
            // カスタム属性（Cognito側で custom:family_name_kana を作成済みとする）
            'custom:family_name_kana': {
              label: '姓（フリガナ）',
              placeholder: '例）ヤマダ',
              order: 3,
              isRequired: false,
            },
            // カスタム属性（Cognito側で custom:given_name_kana を作成済みとする）
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
              dialCode: '+81', // デフォルトで日本(+81)
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
  const [userGroups, setUserGroups] = useState([]);
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 管理者フラグ (Adminグループに属するかどうか)
  const isAdmin = userGroups.includes('Admin');

  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      // ログインセッションを取得
      const session = await fetchAuthSession();
  
      // ID Token の中身
      console.log(payload);
  
      // Access Token の中身
      console.log('session.accessToken.payload = ', session.accessToken?.payload);
  
      // 以下、既存のコードと同様にグループを取得
      const groups = session.idToken?.payload?.['cognito:groups'] || [];
      setUserGroups(groups);
  
      const currentUsername = session.idToken?.payload?.email || '';
      setUsername(currentUsername);
  
      setIsAuthenticated(true);
    } catch (error) {
      // 未ログインの場合
      console.log('checkCurrentUser error:', error);
      setIsAuthenticated(false);
      setUserGroups([]);
      setUsername(null);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUsername(null);
      setUserGroups([]);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AmplifyThemeProvider theme={amplifyTheme}>
      <MuiThemeProvider theme={muiTheme}>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                助産院 予約管理アプリ
              </Typography>

              {/* メニューボタン */}
              <Button color="inherit" component={Link} to="/">
                シフト一覧
              </Button>

              <Button color="inherit" component={Link} to="/booking">
                予約
              </Button>

              {/* Adminのみ「スタッフ管理」ボタン表示 */}
              {isAdmin && (
                <Button color="inherit" component={Link} to="/staff-shift">
                  スタッフ管理
                </Button>
              )}

              {/* ログイン済なら「マイ予約」を表示 */}
              {isAuthenticated && (
                <Button color="inherit" component={Link} to="/my-reservations">
                  マイ予約
                </Button>
              )}

              {/* ログイン状態で切り替え */}
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
              {/* シフト一覧ページ（トップ） */}
              <Route path="/" element={<ShiftListPage />} />

              {/* スタッフ別カレンダー: ログイン必須 */}
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

              {/* 予約ページ: ログイン必須 => 未ログインなら /login へ */}
              <Route
                path="/booking"
                element={
                  isAuthenticated ? <BookingPage /> : <Navigate to="/login" />
                }
              />

              {/* スタッフ管理ページ: Adminのみ => それ以外はトップへ */}
              <Route
                path="/staff-shift"
                element={
                  isAdmin ? <StaffShiftPage /> : <Navigate to="/" />
                }
              />

              {/* マイ予約確認ページ: ログイン必須 */}
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
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Container>
        </Router>
      </MuiThemeProvider>
    </AmplifyThemeProvider>
  );
}

export default App;
