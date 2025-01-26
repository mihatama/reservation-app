// src/pages/StaffShiftPage.js
import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Staff, Shift } from '../models';

import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

// Material UI Pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function StaffShiftPage() {
  const [staffName, setStaffName] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // シフト登録用
  const [shiftDate, setShiftDate] = useState(null); // dayjs
  const [startTime, setStartTime] = useState(null); // dayjs
  const [endTime, setEndTime] = useState(null);     // dayjs

  const [shiftList, setShiftList] = useState([]);

  useEffect(() => {
    fetchStaffList();
  }, []);

  // Staff を選んだら、その Staff のシフト一覧を随時監視
  useEffect(() => {
    if (!selectedStaff) {
      setShiftList([]);
      return;
    }
    const subscription = DataStore.observeQuery(Shift).subscribe((snapshot) => {
      const allShifts = snapshot.items;
      const filtered = allShifts.filter(
        (shift) => shift.staffID === selectedStaff.id
      );
      setShiftList(filtered);
    });
    return () => subscription.unsubscribe();
  }, [selectedStaff]);

  // スタッフ一覧を取得
  const fetchStaffList = async () => {
    const staff = await DataStore.query(Staff);
    setStaffList(staff);
  };

  // スタッフを新規登録 (名前入力 → ボタン押下)
  const createStaff = async () => {
    if (!staffName.trim()) {
      alert('スタッフ名を入力してください。');
      return;
    }
    await DataStore.save(new Staff({ name: staffName }));
    setStaffName('');
    fetchStaffList();
  };

  // シフトを新規登録
  const createShift = async () => {
    if (!selectedStaff) {
      alert('スタッフを選択してください。');
      return;
    }
    if (!shiftDate || !startTime || !endTime) {
      alert('日付と時刻をすべて入力してください。');
      return;
    }

    const dateStr = shiftDate.format('YYYY-MM-DD');
    const start = startTime
      .set('year', shiftDate.year())
      .set('month', shiftDate.month())
      .set('date', shiftDate.date());
    const end = endTime
      .set('year', shiftDate.year())
      .set('month', shiftDate.month())
      .set('date', shiftDate.date());

    if (end.isBefore(start)) {
      alert('終了時刻は開始時刻より後にしてください。');
      return;
    }
    const startISO = start.toISOString();
    const endISO   = end.toISOString();

    // staffID_date = "{スタッフID}_{日付}"
    const staffID_dateValue = `${selectedStaff.id}_${dateStr}`;

    await DataStore.save(
      new Shift({
        staffID: selectedStaff.id,
        staffID_date: staffID_dateValue,
        date: dateStr,
        startTime: startISO,
        endTime: endISO,
      })
    );

    alert('シフトを追加しました。');
    setShiftDate(null);
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        スタッフ管理（管理者専用）
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1">スタッフ登録</Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
          <TextField
            label="スタッフ名"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
          />
          <Button variant="contained" onClick={createStaff}>
            追加
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={2}>
        {/* スタッフ一覧 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">スタッフ一覧</Typography>
            <List>
              {staffList.map((staff) => (
                <ListItem
                  button
                  key={staff.id}
                  selected={selectedStaff?.id === staff.id}
                  onClick={() => setSelectedStaff(staff)}
                >
                  <ListItemText primary={staff.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* シフト登録 */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">シフト登録</Typography>
            {selectedStaff ? (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                    <DatePicker
                      label="日付"
                      value={shiftDate}
                      onChange={(newValue) => setShiftDate(newValue)}
                    />
                    <TimePicker
                      label="開始時刻"
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                    />
                    <TimePicker
                      label="終了時刻"
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                    />
                    <Button variant="contained" onClick={createShift}>
                      シフト追加
                    </Button>
                  </Box>
                </LocalizationProvider>

                <Typography variant="subtitle2" sx={{ mt: 4, mb: 1 }}>
                  {selectedStaff.name} さんのシフト一覧
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>日付</TableCell>
                        <TableCell>開始</TableCell>
                        <TableCell>終了</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shiftList
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
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <Typography variant="body2" sx={{ mt: 2 }}>
                スタッフを左の一覧から選択してください。
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
