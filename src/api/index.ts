import Axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { DOMAIN } from '##/utils/env';

export const instance = Axios.create({
  baseURL: `${DOMAIN}`,
  headers: {
    'Content-Type': 'application/json',
    'Global-Currency': Cookies.get('user_preffered_currency'),
  },
  withCredentials: true,
});

export const p2p = Axios.create({
  baseURL: process.env.REACT_APP_LIMEP2P_API,
});

export const setP2PAuthToken = (token: string) => {
  p2p.defaults.headers.Authorization = `Bearer ${token}`;
};

export const setAuthToken = (token: string) => {
  instance.defaults.headers.Authorization = `Bearer ${token}`;
};

export const deleteAuthHeader = () => {
  delete instance.defaults.headers?.Authorization;
  delete p2p.defaults.headers?.Authorization;
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error?.response?.status === 429) {
      console.log('Очень много запросов на сервер. Пожалуйста, подождите.');
      return error.response;
    }

    const originalRequest: typeof error.config & { _retry?: boolean } =
      error.config ?? {};

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }

    return Promise.reject(error.response);
  },
);
