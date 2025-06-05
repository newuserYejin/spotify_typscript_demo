import { Alert } from '@mui/material';
import React from 'react';

// ErrorMessageProps는 에러메세자에서만 사용될 것이기 때문에 model에 따로 작성하지 않는다.
interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return <Alert severity="error">${errorMessage}</Alert>;
};

export default ErrorMessage;
