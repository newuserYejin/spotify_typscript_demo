import React, { useEffect, useState } from 'react';
import EmptyPlaylist from './EmptyPlaylist';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import ErrorMessage from '../../common/components/ErrorMessage';
import { styled } from '@mui/material';
import PlayList from './PlayList';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useInView } from 'react-intersection-observer';

const PlaylistContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  maxHeight: 'calc( 100% - 50px )',
  overflow: 'auto',
  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    // Chrome, Safari, Edge
    display: 'none',
  },
}));

const Library = () => {
  const { data: user } = useGetCurrentUserProfile();
  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCurrentUserPlaylists({
      limit: 10,
      offset: 0,
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!user) {
    return <EmptyPlaylist />;
  }

  // playlist api 호출
  console.log('data : ', data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <>
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
    </>
  );
};

export default Library;
