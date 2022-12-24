import { IaaAction } from '##/types/iaa';

export default {
  iaa: {
    generateAction: (action: IaaAction, app_name: string, app_key: string) =>
      `/iaa/${action}/?app_name=${app_name}&app_key=${app_key}`,
    derivateActiion: (
      action: IaaAction,
      id: string,
      derivated_action: IaaAction,
    ) => `/iaa/${action}/${id}/${derivated_action}/`,
    executeAction: (action: IaaAction, id: string) => `/iaa/${action}/${id}`,
  },
  users: {
    authenticate: '/users/token/',
    refresh: '/users/token/refresh/',
    info: '/users/info/',
    profile: '/users/profile/',
  },
};
