import React from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../../types';

import {
  makeStyles,
  createStyles,
  FormControl,
  FormControlLabel,
  RadioGroup,
  RadioGroupProps,
  Radio,
  Divider,
} from '@material-ui/core';

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

    radio: {
      padding: theme.spacing(1.5),
      margin: theme.spacing(0, -0.5, 0, -1.5),

      '$formControl:hover &': { backgroundColor: theme.palette.action.hover },
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
    Omit<RadioGroupProps, 'name' | 'onChange' | 'value'> {
  options: (string | { value: string; label: React.ReactNode })[];
}

export default function RadioComponent({
  control,
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
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => (
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

          <RadioGroup
            {...props}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          >
            {options.map(item => {
              let option: { label: React.ReactNode; value: string } = {
                label: '',
                value: '',
              };
              if (typeof item === 'object') option = item;
              if (typeof item === 'string')
                option = { label: item, value: item };

              return (
                <React.Fragment key={option.value}>
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    control={
                      <Radio
                        //disabled={isSubmitting}
                        inputProps={
                          {
                            'data-type': 'radio',
                            'data-label': label ?? '',
                            'data-label-option': option.label ?? '',
                          } as any
                        }
                        className={classes.radio}
                      />
                    }
                    classes={{
                      root: classes.formControl,
                      label: classes.formControlLabel,
                    }}
                    //disabled={isSubmitting}
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
      )}
    />
  );
}
