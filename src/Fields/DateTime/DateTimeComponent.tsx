import React from 'react';
import { IFieldComponentProps } from '../../types';

import {
  LocalizationProvider,
  DateTimePicker,
  DateTimePickerProps,
} from '@material-ui/lab';
import { TextField, TextFieldProps } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import FieldAssistiveText from '../../FieldAssistiveText';

export interface IDateTimeComponentProps
  extends IFieldComponentProps,
    Omit<DateTimePickerProps, 'label' | 'name' | 'onChange' | 'value' | 'ref'> {
  TextFieldProps: TextFieldProps;
}

export default function DateTimeComponent({
  field: { onChange, onBlur, value, ref },
  fieldState,
  formState,

  name,
  useFormMethods,

  errorMessage,
  assistiveText,

  TextFieldProps,
  ...props
}: IDateTimeComponentProps) {
  let transformedValue: any = null;
  if (value && 'toDate' in value) transformedValue = value.toDate();
  else if (value !== undefined) transformedValue = value;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        inputFormat="yyyy-MM-dd hh:mm a"
        mask="____-__-__ __:__ __"
        {...props}
        value={transformedValue}
        onChange={onChange}
        onClose={onBlur}
        inputRef={ref}
        components={{ OpenPickerIcon: AccessTimeIcon }}
        renderInput={props => (
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
            data-type="date-time"
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
