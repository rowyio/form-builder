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
  format?:
    | 'email'
    | 'emailWithName'
    | 'phone'
    | 'number'
    | 'url'
    | 'twitter'
    | 'linkedin';
  maxCharacters?: number;
}

export default function ShortTextComponent({
  control,
  name,
  useFormMethods,

  errorMessage,
  assistiveText,

  format,
  hiddenLabel = false,
  maxCharacters,
  ...props
}: IShortTextComponentProps) {
  let variantProps: any = {};
  switch (format) {
    case 'email':
      variantProps = {
        type: 'email',
        placeholder: 'mail@domain.com',
        autoComplete: 'email',
      };
      break;

    case 'emailWithName':
      variantProps = {
        type: 'email',
        placeholder: 'Name <mail@domain.com>',
        autoComplete: 'email',
      };
      break;

    case 'phone':
      variantProps = {
        type: 'tel',
        placeholder: '+1234567890',
        autoComplete: 'tel',
      };
      break;

    case 'number':
      variantProps = {
        inputProps: {
          inputMode: 'numeric',
          pattern: '\\d*',
          placeholder: '1234567890',
        },
      };
      break;

    case 'url':
      variantProps = {
        type: 'url',
        placeholder: 'https://antler.co',
        autoComplete: 'url',
      };
      break;

    case 'twitter':
      variantProps = { placeholder: '@AntlerGlobal' };
      break;

    case 'linkedin':
      variantProps = {
        type: 'url',
        placeholder: 'https://linkedin.com/in/your-name',
        autoComplete: 'url',
      };
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
