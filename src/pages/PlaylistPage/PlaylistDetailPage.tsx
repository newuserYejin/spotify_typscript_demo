import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import {
  Box,
  FormControl,
  Grid,
  Icon,
  Input,
  InputAdornment,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import DesktopPlaylistItem from './component/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import MobilePlaylistItem from './component/MobilePlaylistItem';
import SearchIcon from '@mui/icons-material/Search';

const PlaylistDetailHead = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: '10px',
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
interface PlaylistTableContainerProps {
  maxHeight?: string | null;
}

const PlaylistTableContainer = styled(TableContainer)<PlaylistTableContainerProps>(
  ({ theme, maxHeight }) => ({
    // border: 'solid 1px red',
    maxHeight: maxHeight || 'auto',

    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  })
);

const SearchBox = styled(FormControl)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  padding: '10px 20px',
  width: '30%',

  [theme.breakpoints.down('md')]: {
    width: '60%',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const PlaylistDetailPage = () => {
  const headRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string | null>(null);
  const { ref: endRef, inView } = useInView();

  //url에서 id 읽어오기
  const { id } = useParams<{ id: string }>();

  if (id === undefined) return <Navigate to="/" />;

  const { data: playlist } = useGetPlaylist({ playlist_id: id });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsLoadingError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT });

  // console.log('플레이리스트 상세정보 : ', playlist);
  console.log('playlist Items data : ', playlistItems);

  // 사이즈 측정
  useLayoutEffect(() => {
    const headHeight = headRef.current?.offsetHeight || 0;
    setMaxHeight(`calc( 100% - ${headHeight}px - 10px)`); // 64px 여백 포함 조정
  });

  // 무한 스크롤
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Box sx={{ height: 'calc( 100% - 64px)' }}>
      <PlaylistDetailHead ref={headRef} container spacing={3}>
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
        <Box>
          <Typography variant="h1" sx={{ margin: '20px 0', fontSize: { xs: '18px', sm: '24px' } }}>
            Let's find something for your playlist
          </Typography>
          <SearchBox variant="standard">
            <Input
              placeholder="Search for songs or episodes"
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon color="secondary" />
                </InputAdornment>
              }
            />
          </SearchBox>
        </Box>
      ) : (
        <PlaylistTableContainer maxHeight={maxHeight}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell sx={{ textAlign: 'center', width: { sm: '120px' } }}>
                  Date added
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemIndex) => {
                  return (
                    <>
                      <DesktopPlaylistItem
                        item={item}
                        key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                        index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                      />
                    </>
                  );
                })
              )}
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{
                    paddingTop: '0',
                  }}
                  ref={endRef}
                >
                  {isFetchingNextPage && <LoadingSpinner size={80} />}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </PlaylistTableContainer>
      )}
    </Box>
  );
};

export default PlaylistDetailPage;
