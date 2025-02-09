import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Questionnaire, Reservation, Staff } from '../models';
import dayjs from 'dayjs';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  MenuItem,
  TablePagination
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

// ハイライト用関数
function highlightText(text = '', searchTerm = '') {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return (
        <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function AdminQuestionnaireListPage() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);

  const [sortColumn, setSortColumn] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  // 修正ボタン押下時の処理
  const handleEditQuestionnaire = (id) => {
    // edit-questionnaire/:id へ遷移
    navigate(`/edit-questionnaire/${id}`);
  };

  useEffect(() => {
    const subscription = DataStore.observeQuery(Questionnaire).subscribe(async ({ items }) => {
      const itemsWithRelation = await Promise.all(
        items.map(async (q) => {
          const reservation = await DataStore.query(Reservation, q.reservationID);
          let staff = null;
          if (reservation?.staffID) {
            staff = await DataStore.query(Staff, reservation.staffID);
          }
          const staffName = staff?.name || '';
          const staffDescription = staff?.description || '';
          return {
            ...q,
            reservation,
            staffName,
            staffDescription
          };
        })
      );
      setQuestionnaires(itemsWithRelation);
    });
    return () => subscription.unsubscribe();
  }, []);

  const sortFn = useCallback((a, b) => {
    switch (sortColumn) {
      case 'date': {
        if (!a.reservation && !b.reservation) return 0;
        if (!a.reservation) return 1;
        if (!b.reservation) return -1;
        const dateA = dayjs(a.reservation.date);
        const dateB = dayjs(b.reservation.date);
        return sortOrder === 'asc'
          ? dateA.valueOf() - dateB.valueOf()
          : dateB.valueOf() - dateA.valueOf();
      }
      case 'mamaName': {
        const mamaA = `${a.mamaLastName || ''}${a.mamaFirstName || ''}`.toLowerCase();
        const mamaB = `${b.mamaLastName || ''}${b.mamaFirstName || ''}`.toLowerCase();
        if (mamaA === mamaB) return 0;
        if (sortOrder === 'asc') {
          return mamaA < mamaB ? -1 : 1;
        } else {
          return mamaA < mamaB ? 1 : -1;
        }
      }
      case 'staffName': {
        const staffA = (a.staffName || '').toLowerCase();
        const staffB = (b.staffName || '').toLowerCase();
        if (staffA === staffB) return 0;
        if (sortOrder === 'asc') {
          return staffA < staffB ? -1 : 1;
        } else {
          return staffA < staffB ? 1 : -1;
        }
      }
      default:
        return 0;
    }
  }, [sortColumn, sortOrder]);

  const filteredAndSortedQuestionnaires = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = questionnaires.filter((q) => {
      const mamaName = `${q.mamaLastName || ''}${q.mamaFirstName || ''}${q.mamaFuriganaLastName || ''}${q.mamaFuriganaFirstName || ''}`.toLowerCase();
      const childName = `${q.childLastName || ''}${q.childFirstName || ''}${q.childFuriganaLastName || ''}${q.childFuriganaFirstName || ''}`.toLowerCase();
      const staffFields = `${q.staffName || ''}${q.staffDescription || ''}`.toLowerCase();

      const matchSearch =
        mamaName.includes(lowerSearch) ||
        childName.includes(lowerSearch) ||
        staffFields.includes(lowerSearch);

      const resDate = q.reservation?.date ? dayjs(q.reservation.date) : null;
      if (startDate && resDate && resDate.isBefore(dayjs(startDate), 'day')) {
        return false;
      }
      if (endDate && resDate && resDate.isAfter(dayjs(endDate), 'day')) {
        return false;
      }
      return matchSearch;
    });

    return [...filtered].sort(sortFn);
  }, [questionnaires, searchTerm, startDate, endDate, sortFn]);

  const paginatedQuestionnaires = useMemo(() => {
    return filteredAndSortedQuestionnaires.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredAndSortedQuestionnaires, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
  };
  const handleCloseDialog = () => {
    setSelectedQuestionnaire(null);
  };
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        問診票一覧 (管理者)
      </Typography>

      <Paper sx={{ p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            label="検索キーワード"
            variant="outlined"
            size="small"
            placeholder="施設名・スタッフ名・ママ/お子様氏名など"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: '300px' }}
          />
          <Button variant="outlined" onClick={handleClearSearch}>
            検索クリア
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            label="開始日"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            label="終了日"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            select
            size="small"
            label="ソートカラム"
            value={sortColumn}
            onChange={(e) => setSortColumn(e.target.value)}
            sx={{ width: '180px' }}
          >
            <MenuItem value="date">予約日</MenuItem>
            <MenuItem value="mamaName">ママ氏名</MenuItem>
            <MenuItem value="staffName">施設名</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            label="ソート順"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{ width: '120px' }}
          >
            <MenuItem value="asc">昇順</MenuItem>
            <MenuItem value="desc">降順</MenuItem>
          </TextField>
        </div>
      </Paper>

      {filteredAndSortedQuestionnaires.length === 0 ? (
        <Typography>問診票はありません（該当なし）</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>予約日</TableCell>
                <TableCell>時間</TableCell>
                <TableCell>受診場所</TableCell>
                <TableCell>施設名</TableCell>
                <TableCell>ママ氏名 (フリガナ)</TableCell>
                <TableCell>お子様氏名 (フリガナ)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedQuestionnaires.map((q) => {
                const mamaName = `${q.mamaLastName || ''} ${q.mamaFirstName || ''}`.trim();
                const mamaNameFurigana = `${q.mamaFuriganaLastName || ''} ${q.mamaFuriganaFirstName || ''}`.trim();
                const childName = `${q.childLastName || ''} ${q.childFirstName || ''}`.trim();
                const childNameFurigana = `${q.childFuriganaLastName || ''} ${q.childFuriganaFirstName || ''}`.trim();

                return (
                  <TableRow
                    key={q.id}
                    hover
                    onClick={() => handleRowClick(q)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell>{q.reservation?.date || '-'}</TableCell>
                    <TableCell>
                      {q.reservation
                        ? `${dayjs(q.reservation.startTime).format('HH:mm')} - ${dayjs(q.reservation.endTime).format('HH:mm')}`
                        : '-'}
                    </TableCell>
                    <TableCell>{q.placeOfVisit || '-'}</TableCell>
                    <TableCell>{highlightText(q.staffName || '-', searchTerm)}</TableCell>
                    <TableCell>
                      {mamaName ? highlightText(mamaName, searchTerm) : '-'}
                      {mamaNameFurigana ? ` (${highlightText(mamaNameFurigana, searchTerm)})` : ''}
                    </TableCell>
                    <TableCell>
                      {childName ? highlightText(childName, searchTerm) : '-'}
                      {childNameFurigana ? ` (${highlightText(childNameFurigana, searchTerm)})` : ''}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredAndSortedQuestionnaires.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="表示件数"
          />
        </Paper>
      )}

      <Dialog
        open={Boolean(selectedQuestionnaire)}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          問診票詳細
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
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
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>予約情報</Typography>
            <Typography>予約日: {selectedQuestionnaire.reservation?.date || '-'}</Typography>
            <Typography>
              時間:
              {selectedQuestionnaire.reservation
                ? ` ${dayjs(selectedQuestionnaire.reservation.startTime).format('HH:mm')} - ${dayjs(selectedQuestionnaire.reservation.endTime).format('HH:mm')}`
                : '-'
              }
            </Typography>
            <Typography>予約者名: {selectedQuestionnaire.reservation?.clientName || '-'}</Typography>
            <Typography>ステータス: {selectedQuestionnaire.reservation?.status || '-'}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>受診場所</Typography>
            <Typography>{selectedQuestionnaire.placeOfVisit || '-'}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>施設</Typography>
            <Typography>施設名: {selectedQuestionnaire.staffName || '-'}</Typography>
            <Typography>施設の詳細: {selectedQuestionnaire.staffDescription || '-'}</Typography>

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

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>お仕事・ご住所</Typography>
            <Typography>お仕事: {selectedQuestionnaire.occupation || '-'}</Typography>
            <Typography>産後状況: {selectedQuestionnaire.postpartumStatus || '-'}</Typography>
            <Typography>自宅住所: {selectedQuestionnaire.homeAddress || '-'} (郵便番号: {selectedQuestionnaire.homePostalCode || '-'})</Typography>
            <Typography>里帰り先住所: {selectedQuestionnaire.rikaeriAddress || '-'} (郵便番号: {selectedQuestionnaire.rikaeriPostalCode || '-'})</Typography>

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

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>妊娠時・医療歴</Typography>
            <Typography>妊娠時の状況: {selectedQuestionnaire.pregnancyCondition || '-'}</Typography>
            <Typography>病歴: {selectedQuestionnaire.pastMedicalHistory || '-'}</Typography>
            <Typography>内服薬: {selectedQuestionnaire.medication || '-'}</Typography>
            <Typography>感染症既往: {selectedQuestionnaire.infectionHistory || '-'}</Typography>
            <Typography>家族相関: {selectedQuestionnaire.familyHistory || '-'}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>ご来院理由</Typography>
            <Typography>{selectedQuestionnaire.visitReason || '-'}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>その他</Typography>
            <Typography>{selectedQuestionnaire.additionalNotes || '-'}</Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            閉じる
          </Button>
          {/* 修正ボタン */}
          {selectedQuestionnaire && (
            <Button
              onClick={() => handleEditQuestionnaire(selectedQuestionnaire.id)}
              variant="outlined"
              color="secondary"
            >
              修正
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}
