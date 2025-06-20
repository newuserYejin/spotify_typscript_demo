import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router';

import LibraryHead from './components/LibraryHead';
import Library from './components/Library';
import Navbar from './components/Navbar';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Layout = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  padding: '8px',

  // sm 사이즈 이하면 아래 반영
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const Sidebar = styled('div')(({ theme }) => ({
  width: '331px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginRight: '8px',

  // sm 사이즈 이하면 아래 반영
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: '100%',
  padding: '8px',
  marginBottom: '8px',
  marginRight: '8px',

  // sm 사이즈 이하면 아래 반영
  [theme.breakpoints.down('sm')]: {
    margin: '0',
    height: 'calc(100% - 70px)',
  },
}));

const NavList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&:active': {
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.text.primary,
  },
}));

const BottomBar = styled('div')(({ theme }) => ({
  width: '100%',
  height: '70px',
  backgroundColor: theme.palette.background.paper,
  display: 'none',
  color: theme.palette.text.secondary,

  // sm 사이즈 이하면 아래 반영
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}));

const IconBox = styled(NavLink)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  justifyContent: 'center',
  alignItems: 'center',

  color: theme.palette.text.secondary,
  textDecoration: 'none',

  '&.active': {
    color: theme.palette.text.primary,
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        {/* menu & search box */}
        <ContentBox>
          <NavList>
            <StyledNavLink to="/">
              <HomeIcon />
              <Typography variant="h2" fontWeight="700">
                Home
              </Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant="h2" fontWeight="700">
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>

        {/* playlist box */}
        <ContentBox height="90%">
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>

      <ContentBox>
        <Navbar />
        <Outlet />
      </ContentBox>
      <BottomBar>
        <IconBox to="/">
          <HomeIcon />
          <Typography variant="subtitle1">Home</Typography>
        </IconBox>
        <IconBox to="/search">
          <SearchIcon />
          <Typography variant="subtitle1">Search</Typography>
        </IconBox>
        <IconBox to="/playlist">
          <BookmarkIcon />
          <Typography variant="subtitle1">Library</Typography>
        </IconBox>
      </BottomBar>
    </Layout>
  );
};

export default AppLayout;
