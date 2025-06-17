import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import { Avatar, Box, Grid, styled, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayButton from '../../common/components/PlayButton';

const SearchResultBox = styled(Grid)(({ theme }) => ({
  height: 'calc( 100% - 125px )',
  width: '100%',
  overflowY: 'auto',

  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    // Chrome, Safari, Edge
    display: 'none',
  },
}));

const SongsItem = styled('div')(({ theme }) => ({
  padding: '8px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,

    ' .fade-icon': {
      opacity: 1,
    },
  },

  '& .fade-icon': {
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
}));

const ArtistItem = styled(Grid)(({ theme }) => ({
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  height: '250px',
  justifyContent: 'space-between',
  position: 'relative',

  '& img': {
    width: '90%',
    aspectRatio: '1/1',
    borderRadius: '50%',
  },

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translated3d(0,0,0)',
    transition: 'opacity 0.3s ease-in-out',
  },

  '&:hover .overlay': {
    opacity: 1,
  },
}));

const AlbumItem = styled(Grid)(({ theme }) => ({
  padding: '8px',
  display: 'flex',
  height: '250px',
  flexDirection: 'column',
  position: 'relative',
  justifyContent: 'space-between',

  '& img': {
    width: '90%',
    aspectRatio: '1/1',
    borderRadius: '8px',
  },

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translated3d(0,0,0)',
    transition: 'opacity 0.3s ease-in-out',
  },

  '&:hover .overlay': {
    opacity: 1,
  },
}));

const GridBox = styled(Grid)(({ theme }) => ({
  maxHeight: '250px',
  overflow: 'auto',
  padding: '10px',

  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    // Chrome, Safari, Edge
    display: 'none',
  },

  backgroundColor: '#434343',
  borderRadius: '10px',
}));

const BoxTitle = styled(Typography)({
  fontSize: '1.2rem',
  paddingBottom: '5px',
  marginBottom: '10px',
  borderBottom: 'solid 1px white',
  fontWeight: 'bold',
});

const TopResultBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 1.2rem - 20px)',
  padding: '15px',
  justifyContent: 'space-between',
  position: 'relative',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translated3d(0,0,0)',
    transition: 'opacity 0.3s ease-in-out',
  },

  '&:hover .overlay': {
    opacity: 1,
  },
}));

const Overlay = styled('div')({
  position: 'absolute',
  width: '100%',
  bottom: '10px',
  right: '10px',
  display: 'flex',
  justifyContent: 'flex-end',

  opacity: 0,
  transform: 'translate3d(0, 0, 0)',
  transition: 'opacity 0.5s ease-in-out',
});

const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();

  if (!keyword || keyword === undefined) {
    return <div>검색어가 없습니다.</div>;
  }

  const {
    data: searchData,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useSearchItemsByKeyword({
    q: keyword ?? '',
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
    limit: 6,
  });

  console.log('검색 결과 데이터 : ', searchData);

  const tracks = searchData?.pages.flatMap((page) => page.tracks?.items || []) || [];
  const artists = searchData?.pages.flatMap((page) => page.artists?.items || []) || [];
  const albums = searchData?.pages.flatMap((page) => page.albums?.items || []) || [];

  function formatTime(msTime: number) {
    const second = String(Math.floor((msTime / 1000) % 60)).padStart(2, '0');
    const minute = String(Math.floor(msTime / 1000 / 60)).padStart(2, '0');

    return `${minute}:${second}`;
  }

  return (
    <>
      <Typography variant="h1" sx={{ margin: '15px' }}>
        " {keyword} " 검색 결과
      </Typography>
      <SearchResultBox container spacing={2}>
        <GridBox size={{ sm: 6, xs: 12 }}>
          <BoxTitle variant="h2">Top Result</BoxTitle>
          <TopResultBox>
            <Avatar
              sx={{ width: 100, height: 100 }}
              variant="square"
              src={tracks[0]?.album?.images[0].url}
            />
            <Typography variant="h1">{tracks[0]?.name}</Typography>
            {tracks[0]?.artists?.[0]?.name ? (
              <Typography>Song : {tracks[0].artists[0].name}</Typography>
            ) : (
              <Typography>Song : unknown</Typography>
            )}

            <Overlay className="overlay">
              <PlayButton />
            </Overlay>
          </TopResultBox>
        </GridBox>
        <GridBox size={{ sm: 6, xs: 12 }}>
          <BoxTitle variant="h2">Songs</BoxTitle>
          {tracks?.map((item, songIndex) => (
            <SongsItem key={songIndex}>
              <Avatar
                sx={{ marginRight: '5px' }}
                variant="square"
                src={item.album?.images[0].url}
                alt="곡 이미지"
              />
              <Box
                sx={{
                  width: '40%',
                  display: '-webkit-box', // 필수: 플렉스처럼 보이게 함
                  overflow: 'hidden', // 필수: 넘치는 내용 숨김
                  WebkitBoxOrient: 'vertical', // 필수: 수직 방향으로 자르기
                  WebkitLineClamp: 2,
                }}
              >
                {item.name}
              </Box>
              <AddCircleOutlineIcon className="fade-icon" sx={{ opacity: 0 }} />
              <div>{item.duration_ms ? formatTime(item.duration_ms) : 'unknown'}</div>
            </SongsItem>
          ))}
        </GridBox>
        <GridBox size={12} sx={{ height: 'fit-content', maxHeight: 'none' }}>
          <BoxTitle variant="h2">Artists</BoxTitle>
          <Grid container>
            {artists?.map((item, artistIndex) => (
              <ArtistItem size={{ xs: 6, sm: 4, md: 2 }} key={artistIndex}>
                <Box sx={{ width: '100%' }} display="flex" justifyContent="center">
                  <img src={item.images?.[0]?.url} />
                </Box>
                <Typography>{item.name}</Typography>
                <Typography sx={{ color: '#b1abab' }}>{item.type}</Typography>
                <Overlay className="overlay">
                  <PlayButton />
                </Overlay>
              </ArtistItem>
            ))}
          </Grid>
        </GridBox>
        <GridBox size={12} sx={{ height: 'fit-content', maxHeight: 'none' }}>
          <BoxTitle variant="h2">Albums</BoxTitle>
          <Grid container>
            {albums?.map((item, albumIndex) => (
              <AlbumItem key={albumIndex} size={{ xs: 6, sm: 4, md: 2 }}>
                <Box sx={{ width: '100%' }} display="flex" justifyContent="center">
                  <img src={item.images?.[0]?.url} />
                </Box>
                <Typography>{item.name}</Typography>
                <Typography sx={{ color: '#b1abab' }}>{item.type}</Typography>

                <Overlay className="overlay">
                  <PlayButton />
                </Overlay>
              </AlbumItem>
            ))}
          </Grid>
        </GridBox>
      </SearchResultBox>
    </>
  );
};

export default SearchWithKeywordPage;
