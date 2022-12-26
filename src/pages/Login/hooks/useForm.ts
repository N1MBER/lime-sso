import * as Yup from 'yup';
import { STRING_LENGTH, validationMessages } from '##/utils/validation';

export type FormValues = {
  username: string | null;
  password: string | null;
};

export const useForm = () => {
  const initialValues: FormValues = {
    username: null,
    password: null,
  };

  const schema = Yup.object().shape({
    username: STRING_LENGTH(5, 20).required(validationMessages.required),
    password: STRING_LENGTH(8, 24).required(validationMessages.required),
  });

  return {
    initialValues,
    schema,
  };
};
