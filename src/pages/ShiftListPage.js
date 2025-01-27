// src/pages/ShiftListPage.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Staff } from '../models';
import placeholder from '../assets/placeholder.png'; // 写真がない場合のダミー画像
import {
  Box,
  Typography,
  Paper,
  Container
} from '@mui/material';

export default function ShiftListPage() {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // スタッフ一覧を購読
    const staffSub = DataStore.observeQuery(Staff).subscribe(({ items }) => {
      setStaffList(items);
    });

    return () => {
      staffSub.unsubscribe();
    };
  }, []);

  // スタッフ行をクリック => 該当スタッフのカレンダーへ
  const handleRowClick = (staffId) => {
    navigate(`/calendar/${staffId}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        スタッフ一覧
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        スタッフを1行ずつ表示しています。写真や名前をクリックすると、そのスタッフのカレンダーへ移動します。
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
            {/* 左側に写真 */}
            <Box
              component="img"
              src={staff.photo || placeholder}
              alt={staff.name}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: '8px',
                mr: 2,
              }}
            />
            {/* 右側：スタッフ名や詳細 */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{staff.name}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                {staff.description
                  ? staff.description
                  : 'スタッフの詳細は未登録です'}
              </Typography>
            </Box>
          </Paper>
        ))
      )}
    </Container>
  );
}
