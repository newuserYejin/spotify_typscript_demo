import { Height } from '@mui/icons-material';
import { ListItemButton, styled, Typography } from '@mui/material';
import React from 'react';

interface ItemProps {
  name: string;
  ownerName: string | null;
  imageSrc: string | null;
  id: string;
  handleClick: (id: string) => void;
  selected: boolean;
}

const ItemContainer = styled(ListItemButton)(({ theme, selected }) => ({
  padding: '8px',
  borderRadius: '8px',
  border: 'solid 1px',
  borderColor: theme.palette.background.paper,
  height: '100px',
  marginBottom: '8px',
  backgroundColor: selected ? theme.palette.action.active : '',

  [theme.breakpoints.down('sm')]: {},
}));

const ItemImgBox = styled('img')(({ theme }) => ({
  width: '35%',
  aspectRatio: '1/1',
  borderRadius: '10px',
  marginRight: '15px',

  [theme.breakpoints.down('sm')]: {
    height: '100%',
    width: 'auto',
  },
}));

const NoImgBox = styled('div')(({ theme }) => ({
  width: '35%',
  aspectRatio: '1/1',
  borderRadius: '10px',
  marginRight: '15px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: theme.palette.action.hover,
}));

const EllipsisTypography = styled(Typography)(({ theme }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: theme.palette.primary.main,
}));

const ItemInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  wordBreak: 'break-word',
}));

const PlaylistItem = ({ handleClick, name, ownerName, imageSrc, id, selected }: ItemProps) => {
  return (
    <ItemContainer selected={selected} onClick={() => handleClick(id)}>
      {imageSrc ? (
        <ItemImgBox src={imageSrc} alt={name + '커버이미지'} />
      ) : (
        <NoImgBox>No Image</NoImgBox>
      )}
      <ItemInfo>
        <EllipsisTypography typography="body1">{name}</EllipsisTypography>
        <Typography typography="subtitle1" sx={{ fontWeight: 'bold' }}>
          {ownerName}
        </Typography>
      </ItemInfo>
    </ItemContainer>
  );
};

export default PlaylistItem;
