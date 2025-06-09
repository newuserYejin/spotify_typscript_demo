import { useQuery } from '@tanstack/react-query';
import { getCurrentUserPlaylist } from '../apis/playlistApi';
import { GetCurrentUserPlaylistRequest } from '../models/playlist';

const useGetCurrentUserPlaylists = ({ limit, offset }: GetCurrentUserPlaylistRequest) => {
  return useQuery({
    queryKey: ['current-user-playlists'],
    queryFn: () => {
      return getCurrentUserPlaylist({ limit, offset });
    },
  });
};

export default useGetCurrentUserPlaylists;
