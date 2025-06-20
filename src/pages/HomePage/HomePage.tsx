import React from 'react';
import NewReleases from './components/NewReleases';
import GenreSearchList from './components/GenreSearchList';
import { Box, styled } from '@mui/material';

const HomePageContainer = styled(Box)({
  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    // Chrome, Safari, Edge
    display: 'none',
  },

  overflowY: 'auto',
  maxHeight: 'calc(100% - 80px)',
});

const HomePage = () => {
  return (
    <HomePageContainer display="flex" flexDirection="column" gap="10px">
      <NewReleases />
      <GenreSearchList />
    </HomePageContainer>
  );
};

export default HomePage;
