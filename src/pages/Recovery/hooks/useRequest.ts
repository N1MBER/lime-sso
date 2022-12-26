import { useFlag } from '@consta/uikit/useFlag';
import { useAtom } from '@reatom/npm-react';
import { uuidAtom } from '##/atoms/uuid';
import { executeIaaAction } from '##/api/actions/iaa';
import { isStatusSuccess } from '##/utils/requests';

export const useRequest = () => {
  const [uuid] = useAtom(uuidAtom);
  const [isLoading, setIsLoading] = useFlag();

  const onSubmit = async (email: string) => {
    try {
      setIsLoading.on();
      const { data, status } = await executeIaaAction('change_password', uuid, {
        email,
      });
      if (isStatusSuccess(status)) {
        console.log(data);
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
