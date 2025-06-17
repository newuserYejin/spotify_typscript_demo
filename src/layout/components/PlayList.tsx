import React, { useEffect, useState } from 'react';
import { SimplifiedPlaylistObject } from '../../models/playlist';
import { Navigate, useLocation, useNavigate } from 'react-router';
import PlaylistItem from '../../common/components/PlaylistItem';

interface PlayListProps {
  playlists: SimplifiedPlaylistObject[];
}

const PlayList = ({ playlists }: PlayListProps) => {
  const [selectedId, setSelectedId] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/playlist/') || selectedId == '') {
      setSelectedId('');
    }
  }, [location.pathname]);

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
