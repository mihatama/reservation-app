import React, { useEffect, useState } from 'react'
import { DataStore } from '@aws-amplify/datastore'
import { Reservation, Staff } from '../models'
import dayjs from 'dayjs'
import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button
} from '@mui/material'
import { fetchAuthSession } from '@aws-amplify/auth'

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([])
  const [userSub, setUserSub] = useState('')
  const [userFullName, setUserFullName] = useState('')

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    if (!userSub) return
    const subscription = DataStore.observeQuery(Reservation, (r) =>
      r.owner.eq(userSub)
    ).subscribe(async ({ items }) => {
      const itemsWithStaffName = await Promise.all(
        items.map(async (res) => {
          let staffName = ''
          if (res.staffID) {
            try {
              const staff = await DataStore.query(Staff, res.staffID)
              if (staff) {
                staffName = staff.name
              }
            } catch (err) {
              console.error('Failed to fetch Staff:', err)
            }
          }
          return { ...res, staffName }
        })
      )
      setReservations(itemsWithStaffName)
    })
    return () => subscription.unsubscribe()
  }, [userSub])

  const getUserInfo = async () => {
    try {
      const session = await fetchAuthSession()
      const payload = session.tokens?.idToken?.payload || {}
      const sub = payload.sub || ''
      const familyName = payload.family_name || ''
      const givenName = payload.given_name || ''
      setUserSub(sub)
      setUserFullName(`${familyName} ${givenName}`.trim())
    } catch (err) {
      console.error('Fail to fetch session', err)
    }
  }

  const handleCancelReservation = async (reservationId) => {
    if (!window.confirm('本当にキャンセルしますか？')) return
    try {
      const item = await DataStore.query(Reservation, reservationId)
      if (item) {
        await DataStore.delete(item)
        alert('予約をキャンセルしました。')
      }
    } catch (e) {
      console.error(e)
      alert('キャンセルに失敗しました。')
    }
  }

  if (!userSub) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          マイ予約一覧
        </Typography>
        <Typography variant="body1">ログインが必要です。</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        マイ予約一覧
      </Typography>
      <Paper sx={{ p: 2 }}>
        {reservations.length === 0 ? (
          <Typography variant="body1">現在、登録された予約はありません。</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>日付</TableCell>
                  <TableCell>開始</TableCell>
                  <TableCell>終了</TableCell>
                  <TableCell>施設名</TableCell>
                  <TableCell>予約者</TableCell>
                  <TableCell>予約状況</TableCell>
                  <TableCell>キャンセル</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations
                  .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
                  .map((res) => {
                    const start = dayjs(res.startTime)
                    const canCancel = start.diff(dayjs(), 'hour') >= 48
                    let statusLabel = ''
                    if (res.status === 'PENDING') {
                      statusLabel = '仮予約中'
                    } else if (res.status === 'DENIED') {
                      statusLabel = '否認'
                    } else {
                      statusLabel = '予約済み'
                    }
                    return (
                      <TableRow key={res.id}>
                        <TableCell>{res.date}</TableCell>
                        <TableCell>{start.format('HH:mm')}</TableCell>
                        <TableCell>{dayjs(res.endTime).format('HH:mm')}</TableCell>
                        <TableCell>{res.staffName || ''}</TableCell>
                        <TableCell>{res.clientName ? res.clientName : userFullName}</TableCell>
                        <TableCell>{statusLabel}</TableCell>
                        <TableCell>
                          {canCancel ? (
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleCancelReservation(res.id)}
                            >
                              キャンセル
                            </Button>
                          ) : (
                            <Typography color="textSecondary">電話連絡</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  )
}
