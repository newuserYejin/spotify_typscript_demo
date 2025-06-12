import axios from 'axios';
import {
  CreatePlaylistRequest,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
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

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest
): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });

    return response.data;
  } catch (error) {
    // const status = (error as any)?.response?.status;
    // if (status) {
    //   throw { status, message: 'fail to fetch playlist items' };
    // }
    // throw new Error('fail to fetch playlist items');

    throw error;
  }
};

// playlist 생성
export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest
): Promise<PlaylistObject> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });

    return response.data;
  } catch (error) {
    throw new Error('fail to create new playlist');
  }
};
