import React from 'react';
import './Recovery.css';
import { Text } from '@consta/uikit/Text';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { Button } from '@consta/uikit/Button';
import { useNavigate } from 'react-router-dom';
import { cn } from '##/utils/bem';
import { cnMixAuth } from '##/mixs/MixAuth';
import { FormikInput } from '##/components/controls/formik/FormikInput';
import { useForm } from './hooks/useForm';

const cnRecovery = cn('Recovery');

export const Recovery = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { initialValues, schema } = useForm();

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
      className={cnRecovery(null, [
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
        {() => (
          <Form
            className={cnRecovery('Container', [cnMixAuth('Container', null)])}
          >
            <Text
              size="3xl"
              lineHeight="xs"
              align="center"
              weight="semibold"
              className={cnRecovery('Title')}
            >
              {t('recovery.title')}
            </Text>
            <FormikInput
              name="email"
              type="email"
              size="l"
              width="full"
              placeholder={t('recovery.inputs.email.placeholder')?.toString()}
            />
            <Button
              size="l"
              width="full"
              type="submit"
              label={t('recovery.button')?.toString()}
            />
          </Form>
        )}
      </Formik>
      <Button
        view="clear"
        label={t('recovery.sign_in')?.toString()}
        onClick={(e) => handleNavigate(e, '/login')}
        as="a"
        href="/login"
        className={cnRecovery('Additional', [cnMixAuth('Additional', null)])}
      />
    </div>
  );
};
