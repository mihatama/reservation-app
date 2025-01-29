// ==========================
// ファイル先頭へ import を集約
// ==========================
import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Staff, Shift, Reservation } from '../models';
import { uploadData, getUrl } from '@aws-amplify/storage';

import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { format, parse, startOfWeek, getDay } from 'date-fns';
import ja from 'date-fns/locale/ja';

import { fetchAuthSession } from '@aws-amplify/auth';
dayjs.extend(isSameOrBefore);
// date-fns の日本語ロケール設定
const locales = { ja: ja };

// dateFnsLocalizer で日本語ロケールを利用
const localizer = dateFnsLocalizer({
  format: (date, pattern, options) =>
    format(date, pattern, { locale: ja, ...options }),
  parse: (value, pattern, baseDate, options) =>
    parse(value, pattern, baseDate, { locale: ja, ...options }),
  startOfWeek: (date, options) =>
    startOfWeek(date, { locale: ja, ...options }),
  getDay,
  locales,
});

/**
 * カレンダーの独自ツールバー
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
        marginBottom: '10px',
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

export default function StaffShiftPage() {
  // 施設登録用
  const [staffName, setStaffName] = useState('');
  const [staffDescription, setStaffDescription] = useState('');
  const [staffPhotoFile, setStaffPhotoFile] = useState(null);

  // 施設一覧
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // 単発シフト作成用
  const [shiftDate, setShiftDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [shiftDetail, setShiftDetail] = useState('');
  const [shiftCapacity, setShiftCapacity] = useState(1);

  // シフト一覧
  const [shiftList, setShiftList] = useState([]);

  // 右クリックメニュー用
  const [contextMenu, setContextMenu] = useState(null);
  const [contextStaff, setContextStaff] = useState(null);

  // 自動分割 + 曜日指定 + 期限設定
  const [autoInterval, setAutoInterval] = useState(60);
  const [breakStartTime, setBreakStartTime] = useState(null);
  const [breakEndTime, setBreakEndTime] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState({
    sun: false,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
  });
  const [repeatStartDate, setRepeatStartDate] = useState(null);
  const [repeatEndDate, setRepeatEndDate] = useState(null);
  const [autoStartTime, setAutoStartTime] = useState(null);
  const [autoEndTime, setAutoEndTime] = useState(null);
  const [autoShiftDetail, setAutoShiftDetail] = useState('');
  const [autoShiftCapacity, setAutoShiftCapacity] = useState(1);

  // 認証: 管理者判定
  const [isAdmin, setIsAdmin] = useState(false);

  // カレンダー表示用
  const [allShifts, setAllShifts] = useState([]);
  const [allReservations, setAllReservations] = useState([]);

  // =====================================
  // ユーザー認証情報・管理者判定
  // =====================================
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const session = await fetchAuthSession();
        // groups から管理者判定
        const groups = session?.tokens?.idToken?.payload?.['cognito:groups'] || [];
        setIsAdmin(groups.includes('admin'));
      } catch (err) {
        console.error('Fail to fetch session', err);
      }
    };
    getUserInfo();
  }, []);

  // =====================================
  // 施設 (Staff) の購読
  // =====================================
  useEffect(() => {
    const subscription = DataStore.observeQuery(Staff).subscribe(async ({ items }) => {
      const staffWithPhotoUrls = await Promise.all(
        items.map(async (staff) => {
          if (staff.photo) {
            try {
              const { url } = await getUrl({ key: staff.photo, level: 'public' });
              return { ...staff, photoURL: url.href };
            } catch (err) {
              return { ...staff, photoURL: '' };
            }
          }
          return { ...staff, photoURL: '' };
        })
      );
      setStaffList(staffWithPhotoUrls);
    });

    return () => subscription.unsubscribe();
  }, []);

  // =====================================
  // 選択施設のシフト一覧購読
  // =====================================
  useEffect(() => {
    if (!selectedStaff) {
      setShiftList([]);
      return;
    }

    const subscription = DataStore.observeQuery(Shift, (s) =>
      s.staffID.eq(selectedStaff.id)
    ).subscribe(async ({ items }) => {
      const shiftWithUrls = await Promise.all(
        items.map(async (shift) => {
          if (shift.photo) {
            try {
              const { url } = await getUrl({ key: shift.photo, level: 'public' });
              return { ...shift, photoURL: url.href };
            } catch {
              return { ...shift, photoURL: '' };
            }
          }
          return { ...shift, photoURL: '' };
        })
      );
      setShiftList(shiftWithUrls);
    });

    return () => subscription.unsubscribe();
  }, [selectedStaff]);

  // =====================================
  // 全シフト & 全予約 の購読 (カレンダー表示用)
  // =====================================
  useEffect(() => {
    // シフト
    const shiftSub = DataStore.observeQuery(Shift).subscribe(({ items }) => {
      setAllShifts(items);
    });
    // 予約
    const resSub = DataStore.observeQuery(Reservation).subscribe(({ items }) => {
      setAllReservations(items);
    });
    return () => {
      shiftSub.unsubscribe();
      resSub.unsubscribe();
    };
  }, []);

  // ----------------------------------------
  // 施設新規作成
  // ----------------------------------------
  const createStaff = async () => {
    if (!staffName.trim()) {
      alert('予約名を入力してください');
      return;
    }

    let photoKey = '';
    if (staffPhotoFile) {
      try {
        const fileName = `staff-photos/${Date.now()}_${staffPhotoFile.name}`;
        await uploadData({
          key: fileName,
          data: staffPhotoFile,
        });
        photoKey = fileName;
      } catch (err) {
        console.error('予約写真アップロード失敗:', err);
        alert('写真のアップロードに失敗しました。');
        return;
      }
    }

    try {
      const saved = await DataStore.save(
        new Staff({
          name: staffName,
          photo: photoKey,
          hidden: false,
          description: staffDescription,
        })
      );
      setSelectedStaff(saved);
      // 入力リセット
      setStaffName('');
      setStaffDescription('');
      setStaffPhotoFile(null);
      alert('施設を追加しました。');
    } catch (err) {
      console.error(err);
      alert('施設登録に失敗しました。');
    }
  };

  // ----------------------------------------
  // シフト追加（単発）
  // ----------------------------------------
  const createShift = async () => {
    if (!selectedStaff) {
      alert('施設を選択してください');
      return;
    }
    if (!shiftDate || !startTime || !endTime) {
      alert('日付/時刻が未入力です');
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
      alert('終了時刻は開始時刻より後にしてください');
      return;
    }
    try {
      await DataStore.save(
        new Shift({
          staffID: selectedStaff.id,
          staffID_date: `${selectedStaff.id}_${dateStr}`,
          date: dateStr,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          photo: selectedStaff.photo || '',
          details: shiftDetail,
          capacity: shiftCapacity,
        })
      );
      alert('シフトを作成しました。');
      // リセット
      setShiftDate(null);
      setStartTime(null);
      setEndTime(null);
      setShiftDetail('');
      setShiftCapacity(1);
    } catch (err) {
      console.error('createShift error', err);
      alert('シフト登録に失敗しました。');
    }
  };

  // ==========================================================
  // 自動分割シフト生成
  // ==========================================================
  const handleCreateAutoShifts = async () => {
    if (!selectedStaff) {
      alert('施設を選択してください');
      return;
    }
    if (!repeatStartDate || !repeatEndDate) {
      alert('開始日と終了日を指定してください');
      return;
    }
    if (!autoStartTime || !autoEndTime) {
      alert('シフト開始/終了時刻を設定してください');
      return;
    }
    if (autoEndTime.isBefore(autoStartTime)) {
      alert('シフト終了は開始より後にしてください');
      return;
    }
    if (repeatEndDate.isBefore(repeatStartDate)) {
      alert('終了日は開始日より後にしてください');
      return;
    }

    let current = repeatStartDate.clone();
    const tasks = [];

    while (current.isSameOrBefore(repeatEndDate, 'day')) {
      if (isDaySelected(current)) {
        const dateStr = current.format('YYYY-MM-DD');
        const staffID_dateValue = `${selectedStaff.id}_${dateStr}`;

        // 1日の中で開始～終了を interval 分ごとに分割
        const baseStart = autoStartTime
          .clone()
          .year(current.year())
          .month(current.month())
          .date(current.date());
        const baseEnd = autoEndTime
          .clone()
          .year(current.year())
          .month(current.month())
          .date(current.date());

        let bStart = null;
        let bEnd = null;
        if (breakStartTime && breakEndTime && breakEndTime.isAfter(breakStartTime)) {
          bStart = breakStartTime
            .clone()
            .year(current.year())
            .month(current.month())
            .date(current.date());
          bEnd = breakEndTime
            .clone()
            .year(current.year())
            .month(current.month())
            .date(current.date());
        }
        const slots = getTimeSlotsExcludingBreak(
          current,
          baseStart,
          baseEnd,
          autoInterval,
          bStart,
          bEnd
        );
        for (const [slotStart, slotEnd] of slots) {
          tasks.push(
            DataStore.save(
              new Shift({
                staffID: selectedStaff.id,
                staffID_date: staffID_dateValue,
                date: dateStr,
                startTime: slotStart.toISOString(),
                endTime: slotEnd.toISOString(),
                photo: selectedStaff.photo || '',
                details: autoShiftDetail,
                capacity: autoShiftCapacity,
              })
            )
          );
        }
      }
      current = current.add(1, 'day');
    }

    try {
      await Promise.all(tasks);
      alert('自動分割シフトを登録しました。');
    } catch (err) {
      console.error('handleCreateAutoShifts error', err);
      alert('自動生成に失敗しました。');
    }
  };

  /**
   * 指定の曜日がオンかを判定
   */
  const isDaySelected = (dateObj) => {
    switch (dateObj.day()) {
      case 0:
        return daysOfWeek.sun;
      case 1:
        return daysOfWeek.mon;
      case 2:
        return daysOfWeek.tue;
      case 3:
        return daysOfWeek.wed;
      case 4:
        return daysOfWeek.thu;
      case 5:
        return daysOfWeek.fri;
      case 6:
        return daysOfWeek.sat;
      default:
        return false;
    }
  };

  /**
   * 開始～終了を interval 分ごとに分割し、休憩を除外したスロットを返す
   */
  const getTimeSlotsExcludingBreak = (
    baseDate,
    baseStart,
    baseEnd,
    interval,
    bStart,
    bEnd
  ) => {
    const timeSlots = [];
    const ranges = [];

    if (bStart && bEnd && bEnd.isAfter(bStart)) {
      // 休憩が有効
      const firstRangeEnd = bStart.isAfter(baseStart) ? bStart : baseStart;
      const secondRangeStart = bEnd.isBefore(baseEnd) ? bEnd : baseEnd;
      if (firstRangeEnd.isAfter(baseStart)) {
        ranges.push([baseStart, firstRangeEnd]);
      }
      if (baseEnd.isAfter(secondRangeStart)) {
        ranges.push([secondRangeStart, baseEnd]);
      }
    } else {
      // 休憩無し
      ranges.push([baseStart, baseEnd]);
    }

    ranges.forEach(([rngStart, rngEnd]) => {
      let slotStart = rngStart.clone();
      while (slotStart.isBefore(rngEnd)) {
        const slotEnd = slotStart.clone().add(interval, 'minute');
        if (slotEnd.isAfter(rngEnd)) break;
        timeSlots.push([slotStart, slotEnd]);
        slotStart = slotEnd;
      }
    });

    return timeSlots;
  };

  // 右クリックメニュー
  const handleStaffContextMenu = (event, staff) => {
    event.preventDefault();
    setContextStaff(staff);
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    });
  };
  const handleCloseContextMenu = () => {
    setContextMenu(null);
    setContextStaff(null);
  };

  // 非表示トグル
  const handleToggleHideStaff = async () => {
    if (!contextStaff) return;
    const original = await DataStore.query(Staff, contextStaff.id);
    if (original) {
      await DataStore.save(
        Staff.copyOf(original, (updated) => {
          updated.hidden = !original.hidden;
        })
      );
    }
    handleCloseContextMenu();
  };

  // 施設削除
  const handleDeleteStaff = async () => {
    if (!contextStaff) return;
    const original = await DataStore.query(Staff, contextStaff.id);
    if (original) {
      await DataStore.delete(original);
    }
    handleCloseContextMenu();
  };

  // 曜日チェック
  const handleToggleDay = (key) => {
    setDaysOfWeek((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // =======================
  // カレンダーイベント生成
  // =======================
  const calendarEvents = allShifts.map((shift) => {
    const shiftStart = new Date(shift.startTime);
    const shiftEnd = new Date(shift.endTime);

    const staffObj = staffList.find((s) => s.id === shift.staffID);
    const name = staffObj ? staffObj.name : '不明施設';

    // 該当予約
    const shiftReservations = allReservations.filter(
      (r) =>
        r.staffID === shift.staffID &&
        r.date === shift.date &&
        r.startTime === shift.startTime &&
        r.endTime === shift.endTime
    );

    let title = '';
    if (shiftReservations.length === 0) {
      title = `【未予約】${name}`;
    } else {
      const reservedNames = shiftReservations.map((r) => r.clientName).join(', ');
      title = `【予約済】${name}: ${reservedNames}`;
    }

    return {
      id: shift.id,
      staffID: shift.staffID,
      start: shiftStart,
      end: shiftEnd,
      title,
      capacity: shift.capacity,
    };
  });

  // =======================
  // カレンダーイベントクリック
  // =======================
  const handleSelectEvent = async (event) => {
    if (!isAdmin) {
      // 一般ユーザーは操作不可
      alert('管理者権限が必要です。');
      return;
    }

    const shiftClicked = allShifts.find((s) => s.id === event.id);
    if (!shiftClicked) {
      alert('シフトが見つかりません');
      return;
    }

    // このシフトに紐づく予約
    const shiftReservations = allReservations.filter(
      (r) =>
        r.staffID === shiftClicked.staffID &&
        r.date === shiftClicked.date &&
        r.startTime === shiftClicked.startTime &&
        r.endTime === shiftClicked.endTime
    );

    if (shiftReservations.length > 0) {
      // 予約削除するか確認
      const confirmDelete = window.confirm(
        `以下の予約を削除しますか？\n${shiftReservations
          .map((r) => r.clientName)
          .join(', ')}`
      );
      if (!confirmDelete) return;
      // 削除
      for (const reservation of shiftReservations) {
        const orig = await DataStore.query(Reservation, reservation.id);
        if (orig) {
          await DataStore.delete(orig);
        }
      }
      alert('予約を削除しました。');
    } else {
      // 未予約なら新規予約を受け付け
      const clientName = window.prompt('予約者名を入力: ');
      if (!clientName) return;

      // capacityチェック
      const existCount = shiftReservations.length; // 0
      const cap = shiftClicked.capacity;
      if (cap != null && existCount >= cap) {
        alert('定員に達しているため予約できません。');
        return;
      }

      // 新規予約作成
      try {
        await DataStore.save(
          new Reservation({
            staffID: shiftClicked.staffID,
            staffID_date: `${shiftClicked.staffID}_${shiftClicked.date}`,
            date: shiftClicked.date,
            startTime: shiftClicked.startTime,
            endTime: shiftClicked.endTime,
            clientName: clientName,
            owner: '', // 代行予約なので空 or 管理者のsub
          })
        );
        alert(`予約を追加しました。(${clientName})`);
      } catch (err) {
        console.error('予約作成エラー', err);
        alert('予約作成に失敗しました。');
      }
    }
  };

  // ================================
  // JSX
  // ================================
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        予約登録（管理者専用）
      </Typography>

      {/* 施設登録フォーム */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1">予約施設登録</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="予約名"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="施設の詳細情報"
              value={staffDescription}
              onChange={(e) => setStaffDescription(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" component="label" fullWidth>
              写真を選択
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setStaffPhotoFile(e.target.files[0]);
                  }
                }}
              />
            </Button>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {staffPhotoFile ? `選択中: ${staffPhotoFile.name}` : 'ファイル未選択'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={createStaff} fullWidth>
              予約施設追加
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {/* 施設一覧 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">予約一覧</Typography>
            <List>
              {staffList.map((staff) => (
                <ListItemButton
                  key={staff.id}
                  selected={selectedStaff?.id === staff.id}
                  onClick={() => setSelectedStaff(staff)}
                  onContextMenu={(e) => handleStaffContextMenu(e, staff)}
                >
                  <ListItemText
                    primary={staff.name}
                    secondary={
                      (staff.photoURL ? '写真あり' : '写真なし') +
                      (staff.hidden ? ' / 非表示' : ' / 表示中')
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* シフト登録 */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1">単発シフト登録</Typography>
            {selectedStaff ? (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item>
                      <DatePicker
                        label="日付"
                        value={shiftDate}
                        onChange={(newVal) => setShiftDate(newVal)}
                      />
                    </Grid>
                    <Grid item>
                      <TimePicker
                        label="開始時刻(24h)"
                        ampm={false}
                        value={startTime}
                        onChange={(newVal) => setStartTime(newVal)}
                      />
                    </Grid>
                    <Grid item>
                      <TimePicker
                        label="終了時刻(24h)"
                        ampm={false}
                        value={endTime}
                        onChange={(newVal) => setEndTime(newVal)}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="シフトの詳細"
                      multiline
                      rows={2}
                      value={shiftDetail}
                      onChange={(e) => setShiftDetail(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="定員"
                      type="number"
                      value={shiftCapacity}
                      onChange={(e) =>
                        setShiftCapacity(parseInt(e.target.value, 10) || 1)
                      }
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  onClick={createShift}
                  sx={{ mt: 2 }}
                >
                  シフト追加
                </Button>
              </>
            ) : (
              <Typography variant="body2" sx={{ mt: 2 }}>
                左の一覧から施設を選択してください。
              </Typography>
            )}
          </Paper>

          {/* 自動分割 + 曜日繰り返し */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">自動生成シフト登録</Typography>
            {selectedStaff ? (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="繰り返し開始日"
                        value={repeatStartDate}
                        onChange={(newVal) => setRepeatStartDate(newVal)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="繰り返し終了日"
                        value={repeatEndDate}
                        onChange={(newVal) => setRepeatEndDate(newVal)}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <FormGroup row sx={{ mt: 2, ml: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.sun}
                          onChange={() => handleToggleDay('sun')}
                        />
                      }
                      label="日"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.mon}
                          onChange={() => handleToggleDay('mon')}
                        />
                      }
                      label="月"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.tue}
                          onChange={() => handleToggleDay('tue')}
                        />
                      }
                      label="火"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.wed}
                          onChange={() => handleToggleDay('wed')}
                        />
                      }
                      label="水"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.thu}
                          onChange={() => handleToggleDay('thu')}
                        />
                      }
                      label="木"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.fri}
                          onChange={() => handleToggleDay('fri')}
                        />
                      }
                      label="金"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.sat}
                          onChange={() => handleToggleDay('sat')}
                        />
                      }
                      label="土"
                    />
                  </FormGroup>

                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6} sm={3}>
                      <TimePicker
                        label="シフト開始(24h)"
                        ampm={false}
                        value={autoStartTime}
                        onChange={(newVal) => setAutoStartTime(newVal)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TimePicker
                        label="シフト終了(24h)"
                        ampm={false}
                        value={autoEndTime}
                        onChange={(newVal) => setAutoEndTime(newVal)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TimePicker
                        label="休憩開始(24h)"
                        ampm={false}
                        value={breakStartTime}
                        onChange={(newVal) => setBreakStartTime(newVal)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TimePicker
                        label="休憩終了(24h)"
                        ampm={false}
                        value={breakEndTime}
                        onChange={(newVal) => setBreakEndTime(newVal)}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="インターバル(分)"
                      type="number"
                      value={autoInterval}
                      onChange={(e) =>
                        setAutoInterval(parseInt(e.target.value, 10) || 60)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="定員"
                      type="number"
                      value={autoShiftCapacity}
                      onChange={(e) =>
                        setAutoShiftCapacity(parseInt(e.target.value, 10) || 1)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="シフトの詳細"
                      multiline
                      rows={2}
                      value={autoShiftDetail}
                      onChange={(e) => setAutoShiftDetail(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  onClick={handleCreateAutoShifts}
                  sx={{ mt: 2 }}
                >
                  自動生成
                </Button>
              </>
            ) : (
              <Typography variant="body2" sx={{ mt: 2 }}>
                左の一覧から施設を選択してください。
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* 選択施設のシフト一覧 */}
      {selectedStaff && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {selectedStaff.name} さんのシフト一覧
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>日付</TableCell>
                  <TableCell>開始</TableCell>
                  <TableCell>終了</TableCell>
                  <TableCell>シフト詳細</TableCell>
                  <TableCell>施設詳細</TableCell>
                  <TableCell>写真</TableCell>
                  <TableCell>定員</TableCell>
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
                      <TableCell>{shift.details || ''}</TableCell>
                      <TableCell>
                        {selectedStaff?.description || ''}
                      </TableCell>
                      <TableCell>
                        {shift.photoURL ? (
                          <img
                            src={shift.photoURL}
                            alt="シフト写真"
                            style={{ width: '80px', objectFit: 'cover' }}
                          />
                        ) : (
                          'なし'
                        )}
                      </TableCell>
                      <TableCell>{shift.capacity ?? ''}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* 右クリックメニュー */}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleToggleHideStaff}>
          {contextStaff?.hidden ? '表示にする' : '非表示にする'}
        </MenuItem>
        <MenuItem onClick={handleDeleteStaff}>削除</MenuItem>
      </Menu>

      {/* 全体カレンダー */}
      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          全施設・スタッフの予約状況カレンダー
        </Typography>
        <Typography variant="body2">
          イベントをクリックすると、管理者のみ予約の削除や新規予約が可能です。
        </Typography>
        <div style={{ height: '700px', marginTop: '20px' }}>
          <Calendar
            localizer={localizer}
            culture="ja"
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            views={['month', 'week', 'day']}
            defaultView={Views.MONTH}
            onSelectEvent={handleSelectEvent}
            components={{
              toolbar: CustomToolbar,
            }}
          />
        </div>
      </Paper>
    </Container>
  );
}
