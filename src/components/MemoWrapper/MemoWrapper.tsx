import { ReactNode, memo, ComponentType } from 'react';
import { FieldProps } from 'formik';
import { getNestedValue } from '##/utils/formik';

type MemoPropsType<T> = Readonly<
  FieldProps<any, any> & T & { children?: ReactNode }
>;

type DefaultProps = {
  items: any[];
};

export const MemoWrapper = <T extends DefaultProps>(
  Component: ComponentType<any>,
  params?: string[],
) =>
  memo(
    Component,
    (prevProps: MemoPropsType<T>, nextProps: MemoPropsType<T>) => {
      const containsNestedErrorPrev = getNestedValue(
        prevProps.form.errors,
        prevProps.field.name,
      );
      const containsNestedErrorNext = getNestedValue(
        nextProps.form.errors,
        nextProps.field.name,
      );
      const containsNestedTouchedPrev = getNestedValue(
        prevProps.form.touched,
        prevProps.field.name,
      );
      const containsNestedTouchedNext = getNestedValue(
        nextProps.form.touched,
        nextProps.field.name,
      );

      const changeParams =
        (
          params?.filter(
            // @ts-ignore
            (key) => nextProps[key] !== prevProps[key],
          ) ?? []
        ).length === 0;

      return (
        prevProps.field.value === nextProps.field.value &&
        (prevProps.items && prevProps.items.length) ===
          (nextProps.items && nextProps.items.length) &&
        containsNestedErrorPrev === containsNestedErrorNext &&
        containsNestedTouchedPrev === containsNestedTouchedNext &&
        changeParams
      );
    },
  );
