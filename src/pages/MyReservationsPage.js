import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Reservation } from '../models';
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
} from '@mui/material';

// ★ こちらも Auth→fetchAuthSession に

import { fetchAuthSession } from '@aws-amplify/auth';

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [userSub, setUserSub] = useState('');

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!userSub) return;
    const subscription = DataStore.observeQuery(Reservation, (r) =>
      r.owner.eq(userSub)
    ).subscribe(({ items }) => {
      setReservations(items);
    });
    return () => subscription.unsubscribe();
  }, [userSub]);

  const getUserInfo = async () => {
    try {

     const session = await fetchAuthSession();
      // session.tokens.idToken.payload.sub
      const sub = session.tokens?.idToken?.payload?.sub || '';
      setUserSub(sub);
    } catch (err) {
      console.error('Fail to fetch session', err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        マイ予約一覧
      </Typography>
      <Paper sx={{ p: 2 }}>
        {reservations.length === 0 ? (
          <Typography variant="body1">現在、登録された予約はありません。</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>日付</TableCell>
                  <TableCell>開始</TableCell>
                  <TableCell>終了</TableCell>
                  <TableCell>予約者</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations
                  .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
                  .map((res) => (
                    <TableRow key={res.id}>
                      <TableCell>{res.date}</TableCell>
                      <TableCell>{dayjs(res.startTime).format('HH:mm')}</TableCell>
                      <TableCell>{dayjs(res.endTime).format('HH:mm')}</TableCell>
                      <TableCell>{res.clientName}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}
