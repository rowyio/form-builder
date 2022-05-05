import { useEffect } from 'react';
import { Control, useWatch, useFormState } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import _isEqual from 'lodash-es/isEqual';
import _omitBy from 'lodash-es/omitBy';
import _isUndefined from 'lodash-es/isUndefined';
import { diffChanges } from './utils';

import { IFormProps } from './Form';

export interface IAutoSaveProps {
  control: Control;
  defaultValues: NonNullable<IFormProps['values']>;
  onSubmit: IFormProps['onSubmit'];
}

export default function AutoSave({
  control,
  defaultValues,
  onSubmit,
}: IAutoSaveProps) {
  const values = useWatch({ control });
  const { errors } = useFormState({ control });

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
