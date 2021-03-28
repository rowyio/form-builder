import React from 'react';
import { IFieldComponentProps } from '../../types';
import { Controller } from 'react-hook-form';

import {
  TextField,
  TextFieldProps,
  Grid,
  FormHelperText,
} from '@material-ui/core';

export interface IShortTextComponentProps
  extends IFieldComponentProps,
    Omit<TextFieldProps, 'variant' | 'name' | 'label'> {
  format?: 'email' | 'phone' | 'number' | 'url';
  maxCharacters?: number;
}

export default function ShortTextComponent({
  control,
  name,
  useFormMethods,

  errorMessage,
  assistiveText,

  required,

  format,
  hiddenLabel = false,
  maxCharacters,
  ...props
}: IShortTextComponentProps) {
  let variantProps: any = {};
  switch (format) {
    case 'email':
      variantProps = { type: 'email', inputProps: { autoComplete: 'email' } };
      break;

    case 'phone':
      variantProps = { type: 'tel', inputProps: { autoComplete: 'tel' } };
      break;

    case 'number':
      variantProps = { type: 'number' };
      break;

    case 'url':
      variantProps = { type: 'url', inputProps: { autoComplete: 'url' } };
      break;

    default:
      break;
  }

  const hiddenLabelOverrideProps = hiddenLabel
    ? { label: '', 'aria-label': props.label as string, hiddenLabel: true }
    : {};

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => {
        const handleChange: TextFieldProps['onChange'] = e =>
          format === 'number'
            ? onChange(Number(e.target.value))
            : onChange(e.target.value);

        return (
          <TextField
            onChange={handleChange}
            onBlur={onBlur}
            value={value}
            fullWidth
            error={!!errorMessage}
            FormHelperTextProps={{ component: 'div' }}
            helperText={
              (errorMessage || assistiveText || maxCharacters) && (
                <Grid container spacing={1} wrap="nowrap" alignItems="baseline">
                  <Grid item xs>
                    {errorMessage}

                    <FormHelperText
                      style={{ margin: 0, whiteSpace: 'pre-line' }}
                      error={false}
                    >
                      {assistiveText}
                    </FormHelperText>
                  </Grid>

                  {maxCharacters && (
                    <Grid item>
                      <FormHelperText
                        style={{ margin: 0 }}
                        error={
                          (typeof value === 'string' ? value.length : 0) >
                          maxCharacters
                        }
                      >
                        {typeof value === 'string' ? value.length : 0}
                        &nbsp;/&nbsp;
                        {maxCharacters}
                      </FormHelperText>
                    </Grid>
                  )}
                </Grid>
              )
            }
            name={name}
            id={`field-${name}`}
            {...variantProps}
            {...props}
            {...hiddenLabelOverrideProps}
            inputProps={{
              required,
              maxLength: maxCharacters ?? undefined,
              ...variantProps.inputProps,
              // Required for form-filler
              'data-type': 'text',
              'data-label': props.label ?? '',
            }}
          />
        );
      }}
    ></Controller>
  );
}
