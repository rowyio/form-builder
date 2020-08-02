import React from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../utils';

import {
  makeStyles,
  createStyles,
  FormControl,
  FormControlLabel,
  RadioGroup,
  RadioGroupProps,
  Radio as MuiRadio,
  Divider,
} from '@material-ui/core';

import Label from '../Label';
import ErrorMessage from '../ErrorMessage';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { display: 'flex' },

    formControlLabel: {
      padding: theme.spacing(1.25, 0),
      marginLeft: theme.spacing(1),
    },

    divider: { marginLeft: theme.spacing(5) },
  })
);

export interface IRadioProps
  extends IFieldComponentProps,
    Omit<RadioGroupProps, 'name'> {
  options: (string | { value: string; label: React.ReactNode })[];
}

export default function Radio({
  control,
  register,
  name,
  errorMessage,
  options,
  label,
  ...props
}: IRadioProps) {
  const classes = useStyles();

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => (
        <FormControl component="fieldset" className={classes.root}>
          <Label error={!!errorMessage}>{label}</Label>

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
                      <MuiRadio
                      //disabled={isSubmitting}
                      />
                    }
                    classes={{ label: classes.formControlLabel }}
                    //disabled={isSubmitting}
                  />
                  <Divider className={classes.divider} />
                </React.Fragment>
              );
            })}
          </RadioGroup>

          <ErrorMessage>{errorMessage}</ErrorMessage>
        </FormControl>
      )}
    />
  );
}
