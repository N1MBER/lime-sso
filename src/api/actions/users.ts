import { UserAuthenticateData, UserUpdate } from '##/types/users';
import { instance } from '..';
import endpoints from '../endpoints';

export const authenticate = (data: UserAuthenticateData) =>
  instance.post(endpoints.users.authenticate, data);

export const getRefreshTokeb = (token: string) =>
  instance.post(endpoints.users.refresh, { token });

export const getUserInfo = () => instance.get(endpoints.users.info);

export const updateUserProfile = (data: UserUpdate) =>
  instance.post(endpoints.users.profile);
