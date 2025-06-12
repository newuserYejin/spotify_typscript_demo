import axios from 'axios';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';
import { SearchRequestParams, SearchRequestResponse } from '../models/search';
import { SimplifiedEpisode } from '../models/track';

export const searchItemsByKeyword = async (
  token: string,
  params: SearchRequestParams
): Promise<SearchRequestResponse> => {
  try {
    // api를 안쓰고 axios를 사용한 이유
    /*
    1. 로그인 없이도 search가 가능하기 때문에 authentication이 필요하지 않다.
     => NewRelease 를 부를때 처럼 clientCredentialToken 사용
     => api 사용시에는 header의 Authorization에 로그인 후 발행되는 access_token이 필수로 필요하게 되어있기
        때문에 api가 아닌 axios 사용
    */
    const searchParams = new URLSearchParams();
    searchParams.append('q', params.q);
    searchParams.append('type', params.type.join(','));

    if (params.market) searchParams.append('market', params.market);
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.offset) searchParams.append('offset', params.offset.toString());
    if (params.include_external) searchParams.append('include_external', params.include_external);

    const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('fail to search by keyword');
  }
};
