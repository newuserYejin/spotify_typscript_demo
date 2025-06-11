import React from 'react';
import { PlaylistTrack } from '../../../models/playlist';
import { TableCell, TableRow } from '@mui/material';
import { EpisodeObject, Track } from '../../../models/track';

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | EpisodeObject): track is EpisodeObject => {
    return track.type === 'episode';
  };

  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item?.track?.name || 'no name'}</TableCell>
      <TableCell>{item.track && isEpisode(item.track) ? 'N/A' : item.track?.album?.name}</TableCell>
      <TableCell>{item.added_at || 'unknown'}</TableCell>
      <TableCell>{item.track?.duration_ms || 'unknown'}</TableCell>
    </TableRow>
  );
};

export default DesktopPlaylistItem;
