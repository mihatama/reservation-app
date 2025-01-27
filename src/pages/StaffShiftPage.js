import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Staff, Shift } from '../models';

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
  Container
} from '@mui/material';

// Material UI Pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// S3アップロード・URL取得用
import { uploadData, getUrl } from '@aws-amplify/storage';

export default function StaffShiftPage() {
  const [staffName, setStaffName] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // スタッフ写真関連
  const [staffPhotoFile, setStaffPhotoFile] = useState(null);

  // シフト登録用
  const [shiftDate, setShiftDate] = useState(null); // dayjs
  const [startTime, setStartTime] = useState(null); // dayjs
  const [endTime, setEndTime] = useState(null);     // dayjs
  const [shiftDetail, setShiftDetail] = useState('');

  // シフト一覧
  const [shiftList, setShiftList] = useState([]);

  // スタッフ一覧をリアルタイム購読
  useEffect(() => {
    const subscription = DataStore.observeQuery(Staff).subscribe(async ({ items }) => {
      // S3キーからURLを取得して staff.photoURL に格納
      const staffWithPhotoUrls = await Promise.all(
        items.map(async (staff) => {
          if (staff.photo) {
            try {
              // Storage.get でキーからURLを取得
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

  // 選択中スタッフのシフト一覧をリアルタイム購読
  useEffect(() => {
    if (!selectedStaff) {
      setShiftList([]);
      return;
    }
    const subscription = DataStore.observeQuery(Shift, (s) =>
      s.staffID.eq(selectedStaff.id)
    ).subscribe(async ({ items }) => {
      // シフト写真についてもURL取得
      const shiftWithUrls = await Promise.all(
        items.map(async (shift) => {
          if (shift.photo) {
            try {
              const url = await getUrl({ key: shift.photo });
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

  // スタッフを新規登録
  const createStaff = async () => {
    if (!staffName.trim()) {
      alert('スタッフ名を入力してください。');
      return;
    }

    let photoKey = '';
    if (staffPhotoFile) {
      try {
        const fileName = `staff-photos/${Date.now()}_${staffPhotoFile.name}`;
        // アップロード
        const uploadResult = await Storage.put(fileName, staffPhotoFile, {
          contentType: staffPhotoFile.type,
          level: 'public', // 必要に応じて変更
        });
        photoKey = uploadResult.key; // => これが S3 に保存されたファイルキー
      } catch (err) {
        console.error('スタッフ写真のアップロードエラー:', err);
        alert('スタッフ写真のアップロードに失敗しました。');
        return;
      }
    }

    await DataStore.save(
      new Staff({
        name: staffName,
        photo: photoKey, // S3キーを保存
      })
    );
    setStaffName('');
    setStaffPhotoFile(null);
  };

  // シフトを新規登録
  const createShift = async () => {
    if (!selectedStaff) {
      alert('スタッフを選択してください。');
      return;
    }
    if (!shiftDate || !startTime || !endTime) {
      alert('日付と時刻をすべて入力してください。');
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
    const endISO   = end.toISOString();

    // staffID_date = "{スタッフID}_{日付}"
    const staffID_dateValue = `${selectedStaff.id}_${dateStr}`;

    // シフトの写真は、登録時のスタッフ写真を使用する
    const shiftPhotoKey = selectedStaff.photo || '';

    // シフト保存
    await DataStore.save(
      new Shift({
        staffID: selectedStaff.id,
        staffID_date: staffID_dateValue,
        date: dateStr,
        startTime: startISO,
        endTime: endISO,
        photo: shiftPhotoKey, // スタッフ登録時のS3キーを利用
        details: shiftDetail,
      })
    );

    alert('シフトを追加しました。');
    // フォームクリア
    setShiftDate(null);
    setStartTime(null);
    setEndTime(null);
    setShiftDetail('');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        スタッフ管理（管理者専用）
      </Typography>

      {/* スタッフ登録 */}
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
                >
                  <ListItemText
                    primary={staff.name}
                    secondary={
                      staff.photoURL ? '写真あり' : '写真なし'
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
                        onChange={(newValue) => setShiftDate(newValue)}
                      />
                    </Grid>
                    <Grid item>
                      <TimePicker
                        label="開始時刻"
                        value={startTime}
                        onChange={(newValue) => setStartTime(newValue)}
                      />
                    </Grid>
                    <Grid item>
                      <TimePicker
                        label="終了時刻"
                        value={endTime}
                        onChange={(newValue) => setEndTime(newValue)}
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

                {/* シフト写真アップロードは不要のため削除 */}

                <Grid container sx={{ mt: 2 }}>
                  <Grid item>
                    <Button variant="contained" onClick={createShift}>
                      シフト追加
                    </Button>
                  </Grid>
                </Grid>

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
                            <TableCell>
                              {dayjs(shift.startTime).format('HH:mm')}
                            </TableCell>
                            <TableCell>
                              {dayjs(shift.endTime).format('HH:mm')}
                            </TableCell>
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
                スタッフを左の一覧から選択してください。
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
