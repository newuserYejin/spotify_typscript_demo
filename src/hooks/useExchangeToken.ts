import { useMutation } from '@tanstack/react-query';
import { exchangeToken } from '../apis/authApi';
import { ExchangeTokenResponse } from '../models/auth';

const useExchangeToken = () => {
  // get이 아닌 post이기 때문에 useQuery가 아닌 useMutation
  return useMutation<ExchangeTokenResponse, Error, { code: string; codeVerifier: string }>({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    // 성공시 진행할 것
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token);
    },
  });
};

// useMutation 쓸 때 제네릭으로 미리 타입 정의 선언 순서

/*
  useMutation<응답값 타입, 에러 타입, mutation 함수 파라미터 값 타입>
*/

export default useExchangeToken;
