import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  CONFIRM,
  EMAIL,
  isUserInitialsValid,
  REGEXP_TEST,
  REQUIRED,
  REQUIRED_CHECKBOX,
} from '##/utils/validation';

export type FormValues = {
  login: string | null;
  email: string | null;
  password: string | null;
  re_password: string | null;
  name: string | null;
  user_agreement: boolean;
  media_sponsor: string | null;
};

export const useForm = () => {
  const initialValues: FormValues = {
    login: null,
    email: null,
    password: null,
    re_password: null,
    user_agreement: false,
    media_sponsor: null,
    name: null,
  };

  const { t } = useTranslation();

  const schema = Yup.object().shape({
    login: REGEXP_TEST(
      'login',
      /^([a-zA-Z0-9\-\\.]+)$/,
      t('errors.login.mask'),
    ),
    email: EMAIL,
    password: REGEXP_TEST(
      'password',
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      t('errors.password.mask'),
    )
      .min(8, t('errors.password.min')?.toString())
      .max(30, t('errors.password.max')?.toString())
      .test(
        'password',
        t('errors.password.username_exists_error')?.toString(),
        (value, context) => {
          const login: string = (context.parent.username || '').toLowerCase();
          const fieldValue: string = (value || '').toLowerCase();
          return !fieldValue.includes(login);
        },
      )
      .notOneOf(
        [Yup.ref('username')],
        t('errors.password.username_exists_error')?.toString(),
      ),
    re_password: CONFIRM(),
    media_sponsor: Yup.lazy((value) => {
      if (value && value.trim().length > 0) {
        return Yup.string().length(40, t('errors.media_sponsor')?.toString());
      }
      return Yup.string().trim().length(0);
    }),
    user_agreement: REQUIRED_CHECKBOX('user_agreement'),
    name: REQUIRED.test(
      'name',
      'ФИО должно содержать минимум 2 слова и не может содержать в себе симфолы, цифры или логин',
      isUserInitialsValid,
    ),
  });

  return {
    initialValues,
    schema,
  };
};
