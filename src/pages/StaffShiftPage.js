import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Staff, Shift } from '../models';

// ★ こちらを変更
// import { uploadData, getUrl } from '@aws-amplify/storage';
import { Storage } from 'aws-amplify';

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
  MenuItem
} from '@mui/material';

// 日付・時刻ピッカー
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function StaffShiftPage() {
  const [staffName, setStaffName] = useState('');
  const [staffPhotoFile, setStaffPhotoFile] = useState(null);

  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [shiftDate, setShiftDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [shiftDetail, setShiftDetail] = useState('');

  const [shiftList, setShiftList] = useState([]);

  // 右クリックメニュー制御用
  const [contextMenu, setContextMenu] = useState(null);
  const [contextStaff, setContextStaff] = useState(null);

  // ----------------------------------------
  // スタッフ一覧を購読
  // ----------------------------------------
  useEffect(() => {
    const subscription = DataStore.observeQuery(Staff).subscribe(async ({ items }) => {
      console.log('[StaffShiftPage] Staff items fetched:', items);

      // staff.photo からURLを取得
      const staffWithPhotoUrls = await Promise.all(
        items.map(async (staff) => {
          if (staff.photo) {
            try {
              // ★ 変更点: Storage.get でURLを取得
              const url = await Storage.get(staff.photo, { level: 'public' });
              return { ...staff, photoURL: url };
            } catch (err) {
              console.error('写真URL取得エラー:', err);
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
  // 選択したスタッフのシフト一覧を購読
  // ----------------------------------------
  useEffect(() => {
    if (!selectedStaff) {
      setShiftList([]);
      return;
    }

    const subscription = DataStore.observeQuery(Shift, (s) =>
      s.staffID.eq(selectedStaff.id)
    ).subscribe(async ({ items }) => {
      console.log('[StaffShiftPage] Shift items fetched for staff:', selectedStaff.id, items);

      const shiftWithUrls = await Promise.all(
        items.map(async (shift) => {
          if (shift.photo) {
            try {
              // ★ 変更点: Storage.get でURLを取得
              const url = await Storage.get(shift.photo, { level: 'public' });
              return { ...shift, photoURL: url };
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
  // スタッフを追加
  // ----------------------------------------
  const createStaff = async () => {
    console.log('[createStaff] Button clicked!');
    console.log('Staff name:', staffName);
    console.log('Photo file:', staffPhotoFile);

    if (!staffName.trim()) {
      alert('スタッフ名を入力してください');
      return;
    }

    let photoKey = '';
    if (staffPhotoFile) {
      try {
        // アップロード先を一意にするファイル名
        const fileName = `staff-photos/${Date.now()}_${staffPhotoFile.name}`;
        console.log('Uploading file to S3 with key:', fileName);

        // ★ 変更点: Storage.put を使う
        await Storage.put(fileName, staffPhotoFile, {
          contentType: staffPhotoFile.type,
          level: 'public',
        });
        console.log('Upload completed!');

        photoKey = fileName;
        console.log('Final photoKey:', photoKey);
      } catch (err) {
        console.error('スタッフ写真のアップロードエラー:', err);
        alert('スタッフ写真のアップロードに失敗しました。');
        return;
      }
    }

    // DataStoreにスタッフ登録
    try {
      console.log('Saving staff with DataStore...');
      // hidden フラグの初期値を false に
      const savedStaff = await DataStore.save(
        new Staff({
          name: staffName,
          photo: photoKey,
          hidden: false
        })
      );
      console.log('Staff created in DataStore:', savedStaff);

      // 登録直後の一覧の再取得
      const allStaff = await DataStore.query(Staff);
      // 写真URLを改めてまとめて取得
      const staffWithPhotoUrls = await Promise.all(
        allStaff.map(async (staff) => {
          if (staff.photo) {
            try {
              // ★ 変更点: Storage.get を使う
              const url = await Storage.get(staff.photo, { level: 'public' });
              return { ...staff, photoURL: url };
            } catch (err) {
              console.error('写真URL取得エラー:', err);
              return { ...staff, photoURL: '' };
            }
          }
          return { ...staff, photoURL: '' };
        })
      );
      setStaffList(staffWithPhotoUrls);

      // 新規登録したスタッフをすぐ選択状態にする
      setSelectedStaff(savedStaff);

      // 入力リセット
      setStaffName('');
      setStaffPhotoFile(null);
      alert('スタッフを追加しました。');

    } catch (err) {
      console.error('DataStore save error:', err);
      alert('スタッフの登録に失敗しました');
    }
  };

  // ----------------------------------------
  // シフトを追加
  // ----------------------------------------
  const createShift = async () => {
    console.log('[createShift] Button clicked!');
    if (!selectedStaff) {
      alert('スタッフを選択してください');
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
    // シフトではスタッフと同じ photoKey を流用
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
      console.log('Shift created in DataStore');
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

  // ----------------------------------------
  // 右クリックメニュー操作
  // ----------------------------------------
  const handleStaffContextMenu = (event, staff) => {
    event.preventDefault(); // ブラウザ標準の右クリックメニューを無効化
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
  // スタッフの非表示をトグル（DataStoreからモデルを再取得してcopyOfを使う）
  // ----------------------------------------
  const handleToggleHideStaff = async () => {
    if (!contextStaff) return;

    try {
      // contextStaff は「オブジェクト化」されており、
      // そのままだと "The source object is not a valid model" エラーが出るため
      // DataStore.query で“本物のモデルインスタンス”を取り直す
      const originalStaff = await DataStore.query(Staff, contextStaff.id);

      if (!originalStaff) {
        console.error('Staff not found in DataStore');
        return;
      }

      // hidden フラグを反転させる
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
  // スタッフ削除
  // ----------------------------------------
  const handleDeleteStaff = async () => {
    if (!contextStaff) return;
    try {
      // 削除も同様に、本物のモデルインスタンスを取得して行う
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

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        スタッフ管理（管理者専用）
      </Typography>

      {/* スタッフ登録フォーム */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1">スタッフ登録</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="スタッフ名"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
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
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" onClick={createStaff} fullWidth>
              スタッフ追加
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {/* スタッフ一覧 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">スタッフ一覧</Typography>
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
                    // hidden が true の場合は「非表示中」などでわかるように
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
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">シフト登録</Typography>

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
                        label="開始時刻"
                        value={startTime}
                        onChange={(newVal) => setStartTime(newVal)}
                      />
                    </Grid>
                    <Grid item>
                      <TimePicker
                        label="終了時刻"
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

                {/* 選択スタッフのシフト一覧 */}
                <Typography variant="subtitle2" sx={{ mt: 4, mb: 1 }}>
                  {selectedStaff.name} さんのシフト一覧
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>日付</TableCell>
                        <TableCell>開始</TableCell>
                        <TableCell>終了</TableCell>
                        <TableCell>詳細</TableCell>
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
              </>
            ) : (
              <Typography variant="body2" sx={{ mt: 2 }}>
                左の一覧からスタッフを選択してください。
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
    </Container>
  );
}
