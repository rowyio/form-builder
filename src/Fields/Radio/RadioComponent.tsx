import React from 'react';
import { IFieldComponentProps } from '../../types';

import { makeStyles, createStyles } from '@mui/styles';
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  RadioGroupProps,
  Radio,
  Divider,
} from '@mui/material';

import FieldLabel from '../../FieldLabel';
import FieldErrorMessage from '../../FieldErrorMessage';
import FieldAssistiveText from '../../FieldAssistiveText';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { display: 'flex' },

    formControl: {
      marginLeft: 0,
      marginRight: 0,
    },
    disabled: {},

    radio: {
      padding: theme.spacing(1.5),
      margin: theme.spacing(0, -0.5, 0, -1.5),

      '$formControl:not($disabled):hover &': {
        backgroundColor: theme.palette.action.hover,
      },
    },

    formControlLabel: {
      padding: theme.spacing(1.25, 0),
      marginLeft: theme.spacing(1),
    },

    divider: { marginLeft: theme.spacing(3 + 2) },
    assistiveText: { margin: theme.spacing(1, 0, 0, 3 + 2) },
  })
);

export interface IRadioComponentProps
  extends IFieldComponentProps,
    Omit<RadioGroupProps, 'name' | 'onChange' | 'value' | 'onBlur' | 'ref'> {
  options: (string | { value: string; label: React.ReactNode })[];
}

export default function RadioComponent({
  field: { onChange, onBlur, value, ref },
  fieldState,
  formState,

  name,
  useFormMethods,

  label,
  errorMessage,
  assistiveText,

  required,

  options,
  ...props
}: IRadioComponentProps) {
  const classes = useStyles();

  return (
    <FormControl
      component="fieldset"
      error={!!errorMessage}
      disabled={props.disabled}
      className={classes.root}
    >
      <FieldLabel
        {...({ component: 'legend' } as any)}
        error={!!errorMessage}
        disabled={!!props.disabled}
        required={!!required}
      >
        {label}
      </FieldLabel>

      <RadioGroup {...props} onChange={onChange} onBlur={onBlur} value={value}>
        {options.map(item => {
          let option: { label: React.ReactNode; value: string } = {
            label: '',
            value: '',
          };
          if (typeof item === 'object') option = item;
          if (typeof item === 'string') option = { label: item, value: item };

          return (
            <React.Fragment key={option.value}>
              <FormControlLabel
                key={option.value}
                value={option.value}
                label={option.label}
                control={
                  <Radio
                    inputProps={
                      {
                        'data-type': 'radio',
                        'data-label': label ?? '',
                        'data-label-option': option.label ?? '',
                      } as any
                    }
                    className={classes.radio}
                    inputRef={ref}
                  />
                }
                classes={{
                  root: classes.formControl,
                  disabled: classes.disabled,
                  label: classes.formControlLabel,
                }}
              />
              <Divider className={classes.divider} />
            </React.Fragment>
          );
        })}
      </RadioGroup>

      <div className={classes.assistiveText}>
        <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
        <FieldAssistiveText disabled={!!props.disabled}>
          {assistiveText}
        </FieldAssistiveText>
      </div>
    </FormControl>
  );
}
