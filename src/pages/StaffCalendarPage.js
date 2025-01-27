import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Staff, Shift, Reservation } from '../models';

// react-big-calendar
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// date-fns
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ja from 'date-fns/locale/ja';

import { Box, Typography, Paper, Container } from '@mui/material';
import dayjs from 'dayjs';

// Auth
import { fetchAuthSession } from '@aws-amplify/auth';

const locales = {
  ja: ja,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

export default function StaffCalendarPage() {
  const { staffId } = useParams();
  const [staff, setStaff] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [userSub, setUserSub] = useState('');
  const [userFullName, setUserFullName] = useState('');

  useEffect(() => {
    getUserInfo();
    if (staffId) {
      fetchStaffAndShifts(staffId);
    }
  }, [staffId]);

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

  const fetchStaffAndShifts = async (id) => {
    // スタッフ情報
    const staffRecord = await DataStore.query(Staff, id);
    setStaff(staffRecord);

    // そのスタッフのシフト一覧
    const shiftRecords = await DataStore.query(Shift, (s) => s.staffID.eq(id));
    setShifts(shiftRecords);
  };

  // カレンダーに表示するイベント
  const events = shifts.map((shift) => {
    const start = new Date(shift.startTime);
    const end = new Date(shift.endTime);
    return {
      id: shift.id,
      title: `シフト (${dayjs(start).format('HH:mm')}~${dayjs(end).format('HH:mm')})`,
      start,
      end,
    };
  });

  // シフトクリック => 予約確認ダイアログ（簡易実装）
  const handleSelectEvent = async (event) => {
    if (!userSub) {
      alert('ログインが必要です。');
      return;
    }
    const confirmBook = window.confirm(
      `このシフトを予約しますか？\n\n${dayjs(event.start).format(
        'YYYY/MM/DD HH:mm'
      )} ~ ${dayjs(event.end).format('HH:mm')}`
    );
    if (!confirmBook) return;

    // シフトIDから元のShiftモデルを取得
    const shiftObj = shifts.find((s) => s.id === event.id);
    if (!shiftObj) {
      alert('エラー: シフトを特定できませんでした。');
      return;
    }

    try {
      const staffID_dateValue = `${shiftObj.staffID}_${shiftObj.date}`;
      await DataStore.save(
        new Reservation({
          staffID: shiftObj.staffID,
          staffID_date: staffID_dateValue,
          date: shiftObj.date,
          startTime: shiftObj.startTime,
          endTime: shiftObj.endTime,
          clientName: userFullName,
          owner: userSub,
        })
      );
      alert('予約が完了しました。');
    } catch (error) {
      console.error('予約作成エラー:', error);
      alert('予約に失敗しました。');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {staff ? `${staff.name} さんのカレンダー` : 'カレンダー'}
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">
          日 / 週 / 月 で切り替えてシフトを確認し、クリックで予約を行います。
        </Typography>
        <Box style={{ height: '700px', marginTop: '20px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            views={['month', 'week', 'day']}
            defaultView={Views.WEEK}
            onSelectEvent={handleSelectEvent}
          />
        </Box>
      </Paper>
    </Container>
  );
}
