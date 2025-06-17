import { useInfiniteQuery } from '@tanstack/react-query';
import { GetCategoryRequest } from '../models/category';
import { getCategories } from '../apis/categoryApi';
import useClientCredentialToken from './useClientCredentialToken';

const useGetCategories = (params: GetCategoryRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ['playlist-category', params],
    queryFn: ({ pageParam = 0 }) => {
      console.log('useCategory 호출');
      if (!clientCredentialToken) throw new Error('fail to fetch category because no token');
      return getCategories(clientCredentialToken, { offset: pageParam, ...params });
    },
    enabled: !!clientCredentialToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.categories.next) {
        const url = new URL(lastPage.categories.next);
        const nextOffset = url.searchParams.get('offset');

        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetCategories;
