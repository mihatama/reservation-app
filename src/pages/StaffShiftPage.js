import React, { useEffect, useState, useMemo } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Staff, Shift, Reservation, Questionnaire } from '../models';
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
  Container,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

const locales = { ja };
const localizer = dateFnsLocalizer({
  format: (date, pattern, options) =>
    format(date, pattern, { locale: ja, ...options }),
  parse: (value, pattern, baseDate, options) =>
    parse(value, pattern, baseDate, { locale: ja, ...options }),
  startOfWeek: (date, options) => startOfWeek(date, { locale: ja, ...options }),
  getDay,
  locales,
});

function CustomToolbar(props) {
  const { label, onNavigate, onView } = props;
  const goToPrev = () => onNavigate('PREV');
  const goToNext = () => onNavigate('NEXT');
  const goToToday = () => onNavigate('TODAY');

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <div>
        <Button onClick={goToPrev} variant="outlined" sx={{ mr: 1 }}>◀</Button>
        <Button onClick={goToToday} variant="contained" color="primary" sx={{ mr: 1 }}>今日</Button>
        <Button onClick={goToNext} variant="outlined">▶</Button>
      </div>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{label}</Typography>
      <div>
        <Button onClick={() => onView('month')} variant="outlined" sx={{ mr: 1 }}>月</Button>
        <Button onClick={() => onView('week')} variant="outlined" sx={{ mr: 1 }}>週</Button>
        <Button onClick={() => onView('day')} variant="outlined">日</Button>
      </div>
    </div>
  );
}

const COLORS = [
  '#E53E3E', '#DD6B20', '#D69E2E', '#38A169', '#3182CE',
  '#805AD5', '#718096', '#4299E1', '#ED64A6', '#ECC94B',
];

/**
 * 休憩時間を除外して時間スロットを作成する補助関数
 * @param {object} baseStart      - シフト開始時刻 (dayjsオブジェクト)
 * @param {object} baseEnd        - シフト終了時刻 (dayjsオブジェクト)
 * @param {object} bStart         - 休憩開始時刻 (dayjsオブジェクト or null)
 * @param {object} bEnd           - 休憩終了時刻 (dayjsオブジェクト or null)
 * @param {number} interval       - シフトの分割間隔 (分)
 * @returns {Array} [[slotStart, slotEnd], [slotStart, slotEnd], ...] dayjsの配列
 */
function getTimeSlotsExcludingBreak(baseStart, baseEnd, bStart, bEnd, interval) {
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
}

