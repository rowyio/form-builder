import React from 'react';
import { useForm, UseFormProps, FieldValues } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';

import useFormSettings from './useFormSettings';
import FormFields from './FormFields';
import AutoSave from './AutoSave';
import SubmitButton, { ISubmitButtonProps } from './SubmitButton';
import SubmitError, { ISubmitErrorProps } from './SubmitError';

import { Fields, CustomComponents } from './types';

import { createTheme, ThemeProvider } from '@material-ui/core';
const theme = createTheme();

export interface IFormProps {
  fields: Fields;
  values?: FieldValues;
  onSubmit: (values: FieldValues) => void;
  customComponents?: CustomComponents;
  UseFormProps?: UseFormProps;

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
  UseFormProps = {},

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
    shouldUnregister: true,
    ...UseFormProps,
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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
