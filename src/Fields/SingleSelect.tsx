import React from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../utils';

import { TextField, FilledTextFieldProps, MenuItem } from '@material-ui/core';

export interface ISingleSelectProps
  extends IFieldComponentProps,
    Omit<FilledTextFieldProps, 'variant' | 'label' | 'name'> {
  options: (string | { value: string; label: React.ReactNode })[];
}

export default function SingleSelect({
  control,
  register,
  name,
  errorMessage,
  options = [],
  ...props
}: ISingleSelectProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => (
        <TextField
          fullWidth
          margin="none"
          select
          variant="filled"
          error={!!errorMessage}
          helperText={errorMessage}
          {...props}
          onChange={onChange}
          onBlur={onBlur}
          // Convert string[] value to string
          // And remove MUI error when `undefined` or `null` is passed
          value={(Array.isArray(value) ? value[0] : value) ?? ''}
        >
          {options.map(option => {
            if (typeof option === 'object')
              return (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </TextField>
      )}
    />
  );
}
