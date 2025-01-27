import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Staff } from '../models';

// ここを修正: 'Storage' ではなく、必要な関数を個別にインポート
import { getUrl } from '@aws-amplify/storage';

import {
  Box,
  Typography,
  Paper,
  Container
} from '@mui/material';

// 画像が存在しないとき用のダミー画像を使いたいなら定義する
import placeholder from '../assets/placeholder.png'; 

export default function ShiftListPage() {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const staffSub = DataStore.observeQuery(Staff).subscribe(async ({ items }) => {
      // staff.photo が S3キーの場合、URLを取得して staff.photoURL に格納する
      const staffWithUrls = await Promise.all(
        items.map(async (staff) => {
          if (staff.photo) {
            try {
              const url = await getUrl({ key: staff.photo, level: 'public' });
              return { ...staff, photoURL: url };
            } catch {
              return { ...staff, photoURL: placeholder };
            }
          } else {
            // photoキーが無いなら placeholder を使う
            return { ...staff, photoURL: placeholder };
          }
        })
      );
      setStaffList(staffWithUrls);
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
            {/* 写真表示 */}
            <Box
              component="img"
              src={staff.photoURL}  // getUrl で取得したURL or placeholder
              alt={staff.name}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: '8px',
                mr: 2,
              }}
            />
            {/* 名前など */}
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
