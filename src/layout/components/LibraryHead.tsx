import React from 'react';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { Button, styled, Typography } from '@mui/material';

const AddLibraryHeader = styled('div')(({ theme }) => ({
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // color: theme.palette.text.primary,
}));

const SubTitle = styled('div')(({ theme }) => ({}));
const LibraryHead = () => {
  const handleCreatePlaylist = () => {
    // 나중에 추가 예정
  };

  return (
    <AddLibraryHeader>
      <BookmarkIcon />
      <Typography variant="h2" fontWeight={700}>
        Your Library
      </Typography>
      <Button onClick={handleCreatePlaylist}>
        <AddIcon color="success" />
      </Button>
    </AddLibraryHeader>
  );
};

export default LibraryHead;
