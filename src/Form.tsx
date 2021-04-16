import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import _isEmpty from 'lodash/isEmpty';

import FormFields from './FormFields';
import AutoSave from './AutoSave';
import SubmitButton, { ISubmitButtonProps } from './SubmitButton';

import { getDefaultValues, getValidationSchema } from './utils';
import { Fields, CustomComponents } from './types';

export interface IFormProps {
  fields: Fields;
  values?: FieldValues;
  onSubmit: (values: FieldValues) => void;
  customComponents?: CustomComponents;

  autoSave?: boolean;
  hideSubmit?: boolean;
  SubmitButtonProps?: Partial<ISubmitButtonProps>;

  formHeader?: React.ReactNode;
  formFooter?: React.ReactNode;
}

export default function Form({
  fields,
  values,
  onSubmit,
  customComponents,

  autoSave = false,
  hideSubmit = autoSave,
  SubmitButtonProps = {},

  formHeader,
  formFooter,
}: IFormProps) {
  const defaultValues = {
    ...getDefaultValues(fields, customComponents),
    ...(values ?? {}),
  };

  const methods = useForm({
    mode: autoSave ? 'all' : 'onBlur',
    defaultValues,
    resolver: yupResolver(getValidationSchema(fields, customComponents)),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const hasErrors = errors
    ? Object.values(errors).reduce((a, c) => !!(a || !_isEmpty(c)), false)
    : false;
  const isSubmitDisabled = hasErrors;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {autoSave && (
        <AutoSave
          control={control}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        />
      )}

      {formHeader}

      <FormFields
        fields={fields}
        control={control}
        customComponents={customComponents}
        useFormMethods={methods}
      />

      {formFooter}

      {!hideSubmit && (
        <SubmitButton disabled={isSubmitDisabled} {...SubmitButtonProps} />
      )}
    </form>
  );
}
