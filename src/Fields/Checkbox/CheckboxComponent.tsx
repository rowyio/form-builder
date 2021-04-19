import React from 'react';
import { IFieldComponentProps } from '../../types';

import {
  makeStyles,
  createStyles,
  FormControlLabel,
  Checkbox,
  CheckboxProps,
} from '@material-ui/core';

import FieldErrorMessage from '../../FieldErrorMessage';
import FieldAssistiveText from '../../FieldAssistiveText';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      alignItems: 'flex-start',

      marginLeft: 0,
      marginRight: 0,
    },
    disabled: {},

    checkbox: {
      padding: theme.spacing(1.5),
      margin: theme.spacing(-1.5, 0.5, -1.5, -1.5),

      '$root:not($disabled):hover &': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
);

export interface ICheckboxComponentProps
  extends IFieldComponentProps,
    Omit<
      CheckboxProps,
      'name' | 'onChange' | 'checked' | 'ref' | 'value' | 'onBlur'
    > {}

export default function CheckboxComponent({
  field: { onChange, onBlur, value, ref },
  fieldState,
  formState,

  name,
  useFormMethods,

  label,
  errorMessage,
  assistiveText,

  required,

  ...props
}: ICheckboxComponentProps) {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          checked={value}
          onChange={e => {
            onChange(e.target.checked);
            onBlur();
          }}
          inputProps={
            {
              'data-type': 'checkbox',
              'data-label': label ?? '',
            } as any
          }
          className={classes.checkbox}
          inputRef={ref as React.MutableRefObject<any>}
        />
      }
      onBlur={onBlur}
      label={
        <>
          {label}
          {required && <>&nbsp;*</>}

          <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
          <FieldAssistiveText disabled={!!props.disabled}>
            {assistiveText}
          </FieldAssistiveText>
        </>
      }
      classes={{ root: classes.root, disabled: classes.disabled }}
    />
  );
}
