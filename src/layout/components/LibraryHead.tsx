import React from 'react';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { Button, styled, Typography } from '@mui/material';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../utils/auth';

const AddLibraryHeader = styled('div')(({ theme }) => ({
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // color: theme.palette.text.primary,

  [theme.breakpoints.down('sm')]: {
    border: 'solid 2px white',
    borderRadius: '30px',
    padding: '0 8px',
  },
}));

const SubTitle = styled('div')(({ theme }) => ({}));
const LibraryHead = () => {
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data: user } = useGetCurrentUserProfile();
  const handleCreatePlaylist = () => {
    if (user) {
      createPlaylist({ name: 'My Playlist' });
    } else {
      getSpotifyAuthUrl();
    }
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
