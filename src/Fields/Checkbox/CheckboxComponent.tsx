import React from 'react';
import { IFieldComponentProps } from '../../types';

import { FormControlLabel, Checkbox, CheckboxProps } from '@mui/material';

import FieldErrorMessage from '../../FieldErrorMessage';
import FieldAssistiveText from '../../FieldAssistiveText';

export interface ICheckboxComponentProps
  extends IFieldComponentProps,
    Omit<
      CheckboxProps,
      'name' | 'onChange' | 'checked' | 'ref' | 'value' | 'onBlur'
    > {}

export default function CheckboxComponent({
  field: { onChange, onBlur, value, ref },
  fieldState,
  formState,

  name,
  useFormMethods,

  label,
  errorMessage,
  assistiveText,

  required,

  ...props
}: ICheckboxComponentProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          checked={value}
          onChange={(e) => {
            onChange(e.target.checked);
            onBlur();
          }}
          inputProps={
            {
              'data-type': 'checkbox',
              'data-label': label ?? '',
            } as any
          }
          sx={[
            {
              '.MuiFormControlLabel-root:not(.Mui-disabled):hover &': {
                bgcolor: 'action.hover',
              },
            },
            ...(Array.isArray(props.sx)
              ? props.sx
              : props.sx
              ? [props.sx]
              : []),
          ]}
          inputRef={ref}
        />
      }
      onBlur={onBlur}
      label={
        <>
          {label}
          {required && <>&nbsp;*</>}

          <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
          <FieldAssistiveText disabled={!!props.disabled}>
            {assistiveText}
          </FieldAssistiveText>
        </>
      }
      sx={{ mr: 0, display: 'flex' }}
    />
  );
}
