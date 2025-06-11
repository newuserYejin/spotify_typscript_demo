import { ApiResponse } from './apiResponse';
import { Copyright, ExternalUrls, Image, Owner, Restriction } from './commonType';
import { EpisodeObject, Track } from './track';

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

// SimplifiedPlaylistObject와 PlaylistObject는 상당히 비슷하지만 tracks만 다르다.

// 공통 interface
export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean | null;
  snapshot_id?: string;
  type?: 'playlist';
  uri?: string;
}

export interface SimplifiedPlaylistObject extends BasePlaylist {
  tracks: {
    href?: string;
    total?: number;
  };
}

export interface PlaylistObject extends BasePlaylist {
  tracks: ApiResponse<PlaylistTrack>;
}

// ApiResponse 타입을 값으로 받는 키값값이 없는 경우이기 때문에 interface가 아닌 type로 작성
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylistObject>;

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface PlaylistTrack {
  added_at: string | null;
  added_by?: {
    external_urls: ExternalUrls;
    href?: string;
    id: string;
    type: 'user';
    uri: string;
  } | null;
  is_local?: boolean;
  track?: Track | EpisodeObject;
}
