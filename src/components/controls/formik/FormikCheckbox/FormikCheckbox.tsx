import React, { FC } from 'react';
import { Field, FieldProps } from 'formik';
import { Checkbox, CheckboxProps } from '@consta/uikit/Checkbox';

import './FormikCheckbox.css';
import { MemoWrapper } from '##/components/MemoWrapper';
import { getNestedValue } from '##/utils/formik';
import { cn } from '##/utils/bem';

const cnFormikCheckbox = cn('FormikCheckbox');

interface IProps extends Omit<CheckboxProps, 'checked'> {
  checked?: boolean;
}

const FormikCheckboxComponent = MemoWrapper(
  ({
    field: { value, onChange, ...field },
    form: { errors, touched, ...form },
    label,
    className,
    ...props
  }: IProps & FieldProps) => {
    const fieldError = getNestedValue(errors, field.name);
    const fieldTouched = getNestedValue(touched, field.name);

    return (
      <Checkbox
        label={label}
        checked={!!value}
        onClick={onChange}
        className={cnFormikCheckbox(
          '',
          { error: !!(fieldError && fieldTouched) },
          [className],
        )}
        {...field}
        {...props}
      />
    );
  },
  ['label', 'disabled'],
);

export const FormikCheckbox: FC<IProps> = (props) => {
  return <Field {...props} component={FormikCheckboxComponent} />;
};
