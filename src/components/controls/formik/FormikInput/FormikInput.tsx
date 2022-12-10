/* eslint-disable @typescript-eslint/no-shadow */
import React, {
  FC,
  KeyboardEvent,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import { v4 as uuid } from 'uuid';
import { TextField, TextFieldProps } from '@consta/uikit/TextField';
import { Field, FieldProps } from 'formik';
// eslint-disable-next-line import/no-extraneous-dependencies
import PhoneInput from 'react-phone-input-2';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-phone-input-2/lib/style.css';
import { Text } from '@consta/uikit/Text';
import { useForkRef } from '@consta/uikit/useForkRef';
import { getNestedValue } from '##/utils/formik';
import { Flex } from '##/components/Layout/Flex';
import { MemoWrapper } from '##/components/MemoWrapper';

import './FormikInput.css';
import { cn } from '##/utils/bem';

const cnFormikInput = cn('FormikInput');

interface IProps extends TextFieldProps<string> {
  mask?: RegExp[];
  type?: string;
  onlyNumbers?: boolean;
  withoutSpaces?: boolean;
  showErrorIfNotTouched?: boolean;
}

const FormikInputRender = MemoWrapper(
  ({
    field: { value = '', onChange, onBlur, ...field },
    form: { setFieldValue, errors, touched },
    label,
    mask = [],
    type,
    required = true,
    caption,
    onlyNumbers = false,
    width,
    withoutSpaces = false,
    showErrorIfNotTouched = true,
    inputRef: inputRefProp,
    ...props
  }: IProps & FieldProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const analyzeChangeValue = (value: string | null): string => {
      let targetStr = value || '';
      if (withoutSpaces) {
        targetStr = targetStr.trim();
      }
      return targetStr;
    };

    const handleChange = useCallback(({ value }: { value: string | null }) => {
      setFieldValue(field.name, analyzeChangeValue(value), false);
    }, []);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const isAllowedKey = [8, 13, 32].includes(event.keyCode); // backspace, enter, space

      if (onlyNumbers) {
        const isNumber = !Number.isNaN(parseFloat(event.key));
        if (!isNumber && !isAllowedKey) {
          event.preventDefault();
        }
      } else if (mask && mask.length) {
        if (!isAllowedKey) {
          let cursorPosition = 0;
          if (event.target instanceof HTMLInputElement) {
            cursorPosition = event.target.selectionStart || 0;
          }

          const regex = new RegExp(mask[cursorPosition], 'g');

          // limit input by mask length first
          if (cursorPosition >= mask.length) {
            event.preventDefault();
          }

          // test regex by letter position
          if (!regex.test(event.key)) {
            event.preventDefault();
          }
        }
      }
    };

    const fieldError = getNestedValue(errors, field.name);
    const fieldTouched = getNestedValue(touched, field.name);

    useLayoutEffect(() => {
      if (type === 'number') {
        inputRef.current?.addEventListener('wheel', (e) => e.preventDefault());
      }
      return () => {
        if (type === 'number') {
          inputRef.current?.removeEventListener('wheel', (e) =>
            e.preventDefault(),
          );
        }
      };
    }, [inputRef]);

    return (
      <Flex
        direction="column"
        className={cnFormikInput({
          state: fieldError && fieldTouched ? 'alert' : undefined,
          width,
        })}
      >
        {label && (
          <Text weight="semibold" size="s" className={cnFormikInput('Label')}>
            {label}
            {required && <span className={cnFormikInput('Star')}>*</span>}
          </Text>
        )}

        {type === 'phone' ? (
          <PhoneInput
            country="ru"
            value={value}
            inputRef={useForkRef([inputRef, inputRefProp])}
            containerClass={cnFormikInput('PhoneInput')}
            inputClass={cnFormikInput('PhoneFormControl')}
            // @ts-ignore
            onChange={(phone) => handleChange({ value: phone })}
            onKeyDown={handleKeyDown}
            onBlur={(e) => {
              handleChange({ value: value.trim() });
              onBlur && onBlur(e);
            }}
            id={uuid()}
            {...field}
            {...props}
          />
        ) : (
          <TextField
            className={cnFormikInput('Input')}
            state={
              fieldError && (fieldTouched || showErrorIfNotTouched)
                ? 'alert'
                : undefined
            }
            inputRef={useForkRef([inputRef, inputRefProp])}
            value={value}
            type={type}
            caption={fieldError ? undefined : caption}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={(e) => {
              handleChange({ value: value.trim() });
              onBlur && onBlur(e);
            }}
            id={uuid()}
            {...field}
            {...props}
          />
        )}

        {fieldError && (fieldTouched || showErrorIfNotTouched) && (
          <Text className={cnFormikInput('Caption')} size="xs" view="alert">
            {fieldError}
          </Text>
        )}
      </Flex>
    );
  },
  ['caption', 'leftSide', 'rightSide', 'label', 'type', 'disabled'],
);

export const FormikInput = (props: IProps) => {
  return <Field {...props} component={FormikInputRender} />;
};
