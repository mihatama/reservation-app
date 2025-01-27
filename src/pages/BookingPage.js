import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Staff, Shift, Reservation } from '../models';
import {
  Box,
  Typography,
  Paper,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container
} from '@mui/material';

import dayjs from 'dayjs';

// Material UI Pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { fetchAuthSession } from '@aws-amplify/auth';

export default function BookingPage() {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableShifts, setAvailableShifts] = useState([]);

  const [userSub, setUserSub] = useState('');
  const [userFullName, setUserFullName] = useState(''); 
  // ↑ ログイン中ユーザーの「姓 + 名」を格納する

  // ログインユーザーの情報を取得
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const session = await fetchAuthSession();
      const sub = session.idToken?.payload?.sub || '';
      setUserSub(sub);

      // 姓・名の属性をまとめて予約名に利用
      const familyName = session.idToken?.payload?.family_name || '';
      const givenName = session.idToken?.payload?.given_name || '';
      setUserFullName(`${familyName} ${givenName}`);
    } catch (err) {
      console.error('Fail to fetch session', err);
    }
  };

  // スタッフ一覧は初回に購読（または取得）しておく
  useEffect(() => {
    const subscription = DataStore.observeQuery(Staff).subscribe(({ items }) => {
      setStaffList(items);
    });
    return () => subscription.unsubscribe();
  }, []);

  // 選択したスタッフと日付に基づき、シフトを取得
  const fetchShifts = async () => {
    if (!selectedStaff || !selectedDate) {
      alert('スタッフと日付を指定してください。');
      return;
    }
    const dateStr = selectedDate.format('YYYY-MM-DD');
    const staffIDDate = `${selectedStaff.id}_${dateStr}`;

    // staffID_date でフィルタした上で、さらに date が一致するものを選別
    const allShifts = await DataStore.query(Shift, (s) =>
      s.staffID_date.eq(staffIDDate)
    );
    const filtered = allShifts.filter((shift) => shift.date === dateStr);
    setAvailableShifts(filtered);
  };

  const createReservation = async (shift) => {
    // ログインしていない場合は弾く
    if (!userSub) {
      alert('予約にはログインが必要です。ログインしてください。');
      return;
    }

    try {
      const staffID_dateValue = `${shift.staffID}_${shift.date}`;
      await DataStore.save(
        new Reservation({
          staffID: shift.staffID,
          staffID_date: staffID_dateValue,
          date: shift.date,
          startTime: shift.startTime,
          endTime: shift.endTime,
          // 予約者名としてユーザーのフルネームを自動セット
          clientName: userFullName,
          // 予約のオーナーを設定 (schema に owner がある場合のみ活用)
          owner: userSub
        })
      );
      alert('予約が完了しました。');
    } catch (error) {
      console.error('予約作成中にエラー:', error);
      alert('予約作成に失敗しました。');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        予約画面
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          予約入力
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <select
            style={{ minWidth: '150px', padding: '8px' }}
            value={selectedStaff?.id || ''}
            onChange={(e) => {
              const found = staffList.find((s) => s.id === e.target.value);
              setSelectedStaff(found || null);
            }}
          >
            <option value="" disabled>
              -- スタッフ選択 --
            </option>
            {staffList.map((staff) => (
              <option value={staff.id} key={staff.id}>
                {staff.name}
              </option>
            ))}
          </select>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="日付"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </LocalizationProvider>

          <Button variant="contained" onClick={fetchShifts}>
            シフト確認
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          選択スタッフ・日付のシフト一覧
        </Typography>
        {availableShifts.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            シフトがありません。
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>日付</TableCell>
                  <TableCell>開始</TableCell>
                  <TableCell>終了</TableCell>
                  <TableCell>予約</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availableShifts
                  .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
                  .map((shift) => (
                    <TableRow key={shift.id}>
                      <TableCell>{shift.date}</TableCell>
                      <TableCell>
                        {dayjs(shift.startTime).format('HH:mm')}
                      </TableCell>
                      <TableCell>
                        {dayjs(shift.endTime).format('HH:mm')}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => createReservation(shift)}
                        >
                          この枠で予約
                        </Button>
                      </TableCell>
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
