import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { AuthRes, LoginForm } from '../types/auth';
import { setCookies } from '../utils/cookie';
import { instance } from './utils';

const BASE_URL = 'auth/login';

export const useLogin = () => useMutation<AxiosResponse<AuthRes>, unknown, LoginForm>((data) =>
  instance.post(BASE_URL, {
    email: data.email.trim(),
    password: data.password.trim(),
  }),
  {
    onSuccess: (res) => {
      setCookies('authorization', res.data.model.token);
      setCookies('clientId', res.data.model.user.id);
      setCookies('email', res.data.model.user.email);
    },
  }
);
