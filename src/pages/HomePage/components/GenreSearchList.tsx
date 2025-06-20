import { alpha, Grid, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import Card from '../../../common/components/Card';
import { PAGE_LIMIT } from '../../../configs/commonConfig';
import LoadingSpinner from '../../../common/components/LoadingSpinner';

const GenreItem = styled(Grid)(({ theme }) => ({
  border: 'solid 2px white',
  backgroundColor: theme.palette.action.hover,
  borderRadius: '8px',
  fontSize: '1.1rem',
  padding: '10px',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.5),
  },

  '.selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.5),
  },
}));

const GenreSearchList = () => {
  const genreList = ['r&b', 'k-pop', 'j-pop', 'hip hop', 'latin', 'dance'];
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const { data, isLoading } = useSearchItemsByKeyword({
    q: `genre:${selectedGenre}`,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist],
    limit: 6,
  });
  let trackData;
  let artistData;

  function handleSelectedGenre(genre: string) {
    if (genre) {
      setSelectedGenre(genre);
    }
  }

  if (data) {
    trackData = data?.pages[0].tracks;
    artistData = data?.pages[0].artists;
  }
  console.log('dddddd : ', data);

  return (
    <>
      <Typography
        variant="h1"
        sx={{ borderBottom: 'solid 1px white', paddingBottom: '10px', marginBottom: '10px' }}
      >
        Genre
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
        {genreList.map((genre) => (
          <GenreItem
            size={{ xs: 6, sm: 4 }}
            onClick={() => handleSelectedGenre(genre)}
            sx={{ backgroundColor: selectedGenre == genre ? alpha('#1ed760', 0.5) : '#282828' }}
          >
            {genre.toUpperCase()}
          </GenreItem>
        ))}
      </Grid>

      <Typography variant="h1">Tracks</Typography>
      {isLoading ? (
        <LoadingSpinner size={80} />
      ) : data ? (
        <Grid container spacing={2}>
          {trackData?.items.map((item) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.id}>
              <Card
                image={item.album?.images[0].url ?? ''}
                name={item.name ?? 'title'}
                artistName={
                  item.artists && item.artists?.length > 0 ? item.artists[0].name : 'unknown'
                }
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}

      <Typography variant="h1">Artist</Typography>
      {isLoading ? (
        <LoadingSpinner size={80} />
      ) : artistData?.items?.length ? (
        <Grid container spacing={2}>
          {artistData?.items.map((artist, artistIndex) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={artistIndex}>
              <Card
                image={artist.images?.[0]?.url ?? ''}
                name={artist.name ?? 'unknown'}
                artistName={artist.name}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </>
  );
};

export default GenreSearchList;
