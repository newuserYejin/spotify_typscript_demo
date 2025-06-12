import { SimplifiedAlbum } from './album';
import { ApiResponse } from './apiResponse';
import { Artist } from './artist';
import { SimplifiedPlaylistObject } from './playlist';
import { Show, SimplifiedAudioBook, SimplifiedEpisode, Track } from './track';

export enum SEARCH_TYPE {
  Track = 'track',
  Album = 'album',
  Artist = 'artist',
  Playlist = 'playlist',
  Show = 'show',
  Episode = 'episode',
  AudioBook = 'audiobook',
}

export interface SearchRequestParams {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
}

export interface SearchRequestResponse {
  tracks?: ApiResponse<Track>;
  artists?: ApiResponse<Artist>;
  albums?: ApiResponse<SimplifiedAlbum>;
  playlists?: ApiResponse<SimplifiedPlaylistObject>;
  shows?: ApiResponse<Show>;
  episodes?: ApiResponse<SimplifiedEpisode>;
  audiobooks: ApiResponse<SimplifiedAudioBook>;
}
