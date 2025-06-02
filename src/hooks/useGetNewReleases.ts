import { useQuery } from '@tanstack/react-query';
import { getNewReleases } from '../apis/albumApi';

const useGetUseReleases = () => {
  return useQuery({
    queryKey: ['new-release'],
    queryFn: async () => {
      return getNewReleases();
    },
  });
};