export default function StaffShiftPage() {
  // 予約施設(スタッフ)関連
  const [staffName, setStaffName] = useState('');
  const [staffDescription, setStaffDescription] = useState('');
  const [staffPhotoFile, setStaffPhotoFile] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // 単発シフト登録用
  const [shiftDate, setShiftDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [shiftDetail, setShiftDetail] = useState('');
  const [shiftCapacity, setShiftCapacity] = useState(1);
  const [shiftTentative, setShiftTentative] = useState(false);

  // 右クリックメニュー
  const [contextMenu, setContextMenu] = useState(null);
  const [contextStaff, setContextStaff] = useState(null);

  // 自動生成シフト登録用
  const [autoInterval, setAutoInterval] = useState(60);
  const [breakStartTime, setBreakStartTime] = useState(null);
  const [breakEndTime, setBreakEndTime] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState({
    sun: false, mon: false, tue: false,
    wed: false, thu: false, fri: false, sat: false,
  });
  const [repeatStartDate, setRepeatStartDate] = useState(null);
  const [repeatEndDate, setRepeatEndDate] = useState(null);
  const [autoStartTime, setAutoStartTime] = useState(null);
  const [autoEndTime, setAutoEndTime] = useState(null);
  const [autoShiftDetail, setAutoShiftDetail] = useState('');
  const [autoShiftCapacity, setAutoShiftCapacity] = useState(1);
  const [autoShiftTentative, setAutoShiftTentative] = useState(false);

  // シフト・予約・問診票
  const [allShifts, setAllShifts] = useState([]);
  const [allReservations, setAllReservations] = useState([]);
  const [allQuestionnaires, setAllQuestionnaires] = useState([]);

  // カレンダー表示用
  const [selectedStaffIdsForCalendar, setSelectedStaffIdsForCalendar] = useState([]);

  // 予約確認ダイアログ
  const [openReservationDialog, setOpenReservationDialog] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);

  // 問診票確認用
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const [selectedQuestionnaireReservation, setSelectedQuestionnaireReservation] = useState(null);
  const [selectedQuestionnaireStaff, setSelectedQuestionnaireStaff] = useState(null);

  // ---- 各種データの購読を1つのuseEffectに集約 ----
  useEffect(() => {
    // スタッフ一覧
    const staffSub = DataStore.observeQuery(Staff).subscribe(async ({ items }) => {
      const staffWithPhotoUrls = await Promise.all(
        items.map(async (staff) => {
          if (staff.photo) {
            try {
              const result = await getUrl({ key: staff.photo, level: 'public' });
              // Storage.get の戻り値が文字列の場合とオブジェクトの場合を考慮
              const photoURL = typeof result === 'string' ? result : result.url || '';
              return { ...staff, photoURL };
            } catch {
              return { ...staff, photoURL: '' };
            }
          }
          return { ...staff, photoURL: '' };
        })
      );
      setStaffList(staffWithPhotoUrls);
    });

    // シフト
    const shiftSub = DataStore.observeQuery(Shift).subscribe(({ items }) => {
      setAllShifts(items);
    });

    // 予約
    const resSub = DataStore.observeQuery(Reservation).subscribe(({ items }) => {
      setAllReservations(items);
    });

    // 問診票
    const qSub = DataStore.observeQuery(Questionnaire).subscribe(({ items }) => {
      setAllQuestionnaires(items);
    });

    return () => {
      staffSub.unsubscribe();
      shiftSub.unsubscribe();
      resSub.unsubscribe();
      qSub.unsubscribe();
    };
  }, []);
  // ------------------------------------------------------

  // 予約施設(スタッフ)登録
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
      } catch {
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
    } catch {
      alert('施設登録に失敗しました。');
    }
  };

  // 単発シフト登録
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
    } catch {
      alert('シフト登録に失敗しました。');
    }
  };

  // 自動シフト作成
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

    // 曜日配列(日:0, 月:1, ... 土:6)
    const dayArray = [
      daysOfWeek.sun,
      daysOfWeek.mon,
      daysOfWeek.tue,
      daysOfWeek.wed,
      daysOfWeek.thu,
      daysOfWeek.fri,
      daysOfWeek.sat,
    ];
    let current = repeatStartDate.clone();
    const tasks = [];

    while (current.isSameOrBefore(repeatEndDate, 'day')) {
      // 曜日チェック
      if (dayArray[current.day()]) {
        const dateStr = current.format('YYYY-MM-DD');
        const staffID_dateValue = `${selectedStaff.id}_${dateStr}`;
        const baseStart = autoStartTime.clone()
          .year(current.year()).month(current.month()).date(current.date());
        const baseEnd = autoEndTime.clone()
          .year(current.year()).month(current.month()).date(current.date());

        // 休憩開始/終了を dayjs で当日合わせ
        const bStart = breakStartTime
          ? breakStartTime.clone().year(current.year()).month(current.month()).date(current.date())
          : null;
        const bEnd = breakEndTime
          ? breakEndTime.clone().year(current.year()).month(current.month()).date(current.date())
          : null;

        // スロット生成
        const timeSlots = getTimeSlotsExcludingBreak(baseStart, baseEnd, bStart, bEnd, autoInterval);
        for (const [slotStart, slotEnd] of timeSlots) {
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
    } catch {
      alert('自動生成に失敗しました。');
    }
  };

  // 右クリックメニュー操作
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

  // カレンダーイベント作成
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
        const nameList = shiftReservations.map((r) => r.clientName).join(', ');
        title += hasPending
          ? ` (仮予約中: ${nameList})`
          : ` (予約済み: ${nameList})`;
      }
      return {
        id: shift.id,
        staffID: shift.staffID,
        start: shiftStart,
        end: shiftEnd,
        reserved: isReserved,
        title,
        shiftTentative: shift.tentative,
        shiftReservations,
      };
    });
  }, [allShifts, allReservations]);

  // スタッフ別の色割り当て
  const staffColorMap = useMemo(() => {
    const map = {};
    staffList.forEach((staff, index) => {
      map[staff.id] = COLORS[index % COLORS.length];
    });
    return map;
  }, [staffList]);

  // イベントの色設定
  const eventPropGetter = (event) => {
    const isConfirmed = event.shiftReservations.some(
      (r) => r.status === 'CONFIRMED'
    );
    const isPending = event.shiftReservations.some(
      (r) => r.status === 'PENDING'
    );
    const isTentative = event.shiftTentative;

    let backgroundColor = staffColorMap[event.staffID] || '#999';
    if (isConfirmed) {
      backgroundColor = '#E53E3E'; // 予約確定済みは赤
    } else if (isPending) {
      backgroundColor = '#38A169'; // 仮予約中は緑
    } else if (isTentative) {
      backgroundColor = '#D69E2E'; // シフト自体が仮
    }

    return {
      style: {
        backgroundColor,
        color: '#fff',
      },
    };
  };

  // カレンダーに表示するスタッフフィルタ
  const filteredCalendarEvents = useMemo(() => {
    if (selectedStaffIdsForCalendar.length === 0) return [];
    return calendarEvents.filter((ev) =>
      selectedStaffIdsForCalendar.includes(ev.staffID)
    );
  }, [calendarEvents, selectedStaffIdsForCalendar]);

  // イベント(シフト)クリック
  const handleSelectEvent = (event) => {
    const shiftClicked = allShifts.find((s) => s.id === event.id);
    if (!shiftClicked) {
      alert('シフトが見つかりません');
      return;
    }
    setSelectedShift(shiftClicked);
    setOpenReservationDialog(true);
  };

  // 予約ステータス変更/予約削除/シフト削除
  const handleApproveReservation = async (reservationId) => {
    const reservation = await DataStore.query(Reservation, reservationId);
    if (reservation && reservation.status === 'PENDING') {
      await DataStore.save(
        Reservation.copyOf(reservation, (updated) => {
          updated.status = 'CONFIRMED';
        })
      );
    }
  };
  const handleDeleteReservation = async (reservationId) => {
    const reservation = await DataStore.query(Reservation, reservationId);
    if (reservation) {
      await DataStore.delete(reservation);
    }
  };
  const handleDeleteShift = async (shiftId) => {
    const shift = await DataStore.query(Shift, shiftId);
    if (shift) {
      const relatedReservations = await DataStore.query(Reservation, (r) =>
        r.and((r) => [
          r.staffID.eq(shift.staffID),
          r.date.eq(shift.date),
          r.startTime.eq(shift.startTime),
          r.endTime.eq(shift.endTime),
        ])
      );
      for (const res of relatedReservations) {
        await DataStore.delete(res);
      }
      await DataStore.delete(shift);
      alert('シフト枠を削除しました。');
    }
    setOpenReservationDialog(false);
  };

  // カレンダー表示ON/OFF
  const handleToggleStaffForCalendar = (staffId) => {
    setSelectedStaffIdsForCalendar((prev) =>
      prev.includes(staffId)
        ? prev.filter((id) => id !== staffId)
        : [...prev, staffId]
    );
  };

  // 選択シフトに紐づく予約を絞り込む（ダイアログ表示用）
  const shiftReservationsForSelectedShift = useMemo(() => {
    if (!selectedShift) return [];
    return allReservations.filter(
      (r) =>
        r.staffID === selectedShift.staffID &&
        r.date === selectedShift.date &&
        r.startTime === selectedShift.startTime &&
        r.endTime === selectedShift.endTime
    );
  }, [selectedShift, allReservations]);

  // 問診票ダイアログを開く
  const handleOpenQuestionnaireDialog = async (questionnaire) => {
    if (!questionnaire) return;
    // 該当する予約を取得
    const reservation = await DataStore.query(Reservation, questionnaire.reservationID);
    let staff = null;
    if (reservation?.staffID) {
      staff = await DataStore.query(Staff, reservation.staffID);
    }
    setSelectedQuestionnaire(questionnaire);
    setSelectedQuestionnaireReservation(reservation);
    setSelectedQuestionnaireStaff(staff);
  };

  // 問診票ダイアログを閉じる
  const handleCloseQuestionnaireDialog = () => {
    setSelectedQuestionnaire(null);
    setSelectedQuestionnaireReservation(null);
    setSelectedQuestionnaireStaff(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>予約登録</Typography>
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
                    secondary={`${staff.photoURL ? '写真あり' : '写真なし'}${
                      staff.hidden ? ' / 非表示' : ' / 表示中'
                    }`}
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
                  <Grid item xs={6} sm={3}>
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
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={shiftTentative}
                          onChange={(e) => setShiftTentative(e.target.checked)}
                        />
                      }
                      label="仮予約オプション"
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" onClick={createShift} sx={{ mt: 2 }}>
                  シフト追加
                </Button>
              </>
            ) : (
              <Typography variant="body2" sx={{ mt: 2 }}>
                左の一覧から施設を選択してください。
              </Typography>
            )}
          </Paper>

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
                          onChange={() =>
                            setDaysOfWeek((prev) => ({ ...prev, sun: !prev.sun }))
                          }
                        />
                      }
                      label="日"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.mon}
                          onChange={() =>
                            setDaysOfWeek((prev) => ({ ...prev, mon: !prev.mon }))
                          }
                        />
                      }
                      label="月"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.tue}
                          onChange={() =>
                            setDaysOfWeek((prev) => ({ ...prev, tue: !prev.tue }))
                          }
                        />
                      }
                      label="火"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.wed}
                          onChange={() =>
                            setDaysOfWeek((prev) => ({ ...prev, wed: !prev.wed }))
                          }
                        />
                      }
                      label="水"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.thu}
                          onChange={() =>
                            setDaysOfWeek((prev) => ({ ...prev, thu: !prev.thu }))
                          }
                        />
                      }
                      label="木"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.fri}
                          onChange={() =>
                            setDaysOfWeek((prev) => ({ ...prev, fri: !prev.fri }))
                          }
                        />
                      }
                      label="金"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOfWeek.sat}
                          onChange={() =>
                            setDaysOfWeek((prev) => ({ ...prev, sat: !prev.sat }))
                          }
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
                      onChange={(e) => setAutoInterval(parseInt(e.target.value, 10) || 60)}
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
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="シフトの詳細"
                      multiline
                      rows={2}
                      value={autoShiftDetail}
                      onChange={(e) => setAutoShiftDetail(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} display="flex" alignItems="center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={autoShiftTentative}
                          onChange={(e) => setAutoShiftTentative(e.target.checked)}
                        />
                      }
                      label="仮予約"
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" onClick={handleCreateAutoShifts} sx={{ mt: 2 }}>
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

      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          全施設・スタッフの予約状況カレンダー
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          イベントをクリックすると、予約の確認・承認・削除などが可能です。
        </Typography>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2">カレンダーに表示する施設</Typography>
          <FormGroup row>
            {staffList.map((staff) => (
              <FormControlLabel
                key={staff.id}
                control={
                  <Checkbox
                    checked={selectedStaffIdsForCalendar.includes(staff.id)}
                    onChange={() => handleToggleStaffForCalendar(staff.id)}
                  />
                }
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

      {/* 予約一覧ダイアログ */}
      <Dialog
        open={openReservationDialog}
        onClose={() => setOpenReservationDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>予約情報の確認</DialogTitle>
        <DialogContent dividers>
          {selectedShift && (
            <>
              <Typography variant="body1" gutterBottom>
                <strong>対象日付:</strong> {selectedShift.date} <br />
                <strong>時間:</strong>{' '}
                {dayjs(selectedShift.startTime).format('HH:mm')} -{' '}
                {dayjs(selectedShift.endTime).format('HH:mm')} <br />
                <strong>仮予約オプション:</strong>{' '}
                {selectedShift.tentative ? 'あり(仮予約シフト)' : 'なし'}
              </Typography>

              {shiftReservationsForSelectedShift.length === 0 ? (
                <Typography>まだ予約はありません。</Typography>
              ) : (
                shiftReservationsForSelectedShift.map((res) => {
                  // 該当する問診票を検索
                  const questionnaire = allQuestionnaires.find(
                    (q) => q.reservationID === res.id
                  );
                  return (
                    <Paper key={res.id} sx={{ p: 2, mb: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>予約者名:</strong> {res.clientName}
                      </Typography>
                      <Typography>
                        <strong>ステータス:</strong> {res.status}
                      </Typography>
                      <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                        <strong>問診票:&nbsp;</strong>
                        {questionnaire ? (
                          <Button
                            variant="text"
                            onClick={() => handleOpenQuestionnaireDialog(questionnaire)}
                            sx={{ p: 0, minWidth: 'auto' }}
                          >
                            記入済み (クリックで表示)
                          </Button>
                        ) : (
                          '未入力'
                        )}
                      </Typography>
                      <div style={{ marginTop: '8px' }}>
                        {selectedShift?.tentative && res.status === 'PENDING' && (
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() => handleApproveReservation(res.id)}
                          >
                            承認
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDeleteReservation(res.id)}
                        >
                          削除
                        </Button>
                      </div>
                    </Paper>
                  );
                })
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          {selectedShift && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteShift(selectedShift.id)}
            >
              枠の削除
            </Button>
          )}
          <Button
            onClick={() => setOpenReservationDialog(false)}
            variant="contained"
          >
            閉じる
          </Button>
        </DialogActions>
      </Dialog>

      {/* 問診票詳細ダイアログ */}
      <Dialog
        open={Boolean(selectedQuestionnaire)}
        onClose={handleCloseQuestionnaireDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          問診票詳細
          <IconButton
            aria-label="close"
            onClick={handleCloseQuestionnaireDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {selectedQuestionnaire && (
          <DialogContent dividers>
            {/* 予約情報 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>予約情報</Typography>
            <Typography>予約日: {selectedQuestionnaireReservation?.date || '-'}</Typography>
            <Typography>
              時間:{' '}
              {selectedQuestionnaireReservation
                ? `${dayjs(selectedQuestionnaireReservation.startTime).format('HH:mm')} - ${dayjs(selectedQuestionnaireReservation.endTime).format('HH:mm')}`
                : '-'
              }
            </Typography>
            <Typography>予約者名: {selectedQuestionnaireReservation?.clientName || '-'}</Typography>
            <Typography>ステータス: {selectedQuestionnaireReservation?.status || '-'}</Typography>

            {/* 受診場所 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>受診場所</Typography>
            <Typography>{selectedQuestionnaire.placeOfVisit || '-'}</Typography>

            {/* 施設 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>施設</Typography>
            <Typography>施設名: {selectedQuestionnaireStaff?.name || '-'}</Typography>
            <Typography>施設の詳細: {selectedQuestionnaireStaff?.description || '-'}</Typography>

            {/* ママ情報 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>ママ情報</Typography>
            <Typography>
              {`名前(漢字): ${selectedQuestionnaire.mamaLastName || ''} ${selectedQuestionnaire.mamaFirstName || ''}`}
            </Typography>
            <Typography>
              {`名前(フリガナ): ${selectedQuestionnaire.mamaFuriganaLastName || ''} ${selectedQuestionnaire.mamaFuriganaFirstName || ''}`}
            </Typography>
            <Typography>
              生年月日:
              {selectedQuestionnaire.mamaBirthYear && selectedQuestionnaire.mamaBirthMonth && selectedQuestionnaire.mamaBirthDay
                ? `${selectedQuestionnaire.mamaBirthYear}年${selectedQuestionnaire.mamaBirthMonth}月${selectedQuestionnaire.mamaBirthDay}日`
                : '-'
              }
            </Typography>

            {/* お子様情報 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>お子様情報</Typography>
            <Typography>
              {`名前(漢字): ${selectedQuestionnaire.childLastName || ''} ${selectedQuestionnaire.childFirstName || ''}`}
            </Typography>
            <Typography>
              {`名前(フリガナ): ${selectedQuestionnaire.childFuriganaLastName || ''} ${selectedQuestionnaire.childFuriganaFirstName || ''}`}
            </Typography>
            <Typography>
              生年月日:
              {selectedQuestionnaire.childBirthYear && selectedQuestionnaire.childBirthMonth && selectedQuestionnaire.childBirthDay
                ? `${selectedQuestionnaire.childBirthYear}年${selectedQuestionnaire.childBirthMonth}月${selectedQuestionnaire.childBirthDay}日`
                : '-'
              }
            </Typography>
            <Typography>第何子: {selectedQuestionnaire.childOrder || '-'}</Typography>
            <Typography>性別: {selectedQuestionnaire.childSex || '-'}</Typography>

            {/* お仕事・ご住所 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>お仕事・ご住所</Typography>
            <Typography>お仕事: {selectedQuestionnaire.occupation || '-'}</Typography>
            <Typography>産後状況: {selectedQuestionnaire.postpartumStatus || '-'}</Typography>
            <Typography>
              自宅住所: {selectedQuestionnaire.homeAddress || '-'} (郵便番号: {selectedQuestionnaire.homePostalCode || '-'})
            </Typography>
            <Typography>
              里帰り先住所: {selectedQuestionnaire.rikaeriAddress || '-'} (郵便番号: {selectedQuestionnaire.rikaeriPostalCode || '-'})
            </Typography>

            {/* 出産の状況 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>出産の状況</Typography>
            <Typography>出産方法: {selectedQuestionnaire.deliveryMethod || '-'}</Typography>
            <Typography>出産週: {selectedQuestionnaire.deliveryWeek || '-'}</Typography>
            <Typography>出生体重: {selectedQuestionnaire.birthWeight || '-'}</Typography>
            <Typography>退院体重: {selectedQuestionnaire.dischargeWeight || '-'}</Typography>
            <Typography>退院日: {selectedQuestionnaire.dischargeDate || '-'}</Typography>
            <Typography>
              測定1: {selectedQuestionnaire.measurement1Date || '-'}, {selectedQuestionnaire.measurement1 || '-'}
            </Typography>
            <Typography>
              測定2: {selectedQuestionnaire.measurement2Date || '-'}, {selectedQuestionnaire.measurement2 || '-'}
            </Typography>

            {/* 妊娠時・医療歴 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>妊娠時・医療歴</Typography>
            <Typography>妊娠時の状況: {selectedQuestionnaire.pregnancyCondition || '-'}</Typography>
            <Typography>病歴: {selectedQuestionnaire.pastMedicalHistory || '-'}</Typography>
            <Typography>内服薬: {selectedQuestionnaire.medication || '-'}</Typography>
            <Typography>感染症既往: {selectedQuestionnaire.infectionHistory || '-'}</Typography>
            <Typography>家族相関: {selectedQuestionnaire.familyHistory || '-'}</Typography>

            {/* ご来院理由 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>ご来院理由</Typography>
            <Typography>{selectedQuestionnaire.visitReason || '-'}</Typography>

            {/* その他 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>その他</Typography>
            <Typography>{selectedQuestionnaire.additionalNotes || '-'}</Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCloseQuestionnaireDialog} variant="contained" color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
