import { UseFormMethods } from 'react-hook-form';
import * as yup from 'yup';
import _isFunction from 'lodash/isFunction';
import { FIELDS, DEFAULT_VALUES } from './Fields';

export type Values = { [key: string]: any };

export type FieldType = {
  type: FIELDS | string;
  name?: string;
  label?: React.ReactNode;
  [key: string]: any;
};
export type Fields = (
  | FieldType
  | null
  | ((values: Values) => FieldType | null)
)[];

export type IFieldComponentProps = {
  name: string;
  register: UseFormMethods['register'];
  control: UseFormMethods['control'];
  errorMessage?: string;
  label: React.ReactNode;
};

export type CustomComponent<
  P extends IFieldComponentProps = IFieldComponentProps
> = React.ComponentType<P> | React.LazyExoticComponent<React.ComponentType<P>>;

export type CustomComponents<
  P extends IFieldComponentProps = IFieldComponentProps
> = {
  [type: string]: {
    component: CustomComponent<P>;
    defaultValue?: any;
  };
};

export const getDefaultValues = (
  fields: Fields,
  customComponents?: CustomComponents
): Values =>
  fields.reduce((acc, _field) => {
    const field = _isFunction(_field) ? _field({}) : _field;

    if (!!field && field.name && field.type) {
      if (!!customComponents && field.type in customComponents)
        return {
          ...acc,
          [field.name]: customComponents[field.type].defaultValue,
        };

      if (field.type in DEFAULT_VALUES)
        return {
          ...acc,
          [field.name]: DEFAULT_VALUES[field.type],
        };
    }

    return acc;
  }, {});

export const getValidationSchema = (fields: Fields) =>
  yup.object().shape(
    fields.reduce((acc, _field) => {
      const field = _isFunction(_field) ? _field({}) : _field;
      if (!field || !field.name) return acc;
      return { ...acc, [field.name]: field.validation };
    }, {}) as any
  );
