import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddItemToPlaylistRequest } from '../models/playlist';
import { addItemToPlaylist } from '../apis/playlistApi';

const useAddItemToPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddItemToPlaylistRequest) => {
      return addItemToPlaylist(params);
    },
    onSuccess: () => {
      console.log('아이템 추가 성공');
      queryClient.invalidateQueries({ queryKey: ['current-user-playlists'] });
      queryClient.invalidateQueries({ queryKey: ['playlist-detail'] });
      queryClient.invalidateQueries({ queryKey: ['playlist-items'] });
    },
  });
};

export default useAddItemToPlaylist;
