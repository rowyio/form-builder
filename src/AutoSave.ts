import { useEffect } from 'react';
import { useWatch, UseFormMethods } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import _isEqual from 'lodash/isEqual';
import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import { diffChanges } from './utils';

import { IFormProps } from './Form';

export interface IAutoSaveProps {
  control: UseFormMethods['control'];
  defaultValues: NonNullable<IFormProps['values']>;
  errors: UseFormMethods['errors'];
  onSubmit: IFormProps['onSubmit'];
}

export default function AutoSave({
  control,
  defaultValues,
  errors,
  onSubmit,
}: IAutoSaveProps) {
  const values = useWatch({ control });

  const [debouncedValues] = useDebounce(values, 1000, {
    equalityFn: _isEqual,
  });

  useEffect(() => {
    // - Update only fields that changed
    // - Remove values with errors
    // - Remove undefined value to prevent Firestore crash
    const newValues = _omitBy(
      diffChanges(defaultValues, debouncedValues),
      (value, name) => _isUndefined(value) || name in errors
    );

    if (Object.keys(newValues).length > 0) {
      console.log('SUBMIT', newValues, errors);
      onSubmit(newValues);
    }
  }, [debouncedValues]);

  return null;
}
