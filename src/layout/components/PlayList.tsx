import React, { useState } from 'react';
import { SimplifiedPlaylistObject } from '../../models/playlist';
import { Navigate, useNavigate } from 'react-router';
import PlaylistItem from '../../common/components/PlaylistItem';

interface PlayListProps {
  playlists: SimplifiedPlaylistObject[];
}

const PlayList = ({ playlists }: PlayListProps) => {
  // 아직 왜 쓰는지 모름
  const [selectedId, setSelectedId] = useState<string>('');

  const navigate = useNavigate();

  const handleClick = (id: string) => {
    setSelectedId(id);
    navigate(`/playlist/${id}`);
  };

  return (
    <div>
      {playlists.map((item) => (
        <PlaylistItem
          handleClick={handleClick}
          name={item.name || ''}
          ownerName={'Playlist ' + item.owner?.display_name}
          imageSrc={(item.images && item.images[0]?.url) || null}
          id={item.id || ''}
          key={item.id}
          selected={selectedId == item.id}
        />
      ))}
    </div>
  );
};

export default PlayList;
