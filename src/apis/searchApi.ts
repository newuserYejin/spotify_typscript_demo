import axios from 'axios';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';

export const searchItemsByKeyword = async (token, params) => {
  try {
    // api를 안쓰고 axios를 사용한 이유
    /*
    1. 로그인 없이도 search가 가능하기 때문에 authentication이 필요하지 않다.
     => NewRelease 를 부를때 처럼 clientCredentialToken 사용
     => api 사용시에는 header의 Authorization에 로그인 후 발행되는 access_token이 필수로 필요하게 되어있기
        때문에 api가 아닌 axios 사용
    */
    const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${}`,{
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      }
    });

    return response.data
  } catch (error) {
    throw new Error('fail to search by keyword');
  }
};
