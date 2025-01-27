import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Staff } from '../models';

// Amplify Storage (修正)
import { Storage } from 'aws-amplify';

import {
  Box,
  Typography,
  Paper,
  Container
} from '@mui/material';

// 画像が存在しないとき用のダミー画像
import placeholder from '../assets/placeholder.png';

export default function ShiftListPage() {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const staffSub = DataStore.observeQuery(Staff).subscribe(async ({ items }) => {
      const staffWithUrls = await Promise.all(
        items.map(async (staff) => {
          if (staff.photo) {
            try {
              const url = await Storage.get(staff.photo, { level: 'public' });
              return { ...staff, photoURL: url };
            } catch {
              return { ...staff, photoURL: placeholder };
            }
          } else {
            return { ...staff, photoURL: placeholder };
          }
        })
      );
      setStaffList(staffWithUrls);
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
