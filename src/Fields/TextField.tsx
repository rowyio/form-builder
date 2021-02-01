import React from 'react';
import { IFieldComponentProps } from '../utils';

import {
  TextField as MuiTextField,
  FilledTextFieldProps,
} from '@material-ui/core';

export interface ITextProps
  extends IFieldComponentProps,
    Omit<FilledTextFieldProps, 'variant' | 'name' | 'label'> {
  fieldVariant?: 'short' | 'long' | 'email' | 'phone' | 'number' | 'url';
}

export default function TextField({
  register,
  errorMessage,
  fieldVariant = 'short',
  hiddenLabel = false,
  control,
  useFormMethods,
  ...props
}: ITextProps) {
  let variantProps: any = {};

  switch (fieldVariant) {
    case 'long':
      variantProps = { multiline: true, inputProps: { rowsMin: 5 } };
      if (props.placeholder) variantProps.InputLabelProps = { shrink: true };
      break;

    case 'email':
      variantProps = { type: 'email', inputProps: { autoComplete: 'email' } };
      break;

    case 'phone':
      // TODO: add mask, validation
      variantProps = { type: 'tel', inputProps: { autoComplete: 'tel' } };
      break;

    case 'number':
      variantProps = { type: 'number' };
      break;

    case 'url':
      variantProps = { type: 'url' };
      break;

    case 'short':
    default:
      break;
  }

  const overrideProps = hiddenLabel
    ? { label: '', 'aria-label': props.label as string, hiddenLabel: true }
    : {};

  return (
    <MuiTextField
      variant="filled"
      fullWidth
      margin="none"
      error={!!errorMessage}
      helperText={errorMessage}
      {...variantProps}
      {...props}
      {...overrideProps}
      inputRef={register}
      inputProps={{
        'data-type': fieldVariant === 'long' ? 'textarea' : 'text',
        'data-label': props.label ?? '',
      }}
    />
  );
}
