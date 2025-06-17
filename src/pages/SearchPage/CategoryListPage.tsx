import React from 'react';
import { Category, GetCategoryResponse } from '../../models/category';
import CategoryItem from './component/CategoryItem';
import { Grid, styled, Typography } from '@mui/material';
import LoadingSpinner from '../../common/components/LoadingSpinner';

interface CategoryListProps {
  endRef: () => void;
  isFetchingNextPage: boolean;
  categoryList: Category[];
}

const CategoryContainer = styled(Grid)({
  height: 'calc( 100% - 40px )',
  overflowY: 'auto',

  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    // Chrome, Safari, Edge
    display: 'none',
  },
});

const CategoryListPage = ({ endRef, isFetchingNextPage, categoryList }: CategoryListProps) => {
  return (
    <CategoryContainer container spacing={2}>
      {categoryList.map((category, categoryIndex) => (
        <CategoryItem icons={category.icons[0].url} name={category.name} key={categoryIndex} />
      ))}
      <Grid size={12} sx={{ textAlign: 'center' }} ref={endRef}>
        - END -
      </Grid>
    </CategoryContainer>
  );
};

export default CategoryListPage;
