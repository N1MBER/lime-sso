import { IaaAction } from '##/types/iaa';
import { instance } from '..';
import endpoints from '../endpoints';

export const generateIaaAction = (
  action: IaaAction,
  app_name: string,
  app_key: string,
) => instance.post(endpoints.iaa.generateAction(action, app_name, app_key));

export const derivateIaaAction = (
  action: IaaAction,
  id: string,
  derivated_action: IaaAction,
) => instance.post(endpoints.iaa.derivateActiion(action, id, derivated_action));

export const executeIaaAction = (action: IaaAction, id: string) =>
  instance.post(endpoints.iaa.executeAction(action, id));
