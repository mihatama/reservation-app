import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Questionnaire, Reservation } from '../models';
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import dayjs from 'dayjs';

export default function AdminQuestionnaireListPage() {
  const [questionnaires, setQuestionnaires] = useState([]);
  
  useEffect(() => {
    const subscription = DataStore.observeQuery(Questionnaire).subscribe(async ({ items }) => {
      // 各問診票に対応する予約情報を取得
      const itemsWithReservation = await Promise.all(
        items.map(async (q) => {
          const reservation = await DataStore.query(Reservation, q.reservationID);
          return { ...q, reservation };
        })
      );
      setQuestionnaires(itemsWithReservation);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>問診票一覧 (管理者)</Typography>
      {questionnaires.length === 0 ? (
        <Typography>問診票はまだ提出されていません。</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>予約日</TableCell>
                <TableCell>時間</TableCell>
                <TableCell>受診場所</TableCell>
                <TableCell>ママ氏名</TableCell>
                <TableCell>お子様氏名</TableCell>
                <TableCell>出産方法</TableCell>
                <TableCell>出産週</TableCell>
                <TableCell>出生体重</TableCell>
                <TableCell>退院体重</TableCell>
                <TableCell>追加情報</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questionnaires.map((q) => (
                <TableRow key={q.id}>
                  <TableCell>{q.reservation?.date || '-'}</TableCell>
                  <TableCell>
                    {q.reservation
                      ? `${dayjs(q.reservation.startTime).format('HH:mm')} - ${dayjs(q.reservation.endTime).format('HH:mm')}`
                      : '-'}
                  </TableCell>
                  <TableCell>{q.placeOfVisit}</TableCell>
                  <TableCell>{`${q.mamaLastName} ${q.mamaFirstName}`}</TableCell>
                  <TableCell>
                    {q.childLastName || q.childFirstName
                      ? `${q.childLastName || ''} ${q.childFirstName || ''}`
                      : '-'}
                  </TableCell>
                  <TableCell>{q.deliveryMethod}</TableCell>
                  <TableCell>{q.deliveryWeek}</TableCell>
                  <TableCell>{q.birthWeight}</TableCell>
                  <TableCell>{q.dischargeWeight}</TableCell>
                  <TableCell>
                    {q.additionalNotes
                      ? q.additionalNotes.length > 20
                        ? `${q.additionalNotes.substring(0, 20)}...`
                        : q.additionalNotes
                      : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
