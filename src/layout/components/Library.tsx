import React from 'react';
import EmptyPlaylist from './EmptyPlaylist';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import ErrorMessage from '../../common/components/ErrorMessage';
import { styled } from '@mui/material';
import PlayList from './PlayList';

const PlaylistContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  maxHeight: 'calc(100%- 240px)',
}));

const Library = () => {
  // playlist api 호출
  const { data, isLoading, error } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
  console.log('data : ', data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      {!data || data.items.length === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          <PlayList playlists={data.items} />
        </PlaylistContainer>
      )}
    </div>
  );
};

export default Library;
