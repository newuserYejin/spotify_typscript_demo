import { Box, FormControl, Input, InputAdornment, styled, Typography } from '@mui/material';
import React, { useLayoutEffect, useRef, useState } from 'react';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from './SearchResultList';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import SearchBox from './SearchBox';

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

  const searchTopRef = useRef<HTMLTableElement>(null);
  const [tableHeight, setTableHeight] = useState<string | null>(null);

  useLayoutEffect(() => {
    const searchHeight = searchTopRef.current?.offsetHeight || 0;
    setTableHeight(`calc( 100% - ${searchHeight}px)`);
  });

  function handelSearchKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    setKeyWord(event.target.value);
  }

  return (
    <Box sx={{ maxHeight: maxHeight || 'auto', overflow: 'hidden', height: '100%' }}>
      <Box ref={searchTopRef}>
        <Typography variant="h1" sx={{ margin: '20px 0', fontSize: { xs: '18px', sm: '24px' } }}>
          Let's find something for your playlist
        </Typography>
        <SearchBox keyword={keyword} handelSearchKeyword={handelSearchKeyword} />
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
