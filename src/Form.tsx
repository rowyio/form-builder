import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import _isEmpty from 'lodash/isEmpty';

import FormFields from './FormFields';
import AutoSave from './AutoSave';
import SubmitButton, { ISubmitButtonProps } from './SubmitButton';

import {
  Values,
  Fields,
  CustomComponents,
  getDefaultValues,
  getValidationSchema,
} from './utils';

export interface IFormProps {
  fields: Fields;
  values?: Values;
  onSubmit: (values: Values) => void;
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
    resolver: yupResolver(getValidationSchema(fields)),
  });
  const { register, handleSubmit, control, errors } = methods;

  const hasErrors = errors
    ? Object.values(errors).reduce((a, c) => !!(a || !_isEmpty(c)), false)
    : false;
  const isSubmitDisabled = hasErrors;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {autoSave && (
          <AutoSave
            control={control}
            defaultValues={defaultValues}
            errors={errors}
            onSubmit={onSubmit}
          />
        )}

        {formHeader}

        <FormFields
          fields={fields}
          register={register}
          control={control}
          errors={errors}
          customComponents={customComponents}
        />

        {formFooter}

        {!hideSubmit && (
          <SubmitButton disabled={isSubmitDisabled} {...SubmitButtonProps} />
        )}
      </form>
    </FormProvider>
  );
}
