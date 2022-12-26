import { useAtom } from '@reatom/npm-react';
import { useFlag } from '@consta/uikit/useFlag';
import { uuidAtom } from '##/atoms/uuid';
import { FormValues } from './useForm';
import { executeIaaAction } from '##/api/actions/iaa';
import { isStatusSuccess } from '##/utils/requests';

export const useRequest = () => {
  const [uuid] = useAtom(uuidAtom);
  const [isLoading, setIsLoading] = useFlag();

  const onSubmit = async (values: FormValues) => {
    if (uuid) {
      try {
        setIsLoading.on();
        const { data, status } = await executeIaaAction('registration', uuid, {
          username: values.username,
          password: values.password,
          email: values.email,
          phone: values.phone,
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
