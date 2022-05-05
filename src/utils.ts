import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';
import _pickBy from 'lodash-es/pickBy';
import _isEqual from 'lodash-es/isEqual';
import _set from 'lodash-es/set';
import _values from 'lodash-es/values';
import _mapValues from 'lodash-es/mapValues';
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
  customComponents?: CustomComponents,
  mergeValues?: FieldValues
): FieldValues => {
  const defaultValues: FieldValues = {};

  for (const field of fields) {
    if (!field || !field.name || !field.type) continue;

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
    if (defaultValue === undefined) continue;

    // Use lodash set to support nested fields, e.g. `cloudBuild.branch`
    _set(defaultValues, field.name, defaultValue);
  }

  return { ...defaultValues, ...mergeValues };
};

/**
 * Creates a Yup object schema to validate the entire form
 * @param fields Fields used in the form
 * @param customComponents Custom components used in the form
 */
export const getValidationSchema = (
  fields: Fields,
  customComponents?: CustomComponents
) => {
  const objectShape: ObjectShape = {};

  for (const field of fields) {
    if (!field || !field.name) continue;

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
    if (validation.length === 0) continue;

    // Add the required validation message for all field types
    if (field.required === true)
      validation.splice(1, 0, [
        'required',
        `${field.label || field.name} is required`,
      ]);

    // Append custom validation from the form’s field config to the default validation
    // Wrap in lodash values function to support { 0: [], 1: [] } object for Firestore
    // Also support nested { 0: { 0: [], 1: … }, […] } with miixed types
    const sanitizedValidation = _values(_mapValues(field.validation, _values));
    if (sanitizedValidation.length > 0)
      validation = [...validation, ...sanitizedValidation];

    // Reduce the array of arrays to the Yup schema for this field
    const schema = validation.reduce((a, c) => {
      const [type, ...args] = c;
      // Check the method exists in Yup & call with args
      if (type in a) return (a[type as keyof typeof a] as any)(...args);
      // Otherwise, return the current schema
      return a;
    }, yup);

    // Use lodash set to support nested fields, e.g. `cloudBuild.branch`
    _set(objectShape, field.name, schema);
  }

  // Recursively ensure all nested fields are Yup schemas
  // wrapped in Yup object schemas
  const recursiveObjectShape = (object: Record<string, any>) => {
    for (const [key, value] of Object.entries(object)) {
      if (yup.BaseSchema.prototype.isPrototypeOf(value)) continue;
      object[key] = yup.object().shape(recursiveObjectShape(value) as any);
    }
    return object;
  };

  return yup.object().shape(recursiveObjectShape(objectShape));
};

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
