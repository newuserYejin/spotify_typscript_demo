import { Button, styled, Typography } from '@mui/material';
import React from 'react';

const EmptyBox = styled('div')(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: '20px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
}));

const CreateBtn = styled(Button)({
  marginTop: '20px',
  fontWeight: '700',
});

const EmptyPlaylist = () => {
  return (
    <EmptyBox>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body2">It's easy, we'll help you</Typography>
      <CreateBtn variant="contained" color="secondary">
        Create playlist
      </CreateBtn>
    </EmptyBox>
  );
};

export default EmptyPlaylist;
