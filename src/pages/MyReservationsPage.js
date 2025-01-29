// MyReservationsPage.js
import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Reservation, Staff } from '../models';
import dayjs from 'dayjs';
import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button
} from '@mui/material';

// Auth → fetchAuthSession を使用
import { fetchAuthSession } from '@aws-amplify/auth';

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [userSub, setUserSub] = useState('');
  // 追加: family_name と given_name を組み合わせて表示するための State
  const [userFullName, setUserFullName] = useState('');

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!userSub) return;

    // 自身の予約のみを取得・購読
    const subscription = DataStore.observeQuery(Reservation, (r) =>
      r.owner.eq(userSub)
    ).subscribe(async ({ items }) => {
      // 予約施設の名前を表示するため、Staff から施設名を引っ張ってくる
      const itemsWithStaffName = await Promise.all(
        items.map(async (res) => {
          let staffName = '';
          if (res.staffID) {
            try {
              const staff = await DataStore.query(Staff, res.staffID);
              if (staff) {
                staffName = staff.name;
              }
            } catch (err) {
              console.error('Failed to fetch Staff:', err);
            }
          }
          return { ...res, staffName };
        })
      );
      setReservations(itemsWithStaffName);
    });

    return () => subscription.unsubscribe();
  }, [userSub]);

  // Cognito セッションから sub, family_name, given_name を取得
  const getUserInfo = async () => {
    try {
      const session = await fetchAuthSession();
      const payload = session.tokens?.idToken?.payload || {};
      const sub = payload.sub || '';
      const familyName = payload.family_name || '';
      const givenName = payload.given_name || '';

      setUserSub(sub);
      // 「姓 名」をまとめてステート管理
      setUserFullName(`${familyName} ${givenName}`.trim());
    } catch (err) {
      console.error('Fail to fetch session', err);
    }
  };

  // 予約キャンセル
  const handleCancelReservation = async (reservationId) => {
    if (!window.confirm('本当にキャンセルしますか？')) return;
    try {
      const item = await DataStore.query(Reservation, reservationId);
      if (item) {
        await DataStore.delete(item);
        alert('予約をキャンセルしました。');
      }
    } catch (e) {
      console.error(e);
      alert('キャンセルに失敗しました。');
    }
  };

  // userSub が取得できていなければ(未ログイン)ログインを促す
  if (!userSub) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          マイ予約一覧
        </Typography>
        <Typography variant="body1">ログインが必要です。</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        マイ予約一覧
      </Typography>
      <Paper sx={{ p: 2 }}>
        {reservations.length === 0 ? (
          <Typography variant="body1">
            現在、登録された予約はありません。
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>日付</TableCell>
                  <TableCell>開始</TableCell>
                  <TableCell>終了</TableCell>
                  <TableCell>施設名</TableCell>
                  <TableCell>予約者</TableCell>
                  <TableCell>キャンセル</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations
                  .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
                  .map((res) => {
                    // 48時間以上前ならキャンセルOK、未満なら電話連絡
                    const start = dayjs(res.startTime);
                    const canCancel = start.diff(dayjs(), 'hour') >= 48;

                    return (
                      <TableRow key={res.id}>
                        <TableCell>{res.date}</TableCell>
                        <TableCell>{start.format('HH:mm')}</TableCell>
                        <TableCell>
                          {dayjs(res.endTime).format('HH:mm')}
                        </TableCell>
                        <TableCell>{res.staffName || ''}</TableCell>
                        <TableCell>
                          {res.clientName ? res.clientName : userFullName}
                        </TableCell>
                        <TableCell>
                          {canCancel ? (
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleCancelReservation(res.id)}
                            >
                              キャンセル
                            </Button>
                          ) : (
                            <Typography color="textSecondary">
                              電話連絡
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}
