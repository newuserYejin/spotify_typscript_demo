import { Avatar, Box, IconButton, Menu, MenuItem, styled } from '@mui/material';
import React, { useState } from 'react';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const removeUser = () => {
    setAnchorEl(null);
    localStorage.clear();
    queryClient.clear();
    // navigate('/');
    window.location.reload();
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
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
