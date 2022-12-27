import { useAtom } from '@reatom/npm-react';
import { useFlag } from '@consta/uikit/useFlag';
import { FormValues } from './useForm';
import { executeIaaAction } from '##/api/actions/iaa';
import { isStatusSuccess } from '##/utils/requests';
import { iaaActionAtom } from '##/atoms/iaa';
import { useUuid } from '##/hooks/useUuid';

export const useRequest = () => {
  const [isLoading, setIsLoading] = useFlag();
  const [iaaAction] = useAtom(iaaActionAtom);

  const { exchangeUuid, uuid } = useUuid();

  const onSubmit = async (values: FormValues) => {
    if (uuid) {
      try {
        setIsLoading.on();
        let id = uuid;
        if (iaaAction !== 'registration') {
          const newUuid = await exchangeUuid(uuid, 'registration');
          if (typeof newUuid === 'string') {
            id = newUuid;
          }
        }
        const { data, status } = await executeIaaAction('registration', id, {
          username: values.username,
          password: values.password,
          email: values.email,
          phone: `+${values.phone}`,
        });
        if (isStatusSuccess(status)) {
          console.log(data);
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
