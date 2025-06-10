import { ApiResponse } from './apiResponse';
import { ExternalUrls, Image, Owner } from './commonType';

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export interface SimplifiedPlaylistObject {
  collaborative?: boolean;
  description?: string;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  tracks: {
    href?: string;
    total?: number;
  };
  type?: string;
  uri?: string;
}

// ApiResponse 타입을 값으로 받는 킥밧이 없는 경우이기 때문에 interface가 아닌 type로 작성
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylistObject>;

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}
