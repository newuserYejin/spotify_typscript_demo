import { Box, FormControl, Input, InputAdornment, styled, Typography } from '@mui/material';
import React, { useLayoutEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from './SearchResultList';
import LoadingSpinner from '../../../common/components/LoadingSpinner';

const SearchBox = styled(FormControl)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  padding: '10px 20px',
  width: '30%',
  marginBottom: '20px',

  [theme.breakpoints.down('md')]: {
    width: '60%',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

interface EmptyPlaylistWithSearchProps {
  maxHeight: string | null;
}

const EmptyPlaylistWithSearch = ({ maxHeight }: EmptyPlaylistWithSearchProps) => {
  const [keyword, setKeyWord] = useState<string>('');

  const { data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSearchItemsByKeyword({
      q: keyword,
      type: [SEARCH_TYPE.Track],
    });

  console.log('검색 데이터 : ', data);
  // 모든 페이지를 가져오기 위해 flatMap으로 바꿈
  const allTracks = data?.pages.flatMap((page) => page.tracks?.items || []) || [];

  function handelSearchKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    setKeyWord(event.target.value);
  }

  const searchTopRef = useRef<HTMLTableElement>(null);
  const [tableHeight, setTableHeight] = useState<string | null>(null);

  useLayoutEffect(() => {
    const searchHeight = searchTopRef.current?.offsetHeight || 0;
    setTableHeight(`calc( 100% - ${searchHeight}px)`);
  });

  return (
    <Box sx={{ maxHeight: maxHeight || 'auto', overflow: 'hidden', height: '100%' }}>
      <Box ref={searchTopRef}>
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
            value={keyword}
            onChange={handelSearchKeyword}
          />
        </SearchBox>
      </Box>

      {keyword && isLoading && <LoadingSpinner />}

      {!isLoading &&
        data?.pages.map((item, index) => {
          if (!item.tracks || item.tracks.total === 0)
            return <Typography variant="h2">No Result : {keyword}</Typography>;
          return (
            <SearchResultList
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              key={index}
              maxHeight={tableHeight}
              list={allTracks}
            />
          );
        })}
    </Box>
  );
};

export default EmptyPlaylistWithSearch;
