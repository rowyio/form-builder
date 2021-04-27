import React from 'react';
import { IFieldComponentProps } from '../../types';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from '@material-ui/pickers';
import FieldAssistiveText from '../../FieldAssistiveText';

export interface IDateComponentProps
  extends IFieldComponentProps,
    Omit<
      KeyboardDatePickerProps,
      'label' | 'name' | 'onChange' | 'value' | 'onBlur' | 'ref'
    > {}

export default function DateComponent({
  field: { onChange, onBlur, value, ref },
  fieldState,
  formState,

  name,
  useFormMethods,

  errorMessage,
  assistiveText,
  ...props
}: IDateComponentProps) {
  let transformedValue = null;
  if (value && 'toDate' in value) transformedValue = value.toDate();
  else if (value !== undefined) transformedValue = value;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        variant="inline"
        fullWidth
        format="yyyy/MM/dd"
        placeholder="yyyy/MM/dd"
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

              <FieldAssistiveText disabled={!!props.disabled}>
                {assistiveText}
              </FieldAssistiveText>
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
