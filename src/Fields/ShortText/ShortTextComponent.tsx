import React from 'react';
import { IFieldComponentProps } from '../../types';

import { TextField, TextFieldProps, Grid, FormHelperText } from '@mui/material';

import FieldAssistiveText from '../../FieldAssistiveText';

export interface IShortTextComponentProps
  extends IFieldComponentProps,
    Omit<
      TextFieldProps,
      'variant' | 'name' | 'label' | 'onBlur' | 'onChange' | 'value' | 'ref'
    > {
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
  field: { onChange, onBlur, value, ref },
  fieldState,
  formState,

  name,
  useFormMethods,

  errorMessage,
  assistiveText,

  disabled,

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
        placeholder: '1234567890',
        inputProps: {
          inputMode: 'numeric',
          pattern: '\\d*',
        },
      };
      break;

    case 'url':
      variantProps = {
        type: 'url',
        placeholder: 'https://example.com',
        autoComplete: 'url',
      };
      break;

    case 'twitter':
      variantProps = { placeholder: '@username' };
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

  const handleChange: TextFieldProps['onChange'] = (e) =>
    format === 'number'
      ? onChange(e.target.value === '' ? '' : Number(e.target.value))
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

              <FieldAssistiveText style={{ margin: 0 }} disabled={!!disabled}>
                {assistiveText}
              </FieldAssistiveText>
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
      disabled={disabled}
      inputProps={{
        required: false,
        // https://github.com/react-hook-form/react-hook-form/issues/4485
        disabled: false,
        readOnly: disabled,
        style: disabled ? { cursor: 'default' } : undefined,
        maxLength: maxCharacters ?? undefined,
        ...variantProps.inputProps,
        // Required for form-filler
        'data-type': 'text',
        'data-label': props.label ?? '',
      }}
      inputRef={ref}
    />
  );
}
