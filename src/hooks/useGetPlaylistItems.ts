import { useInfiniteQuery } from '@tanstack/react-query';
import { GetPlaylistItemsRequest } from '../models/playlist';
import { getPlaylistItems } from '../apis/playlistApi';

const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
  const { retry = true } = params;

  return useInfiniteQuery({
    queryKey: ['playlist-items', params],
    queryFn: ({ pageParam }) => {
      return getPlaylistItems({ offset: pageParam, ...params });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get('offset');

        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
    retry: retry,
  });
};

export default useGetPlaylistItems;
