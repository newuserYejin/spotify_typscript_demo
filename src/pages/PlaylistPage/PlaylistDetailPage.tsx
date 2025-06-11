import React from 'react';
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import {
  Box,
  Grid,
  Icon,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import DesktopPlaylistItem from './component/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';

const PlaylistDetailHead = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  margin: '10px 0',
}));

const PlaylistImg = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  aspectRatio: '1/1',

  '& img': {
    width: '100%',
    borderRadius: '10px',
  },
}));

const PlaylistTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.7rem',
  fontWeight: 'bold',
  wordBreak: 'keep-all',
  marginBottom: '8px',

  [theme.breakpoints.down('md')]: {
    fontSize: '1.4rem',
  },

  // sm(600px) 이하에 적용 => xs구역
  [theme.breakpoints.down('sm')]: {
    wordBreak: 'normal',
  },
}));

const NoImgBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: '10px',
  width: '100%',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const PlaylistDetailPage = () => {
  //url에서 id 읽어오기
  const { id } = useParams<{ id: string }>();

  if (id === undefined) return <Navigate to="/" />;

  const { data: playlist } = useGetPlaylist({ playlist_id: id });

  console.log('플레이리스트 상세정보 : ', playlist);

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsLoadingError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT, offset: 0 });

  console.log('playlist Items data : ', playlistItems);

  return (
    <Box sx={{ padding: '10px' }}>
      <PlaylistDetailHead container spacing={3}>
        <PlaylistImg size={{ xs: 12, sm: 5, md: 2 }}>
          {playlist?.images ? (
            <img src={playlist?.images?.[0]?.url} alt="플레이리스트 커버 이미지" />
          ) : (
            <NoImgBox>
              <LibraryMusicIcon />
            </NoImgBox>
          )}
        </PlaylistImg>
        <Grid size={{ xs: 12, sm: 7, md: 10 }}>
          <PlaylistTitle>{playlist?.name}</PlaylistTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
              alt="spotify 로고"
              width="20px"
            />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {playlist?.owner ? playlist?.owner.display_name : 'unknown'}
            </Typography>
            <Typography variant="subtitle1">{playlist?.tracks?.total} songs</Typography>
          </Box>
        </Grid>
      </PlaylistDetailHead>
      {playlist?.tracks?.total === 0 ? (
        <Typography>Search</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Date added</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlistItems?.pages.map((page, pageIndex) =>
              page.items.map((item, itemIndex) => {
                return (
                  <DesktopPlaylistItem
                    item={item}
                    key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                  />
                );
              })
            )}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default PlaylistDetailPage;
