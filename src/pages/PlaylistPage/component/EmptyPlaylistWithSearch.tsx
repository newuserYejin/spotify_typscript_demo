import { Box, FormControl, Input, InputAdornment, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = styled(FormControl)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  padding: '10px 20px',
  width: '30%',

  [theme.breakpoints.down('md')]: {
    width: '60%',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyWord] = useState<string>('');

  function handelSearchKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    setKeyWord(event.target.value);
  }

  const searchKeyword = () => {};

  return (
    <Box>
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
  );
};

export default EmptyPlaylistWithSearch;
