import { Grid, styled, Typography } from '@mui/material';
import React from 'react';
import { transform } from 'typescript';

interface CategoryItemProps {
  icons: string;
  name: string;
}

const backgroundColors = [
  '#f94144',
  '#f3722c',
  '#f8961e',
  '#F9C74F',
  '#90BE6D',
  '#43AA8B',
  '#4D908E',
  '#577590',
  '#277DA1',
];

const ItemBox = styled(Grid)(({ theme }) => ({
  height: '200px',
  borderRadius: '8px',
  position: 'relative',
  overflow: 'hidden',
  padding: '10px',
  cursor: 'pointer',

  '& img': {
    width: '35%',
    aspectRatio: '1/1',
    position: 'absolute',
    right: '0',
    bottom: '10px',
    transform: 'rotate(-45deg)',
  },
}));

function randomNum() {
  return Math.floor(Math.random() * backgroundColors.length);
}

const CategoryItem = ({ icons, name }: CategoryItemProps) => {
  const random = randomNum();
  return (
    <ItemBox sx={{ backgroundColor: backgroundColors[random] }} size={{ xs: 12, sm: 6, md: 4 }}>
      <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold' }}>
        {name}
      </Typography>
      <img src={icons} alt="카테고리 아이콘" />
    </ItemBox>
  );
};

export default CategoryItem;
