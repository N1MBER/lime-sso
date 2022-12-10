import React from 'react';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { Form, Formik } from 'formik';
import { cnMixAuth } from '##/mixs/MixAuth';
import { cn } from '##/utils/bem';
import './Login.css';
import { FormikInput } from '##/components/controls/formik/FormikInput';
import { useForm } from './hooks/useForm';

const cnLogin = cn('Login');

export const Login = () => {
  const { initialValues, schema } = useForm();

  return (
    <div
      className={cnLogin(null, [
        cnMixAuth(null, { withBottomContainer: true }),
      ])}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={() => {}}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
      >
        {({ values }) => (
          <Form
            className={cnLogin('Container', [cnMixAuth('Container', null)])}
          >
            <Text
              size="3xl"
              lineHeight="xs"
              weight="semibold"
              className={cnLogin('Title')}
            >
              Вход
            </Text>
            <FormikInput
              name="login"
              type="text"
              size="l"
              width="full"
              placeholder="Логин"
            />
            <FormikInput
              type="password"
              size="l"
              name="password"
              width="full"
              placeholder="Пароль"
            />
            <div className={cnLogin('Forgot')}>
              <Text
                view="link"
                size="s"
                lineHeight="2xs"
                weight="semibold"
                as="a"
                href="/recovery"
              >
                Забыли пароль?
              </Text>
            </div>
            <Button label="Войти" size="l" form="round" width="full" />
          </Form>
        )}
      </Formik>
      <Text
        className={cnLogin('Additional', [cnMixAuth('Additional', null)])}
        size="m"
        lineHeight="s"
        weight="light"
      >
        Нет аккаунта?
        <Text weight="semibold" as="a" view="link" href="registration">
          Зарегистрируйтесь
        </Text>
      </Text>
    </div>
  );
};
