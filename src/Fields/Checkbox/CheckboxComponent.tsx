import React from 'react';
import { Controller } from 'react-hook-form';
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

    checkbox: {
      padding: theme.spacing(1.5),
      margin: theme.spacing(-1.5, 0.5, -1.5, -1.5),

      '$root:hover &': { backgroundColor: theme.palette.action.hover },
    },
  })
);

export interface ICheckboxComponentProps
  extends IFieldComponentProps,
    Omit<CheckboxProps, 'name' | 'onChange' | 'checked'> {}

export default function CheckboxComponent({
  control,
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
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => (
        <>
          <FormControlLabel
            control={
              <Checkbox
                {...props}
                checked={value}
                onChange={e => onChange(e.target.checked)}
                inputProps={
                  {
                    'data-type': 'checkbox',
                    'data-label': label ?? '',
                  } as any
                }
                className={classes.checkbox}
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
            classes={{ root: classes.root }}
          />
        </>
      )}
    />
  );
}
