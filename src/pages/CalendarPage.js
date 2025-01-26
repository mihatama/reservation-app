import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Staff, Shift } from '../models';

// react-big-calendar
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// date-fns
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ja from 'date-fns/locale/ja';

import { Box, Typography, Paper, Container } from '@mui/material';
import dayjs from 'dayjs';

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

export default function CalendarPage() {
  const [shifts, setShifts] = useState([]);
  const [staffMap, setStaffMap] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Staff 一覧を取得
    const staffList = await DataStore.query(Staff);
    const map = {};
    staffList.forEach((staff) => {
      map[staff.id] = staff.name;
    });
    setStaffMap(map);

    // Shift 一覧を取得
    const allShifts = await DataStore.query(Shift);
    setShifts(allShifts);
  };

  // react-big-calendar 用のevents配列
  const events = shifts.map((shift) => {
    const start = new Date(shift.startTime);
    const end = new Date(shift.endTime);
    const staffName = staffMap[shift.staffID] || 'No Staff';
    return {
      id: shift.id,
      title: `${staffName} シフト`,
      start: start,
      end: end,
      allDay: false,
    };
  });

  const onEventSelected = (event) => {
    alert(
      `選択されたイベント: ${event.title}\n開始: ${dayjs(event.start).format(
        'YYYY/MM/DD HH:mm'
      )}\n終了: ${dayjs(event.end).format('YYYY/MM/DD HH:mm')}`
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        カレンダー表示
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">
          スタッフのシフト一覧をカレンダーで表示
        </Typography>
        <Box style={{ height: '700px', marginTop: '20px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            defaultView="week"
            onSelectEvent={onEventSelected}
          />
        </Box>
      </Paper>
    </Container>
  );
}
