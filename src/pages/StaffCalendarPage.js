import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// DataStore はそのまま、API は post を個別にインポート
import { DataStore } from '@aws-amplify/datastore';
import { post } from '@aws-amplify/api';
import { Staff, Shift, Reservation } from '../models';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { Box, Typography, Paper, Container, Button } from '@mui/material';
import dayjs from 'dayjs';
import { fetchAuthSession } from '@aws-amplify/auth';

const locales = { ja: ja };
const localizer = dateFnsLocalizer({
  format: (date, pattern, options) => format(date, pattern, { locale: ja, ...options }),
  parse: (value, pattern, baseDate, options) => parse(value, pattern, baseDate, { locale: ja, ...options }),
  startOfWeek: (date, options) => startOfWeek(date, { locale: ja, ...options }),
  getDay,
  locales,
});

function CustomToolbar(props) {
  const { label, onNavigate, onView } = props;
  const goToPrev = () => onNavigate('PREV');
  const goToNext = () => onNavigate('NEXT');
  const goToToday = () => onNavigate('TODAY');
  const goToMonth = () => onView('month');
  const goToWeek = () => onView('week');
  const goToDay = () => onView('day');
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <div>
        <Button onClick={goToPrev} variant="outlined" sx={{ mr: 1 }}>◀</Button>
        <Button onClick={goToToday} variant="contained" color="primary" sx={{ mr: 1 }}>今日</Button>
        <Button onClick={goToNext} variant="outlined">▶</Button>
      </div>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{label}</Typography>
      <div>
        <Button onClick={goToMonth} variant="outlined" sx={{ mr: 1 }}>月</Button>
        <Button onClick={goToWeek} variant="outlined" sx={{ mr: 1 }}>週</Button>
        <Button onClick={goToDay} variant="outlined">日</Button>
      </div>
    </div>
  );
}

