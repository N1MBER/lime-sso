import { useAtom } from '@reatom/npm-react';
import { useFlag } from '@consta/uikit/useFlag';
import { uuidAtom } from '##/atoms/uuid';
import { executeIaaAction } from '##/api/actions/iaa';
import { FormValues } from './useForm';
import { isStatusSuccess } from '##/utils/requests';

export const useRequest = () => {
  const [uuid] = useAtom(uuidAtom);
  const [isLoading, setIsLoading] = useFlag();

  const onSubmit = async (values: FormValues) => {
    if (uuid) {
      try {
        setIsLoading.on();
        const { data, status } = await executeIaaAction(
          'authentication',
          uuid,
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
