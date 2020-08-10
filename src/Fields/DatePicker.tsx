import React from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../utils';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { useTheme } from '@material-ui/core';
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from '@material-ui/pickers';

export interface IDatePickerProps
  extends IFieldComponentProps,
    Omit<KeyboardDatePickerProps, 'label' | 'name'> {}

export default function DatePicker({
  register,
  control,
  name,
  errorMessage,
  ...props
}: IDatePickerProps) {
  const theme = useTheme();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, onBlur, value }) => {
          let transformedValue = null;
          if (value && 'toDate' in value) transformedValue = value.toDate();
          else if (value !== undefined) transformedValue = value;

          return (
            <KeyboardDatePicker
              variant="inline"
              inputVariant="filled"
              fullWidth
              margin="none"
              format="yyyy/MM/dd"
              placeholder="yyyy/MM/dd"
              InputAdornmentProps={{
                style: { marginRight: theme.spacing(-1) },
              }}
              InputLabelProps={{ shrink: transformedValue !== null }}
              {...props}
              value={transformedValue}
              onChange={onChange}
              onBlur={onBlur}
              error={!!errorMessage}
              helperText={errorMessage}
            />
          );
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
