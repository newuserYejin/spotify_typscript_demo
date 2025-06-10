import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getCurrentUserProfile } from '../apis/userApi';
import { User } from '../models/user';

const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
  // access_token 존재 여부 확인
  const accessToken = localStorage.getItem('access_token');

  return useQuery({
    queryKey: ['currentUserProfile', accessToken],
    queryFn: getCurrentUserProfile,
    // 실행 조건(accessToken이 있을때만 실행)
    enabled: !!accessToken,
  });
};

export default useGetCurrentUserProfile;
