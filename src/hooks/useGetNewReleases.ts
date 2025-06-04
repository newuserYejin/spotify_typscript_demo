import { useQuery } from '@tanstack/react-query';
import { getNewReleases } from '../apis/albumApi';
import useClientCredentialToken from './useClientCredentialToken';

const useGetNewReleases = () => {
  // token 값 가져오기
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ['new-release'],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error('No token available');
      }
      return getNewReleases(clientCredentialToken);
    },
  });
};

export default useGetNewReleases;
