import React from 'react';
import './Registration.css';
import { Formik, Form } from 'formik';
import { Text } from '@consta/uikit/Text';
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Button } from '@consta/uikit/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { cnMixAuth } from '##/mixs/MixAuth';
import { FormikCheckbox } from '##/components/controls/formik/FormikCheckbox';
import { FormikInput } from '##/components/controls/formik/FormikInput';
import { useForm } from './hooks/useForm';
import { cn } from '##/utils/bem';
import { useRequest } from './hooks/useRequest';

const cnRegistration = cn('Registration');

export const Registration = () => {
  const { initialValues, schema } = useForm();

  const { t } = useTranslation();

  const { isTablet } = useBreakpoints({ isTablet: 700 });

  const { isLoading, onSubmit } = useRequest();

  const navigate = useNavigate();

  const handleNavigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.metaKey) {
      window.open(path);
      return;
    }
    navigate(path);
  };

  return (
    <div
      className={cnRegistration(null, [
        cnMixAuth(null, { withBottomContainer: true }),
      ])}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        onSubmit={(values) => onSubmit(values)}
      >
        {() => (
          <Form
            className={cnRegistration('Container', [
              cnMixAuth('Container', null),
            ])}
          >
            <Text
              size="3xl"
              lineHeight="xs"
              weight="semibold"
              className={cnRegistration('Title')}
            >
              {t('registration.title')}
            </Text>
            <Grid
              cols={isTablet ? 2 : 1}
              rowGap="m"
              colGap="l"
              className={cnRegistration('Grid')}
            >
              <GridItem col={1} row={1}>
                <FormikInput
                  name="username"
                  type="text"
                  required
                  size="l"
                  autoComplete="username"
                  disabled={isLoading}
                  width="full"
                  placeholder={t(
                    'registration.inputs.login.placeholder',
                  )?.toString()}
                  label={t('registration.inputs.login.label')?.toString()}
                />
              </GridItem>
              <GridItem col={1} row={1}>
                <FormikInput
                  name="email"
                  type="text"
                  required
                  size="l"
                  autoComplete="email"
                  disabled={isLoading}
                  width="full"
                  placeholder={t(
                    'registration.inputs.email.placeholder',
                  )?.toString()}
                  label={t('registration.inputs.email.label')?.toString()}
                />
              </GridItem>
              <GridItem col={1} row={1}>
                <FormikInput
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  size="l"
                  disabled={isLoading}
                  width="full"
                  placeholder={t(
                    'registration.inputs.password.placeholder',
                  )?.toString()}
                  label={t('registration.inputs.password.label')?.toString()}
                />
              </GridItem>
              <GridItem col={1} row={1}>
                <FormikInput
                  name="re_password"
                  type="password"
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                  size="l"
                  width="full"
                  placeholder={t(
                    'registration.inputs.re_password.placeholder',
                  )?.toString()}
                  label={t('registration.inputs.re_password.label')?.toString()}
                />
              </GridItem>
              <div className={cnRegistration('GridDivider')} />
              <GridItem col={1} row={1}>
                <FormikInput
                  name="phone"
                  type="phone"
                  required
                  size="l"
                  autoComplete="tel"
                  width="full"
                  disabled={isLoading}
                  placeholder={t(
                    'registration.inputs.phone.placeholder',
                  )?.toString()}
                  label={t('registration.inputs.phone.label')?.toString()}
                />
              </GridItem>
              <GridItem col={1} row={1}>
                <FormikInput
                  name="name"
                  type="text"
                  placeholder={t(
                    'registration.inputs.name.placeholder',
                  )?.toString()}
                  label={t('registration.inputs.name.label')?.toString()}
                  required
                  size="l"
                  disabled={isLoading}
                  width="full"
                />
              </GridItem>
            </Grid>
            <FormikCheckbox
              name="user_agreement"
              size="m"
              disabled={isLoading}
              className={cnRegistration('Agreement')}
              // @ts-ignore
              label={
                <>
                  {t('registration.confirm')}{' '}
                  <a href="https://magiclime.academy/platform.html">
                    {t('registration.rules')}
                  </a>{' '}
                  {t('other.and')}{' '}
                  <a href="https://magiclime.academy/privacy.html">
                    {t('registration.agreement')}
                  </a>
                </>
              }
            />
            <Button
              size="l"
              width="full"
              loading={isLoading}
              type="submit"
              label={t('registration.button')?.toString()}
            />
          </Form>
        )}
      </Formik>
      <Text
        className={cnRegistration('Additional', [
          cnMixAuth('Additional', null),
        ])}
        size="m"
        lineHeight="s"
        weight="light"
      >
        {t('registration.has_account')}
        <Text
          weight="semibold"
          as="a"
          view="link"
          href="/login"
          onClick={(e) => handleNavigate(e, '/login')}
        >
          {t('registration.sign_in')}
        </Text>
      </Text>
    </div>
  );
};
