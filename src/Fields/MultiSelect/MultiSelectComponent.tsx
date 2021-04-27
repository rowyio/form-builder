import React from 'react';
import { IFieldComponentProps } from '../../types';
import MultiSelect, { MultiSelectProps } from '@antlerengineering/multiselect';

import FieldAssistiveText from '../../FieldAssistiveText';

export interface IMultiSelectComponentProps
  extends IFieldComponentProps,
    Omit<MultiSelectProps<string>, 'value' | 'onChange' | 'options' | 'label'> {
  options: (string | { value: string; label: React.ReactNode })[];
}

export default function MultiSelectComponent({
  field: { onChange, onBlur, value, ref },
  fieldState,
  formState,

  name,
  useFormMethods,

  errorMessage,
  assistiveText,

  options = [],
  ...props
}: IMultiSelectComponentProps) {
  return (
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

            <FieldAssistiveText disabled={!!props.disabled}>
              {assistiveText}
            </FieldAssistiveText>
          </>
        ),
        onBlur,
        'data-type': 'multi-select',
        'data-label': props.label ?? '',
        inputRef: ref,
      }}
    />
  );
}
