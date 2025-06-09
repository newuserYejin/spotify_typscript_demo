import React, { useState } from 'react';
import { SimplifiedPlaylistObject } from '../../models/playlist';
import { useNavigate } from 'react-router';
import PlaylistItem from '../../common/components/PlaylistItem';

interface PlayListProps {
  playlists: SimplifiedPlaylistObject[];
}

const PlayList = ({ playlists }: PlayListProps) => {
  // 아딕 왜 쓰는지 모름
  // const [selectedId, setSelectedId] = useState<string>("");
  // const navigate = useNavigate();
  // const handleItemClick = (id: string) => {
  //   setSelectedId(id);
  //   navigate(`/playlist/${id}`);
  // };

  return (
    <div>
      {playlists.map((item) => (
        <PlaylistItem
          name={item.name || ''}
          ownerName={'Playlist ' + item.owner?.display_name}
          imageSrc={(item.images && item.images[0]?.url) || null}
          id={item.id || ''}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default PlayList;
