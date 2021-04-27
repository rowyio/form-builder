import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';

import useFormSettings from './useFormSettings';
import FormFields from './FormFields';
import AutoSave from './AutoSave';
import SubmitButton, { ISubmitButtonProps } from './SubmitButton';
import SubmitError, { ISubmitErrorProps } from './SubmitError';

import { Fields, CustomComponents } from './types';

export interface IFormProps {
  fields: Fields;
  values?: FieldValues;
  onSubmit: (values: FieldValues) => void;
  customComponents?: CustomComponents;

  autoSave?: boolean;
  hideSubmit?: boolean;
  SubmitButtonProps?: Partial<ISubmitButtonProps>;
  hideSubmitError?: boolean;
  SubmitErrorProps?: Partial<ISubmitErrorProps>;

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
  hideSubmitError = false,
  SubmitErrorProps = {},

  formHeader,
  formFooter,
}: IFormProps) {
  const { defaultValues, resolver, setOmittedFields } = useFormSettings({
    fields,
    values,
    customComponents,
  });

  const methods = useForm({
    mode: autoSave ? 'all' : 'onBlur',
    defaultValues,
    resolver,
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const hasErrors = errors
    ? (Object.values(errors).reduce(
        (a, c) => !!(a || !_isEmpty(c)),
        false
      ) as boolean)
    : false;

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
        setOmittedFields={setOmittedFields}
      />

      {formFooter}

      {!hideSubmit && (
        <SubmitButton disabled={hasErrors} {...SubmitButtonProps} />
      )}

      {!hideSubmitError && hasErrors && <SubmitError {...SubmitErrorProps} />}
    </form>
  );
}
