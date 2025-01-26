// src/pages/BookingPage.js
import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Staff, Shift, Reservation } from '../models';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

import dayjs from 'dayjs';

// Material UI Pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// v6 では Auth は存在しないため、ユーザー sub を取得したい場合は:
import { fetchAuthSession } from '@aws-amplify/auth';

export default function BookingPage() {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableShifts, setAvailableShifts] = useState([]);
  const [clientName, setClientName] = useState('');
  const [userSub, setUserSub] = useState('');

  // ログインユーザーの sub を取得
  useEffect(() => {
    getUserSub();
  }, []);

  const getUserSub = async () => {
    try {
      const session = await fetchAuthSession();
      // idToken.payload.sub にユーザーの sub が入る
      const sub = session.idToken?.payload?.sub;
      setUserSub(sub || '');
    } catch (err) {
      console.error('Fail to fetch session', err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    const staff = await DataStore.query(Staff);
    setStaffList(staff);
  };

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
    const filtered = allShifts.filter((shift) => shift.date === dateStr);
    setAvailableShifts(filtered);
  };

  const createReservation = async (shift) => {
    if (!clientName.trim()) {
      alert('お客様名を入力してください。');
      return;
    }
    const staffID_dateValue = `${shift.staffID}_${shift.date}`;

    try {
      await DataStore.save(
        new Reservation({
          staffID: shift.staffID,
          staffID_date: staffID_dateValue,
          date: shift.date,
          startTime: shift.startTime,
          endTime: shift.endTime,
          clientName: clientName,
          owner: userSub // 予約のオーナーを設定 (schemaに owner がある場合)
        })
      );
      alert('予約が完了しました。');
    } catch (error) {
      console.error('予約作成中にエラー:', error);
      alert('予約作成に失敗しました。');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        予約画面
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          予約入力
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="お客様名"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            size="small"
          />

          <TextField
            select
            label="スタッフ選択"
            SelectProps={{ native: true }}
            value={selectedStaff?.id || ''}
            onChange={(e) => {
              const found = staffList.find((s) => s.id === e.target.value);
              setSelectedStaff(found || null);
            }}
            size="small"
            sx={{ minWidth: '150px' }}
          >
            <option value="" disabled>
              -- 選択 --
            </option>
            {staffList.map((staff) => (
              <option value={staff.id} key={staff.id}>
                {staff.name}
              </option>
            ))}
          </TextField>

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
                      <TableCell>{dayjs(shift.startTime).format('HH:mm')}</TableCell>
                      <TableCell>{dayjs(shift.endTime).format('HH:mm')}</TableCell>
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
    </Box>
  );
}
