import { SimplifiedAlbum } from './album';
import { ApiResponse } from './apiResponse';
import { Artist } from './artist';
import { Copyright, ExternalUrls, Image, Owner, Restriction } from './commonType';

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
  type?: 'playlist';
  uri?: string;
}

export interface Track {
  album?: SimplifiedAlbum;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: {};
  restrictions?: Restriction;
  name?: string;
  popularity?: number;
  preview_url?: string | null;
  track_number?: number;
  type?: 'track';
  uri?: string;
  is_local?: boolean;
}

export interface EpisodeObject {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language?: string;
  languages: string[];
  name: string;
  release_date: string;

  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };

  type: 'episode';
  uri: string;
  restrictions?: Restriction;
  show: Show;
}

export interface Show {
  available_markets: string[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: 'show';
  uri: string;
  total_episodes: number;
}
