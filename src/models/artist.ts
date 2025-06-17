import { ExternalUrls, Image } from './commonType';

export interface Artist {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}

export interface DetailedArtistObject extends Artist {
  followers?: {
    href?: string | null;
    total?: number;
  };
  genres?: string[];
  images?: Image[];
  popularity?: number;
}