export default function StaffCalendarPage() {
  const { staffId } = useParams();
  const [staff, setStaff] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [userSub, setUserSub] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    getUserInfo();
    if (staffId) {
      const staffSubscription = DataStore.observeQuery(Staff, s => s.id.eq(staffId))
        .subscribe(snapshot => {
          if (snapshot.items.length > 0) setStaff(snapshot.items[0]);
        });

      const shiftSubscription = DataStore.observeQuery(Shift, s => s.staffID.eq(staffId))
        .subscribe(snapshot => setShifts(snapshot.items));

      const reservationSubscription = DataStore.observeQuery(Reservation)
        .subscribe(snapshot => setReservations(snapshot.items));

      return () => {
        staffSubscription.unsubscribe();
        shiftSubscription.unsubscribe();
        reservationSubscription.unsubscribe();
      };
    }
  }, [staffId]);

  const getUserInfo = async () => {
    try {
      const session = await fetchAuthSession();
      const sub = session?.tokens?.idToken?.payload?.sub || '';
      setUserSub(sub);
      const familyName = session?.tokens?.idToken?.payload?.family_name || '';
      const givenName = session?.tokens?.idToken?.payload?.given_name || '';
      setUserFullName(`${familyName} ${givenName}`);
      const email = session?.tokens?.idToken?.payload?.email || '';
      setUserEmail(email);
      const phone = session?.tokens?.idToken?.payload?.phone_number || '';
      setUserPhone(phone);
    } catch (err) {
      console.error('Fail to fetch session', err);
    }
  };

  const getShiftReservationCount = (shift) => {
    return reservations.filter(
      (res) =>
        res.staffID === shift.staffID &&
        res.date === shift.date &&
        res.startTime === shift.startTime &&
        res.endTime === shift.endTime &&
        res.status === 'CONFIRMED'
    ).length;
  };

  const availableShifts = shifts.filter((shift) => {
    if (shift.capacity == null) return true;
    return getShiftReservationCount(shift) < shift.capacity;
  });

  const events = availableShifts.map((shift) => {
    const start = new Date(shift.startTime);
    const end = new Date(shift.endTime);
    const title = shift.tentative ? '仮予約' : 'シフト';
    return {
      id: shift.id,
      title,
      start,
      end,
    };
  });

  const handleSelectEvent = async (event) => {
    if (!userSub) {
      alert('ログインが必要です。');
      return;
    }
    const shiftObj = availableShifts.find((s) => s.id === event.id);
    if (!shiftObj) {
      alert('エラー: シフトを特定できませんでした。');
      return;
    }
    const confirmBook = window.confirm(
      `このシフトを予約しますか？\n${dayjs(event.start).format('YYYY/MM/DD HH:mm')} ~ ${dayjs(event.end).format('HH:mm')}`
    );
    if (!confirmBook) return;
    try {
      const shiftStart = new Date(shiftObj.startTime);
      const shiftEnd = new Date(shiftObj.endTime);
      const userExistingReservations = reservations.filter((res) => res.owner === userSub);
      const hasOverlap = userExistingReservations.some((res) => {
        const existingStart = new Date(res.startTime);
        const existingEnd = new Date(res.endTime);
        return shiftStart < existingEnd && shiftEnd > existingStart;
      });
      if (hasOverlap) {
        alert('既に同じ時間帯で予約があります。');
        return;
      }
      const staffID_dateValue = `${shiftObj.staffID}_${shiftObj.date}`;
      const newReservation = await DataStore.save(
        new Reservation({
          staffID: shiftObj.staffID,
          staffID_date: staffID_dateValue,
          date: shiftObj.date,
          startTime: shiftObj.startTime,
          endTime: shiftObj.endTime,
          clientName: userFullName,
          owner: userSub,
          email: userEmail,
          phone: userPhone,
          status: shiftObj.tentative ? 'PENDING' : 'CONFIRMED',
        })
      );

      // 予約作成後、メール送信用の REST API を呼び出す前にリクエストペイロードをログ出力
      const emailPayload = {
        reservationId: newReservation.id,
        clientEmail: userEmail,
        clientName: userFullName,
        reservationDate: shiftObj.date,
        startTime: shiftObj.startTime,
        endTime: shiftObj.endTime,
        questionnaireLink: `${window.location.origin}/questionnaire/${newReservation.id}`
      };
      console.log("【DEBUG】メール送信リクエストペイロード:", JSON.stringify(emailPayload, null, 2));

      try {
        const emailResponse = await post({
          apiName: "ReservationEmailAPI",
          path: "/send-email",
          options: {
            body: emailPayload
          }
        }).response;
        console.log('【DEBUG】Email API response:', JSON.stringify(emailResponse, null, 2));
      } catch (emailError) {
        console.error('【DEBUG】Error sending email:', JSON.stringify(emailError, null, 2));
      }

      if (shiftObj.tentative) {
        alert('仮予約が完了しました。管理者の承認後に確定します。');
        return;
      }
      const countAfter = getShiftReservationCount(shiftObj) + 1;
      const cap = shiftObj.capacity;
      if (cap != null && countAfter >= cap) {
        const confirmedShift = await DataStore.query(Shift, shiftObj.id);
        if (confirmedShift) {
          await DataStore.delete(confirmedShift);
        }
      } else {
        alert('予約が完了しました。');
      }
    } catch (error) {
      console.error('予約作成エラー:', error);
      alert('予約に失敗しました。');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>{staff ? `${staff.name} さんのカレンダー` : 'カレンダー'}</Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">
          前後の矢印で移動し、「月 / 週 / 日」ボタンで切替を行えます。<br />
          シフトをクリックすると予約できます。
        </Typography>
        <Box style={{ height: '700px', marginTop: '20px' }}>
          <Calendar
            localizer={localizer}
            culture="ja"
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            views={['month', 'week', 'day']}
            defaultView={Views.WEEK}
            onSelectEvent={handleSelectEvent}
            components={{ toolbar: CustomToolbar }}
          />
        </Box>
      </Paper>
    </Container>
  );
}
