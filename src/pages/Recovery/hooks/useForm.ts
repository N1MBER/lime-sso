import * as Yup from 'yup';
import { EMAIL, STRING_LENGTH, validationMessages } from '##/utils/validation';

export type FormValues = {
  email: string | null;
  new_password: string | null;
};

export const useForm = () => {
  const initialValues: FormValues = {
    email: null,
    new_password: null,
  };

  const schema = Yup.object().shape({
    email: EMAIL,
    new_password: STRING_LENGTH(8, 24).required(validationMessages.required),
  });

  return {
    initialValues,
    schema,
  };
};
