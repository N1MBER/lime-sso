import Axios, { AxiosError } from 'axios';
import { DOMAIN } from '##/utils/env';

export const instance = Axios.create({
  baseURL: `${DOMAIN}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const setAuthToken = (token: string) => {
  instance.defaults.headers.Authorization = `Bearer ${token}`;
};

export const deleteAuthHeader = () => {
  delete instance.defaults.headers?.Authorization;
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
