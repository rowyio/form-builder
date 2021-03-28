import React from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../../types';
import MultiSelect, { MultiSelectProps } from '@antlerengineering/multiselect';

import {
  TextField,
  FilledTextFieldProps,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

export interface ISingleSelectComponentProps
  extends IFieldComponentProps,
    Omit<FilledTextFieldProps, 'variant' | 'label' | 'name'>,
    Partial<
      Omit<MultiSelectProps<string>, 'value' | 'onChange' | 'options' | 'label'>
    > {
  options: (string | { value: string; label: React.ReactNode })[];
}

export default function SingleSelectComponent({
  control,
  name,
  useFormMethods,

  errorMessage,
  assistiveText,

  options = [],
  ...props
}: ISingleSelectComponentProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => {
        const sanitisedValue = (Array.isArray(value) ? value[0] : value) ?? '';

        // Render MultiSelect if one of the following props is defined
        if (
          [
            props.searchable,
            props.labelPlural,
            props.freeText,
            props.clearable,
          ].reduce((a, c) => a || c !== undefined, false)
        )
          return (
            <MultiSelect
              {...(props as any)}
              multiple={false}
              options={options}
              value={sanitisedValue ?? null}
              onChange={value => onChange(value ?? '')}
              onBlur={onBlur}
              TextFieldProps={{
                error: !!errorMessage,
                FormHelperTextProps: { component: 'div' },
                helperText: (errorMessage || assistiveText) && (
                  <>
                    {errorMessage}

                    <FormHelperText
                      style={{ margin: 0, whiteSpace: 'pre-line' }}
                      error={false}
                    >
                      {assistiveText}
                    </FormHelperText>
                  </>
                ),
                onBlur,
                'data-type': 'multi-select-single',
                'data-label': props.label ?? '',
              }}
            />
          );

        // Render basic Material-UI select
        return (
          <TextField
            fullWidth
            select
            error={!!errorMessage}
            FormHelperTextProps={{ component: 'div' } as any}
            helperText={
              (errorMessage || assistiveText) && (
                <>
                  {errorMessage}

                  <FormHelperText
                    style={{ margin: 0, whiteSpace: 'pre-line' }}
                    error={false}
                  >
                    {assistiveText}
                  </FormHelperText>
                </>
              )
            }
            {...props}
            onChange={onChange}
            onBlur={onBlur}
            // Convert string[] value to string
            // And remove MUI error when `undefined` or `null` is passed
            value={(Array.isArray(value) ? value[0] : value) ?? ''}
            data-label={props.label ?? ''}
            data-type={'single-select'}
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
        );
      }}
    />
  );
}
