import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Staff, Shift, Reservation } from '../models';

import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  format,
  parse,
  startOfWeek,
  getDay
} from 'date-fns';
import ja from 'date-fns/locale/ja';

import { Box, Typography, Paper, Container, Button } from '@mui/material';
import dayjs from 'dayjs';
import { fetchAuthSession } from '@aws-amplify/auth';

// date-fns の日本語ロケール設定
const locales = {
  ja: ja,
};

// dateFnsLocalizer で日本語ロケールを利用
const localizer = dateFnsLocalizer({
  format: (date, pattern, options) => format(date, pattern, { locale: ja, ...options }),
  parse: (value, pattern, baseDate, options) => parse(value, pattern, baseDate, { locale: ja, ...options }),
  startOfWeek: (date, options) => startOfWeek(date, { locale: ja, ...options }),
  getDay,
  locales,
});

/**
 * 独自ツールバー
 * - カレンダーの標準ツールバーを置き換える
 * - 前へ / 次へ / 今日へ移動
 * - 月 / 週 / 日 (ビュー切り替え)
 * - 現在の表示範囲ラベル(props.label) を表示
 */
function CustomToolbar(props) {
  const { label } = props;

  const goToPrev = () => {
    props.onNavigate('PREV');
  };
  const goToNext = () => {
    props.onNavigate('NEXT');
  };
  const goToToday = () => {
    props.onNavigate('TODAY');
  };

  const goToMonth = () => {
    props.onView('month');
  };
  const goToWeek = () => {
    props.onView('week');
  };
  const goToDay = () => {
    props.onView('day');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}
    >
      {/* 左側: 前へ / 今日 / 次へ */}
      <div>
        <Button onClick={goToPrev} variant="outlined" sx={{ mr: 1 }}>
          ◀
        </Button>
        <Button
          onClick={goToToday}
          variant="contained"
          color="primary"
          sx={{ mr: 1 }}
        >
          今日
        </Button>
        <Button onClick={goToNext} variant="outlined">
          ▶
        </Button>
      </div>

      {/* 中央: 現在の範囲 (例: 2025年1月 など) */}
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {label}
      </Typography>

      {/* 右側: 月 / 週 / 日 切り替え */}
      <div>
        <Button onClick={goToMonth} variant="outlined" sx={{ mr: 1 }}>
          月
        </Button>
        <Button onClick={goToWeek} variant="outlined" sx={{ mr: 1 }}>
          週
        </Button>
        <Button onClick={goToDay} variant="outlined">
          日
        </Button>
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

  useEffect(() => {
    getUserInfo();

    if (staffId) {
      // Staffの購読
      const staffSubscription = DataStore.observeQuery(Staff, s => s.id.eq(staffId))
        .subscribe((snapshot) => {
          const items = snapshot.items;
          if (items.length > 0) {
            setStaff(items[0]);
          }
        });

      // Shiftの購読
      const shiftSubscription = DataStore.observeQuery(Shift, s => s.staffID.eq(staffId))
        .subscribe((snapshot) => {
          setShifts(snapshot.items);
        });

      // Reservationの購読
      const reservationSubscription = DataStore.observeQuery(
        Reservation,
        (r) => r.staffID.eq(staffId)
      ).subscribe((snapshot) => {
        setReservations(snapshot.items);
      });

      return () => {
        staffSubscription.unsubscribe();
        shiftSubscription.unsubscribe();
        reservationSubscription.unsubscribe();
      };
    }
  }, [staffId]);

  // ユーザー情報を取得
  const getUserInfo = async () => {
    try {
      const session = await fetchAuthSession();
      const sub = session?.tokens?.idToken?.payload?.sub || '';
      setUserSub(sub);

      const familyName = session?.tokens?.idToken?.payload?.family_name || '';
      const givenName = session?.tokens?.idToken?.payload?.given_name || '';
      setUserFullName(`${familyName} ${givenName}`);
    } catch (err) {
      console.error('Fail to fetch session', err);
    }
  };

  // シフトごとの予約数をカウント
  const getShiftReservationCount = (shift) => {
    return reservations.filter(
      (res) =>
        res.staffID === shift.staffID &&
        res.date === shift.date &&
        res.startTime === shift.startTime &&
        res.endTime === shift.endTime
    ).length;
  };

  // カレンダーに表示するシフト一覧 (まだ満席でないもののみ)
  const availableShifts = shifts.filter((shift) => {
    // capacity が未設定(=null)の場合は制限なしとみなして表示
    if (shift.capacity == null) return true;

    const count = getShiftReservationCount(shift);
    return count < shift.capacity;
  });

  // カレンダーに表示するイベント
  const events = availableShifts.map((shift) => {
    const start = new Date(shift.startTime);
    const end = new Date(shift.endTime);
    return {
      id: shift.id,
      title: `シフト (${dayjs(start).format('HH:mm')}~${dayjs(end).format('HH:mm')})`,
      start,
      end,
    };
  });

  // カレンダー上のイベントをクリック -> 予約処理
  const handleSelectEvent = async (event) => {
    if (!userSub) {
      alert('ログインが必要です。');
      return;
    }
    const confirmBook = window.confirm(
      `このシフトを予約しますか？\n\n${dayjs(event.start).format('YYYY/MM/DD HH:mm')} ~ ${dayjs(event.end).format('HH:mm')}`
    );
    if (!confirmBook) return;

    const shiftObj = availableShifts.find((s) => s.id === event.id);
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

      // 予約後に定員に達したかどうかチェック
      const countAfter = getShiftReservationCount(shiftObj) + 1; // 今の予約を加味するため +1
      const cap = shiftObj.capacity;

      if (cap != null && countAfter >= cap) {
        // 定員に達した → シフトを物理削除
        const confirmedShift = await DataStore.query(Shift, shiftObj.id);
        if (confirmedShift) {
          await DataStore.delete(confirmedShift);
        }
        alert('予約が完了しました。定員に達したため、この枠は削除されます。');
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
      <Typography variant="h5" gutterBottom>
        {staff ? `${staff.name} さんのカレンダー` : 'カレンダー'}
      </Typography>
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
            components={{
              toolbar: CustomToolbar,
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
}
