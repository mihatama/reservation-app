// BookingPage.js
import React, { useState, useEffect } from 'react';
import { DataStore, API } from 'aws-amplify';
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
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const session = await fetchAuthSession();
      const sub = session.getIdToken().payload.sub || '';
      setUserSub(sub);
      const familyName = session.getIdToken().payload.family_name || '';
      const givenName = session.getIdToken().payload.given_name || '';
      setUserFullName(`${familyName} ${givenName}`.trim());
      const email = session.getIdToken().payload.email || '';
      setUserEmail(email);
    } catch (err) {
      console.error('Fail to fetch session', err);
    }
  };

  useEffect(() => {
    const subscription = DataStore.observeQuery(Staff).subscribe(({ items }) => {
      const visibleStaff = items.filter((s) => s.hidden === false);
      setStaffList(visibleStaff);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedStaff || !selectedDate) return;
    const staffIDDate = `${selectedStaff.id}_${selectedDate.format('YYYY-MM-DD')}`;
    const reservationSub = DataStore.observeQuery(
      Reservation,
      (r) => r.staffID_date.eq(staffIDDate)
    ).subscribe(() => {
      fetchShifts();
    });
    return () => {
      reservationSub.unsubscribe();
    };
  }, [selectedStaff, selectedDate]);

  const fetchShifts = async () => {
    if (!selectedStaff || !selectedDate) {
      alert('スタッフと日付を指定してください。');
      return;
    }
    const dateStr = selectedDate.format('YYYY-MM-DD');
    const staffIDDate = `${selectedStaff.id}_${dateStr}`;
    try {
      // 対象スタッフ・日付の全シフト取得
      const allShifts = await DataStore.query(Shift, (s) =>
        s.staffID_date.eq(staffIDDate)
      );
      // 同一スタッフ・日付の全予約取得
      const reservations = await DataStore.query(Reservation, (r) =>
        r.staffID_date.eq(staffIDDate)
      );
      // シフトの中で、予約がないもの、もしくは自分が予約したシフトのみを表示
      const shiftsToDisplay = allShifts
        .filter((shift) => shift.date === dateStr)
        .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
        .map((shift) => {
          const reservation = reservations.find(
            (res) =>
              res.startTime === shift.startTime &&
              res.endTime === shift.endTime
          );
          if (reservation) {
            if (reservation.owner === userSub) {
              return { ...shift, reservedByMe: true };
            } else {
              // 他ユーザーが予約している枠は表示しない
              return null;
            }
          }
          return shift;
        })
        .filter((shift) => shift !== null);
      setAvailableShifts(shiftsToDisplay);
    } catch (error) {
      console.error('シフト取得中にエラー:', error);
      alert('シフトを取得できませんでした。');
    }
  };

  const createReservation = async (shift) => {
    if (!userSub) {
      alert('予約にはログインが必要です。');
      return;
    }

    // 同一日に既に予約済みの場合は警告を出す（予約自体は継続可能）
    try {
      const existingReservations = await DataStore.query(Reservation, (r) =>
        r.owner.eq(userSub).and((r) => r.date.eq(shift.date))
      );
      if (existingReservations.length > 0) {
        const confirmProceed = window.confirm("本日既に予約済みです。予約を続行しますか？");
        if (!confirmProceed) {
          return;
        }
      }
    } catch (error) {
      console.error('既存予約確認中にエラー:', error);
    }

    try {
      const staffID_dateValue = `${shift.staffID}_${shift.date}`;
      const newReservation = await DataStore.save(
        new Reservation({
          staffID: shift.staffID,
          staffID_date: staffID_dateValue,
          date: shift.date,
          startTime: shift.startTime,
          endTime: shift.endTime,
          clientName: userFullName,
          owner: userSub,
          status: shift.tentative ? 'PENDING' : 'CONFIRMED',
        })
      );
      console.log("Reservation created:", newReservation);

      // メール送信APIの呼び出しとレスポンスのログ出力
      try {
        const emailResponse = await API.post('ReservationEmailAPI', '/send-email', {
          body: {
            reservationId: newReservation.id,
            clientEmail: userEmail,
            clientName: userFullName,
            reservationDate: shift.date,
            startTime: shift.startTime,
            endTime: shift.endTime,
            questionnaireLink: `${window.location.origin}/questionnaire/${newReservation.id}`,
          }
        });
        console.log('Email API response:', emailResponse);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }

      // 予約成功後は、対象シフトの予約状態を「reservedByMe」としてUIに反映
      setAvailableShifts((prev) =>
        prev.map((s) => {
          if (s.id === shift.id) {
            return { ...s, reservedByMe: true };
          }
          return s;
        })
      );
    } catch (error) {
      console.error('予約作成中にエラー:', error);
      alert('予約作成に失敗しました。');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>予約画面</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>予約入力</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <select
            style={{ minWidth: '150px', padding: '8px' }}
            value={selectedStaff?.id || ''}
            onChange={(e) => {
              const found = staffList.find((s) => s.id === e.target.value);
              setSelectedStaff(found || null);
            }}
          >
            <option value="" disabled>-- スタッフ選択 --</option>
            {staffList.map((staff) => (
              <option value={staff.id} key={staff.id}>{staff.name}</option>
            ))}
          </select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="日付"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </LocalizationProvider>
          <Button variant="contained" onClick={fetchShifts}>シフト確認</Button>
        </Box>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>選択スタッフ・日付のシフト一覧</Typography>
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
                    <TableCell>{dayjs(shift.startTime).format('HH:mm')}</TableCell>
                    <TableCell>{dayjs(shift.endTime).format('HH:mm')}</TableCell>
                    <TableCell>
                      {shift.reservedByMe ? (
                        <Button variant="outlined" disabled>
                          {`${dayjs(shift.startTime).format('HH:mm')} 予約できました`}
                        </Button>
                      ) : (
                        <Button variant="outlined" onClick={() => createReservation(shift)}>
                          この枠で予約
                        </Button>
                      )}
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
