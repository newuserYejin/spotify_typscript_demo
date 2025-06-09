import { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse } from '../models/playlist';
import api from '../utils/api';

export const getCurrentUserPlaylist = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get('/me/playlists', {
      params: { limit, offset },
    });

    return response.data;
  } catch (error) {
    throw new Error('fail to fetch current user playlist');
  }
};
