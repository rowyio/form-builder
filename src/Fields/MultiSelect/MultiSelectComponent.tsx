import React from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../../types';
import MultiSelect, { MultiSelectProps } from '@antlerengineering/multiselect';

import { FormHelperText } from '@material-ui/core';

export interface IMultiSelectComponentProps
  extends IFieldComponentProps,
    Omit<MultiSelectProps<string>, 'value' | 'onChange' | 'options' | 'label'> {
  options: (string | { value: string; label: React.ReactNode })[];
}

export default function MultiSelectComponent({
  control,
  name,
  useFormMethods,

  errorMessage,
  assistiveText,

  options = [],
  ...props
}: IMultiSelectComponentProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => (
        <MultiSelect
          {...(props as any)}
          multiple={true}
          options={options}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
          onBlur={onBlur}
          TextFieldProps={{
            error: !!errorMessage,
            InputLabelProps: { required: props.required },
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
            'data-type': 'multi-select',
            'data-label': props.label ?? '',
          }}
        />
      )}
    />
  );
}
