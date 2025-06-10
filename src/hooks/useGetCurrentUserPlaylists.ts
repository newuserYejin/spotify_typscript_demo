import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getCurrentUserPlaylist } from '../apis/playlistApi';
import { GetCurrentUserPlaylistRequest } from '../models/playlist';

const useGetCurrentUserPlaylists = ({ limit, offset }: GetCurrentUserPlaylistRequest) => {
  const accessToken = localStorage.getItem('access_token');

  return useInfiniteQuery({
    queryKey: ['current-user-playlists', accessToken],
    queryFn: ({ pageParam = 0 }) => {
      return getCurrentUserPlaylist({ limit, offset: pageParam });
    },
    enabled: !!accessToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get('offset');
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetCurrentUserPlaylists;
