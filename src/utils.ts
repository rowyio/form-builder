import * as yup from 'yup';
import _isFunction from 'lodash/isFunction';
import _pickBy from 'lodash/pickBy';
import _isEqual from 'lodash/isEqual';
import { getFieldProp } from './fields';

import { Fields, CustomComponents, Values } from './types';

export const getDefaultValues = (
  fields: Fields,
  customComponents?: CustomComponents
): Values =>
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

      return { ...acc, [field.name]: defaultValue };
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

export const diffChanges = (
  current: { [key: string]: any },
  changed: { [key: string]: any }
) => {
  return _pickBy(changed, (val, key) => !_isEqual(val, current[key]));
};
