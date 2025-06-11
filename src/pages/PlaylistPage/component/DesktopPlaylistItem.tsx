import React from 'react';
import { PlaylistTrack } from '../../../models/playlist';
import { styled, TableCell, TableRow } from '@mui/material';
import { EpisodeObject, Track } from '../../../models/track';
import { data } from 'react-router';

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const PlaylistItem = styled(TableCell)({
  border: 'none',
});

const PlaylistItemBox = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | EpisodeObject): track is EpisodeObject => {
    return track.type === 'episode';
  };

  function formatDate(date: string) {
    const addDate = new Date(date);
    const year = addDate.getFullYear();
    const month = String(addDate.getMonth() + 1).padStart(2, '0');
    const day = String(addDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatTime(msTime: number) {
    const second = String(Math.floor((msTime / 1000) % 60)).padStart(2, '0');
    const minute = String(Math.floor(msTime / 1000 / 60)).padStart(2, '0');

    return `${minute}:${second}`;
  }

  return (
    <PlaylistItemBox>
      <PlaylistItem>{index}</PlaylistItem>
      <PlaylistItem>{item?.track?.name || 'no name'}</PlaylistItem>
      <PlaylistItem>
        {item.track && isEpisode(item.track) ? 'N/A' : item.track?.album?.name}
      </PlaylistItem>
      <PlaylistItem sx={{ textAlign: 'center' }}>
        {item.added_at ? formatDate(item.added_at) : 'unknown'}
      </PlaylistItem>
      <PlaylistItem sx={{ textAlign: 'center' }}>
        {item.track?.duration_ms ? formatTime(item.track.duration_ms) : 'unknown'}
      </PlaylistItem>
    </PlaylistItemBox>
  );
};

export default DesktopPlaylistItem;
