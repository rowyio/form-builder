import React from 'react';
import { IFieldComponentProps } from '../../types';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { FormHelperText } from '@material-ui/core';
import {
  KeyboardDateTimePicker,
  KeyboardDateTimePickerProps,
} from '@material-ui/pickers';

import AccessTimeIcon from '@material-ui/icons/AccessTime';

export interface IDateTimeComponentProps
  extends IFieldComponentProps,
    Omit<
      KeyboardDateTimePickerProps,
      'label' | 'name' | 'onChange' | 'value' | 'onBlur' | 'ref'
    > {}

export default function DateTimeComponent({
  field: { onChange, onBlur, value, ref },

  fieldState,
  formState,

  name,
  useFormMethods,

  errorMessage,
  assistiveText,
  ...props
}: IDateTimeComponentProps) {
  let transformedValue = null;
  if (value && 'toDate' in value) transformedValue = value.toDate();
  else if (value !== undefined) transformedValue = value;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        variant="inline"
        fullWidth
        format="yyyy/MM/dd hh:mm a"
        placeholder="yyyy/MM/dd h:mm a"
        keyboardIcon={<AccessTimeIcon />}
        InputLabelProps={{ shrink: transformedValue !== null }}
        {...props}
        value={transformedValue}
        onChange={onChange}
        onBlur={onBlur}
        onClose={onBlur}
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
        data-type="date"
        data-label={props.label ?? ''}
        inputRef={ref}
      />
    </MuiPickersUtilsProvider>
  );
}
