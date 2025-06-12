import { SimplifiedAlbum } from './album';
import { Artist } from './artist';
import { Copyright, ExternalUrls, Image, Restriction } from './commonType';

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
  linked_from?: Track;
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

export type SimplifiedEpisode = Omit<EpisodeObject, 'show'> & {
  release_date_precision: string;
};

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

export interface SimplifiedAudioBook {
  authors: Author[];
  available_markets: string[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: {
    name: string;
  }[];
  publisher: string;
  type: 'audiobook';
  uri: string;
  total_chapters: number;
}

export interface Author {
  name: string;
}
