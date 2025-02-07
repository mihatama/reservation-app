import React, { useEffect, useState, useMemo } from 'react';
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

dayjs.extend(isSameOrBefore);
const locales = { ja: ja };
const localizer = dateFnsLocalizer({
  format: (date, pattern, options) => format(date, pattern, { locale: ja, ...options }),
  parse: (value, pattern, baseDate, options) => parse(value, pattern, baseDate, { locale: ja, ...options }),
  startOfWeek: (date, options) => startOfWeek(date, { locale: ja, ...options }),
  getDay,
  locales,
});

function CustomToolbar(props) {
  const { label } = props;
  const goToPrev = () => props.onNavigate('PREV');
  const goToNext = () => props.onNavigate('NEXT');
  const goToToday = () => props.onNavigate('TODAY');
  const goToMonth = () => props.onView('month');
  const goToWeek = () => props.onView('week');
  const goToDay = () => props.onView('day');
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

const COLORS = [
  '#E53E3E',
  '#DD6B20',
  '#D69E2E',
  '#38A169',
  '#3182CE',
  '#805AD5',
  '#718096',
  '#4299E1',
  '#ED64A6',
  '#ECC94B',
];

export default function StaffShiftPage() {
  const [staffName, setStaffName] = useState('');
  const [staffDescription, setStaffDescription] = useState('');
  const [staffPhotoFile, setStaffPhotoFile] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [shiftDate, setShiftDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [shiftDetail, setShiftDetail] = useState('');
  const [shiftCapacity, setShiftCapacity] = useState(1);
  const [shiftTentative, setShiftTentative] = useState(false);
  const [shiftList, setShiftList] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [contextStaff, setContextStaff] = useState(null);
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
  const [autoShiftTentative, setAutoShiftTentative] = useState(false);
  const [allShifts, setAllShifts] = useState([]);
  const [allReservations, setAllReservations] = useState([]);
  const [selectedStaffIdsForCalendar, setSelectedStaffIdsForCalendar] = useState([]);

  useEffect(() => {
    const subscription = DataStore.observeQuery(Staff).subscribe(async ({ items }) => {
      const staffWithPhotoUrls = await Promise.all(
        items.map(async (staff) => {
          if (staff.photo) {
            try {
              const result = await getUrl({ key: staff.photo, level: 'public' });
              const photoURL = typeof result === 'string' ? result : result.url || '';
              return { ...staff, photoURL };
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

  useEffect(() => {
    if (!selectedStaff) {
      setShiftList([]);
      return;
    }
    const subscription = DataStore.observeQuery(Shift, (s) => s.staffID.eq(selectedStaff.id)).subscribe(
      async ({ items }) => {
        const shiftWithUrls = await Promise.all(
          items.map(async (shift) => {
            if (shift.photo) {
              try {
                const result = await getUrl({ key: shift.photo, level: 'public' });
                const photoURL = typeof result === 'string' ? result : result.url || '';
                return { ...shift, photoURL };
              } catch {
                return { ...shift, photoURL: '' };
              }
            }
            return { ...shift, photoURL: '' };
          })
        );
        setShiftList(shiftWithUrls);
      }
    );
    return () => subscription.unsubscribe();
  }, [selectedStaff]);

  useEffect(() => {
    const shiftSub = DataStore.observeQuery(Shift).subscribe(({ items }) => {
      setAllShifts(items);
    });
    const resSub = DataStore.observeQuery(Reservation).subscribe(({ items }) => {
      setAllReservations(items);
    });
    return () => {
      shiftSub.unsubscribe();
      resSub.unsubscribe();
    };
  }, []);

  const createStaff = async () => {
    if (!staffName.trim()) {
      alert('予約名を入力してください');
      return;
    }
    let photoKey = '';
    if (staffPhotoFile) {
      try {
        const fileName = `staff-photos/${Date.now()}_${staffPhotoFile.name}`;
        await uploadData({ key: fileName, data: staffPhotoFile });
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
      setStaffName('');
      setStaffDescription('');
      setStaffPhotoFile(null);
      alert('施設を追加しました。');
    } catch (err) {
      console.error(err);
      alert('施設登録に失敗しました。');
    }
  };

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
    const start = startTime.set('year', shiftDate.year()).set('month', shiftDate.month()).set('date', shiftDate.date());
    const end = endTime.set('year', shiftDate.year()).set('month', shiftDate.month()).set('date', shiftDate.date());
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
          tentative: shiftTentative,
        })
      );
      alert('シフトを作成しました。');
      setShiftDate(null);
      setStartTime(null);
      setEndTime(null);
      setShiftDetail('');
      setShiftCapacity(1);
      setShiftTentative(false);
    } catch (err) {
      console.error('createShift error', err);
      alert('シフト登録に失敗しました。');
    }
  };

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
        const baseStart = autoStartTime.clone().year(current.year()).month(current.month()).date(current.date());
        const baseEnd = autoEndTime.clone().year(current.year()).month(current.month()).date(current.date());
        let bStart = null;
        let bEnd = null;
        if (breakStartTime && breakEndTime && breakEndTime.isAfter(breakStartTime)) {
          bStart = breakStartTime.clone().year(current.year()).month(current.month()).date(current.date());
          bEnd = breakEndTime.clone().year(current.year()).month(current.month()).date(current.date());
        }
        const slots = getTimeSlotsExcludingBreak(current, baseStart, baseEnd, autoInterval, bStart, bEnd);
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
                tentative: autoShiftTentative,
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

  const isDaySelected = (dateObj) => {
    switch (dateObj.day()) {
      case 0: return daysOfWeek.sun;
      case 1: return daysOfWeek.mon;
      case 2: return daysOfWeek.tue;
      case 3: return daysOfWeek.wed;
      case 4: return daysOfWeek.thu;
      case 5: return daysOfWeek.fri;
      case 6: return daysOfWeek.sat;
      default: return false;
    }
  };

  const getTimeSlotsExcludingBreak = (baseDate, baseStart, baseEnd, interval, bStart, bEnd) => {
    const timeSlots = [];
    const ranges = [];
    if (bStart && bEnd && bEnd.isAfter(bStart)) {
      const firstRangeEnd = bStart.isAfter(baseStart) ? bStart : baseStart;
      const secondRangeStart = bEnd.isBefore(baseEnd) ? bEnd : baseEnd;
      if (firstRangeEnd.isAfter(baseStart)) {
        ranges.push([baseStart, firstRangeEnd]);
      }
      if (baseEnd.isAfter(secondRangeStart)) {
        ranges.push([secondRangeStart, baseEnd]);
      }
    } else {
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

  const handleStaffContextMenu = (event, staff) => {
    event.preventDefault();
    setContextStaff(staff);
    setContextMenu({ mouseX: event.clientX + 2, mouseY: event.clientY - 6 });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
    setContextStaff(null);
  };

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

  const handleDeleteStaff = async () => {
    if (!contextStaff) return;
    const original = await DataStore.query(Staff, contextStaff.id);
    if (original) {
      await DataStore.delete(original);
    }
    handleCloseContextMenu();
  };

  const handleToggleDay = (key) => {
    setDaysOfWeek((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calendarEvents = useMemo(() => {
    return allShifts.map((shift) => {
      const shiftStart = new Date(shift.startTime);
      const shiftEnd = new Date(shift.endTime);
      const shiftReservations = allReservations.filter(
        (r) =>
          r.staffID === shift.staffID &&
          r.date === shift.date &&
          r.startTime === shift.startTime &&
          r.endTime === shift.endTime
      );
      const isReserved = shiftReservations.length > 0;
      const hasPending = shiftReservations.some((r) => r.status === 'PENDING');
      let title = shift.tentative ? '仮予約' : 'シフト';
      if (isReserved) {
        if (hasPending) {
          title += ' (仮予約中)';
        } else {
          title += ' (予約済み)';
        }
      }
      return {
        id: shift.id,
        staffID: shift.staffID,
        start: shiftStart,
        end: shiftEnd,
        reserved: isReserved,
        title,
        shiftReservations,
        shiftTentative: shift.tentative,
      };
    });
  }, [allShifts, allReservations]);

  const staffColorMap = useMemo(() => {
    const map = {};
    staffList.forEach((staff, index) => {
      map[staff.id] = COLORS[index % COLORS.length];
    });
    return map;
  }, [staffList]);

  const eventPropGetter = (event) => {
    const color = staffColorMap[event.staffID] || '#999';
    return {
      style: {
        backgroundColor: color,
        opacity: event.shiftReservations.some((r) => r.status === 'PENDING') ? 0.8 : 1,
      },
    };
  };

  const filteredCalendarEvents = useMemo(() => {
    if (selectedStaffIdsForCalendar.length === 0) {
      return [];
    }
    return calendarEvents.filter((ev) => selectedStaffIdsForCalendar.includes(ev.staffID));
  }, [calendarEvents, selectedStaffIdsForCalendar]);

  const handleSelectEvent = async (event) => {
    const shiftClicked = allShifts.find((s) => s.id === event.id);
    if (!shiftClicked) {
      alert('シフトが見つかりません');
      return;
    }
    const shiftReservations = allReservations.filter(
      (r) =>
        r.staffID === shiftClicked.staffID &&
        r.date === shiftClicked.date &&
        r.startTime === shiftClicked.startTime &&
        r.endTime === shiftClicked.endTime
    );
    if (shiftReservations.length > 0) {
      let message = '';
      shiftReservations.forEach((res) => {
        message += `\n予約者: ${res.clientName}\nEmail: ${res.email}\nPhone: ${res.phone}\nステータス: ${res.status}\n---------------\n`;
      });
      const action = window.prompt(
        `既存の予約一覧:\n${message}\n\n操作を選択してください。\n- "approve": 承認\n- "delete": 削除\n- 何も入力しない: キャンセル`
      );
      if (!action) return;
      if (action === 'approve') {
        for (const res of shiftReservations) {
          if (shiftClicked.tentative && res.status === 'PENDING') {
            const orig = await DataStore.query(Reservation, res.id);
            if (orig) {
              await DataStore.save(
                Reservation.copyOf(orig, (updated) => {
                  updated.status = 'CONFIRMED';
                })
              );
            }
          }
        }
        alert('仮予約を承認しました。');
        return;
      } else if (action === 'delete') {
        for (const reservation of shiftReservations) {
          const orig = await DataStore.query(Reservation, reservation.id);
          if (orig) {
            await DataStore.delete(orig);
          }
        }
        alert('予約を削除しました。');
        return;
      }
    } else {
      const clientName = window.prompt('予約者名を入力 (空でキャンセル): ');
      if (!clientName) return;
      const existReservations = shiftReservations.filter((r) => r.status === 'CONFIRMED');
      const existCount = existReservations.length;
      const cap = shiftClicked.capacity;
      if (cap != null && existCount >= cap) {
        alert('定員に達しているため予約できません。');
        return;
      }
      try {
        await DataStore.save(
          new Reservation({
            staffID: shiftClicked.staffID,
            staffID_date: `${shiftClicked.staffID}_${shiftClicked.date}`,
            date: shiftClicked.date,
            startTime: shiftClicked.startTime,
            endTime: shiftClicked.endTime,
            clientName: clientName,
            owner: '',
            email: '',
            phone: '',
            status: shiftClicked.tentative ? 'PENDING' : 'CONFIRMED',
          })
        );
        alert(`予約を追加しました。(${clientName})`);
      } catch (err) {
        console.error('予約作成エラー', err);
        alert('予約作成に失敗しました。');
      }
    }
  };

  const handleToggleStaffForCalendar = (staffId) => {
    setSelectedStaffIdsForCalendar((prev) => {
      if (prev.includes(staffId)) {
        return prev.filter((id) => id !== staffId);
      } else {
        return [...prev, staffId];
      }
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>予約登録</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1">予約施設登録</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="予約名" value={staffName} onChange={(e) => setStaffName(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="施設の詳細情報" value={staffDescription} onChange={(e) => setStaffDescription(e.target.value)} fullWidth />
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
            <Button variant="contained" onClick={createStaff} fullWidth>予約施設追加</Button>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
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
                    secondary={`${staff.photoURL ? '写真あり' : '写真なし'}${staff.hidden ? ' / 非表示' : ' / 表示中'}`}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1">単発シフト登録</Typography>
            {selectedStaff ? (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item>
                      <DatePicker label="日付" value={shiftDate} onChange={(newVal) => setShiftDate(newVal)} />
                    </Grid>
                    <Grid item>
                      <TimePicker label="開始時刻(24h)" ampm={false} value={startTime} onChange={(newVal) => setStartTime(newVal)} />
                    </Grid>
                    <Grid item>
                      <TimePicker label="終了時刻(24h)" ampm={false} value={endTime} onChange={(newVal) => setEndTime(newVal)} />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="シフトの詳細" multiline rows={2} value={shiftDetail} onChange={(e) => setShiftDetail(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField label="定員" type="number" value={shiftCapacity} onChange={(e) => setShiftCapacity(parseInt(e.target.value, 10) || 1)} fullWidth />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox checked={shiftTentative} onChange={(e) => setShiftTentative(e.target.checked)} />}
                      label="仮予約オプション"
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" onClick={createShift} sx={{ mt: 2 }}>シフト追加</Button>
              </>
            ) : (
              <Typography variant="body2" sx={{ mt: 2 }}>左の一覧から施設を選択してください。</Typography>
            )}
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">自動生成シフト登録</Typography>
            {selectedStaff ? (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <DatePicker label="繰り返し開始日" value={repeatStartDate} onChange={(newVal) => setRepeatStartDate(newVal)} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePicker label="繰り返し終了日" value={repeatEndDate} onChange={(newVal) => setRepeatEndDate(newVal)} fullWidth />
                    </Grid>
                  </Grid>
                  <FormGroup row sx={{ mt: 2, ml: 1 }}>
                    <FormControlLabel
                      control={<Checkbox checked={daysOfWeek.sun} onChange={() => handleToggleDay('sun')} />}
                      label="日"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={daysOfWeek.mon} onChange={() => handleToggleDay('mon')} />}
                      label="月"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={daysOfWeek.tue} onChange={() => handleToggleDay('tue')} />}
                      label="火"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={daysOfWeek.wed} onChange={() => handleToggleDay('wed')} />}
                      label="水"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={daysOfWeek.thu} onChange={() => handleToggleDay('thu')} />}
                      label="木"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={daysOfWeek.fri} onChange={() => handleToggleDay('fri')} />}
                      label="金"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={daysOfWeek.sat} onChange={() => handleToggleDay('sat')} />}
                      label="土"
                    />
                  </FormGroup>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6} sm={3}>
                      <TimePicker label="シフト開始(24h)" ampm={false} value={autoStartTime} onChange={(newVal) => setAutoStartTime(newVal)} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TimePicker label="シフト終了(24h)" ampm={false} value={autoEndTime} onChange={(newVal) => setAutoEndTime(newVal)} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TimePicker label="休憩開始(24h)" ampm={false} value={breakStartTime} onChange={(newVal) => setBreakStartTime(newVal)} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TimePicker label="休憩終了(24h)" ampm={false} value={breakEndTime} onChange={(newVal) => setBreakEndTime(newVal)} />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6} sm={3}>
                    <TextField label="インターバル(分)" type="number" value={autoInterval} onChange={(e) => setAutoInterval(parseInt(e.target.value, 10) || 60)} fullWidth />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField label="定員" type="number" value={autoShiftCapacity} onChange={(e) => setAutoShiftCapacity(parseInt(e.target.value, 10) || 1)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField label="シフトの詳細" multiline rows={2} value={autoShiftDetail} onChange={(e) => setAutoShiftDetail(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={2} display="flex" alignItems="center">
                    <FormControlLabel
                      control={<Checkbox checked={autoShiftTentative} onChange={(e) => setAutoShiftTentative(e.target.checked)} />}
                      label="仮予約"
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" onClick={handleCreateAutoShifts} sx={{ mt: 2 }}>自動生成</Button>
              </>
            ) : (
              <Typography variant="body2" sx={{ mt: 2 }}>左の一覧から施設を選択してください。</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      {selectedStaff && (
        <Paper sx={{ p: 2, mt: 2 }}>
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
                  <TableCell>仮予約</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shiftList.sort((a, b) => (a.startTime > b.startTime ? 1 : -1)).map((shift) => (
                  <TableRow key={shift.id}>
                    <TableCell>{shift.date}</TableCell>
                    <TableCell>{dayjs(shift.startTime).format('HH:mm')}</TableCell>
                    <TableCell>{dayjs(shift.endTime).format('HH:mm')}</TableCell>
                    <TableCell>{shift.details || ''}</TableCell>
                    <TableCell>{selectedStaff?.description || ''}</TableCell>
                    <TableCell>
                      {shift.photoURL ? (
                        <img src={shift.photoURL} alt="シフト写真" style={{ width: '80px', objectFit: 'cover' }} />
                      ) : (
                        'なし'
                      )}
                    </TableCell>
                    <TableCell>{shift.capacity ?? ''}</TableCell>
                    <TableCell>{shift.tentative ? '仮予約' : '通常'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        <MenuItem onClick={handleToggleHideStaff}>{contextStaff?.hidden ? '表示にする' : '非表示にする'}</MenuItem>
        <MenuItem onClick={handleDeleteStaff}>削除</MenuItem>
      </Menu>
      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6" gutterBottom>全施設・スタッフの予約状況カレンダー</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          イベントをクリックすると、予約の確認・承認・削除などが可能です。
        </Typography>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2">カレンダーに表示する施設</Typography>
          <FormGroup row>
            {staffList.map((staff) => (
              <FormControlLabel
                key={staff.id}
                control={<Checkbox checked={selectedStaffIdsForCalendar.includes(staff.id)} onChange={() => handleToggleStaffForCalendar(staff.id)} />}
                label={staff.name}
              />
            ))}
          </FormGroup>
        </Paper>
        <div style={{ height: '700px', marginTop: '20px' }}>
          <Calendar
            localizer={localizer}
            culture="ja"
            events={filteredCalendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            views={['month', 'week', 'day']}
            defaultView={Views.MONTH}
            onSelectEvent={handleSelectEvent}
            components={{ toolbar: CustomToolbar }}
            eventPropGetter={eventPropGetter}
          />
        </div>
      </Paper>
    </Container>
  );
}
