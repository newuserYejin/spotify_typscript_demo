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
  enterKeywordFn?: () => void;
}

const SearchBox = ({ keyword, handelSearchKeyword, enterKeywordFn }: ISearchParams) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (enterKeywordFn) {
        enterKeywordFn(); // ✅ props가 있으면 실행
      }
    }
  };

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
        onKeyDown={handleKeyDown}
      />
    </SearchInputBox>
  );
};

export default SearchBox;
