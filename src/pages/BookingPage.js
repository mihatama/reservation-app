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

import { fetchAuthSession } from '@aws-amplify/auth';
import dayjs from 'dayjs';

// Material UI Pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function BookingPage() {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // dayjsオブジェクト
  const [availableShifts, setAvailableShifts] = useState([]);
  const [clientName, setClientName] = useState('');
  const [userSub, setUserSub] = useState('');

  // ログインユーザーのsubを取得
  useEffect(() => {
    getUserSub();
  }, []);

  const getUserSub = async () => {
    const session = await fetchAuthSession();
    const sub = session.idToken?.payload?.sub;
    setUserSub(sub);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // スタッフ一覧を取得
  const fetchStaff = async () => {
    const staff = await DataStore.query(Staff);
    setStaffList(staff);
  };

  // シフト一覧を取得
  const fetchShifts = async () => {
    if (!selectedStaff || !selectedDate) {
      alert('スタッフと日付を指定してください。');
      return;
    }

    const dateStr = selectedDate.format('YYYY-MM-DD'); // AWSDate
    // "staffID_date" = "{スタッフID}_{日付}"
    const staffIDDate = `${selectedStaff.id}_${dateStr}`;

    // DataStore で staffID_date が合致するShiftを検索
    const allShifts = await DataStore.query(Shift, (s) =>
      s.staffID_date.eq(staffIDDate)
    );
    // 日付一致で絞り込み
    const filtered = allShifts.filter((shift) => shift.date === dateStr);

    setAvailableShifts(filtered);
  };

  // 予約作成
  const createReservation = async (shift) => {
    if (!clientName.trim()) {
      alert('お客様名を入力してください。');
      return;
    }
    // ownerはユーザーのsub（schema.graphqlでownerField指定）
    const staffID_dateValue = `${shift.staffID}_${shift.date}`;

    try {
      await DataStore.save(
        new Reservation({
          staffID: shift.staffID,
          staffID_date: staffID_dateValue, // 必須
          date: shift.date,
          startTime: shift.startTime,
          endTime: shift.endTime,
          clientName: clientName,
          owner: userSub  // ここを設定
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
