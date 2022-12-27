import { useAtom, useAction } from '@reatom/npm-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { uuidAtom } from '##/atoms/uuid';
import { IaaAction } from '##/types/iaa';
import { iaaActionAtom } from '##/atoms/iaa';
import { derivateIaaAction } from '##/api/actions/iaa';
import { isStatusSuccess } from '##/utils/requests';

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

  const exchangeUuid = async (
    uuid: string,
    action: IaaAction,
  ): Promise<string | undefined> => {
    const { data, status } = await derivateIaaAction(iaaAction, uuid, action);
    if (isStatusSuccess(status)) {
      setUuid(data.id);
      setIaaAction(action);
      return data.id;
    }
    return undefined;
  };

  useEffect(() => {
    const uuid = getUuidFromPathname(pathname);
    uuid && setUuid(uuid);
  }, [pathname]);

  return {
    exchangeUuid,
    uuid,
  };
};
