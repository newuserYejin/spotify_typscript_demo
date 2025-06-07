import { Avatar, Box, IconButton, styled } from '@mui/material';
import React from 'react';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import PersonIcon from '@mui/icons-material/Person';

const ProfileImageBox = styled('div')(({ theme }) => ({
  minWidth: '40px',
  aspectRatio: '1/1',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.text.secondary,
  cursor: 'pointer',
}));
const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
      {userProfile ? (
        userProfile.images[0] ? (
          <ProfileImageBox>
            <IconButton aria-label="accountCircleIcon" size="large" sx={{ padding: '0px' }}>
              <Avatar src={userProfile.images[0]?.url} alt={userProfile.display_name} />
            </IconButton>
          </ProfileImageBox>
        ) : (
          <ProfileImageBox>
            <IconButton aria-label="accountCircleIcon" size="large" sx={{ padding: '0px' }}>
              <PersonIcon />
            </IconButton>
          </ProfileImageBox>
        )
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;
