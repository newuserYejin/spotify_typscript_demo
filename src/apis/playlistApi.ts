import axios from 'axios';
import {
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistRequest,
  PlaylistObject,
} from '../models/playlist';
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

export const getPlaylist = async (params: GetPlaylistRequest): Promise<PlaylistObject> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });

    return response.data;
  } catch (error) {
    throw new Error('fail to fetch playlist detail');
  }
};
