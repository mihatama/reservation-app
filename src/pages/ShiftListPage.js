import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Staff } from '../models';
// Storage の getUrl を使用
import { getUrl } from '@aws-amplify/storage';

import {
  Box,
  Typography,
  Paper,
  Container
} from '@mui/material';

import placeholder from '../assets/placeholder.png';

export default function ShiftListPage() {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const staffSub = DataStore.observeQuery(Staff).subscribe(async ({ items }) => {
      // 1) staff.photo から S3 URL を生成
      const staffWithUrls = await Promise.all(
        items.map(async (staff) => {
          if (staff.photo) {
            try {
              // どのキーを見に行っているかログを出す
              console.log('Fetching URL for key:', staff.photo);

              // getUrlを呼び出す
              const { url } = await getUrl(staff.photo, { level: 'public' });

              // 生成されたURLを表示
              console.log('Fetched URL:', url);

              return { ...staff, photoURL: url };
            } catch (err) {
              console.error('写真URL取得エラー:', err);
              return { ...staff, photoURL: placeholder };
            }
          } else {
            // photo が設定されていないスタッフの場合
            return { ...staff, photoURL: placeholder };
          }
        })
      );

      // 2) hidden=false のスタッフのみ表示
      const visibleStaff = staffWithUrls.filter((st) => !st.hidden);
      setStaffList(visibleStaff);
    });

    return () => staffSub.unsubscribe();
  }, []);

  const handleRowClick = (staffId) => {
    navigate(`/calendar/${staffId}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        スタッフ一覧
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        スタッフをクリックすると、そのスタッフのカレンダーへ移動します。
      </Typography>

      {staffList.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          登録されたスタッフがいません。
        </Typography>
      ) : (
        staffList.map((staff) => (
          <Paper
            key={staff.id}
            sx={{
              p: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f9f9f9' },
            }}
            onClick={() => handleRowClick(staff.id)}
          >
            <Box
              component="img"
              src={staff.photoURL}
              alt={staff.name}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: '8px',
                mr: 2,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{staff.name}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                {staff.description || '詳細未登録'}
              </Typography>
            </Box>
          </Paper>
        ))
      )}
    </Container>
  );
}
