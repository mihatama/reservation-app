import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Staff } from '../models';

// ★ 変更: Storage を直接 import
// import { getUrl } from '@aws-amplify/storage';
import { Storage } from 'aws-amplify';

import {
  Box,
  Typography,
  Paper,
  Container
} from '@mui/material';

// 写真がない場合のダミー
import placeholder from '../assets/placeholder.png';

export default function ShiftListPage() {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // === 一旦すべての Staff を購読 ===
    const staffSub = DataStore.observeQuery(Staff).subscribe(async ({ items }) => {
      console.log('[ShiftListPage] Staff items fetched:', items);

      // S3写真URLを取得
      const staffWithUrls = await Promise.all(
        items.map(async (staff) => {
          if (staff.photo) {
            try {
              // ★ 変更点: Storage.get でURLを取得
              const url = await Storage.get(staff.photo, { level: 'public' });
              return { ...staff, photoURL: url };
            } catch {
              return { ...staff, photoURL: placeholder };
            }
          } else {
            // photo が無い場合はダミー画像
            return { ...staff, photoURL: placeholder };
          }
        })
      );

      // === ここで hidden === false のスタッフだけをセット ===
      const visibleStaff = staffWithUrls.filter((staff) => !staff.hidden);
      setStaffList(visibleStaff);
    });

    return () => staffSub.unsubscribe();
  }, []);

  const handleRowClick = (staffId) => {
    // クリックしたスタッフのカレンダーへ飛ばす
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
