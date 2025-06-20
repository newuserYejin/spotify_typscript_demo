// 모바일 버전에서 사용
import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import { useInView } from 'react-intersection-observer';
import EmptyPlaylist from '../../layout/components/EmptyPlaylist';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import ErrorMessage from '../../common/components/ErrorMessage';
import PlayList from '../../layout/components/PlayList';
import { Navigate } from 'react-router';

const PlaylistContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  overflow: 'auto',

  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    // Chrome, Safari, Edge
    display: 'none',
  },
}));

const PlaylistPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const { data: user } = useGetCurrentUserProfile();
  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCurrentUserPlaylists({
      limit: 10,
      offset: 0,
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 600); // sm 이하
    };

    checkIsMobile(); // 첫 마운트 시 체크
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isMobile === null) return null; // 초기 렌더 시 로딩 방지

  // ✅ 모바일이 아니면 "/"로 리디렉션
  if (!isMobile) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
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
