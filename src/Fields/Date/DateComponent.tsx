import React from 'react';
import { IFieldComponentProps } from '../../types';

import {
  LocalizationProvider,
  DatePicker,
  DatePickerProps,
} from '@material-ui/lab';
import { TextField, TextFieldProps } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';

import FieldAssistiveText from '../../FieldAssistiveText';

export interface IDateComponentProps
  extends IFieldComponentProps,
    Omit<DatePickerProps, 'label' | 'name' | 'onChange' | 'value' | 'ref'> {
  TextFieldProps: TextFieldProps;
}

export default function DateComponent({
  field: { onChange, onBlur, value, ref },
  fieldState,
  formState,

  name,
  useFormMethods,

  errorMessage,
  assistiveText,

  TextFieldProps,
  ...props
}: IDateComponentProps) {
  let transformedValue: any = null;
  if (value && 'toDate' in value) transformedValue = value.toDate();
  else if (value !== undefined) transformedValue = value;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        inputFormat="yyyy-MM-dd"
        mask="____-__-__"
        {...props}
        value={transformedValue}
        onChange={onChange}
        onClose={onBlur}
        inputRef={ref}
        renderInput={(props) => (
          <TextField
            {...props}
            {...TextFieldProps}
            fullWidth
            // InputLabelProps={{ shrink: transformedValue !== null }}
            onBlur={onBlur}
            error={props.error || !!errorMessage}
            FormHelperTextProps={{ component: 'div' } as any}
            helperText={
              (errorMessage || assistiveText) && (
                <>
                  {errorMessage}

                  <FieldAssistiveText
                    style={{ margin: 0 }}
                    disabled={!!props.disabled}
                  >
                    {assistiveText}
                  </FieldAssistiveText>
                </>
              )
            }
            data-type="date"
            data-label={props.label ?? ''}
            inputProps={{
              ...props.inputProps,
              required: false,
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
