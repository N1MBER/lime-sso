import React from 'react';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cnMixAuth } from '##/mixs/MixAuth';
import { cn } from '##/utils/bem';
import './Login.css';
import { FormikInput } from '##/components/controls/formik/FormikInput';
import { useForm } from './hooks/useForm';
import { useRequest } from './hooks/useRequest';

const cnLogin = cn('Login');

export const Login = () => {
  const { initialValues, schema } = useForm();

  const navigate = useNavigate();

  const { isLoading, onSubmit } = useRequest();

  const handleRecoveryClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/recovery');
  };

  const handleRegistrationClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/registration');
  };

  const { t } = useTranslation();

  return (
    <div
      className={cnLogin(null, [
        cnMixAuth(null, { withBottomContainer: true }),
      ])}
    >
      <Formik
        initialValues={initialValues}
        // validationSchema={schema}
        onSubmit={(values) => onSubmit(values)}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
      >
        {() => (
          <Form
            className={cnLogin('Container', [cnMixAuth('Container', null)])}
          >
            <Text
              size="3xl"
              lineHeight="xs"
              weight="semibold"
              className={cnLogin('Title')}
            >
              {t('login.title')}
            </Text>
            <FormikInput
              name="username"
              type="text"
              size="l"
              disabled={isLoading}
              width="full"
              placeholder={t('login.inputs.login.placeholder')?.toString()}
            />
            <FormikInput
              type="password"
              size="l"
              name="password"
              disabled={isLoading}
              autoComplete="current-password"
              width="full"
              placeholder={t('login.inputs.password.placeholder')?.toString()}
            />
            <div className={cnLogin('Forgot')}>
              <Text
                view="link"
                size="s"
                lineHeight="2xs"
                weight="semibold"
                as="a"
                href="/recovery"
                onClick={handleRecoveryClick}
              >
                {t('login.forgot')?.toString()}
              </Text>
            </div>
            <Button
              label={t('login.button')?.toString()}
              size="l"
              loading={isLoading}
              type="submit"
              form="round"
              width="full"
            />
          </Form>
        )}
      </Formik>
      <Text
        className={cnLogin('Additional', [cnMixAuth('Additional', null)])}
        size="m"
        lineHeight="s"
        weight="light"
      >
        {t('login.no_account')}
        <Text
          weight="semibold"
          as="a"
          view="link"
          href="/registration"
          onClick={handleRegistrationClick}
        >
          {t('login.registration')}
        </Text>
      </Text>
    </div>
  );
};
