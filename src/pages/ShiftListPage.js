import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Staff } from '../models';
import { getUrl } from '@aws-amplify/storage';
import { Box, Typography, Paper, Container } from '@mui/material';
import placeholder from '../assets/placeholder.png';

export default function ShiftListPage() {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = DataStore.observeQuery(Staff).subscribe(async ({ items }) => {
      const staffWithUrls = await Promise.all(
        items.map(async (staff) => {
          if (!staff.photo) return { ...staff, photoURL: placeholder };
          try {
            const { url } = await getUrl({ key: staff.photo, level: 'public' });
            return { ...staff, photoURL: url.href };
          } catch {
            return { ...staff, photoURL: placeholder };
          }
        })
      );
      setStaffList(staffWithUrls.filter((s) => !s.hidden));
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleRowClick = (id) => navigate(`/calendar/${id}`);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        スタッフ一覧
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        スタッフをクリックすると、そのスタッフのカレンダーへ移動します。
      </Typography>
      {!staffList.length ? (
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
