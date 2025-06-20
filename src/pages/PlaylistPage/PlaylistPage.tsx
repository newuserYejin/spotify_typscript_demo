// 모바일 버전에서 사용
import { Box, styled } from '@mui/material';
import React from 'react';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import { useInView } from 'react-intersection-observer';
import EmptyPlaylist from '../../layout/components/EmptyPlaylist';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import ErrorMessage from '../../common/components/ErrorMessage';
import PlayList from '../../layout/components/PlayList';

const PlaylistContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  overflow: 'auto',
  border: 'solid 1px red',

  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    // Chrome, Safari, Edge
    display: 'none',
  },
}));

const PlaylistPage = () => {
  const { data: user } = useGetCurrentUserProfile();
  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCurrentUserPlaylists({
      limit: 10,
      offset: 0,
    });
  const { ref, inView } = useInView();
  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          border: 'solid 2px white',
          height: 'calc(100% - 80px)',
        }}
      >
        <EmptyPlaylist />
      </Box>
    );
  }

  if (isLoading) {
    return <LoadingSpinner size={80} />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <Box sx={{ height: 'calc(100% - 70px)' }}>
      {!data || data?.pages[0].items.length === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          {data?.pages.map((page, index) => (
            <PlayList playlists={page.items} key={index} />
          ))}
          <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
        </PlaylistContainer>
      )}
    </Box>
  );
};

export default PlaylistPage;
