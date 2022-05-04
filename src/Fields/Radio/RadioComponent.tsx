import React from 'react';
import { IFieldComponentProps } from '../../types';

import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  RadioGroupProps,
  Radio,
  Divider,
  Box,
} from '@mui/material';

import FieldLabel from '../../FieldLabel';
import FieldErrorMessage from '../../FieldErrorMessage';
import FieldAssistiveText from '../../FieldAssistiveText';

export interface IRadioComponentProps
  extends IFieldComponentProps,
    Omit<RadioGroupProps, 'name' | 'onChange' | 'value' | 'onBlur' | 'ref'> {
  options: (string | { value: string; label: React.ReactNode })[];
}

export default function RadioComponent({
  field: { onChange, onBlur, value, ref },
  fieldState,
  formState,

  name,
  useFormMethods,

  label,
  errorMessage,
  assistiveText,

  required,

  options,
  ...props
}: IRadioComponentProps) {
  return (
    <FormControl
      component="fieldset"
      error={!!errorMessage}
      disabled={props.disabled}
      style={{ display: 'flex' }}
    >
      <FieldLabel
        {...({ component: 'legend' } as any)}
        error={!!errorMessage}
        disabled={!!props.disabled}
        required={!!required}
      >
        {label}
      </FieldLabel>

      <RadioGroup {...props} onChange={onChange} onBlur={onBlur} value={value}>
        {options.map((item) => {
          let option: { label: React.ReactNode; value: string } = {
            label: '',
            value: '',
          };
          if (typeof item === 'object') option = item;
          if (typeof item === 'string') option = { label: item, value: item };

          return (
            <React.Fragment key={option.value}>
              <FormControlLabel
                key={option.value}
                value={option.value}
                label={option.label as any}
                control={
                  <Radio
                    inputProps={
                      {
                        'data-type': 'radio',
                        'data-label': label ?? '',
                        'data-label-option': option.label ?? '',
                      } as any
                    }
                    sx={{
                      p: 1.5,
                      my: 0,
                      ml: -1.5,
                      mr: -0.5,

                      '.MuiFormControlLabel-root:not(.Mui-disabled):hover &': {
                        bgcolor: 'action.hover',
                      },
                    }}
                    inputRef={ref}
                  />
                }
                sx={{
                  mx: 0,
                  '& .MuiFormControlLabel-label': {
                    py: 14 / 8,
                    ml: 1,
                    marginTop: '0 !important',
                  },
                }}
              />
              <Divider sx={{ ml: 3 + 2 }} />
            </React.Fragment>
          );
        })}
      </RadioGroup>

      <Box sx={{ mt: 1, mr: 0, mb: 0, ml: 3 + 2 }}>
        <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
        <FieldAssistiveText disabled={!!props.disabled}>
          {assistiveText}
        </FieldAssistiveText>
      </Box>
    </FormControl>
  );
}
