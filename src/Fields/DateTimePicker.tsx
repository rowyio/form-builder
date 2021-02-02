import React from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../utils';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { useTheme } from '@material-ui/core';
import {
  KeyboardDateTimePicker,
  KeyboardDateTimePickerProps,
} from '@material-ui/pickers';

import AccessTimeIcon from '@material-ui/icons/AccessTime';

export interface IDateTimePickerProps
  extends IFieldComponentProps,
    Omit<KeyboardDateTimePickerProps, 'label' | 'name'> {}

export default function DateTimePicker({
  register,
  control,
  name,
  errorMessage,
  ...props
}: IDateTimePickerProps) {
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

          const { useFormMethods, ...otherProps } = props;

          return (
            <KeyboardDateTimePicker
              variant="inline"
              inputVariant="filled"
              fullWidth
              margin="none"
              format="yyyy/MM/dd hh:mm a"
              placeholder="yyyy/MM/dd h:mm a"
              InputAdornmentProps={{
                style: { marginRight: theme.spacing(-1) },
              }}
              keyboardIcon={<AccessTimeIcon />}
              InputLabelProps={{ shrink: transformedValue !== null }}
              {...otherProps}
              value={transformedValue}
              onChange={onChange}
              onBlur={onBlur}
              error={!!errorMessage}
              helperText={errorMessage}
              data-type="datetime"
              data-label={props.label ?? ''}
            />
          );
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
