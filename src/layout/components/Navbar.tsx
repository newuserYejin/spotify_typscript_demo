import { Avatar, Box, IconButton, Menu, MenuItem, styled } from '@mui/material';
import React, { useState } from 'react';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import PersonIcon from '@mui/icons-material/Person';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router';
import SearchBox from '../../pages/PlaylistPage/component/SearchBox';
import { OneKk } from '@mui/icons-material';

const ProfileImageBox = styled('div')(({ theme }) => ({
  minWidth: '40px',
  aspectRatio: '1/1',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.text.secondary,
  cursor: 'pointer',
  position: 'relative',
}));

// 로그아웃 창
const LogoutBox = styled(Menu)(({ theme }) => ({
  position: 'absolute',
  top: '8px',

  '.MuiMenuItem-root': {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const logoutBox = Boolean(anchorEl);
  const queryClient = useQueryClient();
  const location = useLocation();

  const [keyword, setKwyWord] = useState<string>('');

  const handelSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKwyWord(event.target.value);
  };

  const removeUser = () => {
    setAnchorEl(null);
    localStorage.clear();
    queryClient.clear();
    // navigate('/');
    window.location.reload();
  };

  return (
    <Box
      display="flex"
      justifyContent={location.pathname.startsWith('/search') ? 'space-between' : 'flex-end'}
      alignItems="center"
      height="64px"
      width="100%"
    >
      {location.pathname.startsWith('/search') && (
        <SearchBox keyword={keyword} handelSearchKeyword={handelSearchKeyword} />
      )}
      {userProfile ? (
        userProfile.images[0] ? (
          <ProfileImageBox onClick={(e) => setAnchorEl(e.currentTarget)}>
            <IconButton aria-label="accountCircleIcon" size="large" sx={{ padding: '0px' }}>
              <Avatar src={userProfile.images[0]?.url} alt={userProfile.display_name} />
            </IconButton>
          </ProfileImageBox>
        ) : (
          <ProfileImageBox
            aria-controls={logoutBox ? 'logout-menu' : undefined}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              aria-label="accountCircleIcon"
              size="large"
              sx={{ padding: '0px' }}
            >
              <PersonIcon />
            </IconButton>
          </ProfileImageBox>
        )
      ) : (
        <LoginButton />
      )}
      <LogoutBox
        id="logout-menu"
        anchorEl={anchorEl}
        open={logoutBox}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={removeUser}>Logout</MenuItem>
      </LogoutBox>
    </Box>
  );
};

export default Navbar;
