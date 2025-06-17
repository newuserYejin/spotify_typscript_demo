import axios from 'axios';
import { GetCategoryRequest, GetCategoryResponse } from '../models/category';
import api from '../utils/api';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';

export const getCategories = async (
  token: string,
  params: GetCategoryRequest
): Promise<GetCategoryResponse> => {
  try {
    console.log('호출 됐음');
    const searchParams = new URLSearchParams();
    if (params.locale) searchParams.append('locale', params.locale);
    if (params.offset) searchParams.append('offset', params.offset.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());

    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/browse/categories?${searchParams.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('fail to fetch playlist categories');
  }
};
