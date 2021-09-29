import React from 'react';
import { IFieldComponentProps } from '../../types';

import {
  TextField,
  FilledTextFieldProps,
  Grid,
  FormHelperText,
} from '@mui/material';

import FieldAssistiveText from '../../FieldAssistiveText';

export interface IParagraphComponentProps
  extends IFieldComponentProps,
    Omit<
      FilledTextFieldProps,
      'variant' | 'name' | 'label' | 'onChange' | 'onBlur' | 'value' | 'ref'
    > {
  maxCharacters?: number;
}

export default function ParagraphComponent({
  field: { onChange, onBlur, value, ref },
  fieldState,
  formState,

  name,
  useFormMethods,

  errorMessage,
  assistiveText,

  disabled,

  hiddenLabel = false,
  maxCharacters,
  ...props
}: IParagraphComponentProps) {
  return (
    <TextField
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      fullWidth
      error={!!errorMessage}
      FormHelperTextProps={{ component: 'div' } as any}
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
      multiline
      minRows={3}
      {...props}
      disabled={disabled}
      inputProps={{
        required: false,
        // https://github.com/react-hook-form/react-hook-form/issues/4485
        disabled: false,
        readOnly: disabled,
        style: disabled ? { cursor: 'default' } : undefined,
        maxLength: maxCharacters ?? undefined,
        // Required for form-filler
        'data-type': 'textarea',
        'data-label': props.label ?? '',
      }}
      InputLabelProps={props.placeholder ? { shrink: true } : undefined}
      inputRef={ref}
    />
  );
}
