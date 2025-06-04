// auth 관련 타입 정의 공간
export interface ClientCredentialTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
