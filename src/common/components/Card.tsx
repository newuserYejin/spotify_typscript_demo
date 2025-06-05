import { styled, Typography } from '@mui/material';
import React from 'react';
import { transform } from 'typescript';
import PlayButton from './PlayButton';

// 카드 디자인
const CardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',

  height: '100%',
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  cursor: 'pointer',
  minWidth: '160px',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translated3d(0,0,0)',
    transition: 'opacity 0.3s ease-in-out',
  },

  '&:hover .overlay': {
    opacity: 1,
  },
}));

const CardImg = styled('img')(({ theme }) => ({
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: '8px',
}));

const CardInfoBox = styled('div')(({ theme }) => ({
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '10px',

  wordBreak: 'break-word',
}));

const CardInfo = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const Overlay = styled('div')({
  position: 'absolute',
  width: '100%',
  bottom: '3px',
  right: '3px',
  display: 'flex',
  justifyContent: 'flex-end',

  opacity: 0,
  transform: 'translate3d(0, 0, 0)',
  transition: 'opacity 0.3s ease-in-out',
});

interface cardProps {
  name: string;
  image: string;
  artistName: string | undefined;
}

const Card = ({ image, name, artistName }: cardProps) => {
  return (
    <CardContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <CardImg src={image} />
        <Overlay className="overlay">
          <PlayButton />
        </Overlay>
      </div>
      <CardInfoBox>
        <CardInfo>{name}</CardInfo>
        <CardInfo>{artistName}</CardInfo>
      </CardInfoBox>
    </CardContainer>
  );
};

export default Card;
