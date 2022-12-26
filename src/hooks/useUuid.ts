import { useAtom, useAction } from '@reatom/npm-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { uuidAtom } from '##/atoms/uuid';
import { IaaAction } from '##/types/iaa';
import { iaaActionAtom } from '##/atoms/iaa';
import { derivateIaaAction } from '##/api/actions/iaa';
import { isStatusSuccess } from '##/utils/requests';
import { AuthAction } from '##/types/common';

const getIaaAction = (type: AuthAction): IaaAction => {
  if (type === 'registration') return 'registration';
  if (type === 'recovery') return 'emergency_change_password';
  return 'authentication';
};

const getAuthAction = (path: string): AuthAction => {
  if (path.includes('login')) return 'login';
  if (path.includes('recovery')) return 'recovery';
  return 'registration';
};

const getUuidFromPathname = (pathname: string) => {
  if (pathname.includes('login')) {
    return pathname.split('/')[2];
  }
  return undefined;
};

export const useUuid = () => {
  const [uuid] = useAtom(uuidAtom);
  const [iaaAction] = useAtom(iaaActionAtom);

  const { pathname } = useLocation();

  const setUuid = useAction((ctx, value: string) => uuidAtom(ctx, value));

  const setIaaAction = useAction((ctx, value: IaaAction) =>
    iaaActionAtom(ctx, value),
  );

  const exchangeUuid = async (uuid: string, action: IaaAction) => {
    try {
      const { data, status } = await derivateIaaAction(iaaAction, uuid, action);
      if (isStatusSuccess(status)) {
        setUuid(data.id);
        setIaaAction(action);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const uuid = getUuidFromPathname(pathname);
    uuid && setUuid(uuid);
  }, [pathname]);

  useEffect(() => {
    if (uuid) {
      const deerivated_action = getIaaAction(getAuthAction(pathname));
      if (deerivated_action !== iaaAction && iaaAction) {
        exchangeUuid(uuid, deerivated_action);
      }
    }
  }, [uuid, pathname]);
};
