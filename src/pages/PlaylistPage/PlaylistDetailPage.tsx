import React from 'react';
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { Grid, styled } from '@mui/material';

const PlaylistDetailHead = styled(Grid)(({ theme }) => ({
  border: 'solid 1px red',
}));

const PlaylistImg = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  aspectRatio: '1/1',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const PlaylistDetailPage = () => {
  //url에서 id 읽어오기
  const { id } = useParams<{ id: string }>();

  if (id === undefined) return <Navigate to="/" />;

  const { data: playlist } = useGetPlaylist({ playlist_id: id });

  console.log('플레이리스트 상세정보 : ', playlist);

  return (
    <div>
      <PlaylistDetailHead container>
        <PlaylistImg size={{ sm: 12, md: 10 }}>
          <img
            src={playlist?.images?.[0]?.url}
            alt="플레이리스트 커버 이미지"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </PlaylistImg>
        <Grid size={{ sm: 12, md: 10 }}></Grid>
      </PlaylistDetailHead>
    </div>
  );
};

export default PlaylistDetailPage;
