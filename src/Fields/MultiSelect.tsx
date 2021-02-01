import React from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../utils';
import MultiSelect_, { MultiSelectProps } from '@antlerengineering/multiselect';

export type IMultiSelectProps = IFieldComponentProps &
  Omit<MultiSelectProps<string>, 'value' | 'onChange' | 'options'>;

export default function MultiSelect({
  control,
  name,
  errorMessage,
  ...props
}: IMultiSelectProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => {
        let sanitisedValue;
        if (props.multiple !== false) {
          if (!Array.isArray(value)) sanitisedValue = [];
          else sanitisedValue = value;
        } else {
          if (typeof value === 'string') sanitisedValue = value;
          else sanitisedValue = null;
        }

        return (
          <MultiSelect_
            {...(props as any)}
            value={sanitisedValue}
            onChange={onChange}
            onBlur={onBlur}
            TextFieldProps={{
              error: !!errorMessage,
              helperText: errorMessage,
              onBlur,
              'data-type':
                props.multiple ?? true ? 'multi-select' : 'multi-select-single',
              'data-label': props.label ?? '',
            }}
          />
        );
      }}
    />
  );
}
