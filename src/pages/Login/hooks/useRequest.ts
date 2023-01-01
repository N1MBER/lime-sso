import { useCtx } from '@reatom/npm-react';
import { useFlag } from '@consta/uikit/useFlag';
import { executeIaaAction } from '##/api/actions/iaa';
import { FormValues } from './useForm';
import { isStatusSuccess } from '##/utils/requests';
import { useUuid } from '##/hooks/useUuid';
import { iaaActionAtom } from '##/atoms/iaa';

export const useRequest = () => {
  const ctx = useCtx();
  const [isLoading, setIsLoading] = useFlag();
  const { exchangeUuid, uuid } = useUuid();

  const onSubmit = async (values: FormValues) => {
    if (uuid) {
      try {
        setIsLoading.on();
        let id = uuid;
        if (ctx.get(iaaActionAtom) !== 'authentication') {
          const newUuid = await exchangeUuid(uuid, 'authentication');
          if (typeof newUuid === 'string') {
            id = newUuid;
          }
        }
        const { data, status } = await executeIaaAction(
          'authentication',
          id,
          values,
        );
        if (isStatusSuccess(status)) {
          console.log(data.access_token);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading.off();
      }
    }
  };

  return {
    isLoading,
    onSubmit,
  };
};
