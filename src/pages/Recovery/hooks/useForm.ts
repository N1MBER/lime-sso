import * as Yup from 'yup';
import { EMAIL } from '##/utils/validation';

export type FormValues = {
  email: string | null;
};

export const useForm = () => {
  const initialValues: FormValues = {
    email: null,
  };

  const schema = Yup.object().shape({
    email: EMAIL,
  });

  return {
    initialValues,
    schema,
  };
};
