import { useFlag } from '@consta/uikit/useFlag';
import { useCtx } from '@reatom/npm-react';
import { executeIaaAction } from '##/api/actions/iaa';
import { isStatusSuccess } from '##/utils/requests';
import { iaaActionAtom } from '##/atoms/iaa';
import { useUuid } from '##/hooks/useUuid';
import { FormValues } from './useForm';

export const useRequest = () => {
  const [isLoading, setIsLoading] = useFlag();
  const ctx = useCtx();

  const { exchangeUuid, uuid } = useUuid();

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading.on();
      let id = uuid;
      if (ctx.get(iaaActionAtom) !== 'emergency_change_password') {
        const newUuid = await exchangeUuid(uuid, 'emergency_change_password');
        if (typeof newUuid === 'string') {
          id = newUuid;
        }
      }
      const { data: response, status } = await executeIaaAction(
        'emergency_change_password',
        id,
        data,
      );
      if (isStatusSuccess(status)) {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading.off;
    }
  };

  return {
    isLoading,
    onSubmit,
  };
};
