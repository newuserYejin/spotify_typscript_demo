import React, { useEffect } from 'react';
import useGetCategories from '../../hooks/useGetCategories';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { Box, Grid, Typography } from '@mui/material';
import { data } from 'react-router';
import CategoryListPage from './CategoryListPage';
import { useInView } from 'react-intersection-observer';

const SearchPage = () => {
  // 브라우저 사용 언어 받아오기
  let locale = navigator.language;

  if (!locale.includes('-')) {
    const lang = locale;
    if (lang == 'ko' || lang == 'KR') {
      locale = `${lang}-KR`; // 'ko-KR'
    } else {
      locale = 'en-US';
    }
  }

  console.log('사용 언어 : ', locale);

  const {
    data: categoryData,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetCategories({ locale, limit: PAGE_LIMIT });

  console.log('카테고리 데이터 : ', categoryData);

  // 페이지별 카테고리 데이터 연결
  const allCategories = categoryData?.pages.flatMap((page) => page?.categories.items || []) || [];

  const { ref: endRef, inView } = useInView();

  // 무한 스크롤
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log('무한 스크롤 호출');
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Box sx={{ height: '90%', maxHeight: 'calc(100% - 70px)' }}>
      <Typography variant="h1" sx={{ margin: '10px 0 15px' }}>
        Browse All
      </Typography>
      {categoryData && (
        <CategoryListPage
          isFetchingNextPage={isFetchingNextPage}
          endRef={endRef}
          categoryList={allCategories}
        />
      )}
    </Box>
  );
};

export default SearchPage;
