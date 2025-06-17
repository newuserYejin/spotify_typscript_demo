import { FormControl, Input, InputAdornment, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';

const SearchInputBox = styled(FormControl)(({ theme }) => ({
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

interface ISearchParams {
  keyword: string;
  handelSearchKeyword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ keyword, handelSearchKeyword }: ISearchParams) => {
  return (
    <SearchInputBox variant="standard">
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
    </SearchInputBox>
  );
};

export default SearchBox;
