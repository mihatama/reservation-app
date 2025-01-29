import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Staff, Shift } from '../models';

// ★ Storage 関連は `@aws-amplify/storage` から個別にインポート
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
  FormGroup
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
// ▼ 追加プラグインのインポート
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

export default function StaffShiftPage() {
  const [staffName, setStaffName] = useState('');
  // 追加: 予約施設の詳細情報を入力するための state
  const [staffDescription, setStaffDescription] = useState('');
  const [staffPhotoFile, setStaffPhotoFile] = useState(null);

  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // 単発シフト作成用
  const [shiftDate, setShiftDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [shiftDetail, setShiftDetail] = useState('');

  // シフト一覧
  const [shiftList, setShiftList] = useState([]);

  // 右クリックメニュー制御用
  const [contextMenu, setContextMenu] = useState(null);
  const [contextStaff, setContextStaff] = useState(null);

  // --------------------------------------------------------
  // 追加：自動分割機能・曜日指定・期限設定用の State
  // --------------------------------------------------------
  // 自動分割インターバル（分）
  const [autoInterval, setAutoInterval] = useState(60); // 60分単位など
  // 休憩時間（開始・終了）
  const [breakStartTime, setBreakStartTime] = useState(null);
  const [breakEndTime, setBreakEndTime] = useState(null);

  // 曜日チェックボックス
  // [日, 月, 火, 水, 木, 金, 土] の順で管理する例
  const [daysOfWeek, setDaysOfWeek] = useState({
    sun: false,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
  });

  // 繰り返し作成の開始日・終了日
  const [repeatStartDate, setRepeatStartDate] = useState(null);
  const [repeatEndDate, setRepeatEndDate] = useState(null);

  // 自動分割時の基本開始・終了時刻
  const [autoStartTime, setAutoStartTime] = useState(null);
  const [autoEndTime, setAutoEndTime] = useState(null);
  // 自動分割時のシフト詳細
  const [autoShiftDetail, setAutoShiftDetail] = useState('');

  // ----------------------------------------
  // 予約一覧(Staff一覧)を購読
  // ----------------------------------------
  useEffect(() => {
    const subscription = DataStore.observeQuery(Staff).subscribe(async ({ items }) => {
      const staffWithPhotoUrls = await Promise.all(
        items.map(async (staff) => {
          if (staff.photo) {
            try {
              // getUrl でダウンロード用URLを取得
              // 戻り値は { url: URLオブジェクト } のため、url.href を使う
              const { url } = await getUrl({
                key: staff.photo,
                level: 'public'
              });
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

  // ----------------------------------------
  // 選択した予約情報(Staff) のシフト一覧を購読
  // ----------------------------------------
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
              const { url } = await getUrl({
                key: shift.photo,
                level: 'public'
              });
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

  // ----------------------------------------
  // 予約情報を追加（Staff作成）
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

        // File → ArrayBuffer に変換
        const arrayBuffer = await staffPhotoFile.arrayBuffer();

        console.log('=== Debug: Uploading staff photo ===');
        console.log('key:', fileName);
        console.log('contentType:', staffPhotoFile.type);
        console.log('fileSize:', staffPhotoFile.size);
        console.log('arrayBuffer byteLength:', arrayBuffer.byteLength);

        const result = await uploadData({
          key: fileName,
          data: staffPhotoFile
        });
        console.log('Photo upload success', result);

        photoKey = fileName;
      } catch (err) {
        console.error('予約写真のアップロードエラー:', err);
        alert('予約写真のアップロードに失敗しました。');
        return;
      }
    }

    try {
      // ★ descriptionにstaffDescriptionを保存
      const savedStaff = await DataStore.save(
        new Staff({
          name: staffName,
          photo: photoKey,
          hidden: false,
          description: staffDescription, // 予約施設の詳細情報をセット
        })
      );
      setSelectedStaff(savedStaff);

      // 入力リセット
      setStaffName('');
      setStaffDescription('');
      setStaffPhotoFile(null);
      alert('予約情報を追加しました。');
    } catch (err) {
      console.error('DataStore save error:', err);
      alert('予約情報の登録に失敗しました');
    }
  };

  // ----------------------------------------
  // シフトを追加（単発）
  // ----------------------------------------
  const createShift = async () => {
    if (!selectedStaff) {
      alert('予約情報を選択してください');
      return;
    }
    if (!shiftDate || !startTime || !endTime) {
      alert('日付と時刻を入力してください');
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
    const endISO = end.toISOString();

    const staffID_dateValue = `${selectedStaff.id}_${dateStr}`;
    const shiftPhotoKey = selectedStaff.photo || '';

    try {
      await DataStore.save(
        new Shift({
          staffID: selectedStaff.id,
          staffID_date: staffID_dateValue,
          date: dateStr,
          startTime: startISO,
          endTime: endISO,
          photo: shiftPhotoKey,
          details: shiftDetail,
        })
      );
      alert('シフトを追加しました。');
    } catch (err) {
      console.error('シフト追加エラー:', err);
      alert('シフト登録に失敗しました。');
      return;
    }

    setShiftDate(null);
    setStartTime(null);
    setEndTime(null);
    setShiftDetail('');
  };

  // --------------------------------------------------------
  // 自動分割 + 曜日指定 + 繰り返し 作成用ロジック
  // --------------------------------------------------------
  // 指定された開始・終了時刻・インターバルをもとに、休憩時間を除外したシフト枠を配列で返す
  const getTimeSlotsExcludingBreak = (baseDate, baseStart, baseEnd, interval, bStart, bEnd) => {
    /*
      baseDate : dayjsオブジェクト（当該日付）
      baseStart: dayjsオブジェクト（開始時刻）
      baseEnd  : dayjsオブジェクト（終了時刻）
      interval : number (分単位)
      bStart, bEnd: 休憩開始/終了の dayjsオブジェクト（nullの場合は休憩なしとみなす）
    */

    // まず、baseStart ~ baseEnd を2つの稼働区間に分ける（休憩を挟む場合）
    // 休憩あり： [baseStart, bStart] と [bEnd, baseEnd]
    // 休憩なし： [baseStart, baseEnd]
    let ranges = [];

    if (bStart && bEnd && bEnd.isAfter(bStart)) {
      // 休憩が有効な場合
      const firstRangeEnd = bStart.isAfter(baseStart) ? bStart : baseStart;
      const secondRangeStart = bEnd.isBefore(baseEnd) ? bEnd : baseEnd;

      // 1つ目の稼働範囲（開始～休憩開始）: もしfirstRangeEndがbaseStartより後なら有効
      if (firstRangeEnd.isAfter(baseStart)) {
        ranges.push([baseStart, firstRangeEnd]);
      }
      // 2つ目の稼働範囲（休憩終了～終了）: もしsecondRangeStartがbEndより後なら有効
      if (baseEnd.isAfter(secondRangeStart)) {
        ranges.push([secondRangeStart, baseEnd]);
      }
    } else {
      // 休憩がないか、無効な場合は全体を1つのレンジ
      ranges.push([baseStart, baseEnd]);
    }

    // 各レンジについて interval 分ごとにスロットを作成
    const timeSlots = [];
    ranges.forEach(([rangeStart, rangeEnd]) => {
      let slotStart = rangeStart.clone();
      while (slotStart.isBefore(rangeEnd)) {
        const slotEnd = slotStart.clone().add(interval, 'minute');
        if (slotEnd.isAfter(rangeEnd)) {
          break; // インターバルがオーバーしたら終了
        }
        timeSlots.push([slotStart, slotEnd]);
        slotStart = slotEnd;
      }
    });

    return timeSlots;
  };

  // 曜日チェックがオンかどうか判定
  const isDaySelected = (dateObj) => {
    // Sunday=0, Monday=1, ... で取り出す
    const dayIndex = dateObj.day(); // 0(日) ~ 6(土)
    switch (dayIndex) {
      case 0: return daysOfWeek.sun;
      case 1: return daysOfWeek.mon;
      case 2: return daysOfWeek.tue;
      case 3: return daysOfWeek.wed;
      case 4: return daysOfWeek.thu;
      case 5: return daysOfWeek.fri;
      case 6: return daysOfWeek.sat;
      default:
        return false;
    }
  };

  // 「自動生成」ボタン押下時
  const handleCreateAutoShifts = async () => {
    if (!selectedStaff) {
      alert('予約情報を選択してください。');
      return;
    }
    if (!repeatStartDate || !repeatEndDate) {
      alert('繰り返しの開始日と終了日を入力してください。');
      return;
    }
    if (!autoStartTime || !autoEndTime) {
      alert('シフトの基本開始時刻・終了時刻を設定してください。');
      return;
    }
    if (autoEndTime.isBefore(autoStartTime)) {
      alert('シフト終了時刻は開始時刻より後にしてください。');
      return;
    }
    if (repeatEndDate.isBefore(repeatStartDate)) {
      alert('終了日は開始日より後にしてください。');
      return;
    }

    // シフトをまとめて作成
    // startDateからendDateまで1日ずつ進めて、チェックされている曜日なら自動分割処理
    const shiftPhotoKey = selectedStaff.photo || '';
    let currentDate = repeatStartDate.clone();

    const confirmations = [];

    // ▼ プラグインを使わずに day 単位の比較をする場合でもOK
    //   while (currentDate.diff(repeatEndDate, 'day') <= 0) {
    //     ...
    //   }
    //
    // 今回は isSameOrBefore プラグインを使って記述:
    while (currentDate.isSameOrBefore(repeatEndDate, 'day')) {
      // 曜日がチェックされていたら処理
      if (isDaySelected(currentDate)) {
        // 当該日の開始・終了
        const dayStart = autoStartTime
          .clone()
          .year(currentDate.year())
          .month(currentDate.month())
          .date(currentDate.date());

        const dayEnd = autoEndTime
          .clone()
          .year(currentDate.year())
          .month(currentDate.month())
          .date(currentDate.date());

        // 休憩開始・休憩終了も同日の時刻として調整
        let bStart = null;
        let bEnd = null;
        if (breakStartTime && breakEndTime && breakEndTime.isAfter(breakStartTime)) {
          bStart = breakStartTime
            .clone()
            .year(currentDate.year())
            .month(currentDate.month())
            .date(currentDate.date());
          bEnd = breakEndTime
            .clone()
            .year(currentDate.year())
            .month(currentDate.month())
            .date(currentDate.date());
        }

        // インターバルごとに時間帯を分割（休憩除外）
        const slots = getTimeSlotsExcludingBreak(
          currentDate,
          dayStart,
          dayEnd,
          autoInterval,
          bStart,
          bEnd
        );

        // それぞれのスロットに対してShift作成
        const dateStr = currentDate.format('YYYY-MM-DD');
        const staffID_dateValue = `${selectedStaff.id}_${dateStr}`;

        for (const [s, e] of slots) {
          const startISO = s.toISOString();
          const endISO = e.toISOString();

          // ここで DataStore.save をまとめて実行する（順次処理）
          const createPromise = DataStore.save(
            new Shift({
              staffID: selectedStaff.id,
              staffID_date: staffID_dateValue,
              date: dateStr,
              startTime: startISO,
              endTime: endISO,
              photo: shiftPhotoKey,
              details: autoShiftDetail,
            })
          );
          confirmations.push(createPromise);
        }
      }
      currentDate = currentDate.add(1, 'day'); // 1日進める
    }

    // 一気に保存を待つ
    try {
      await Promise.all(confirmations);
      alert('自動分割シフトを登録しました。');
    } catch (err) {
      console.error('自動分割シフト登録エラー:', err);
      alert('自動生成時にエラーが発生しました。');
    }
  };

  // ----------------------------------------
  // 右クリックメニュー操作
  // ----------------------------------------
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

  // ----------------------------------------
  // 予約の非表示をトグル
  // ----------------------------------------
  const handleToggleHideStaff = async () => {
    if (!contextStaff) return;
    try {
      const originalStaff = await DataStore.query(Staff, contextStaff.id);
      if (!originalStaff) {
        console.error('Staff not found in DataStore');
        return;
      }
      await DataStore.save(
        Staff.copyOf(originalStaff, (updated) => {
          updated.hidden = !originalStaff.hidden;
        })
      );
    } catch (err) {
      console.error('Error toggling hidden property for staff:', err);
    }
    handleCloseContextMenu();
  };

  // ----------------------------------------
  // 予約情報削除
  // ----------------------------------------
  const handleDeleteStaff = async () => {
    if (!contextStaff) return;
    try {
      const originalStaff = await DataStore.query(Staff, contextStaff.id);
      if (!originalStaff) {
        console.error('Staff not found in DataStore');
        return;
      }
      await DataStore.delete(originalStaff);
    } catch (err) {
      console.error('Error deleting staff:', err);
    }
    handleCloseContextMenu();
  };

  // 曜日チェックのトグル
  const handleToggleDay = (dayKey) => {
    setDaysOfWeek((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey],
    }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        予約登録（管理者専用）
      </Typography>

      {/* 予約情報登録フォーム */}
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

          {/* 予約施設の詳細情報を入力 */}
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
        {/* 予約施設一覧 */}
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

        {/* シフト登録エリア */}
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
                        ampm={false}             // ★ 24時間表示
                        value={startTime}
                        onChange={(newVal) => setStartTime(newVal)}
                      />
                    </Grid>
                    <Grid item>
                      <TimePicker
                        label="終了時刻(24h)"
                        ampm={false}             // ★ 24時間表示
                        value={endTime}
                        onChange={(newVal) => setEndTime(newVal)}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <TextField
                      label="シフトの詳細"
                      multiline
                      rows={2}
                      value={shiftDetail}
                      onChange={(e) => setShiftDetail(e.target.value)}
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
                左の一覧から予約情報を選択してください。
              </Typography>
            )}
          </Paper>

          {/* 自動分割+曜日繰り返し 登録エリア */}
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
                      <TimePicker
                        label="シフト開始(24h)"
                        ampm={false}  // ★ 24時間表示
                        value={autoStartTime}
                        onChange={(newVal) => setAutoStartTime(newVal)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TimePicker
                        label="シフト終了(24h)"
                        ampm={false}  // ★ 24時間表示
                        value={autoEndTime}
                        onChange={(newVal) => setAutoEndTime(newVal)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TimePicker
                        label="休憩開始(24h)"
                        ampm={false}  // ★ 24時間表示
                        value={breakStartTime}
                        onChange={(newVal) => setBreakStartTime(newVal)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TimePicker
                        label="休憩終了(24h)"
                        ampm={false}  // ★ 24時間表示
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
                  <Grid item xs={12} sm={9}>
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
                左の一覧から予約情報を選択してください。
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* 選択予約のシフト一覧テーブル */}
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
                </TableRow>
              </TableHead>
              <TableBody>
                {shiftList
                  .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
                  .map((shift) => (
                    <TableRow key={shift.id}>
                      <TableCell>{shift.date}</TableCell>
                      <TableCell>{dayjs(shift.startTime).format('HH:mm')}</TableCell>
                      <TableCell>{dayjs(shift.endTime).format('HH:mm')}</TableCell>
                      <TableCell>{shift.details || ''}</TableCell>

                      {/* 施設詳細（Staff.description） */}
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
    </Container>
  );
}
