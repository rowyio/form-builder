import React from 'react';
import { IFieldComponentProps } from '../../types';

import {
  LocalizationProvider,
  DateTimePicker,
  DateTimePickerProps,
} from '@mui/x-date-pickers';
import { TextField, TextFieldProps } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import FieldAssistiveText from '../../FieldAssistiveText';

export interface IDateTimeComponentProps
  extends IFieldComponentProps,
    Omit<
      DateTimePickerProps<Date, Date>,
      'label' | 'name' | 'onChange' | 'value' | 'ref'
    > {
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
        // https://github.com/mui-org/material-ui/issues/10341#issuecomment-770784016
        PopperProps={{ disablePortal: true }}
        renderInput={(props) => (
          <TextField
            {...props}
            {...TextFieldProps}
            fullWidth
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
            sx={{
              '& .MuiInputBase-input': { fontVariantNumeric: 'tabular-nums' },
              ...TextFieldProps?.sx,
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
