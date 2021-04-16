import * as yup from 'yup';
import _isFunction from 'lodash/isFunction';
import _pickBy from 'lodash/pickBy';
import _isEqual from 'lodash/isEqual';
import { getFieldProp } from './fields';

import { FieldValues } from 'react-hook-form';
import { Fields, CustomComponents } from './types';

/**
 * Creates a single object with all default values of the fields
 * @param fields Fields used in the form
 * @param customComponents Custom components used in the form
 */
export const getDefaultValues = (
  fields: Fields,
  customComponents?: CustomComponents
): FieldValues =>
  fields.reduce((acc, field) => {
    if (!!field && field.name && field.type) {
      let defaultValue: any;

      // Get default value if specified in field declaration
      if (field.defaultValue !== undefined) {
        defaultValue = field.defaultValue;
      }
      // Get default value from customComponents
      else if (!!customComponents && field.type in customComponents) {
        defaultValue = customComponents[field.type].defaultValue;
      }
      // Get default value from built-in components
      else {
        defaultValue = getFieldProp('defaultValue', field.type);
      }

      // If undefined, do not add to defaultValues
      // Prevents content fields returning a value
      if (defaultValue === undefined) return acc;

      return { ...acc, [field.name]: defaultValue };
    }

    return acc;
  }, {});

/**
 * Creates a Yup object schema to validate the entire form
 * @param fields Fields used in the form
 * @param customComponents Custom components used in the form
 */
export const getValidationSchema = (
  fields: Fields,
  customComponents?: CustomComponents
) =>
  yup.object().shape(
    fields.reduce((acc, field) => {
      if (!field || !field.name) return acc;

      let validation: any[][] = [];

      if (!!customComponents && field.type in customComponents) {
        // Get default validation from customComponents
        validation = customComponents[field.type].validation ?? [];
      } else {
        // Get default validation from built-in components
        const validationFunction = getFieldProp('validation', field.type);
        if (validationFunction) validation = validationFunction(field);
      }

      // If we intentionally don’t validate this field, e.g. content fields:
      if (validation.length === 0) return acc;

      // Add the required validation message for all field types
      if (field.required === true)
        validation.splice(1, 0, [
          'required',
          `${field.label || field.name} is required`,
        ]);

      // Append custom validation from the form’s field config to the default validation
      if (Array.isArray(field.validation))
        validation = [...validation, ...field.validation];

      // Reduce the array of arrays to the Yup schema for this field
      const schema = validation.reduce((a, c) => {
        const [type, ...args] = c;
        // Check the method exists in Yup & call with args
        if (type in a) return (a[type as keyof typeof a] as any)(...args);
        // Otherwise, return the current schema
        return a;
      }, yup);

      return { ...acc, [field.name]: schema };
    }, {}) as any
  );

/**
 * Gets the form values that have changed
 * @param current Current form values
 * @param changed Changed form values (a subset of form values)
 * @returns An object with only the form values that changed
 */
export const diffChanges = (
  current: { [key: string]: any },
  changed: { [key: string]: any }
) => {
  return _pickBy(changed, (val, key) => !_isEqual(val, current[key]));
};

/**
 * Stubs Controller render props
 */
export const controllerRenderPropsStub: any = {
  field: {
    onChange: () => {},
    onBlur: () => {},
    ref: undefined as any,
  },
  fieldState: {},
  formState: {},
};
