import React, { useState, useEffect } from 'react';
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

import { Auth } from 'aws-amplify';

export default function BookingPage() {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableShifts, setAvailableShifts] = useState([]);

  const [userSub, setUserSub] = useState('');
  const [userFullName, setUserFullName] = useState('');

  // ログインユーザーの情報を取得
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const session = await Auth.currentSession();
      const sub = session.getIdToken().payload.sub || '';
      setUserSub(sub);

      // 姓・名の属性をまとめて予約名に利用
      const familyName = session.getIdToken().payload.family_name || '';
      const givenName = session.getIdToken().payload.given_name || '';
      setUserFullName(`${familyName} ${givenName}`);
    } catch (err) {
      console.error('Fail to fetch session', err);
    }
  };

  // スタッフ一覧を購読（hidden === false のものだけを表示）
  useEffect(() => {
    const subscription = DataStore.observeQuery(Staff).subscribe(({ items }) => {
      // hidden が false のスタッフのみを抽出
      const visibleStaff = items.filter((staff) => staff.hidden === false);
      setStaffList(visibleStaff);
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

    const allShifts = await DataStore.query(Shift, (s) =>
      s.staffID_date.eq(staffIDDate)
    );
    // 念のため date 一致で絞る
    const filtered = allShifts.filter((shift) => shift.date === dateStr);
    setAvailableShifts(filtered);
  };

  // 予約の作成
  const createReservation = async (shift) => {
    if (!userSub) {
      alert('予約にはログインが必要です。');
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
          clientName: userFullName,
          owner: userSub,
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
          {/* スタッフ選択 */}
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

          {/* 日付選択 */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="日付"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </LocalizationProvider>

          {/* シフト確認ボタン */}
          <Button variant="contained" onClick={fetchShifts}>
            シフト確認
          </Button>
        </Box>
      </Paper>

      {/* 選択したスタッフ・日付のシフト一覧 */}
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
