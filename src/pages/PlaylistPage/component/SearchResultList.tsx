import React, { useEffect, useRef } from 'react';
import { Track } from '../../../models/track';
import {
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import { useInView } from 'react-intersection-observer';

interface SearchResultListProps {
  list: Track[];
  maxHeight: string | null;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const SearchResultItem = styled(TableRow)(({ theme }) => ({
  width: '100%',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SearchResultItemImg = styled('img')({
  width: '40px',
  aspectRatio: '1/1',
  borderRadius: '8px',
});

const SearchResultTable = styled(TableContainer)({
  width: '100%',

  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const SearchResultList = ({
  list,
  maxHeight,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { ref: endRef, inView } = useInView({
    root: containerRef.current, // 스크롤 대상 명시
  });

  // 무한 스크롤
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log('무한 스크롤 호출');
      fetchNextPage();
    }
  }, [inView]);

  return (
    <SearchResultTable ref={containerRef} sx={{ maxHeight: maxHeight, overflow: 'auto' }}>
      <Table aria-label="sticky table">
        <TableBody>
          {list.map((track, index) => (
            <SearchResultItem key={index}>
              <TableCell>
                <SearchResultItemImg src={track.album?.images[0].url} alt="노래 커버" />
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {track.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#b3b3b3' }}>
                  {track.artists ? track.artists[0]?.name : 'unknown'}
                </Typography>
              </TableCell>
              <TableCell>{track.album?.name}</TableCell>
              <TableCell>
                <Button sx={{ border: 'solid 1px ' }}>Add</Button>
              </TableCell>
            </SearchResultItem>
          ))}
          <TableRow>
            <TableCell
              colSpan={4}
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
    </SearchResultTable>
  );
};

export default SearchResultList;
