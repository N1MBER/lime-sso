import * as Yup from 'yup';

export const validationMessages = {
  required: 'Обязательное поле',
  numeric: 'Введите число',
  email: 'Неверный email',
  phone: 'Неверный номер телефона',
  passwordRepeat: 'Пароли не совпадают',
};

export const REQUIRED = Yup.mixed().required(validationMessages.required);

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EMAIL = Yup.string()
  .required(validationMessages.required)
  .test(
    'email',
    validationMessages.email,
    (value) =>
      (value || '').search(/[\s\p{sc=Cyrillic}]/u) === -1 &&
      emailRegex.test(value || ''),
  );

export const REQUIRED_CHECKBOX = (name: string) =>
  Yup.boolean().test(name, validationMessages.required, (value) => !!value);

export const REGEXP_TEST = (name: string, regexp: RegExp, message: string) =>
  Yup.string()
    .required(validationMessages.required)
    .test(name, message, (value) => regexp.test(value as string));

export const ONLY_NUMBERS = Yup.number()
  .required(validationMessages.required)
  .typeError(validationMessages.numeric);

export const PHONE = Yup.string().test(
  'phone',
  validationMessages.phone,
  (value) =>
    /^((\+7|7|8)(\s|-|\()?\d{3}(\s|-|\))?([0-9\-\s]){7,10})$/.test(
      value as string,
    ),
);

export const POSITIVE_NUMBER_SRTING = Yup.string()
  .nullable()
  .test(
    'Is positive?',
    'Число должно быть больше нуля',
    (value) => !value || (value ? Number(value) : 0) > 0,
  );

export const POSITIVE_NUMBER = Yup.number()
  .nullable()
  .test(
    'Is positive?',
    'Число должно быть больше нуля',
    (value) => !value || (value ?? 0) > 0,
  );

export const STRING_LENGTH = (
  min: number | undefined,
  max: number | undefined,
  trim?: boolean,
) =>
  Yup.string()
    .nullable()
    .test(
      'String Length',
      `Длина${min ? ` от ${min}` : ''}${max ? ` до ${max}` : ''} символов`,
      (str) => {
        let val = str;
        if (trim) {
          val = val?.trim();
        }

        return (
          !val ||
          !!(val && (!min || val.length >= min) && (!max || val.length <= max))
        );
      },
    );

export const CONFIRM = (name = 'password') =>
  Yup.string()
    .required(validationMessages.required)
    .oneOf([Yup.ref(name), null], 'Пароли не совпадают');

export const specialSymbolsRegex =
  // eslint-disable-next-line
  /[\+\\\×\÷\=\/\_\€\£\¥\₽\!\@\#\$\%\&\^\*\(\)\\'\:\;\,\?\`\~\\|\<\>\{\}\[\]\°\•\○\●\□\■\♤\♡\◇\♧\☆\▪︎\¤\《\》\¡\¿\.\±\§]/g;

export const cyrillicRegex = /[а-яё]/i;
export const latinRegex = /[a-z]/i;

export const isUserInitialsValid = (val?: string) => {
  if (!val) return false;

  const hasCyrillic = cyrillicRegex.test(val);
  const hasLatin = latinRegex.test(val);
  if (hasCyrillic && hasLatin) return false;

  const words = val.trim().split(/\s+/).filter(Boolean);

  if (words.length < 2) return false;

  for (const str of words) {
    if (!/^[-a-zа-яё]+$/i.test(str)) return false;
  }

  return true;
};
