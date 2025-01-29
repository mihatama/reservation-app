import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';

// Auth 情報を取得するため
import { fetchAuthSession } from '@aws-amplify/auth';

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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function BookingPage() {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableShifts, setAvailableShifts] = useState([]);

  const [userSub, setUserSub] = useState('');
  const [userFullName, setUserFullName] = useState('');

  // -------------------------
  // 1. ログインユーザーの情報を取得
  // -------------------------
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      // Auth は @aws-amplify/auth から
      const session = await fetchAuthSession();
      const sub = session.getIdToken().payload.sub || '';
      setUserSub(sub);

      // 姓・名の属性をまとめて予約名に利用
      const familyName = session.getIdToken().payload.family_name || '';
      const givenName = session.getIdToken().payload.given_name || '';
      setUserFullName(`${familyName} ${givenName}`.trim());
    } catch (err) {
      console.error('Fail to fetch session', err);
    }
  };

  // -------------------------
  // 2. スタッフ一覧を購読
  // -------------------------
  useEffect(() => {
    const subscription = DataStore.observeQuery(Staff).subscribe(({ items }) => {
      // hidden=false のスタッフのみ表示したい場合
      const visibleStaff = items.filter((s) => s.hidden === false);
      setStaffList(visibleStaff);
    });
    return () => subscription.unsubscribe();
  }, []);

  // -------------------------
  // 3. シフト・予約変更を購読して、カレンダーを再取得
  // -------------------------
  // スタッフと日付が選択されている場合のみ、有効にする
  useEffect(() => {
    if (!selectedStaff || !selectedDate) return;

    const staffIDDate = `${selectedStaff.id}_${selectedDate.format('YYYY-MM-DD')}`;

    // Reservation テーブルに変更があったらシフトを再取得
    const reservationSub = DataStore.observeQuery(
      Reservation,
      (r) => r.staffID_date.eq(staffIDDate)
    ).subscribe(() => {
      // 変更があれば最新のシフト情報を再取得
      fetchShifts();
    });

    return () => {
      reservationSub.unsubscribe();
    };
  }, [selectedStaff, selectedDate]);

  // -------------------------
  // 4. シフトを取得（予約されていない枠だけを抽出）
  // -------------------------
  const fetchShifts = async () => {
    if (!selectedStaff || !selectedDate) {
      alert('スタッフと日付を指定してください。');
      return;
    }
    const dateStr = selectedDate.format('YYYY-MM-DD');
    const staffIDDate = `${selectedStaff.id}_${dateStr}`;

    try {
      // 当該スタッフ・日付のシフト
      const allShifts = await DataStore.query(Shift, (s) =>
        s.staffID_date.eq(staffIDDate)
      );

      // 予約情報のうち、同じスタッフ・日付に紐づくもの
      const reservations = await DataStore.query(Reservation, (r) =>
        r.staffID_date.eq(staffIDDate)
      );

      // 予約済みの(開始時間, 終了時間)を判定して、すでに予約が入っているシフトは表示から除外
      const available = allShifts.filter((shift) => {
        // 同じ時間帯が予約されているかどうか
        const isReserved = reservations.some(
          (res) =>
            res.startTime === shift.startTime &&
            res.endTime === shift.endTime
        );
        return !isReserved;
      });

      // 同日付のみに絞りつつ、並び替え用に sort
      const filtered = available.filter((shift) => shift.date === dateStr);
      const sorted = filtered.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));

      setAvailableShifts(sorted);
    } catch (error) {
      console.error('シフト取得中にエラー:', error);
      alert('シフトを取得できませんでした。');
    }
  };

  // -------------------------
  // 5. 予約を作成
  // -------------------------
  const createReservation = async (shift) => {
    if (!userSub) {
      alert('予約にはログインが必要です。');
      return;
    }

    // 実際には、二重予約チェック等を行いたい場合はここで再度 Reservation を確認してもよい
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

      // 予約作成後、即座に該当シフトを UI から除外したい場合は、以下のように手動で除外する:
      setAvailableShifts((prev) =>
        prev.filter(
          (s) =>
            !(s.startTime === shift.startTime && s.endTime === shift.endTime)
        )
      );
      // ただし、上の observeQuery が発火して自動的に更新が入るので、ここは省略しても OK
    } catch (error) {
      console.error('予約作成中にエラー:', error);
      alert('予約作成に失敗しました。');
    }
  };

  // -------------------------
  // 6. 画面表示
  // -------------------------
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
            シフトがありません、あるいは全て予約済みです。
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
                {availableShifts.map((shift) => (
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
