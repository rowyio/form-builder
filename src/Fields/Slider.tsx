import React from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../utils';

import {
  makeStyles,
  createStyles,
  FormControl,
  Slider as MuiSlider,
  SliderProps,
  Grid,
  Typography,
} from '@material-ui/core';

import Label from '../Label';
import ErrorMessage from '../ErrorMessage';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { display: 'flex' },
    sliderGrid: { marginTop: theme.spacing(3) },
    slider: { display: 'block' },
  })
);

export interface ISliderProps
  extends IFieldComponentProps,
    Omit<SliderProps, 'name'> {
  units?: string;
  minLabel?: React.ReactNode;
  maxLabel?: React.ReactNode;
}

export default function Slider({
  control,
  register,
  name,
  errorMessage,
  label,
  units,
  minLabel,
  maxLabel,
  min = 0,
  max = 100,
  useFormMethods,
  ...props
}: ISliderProps) {
  const classes = useStyles();

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => {
        const handleChange = (_: any, value: number | number[]) => {
          onChange(value);
          onBlur();
        };

        const getAriaValueText = (value: number) =>
          `${value}${units ? ' ' + units : ''}`;

        const getValueLabelFormat = (value: number) =>
          `${value}${units ? ' ' + units : ''}`;

        return (
          <FormControl className={classes.root}>
            <Label error={!!errorMessage}>{label}</Label>

            <Grid
              container
              spacing={2}
              alignItems="center"
              className={classes.sliderGrid}
            >
              <Grid item>
                <Typography
                  variant="caption"
                  component="span"
                  color="textSecondary"
                >
                  {minLabel ?? `${min}${units ? ' ' + units : ''}`}
                </Typography>
              </Grid>

              <Grid item xs>
                <MuiSlider
                  valueLabelDisplay="on"
                  min={min}
                  max={max}
                  getAriaValueText={getAriaValueText}
                  valueLabelFormat={getValueLabelFormat}
                  {...props}
                  value={value ?? min}
                  onClick={onBlur}
                  onChange={handleChange}
                  classes={{ root: classes.slider }}
                  data-type="slider"
                  data-label={label ?? ''}
                />
              </Grid>

              <Grid item>
                <Typography
                  variant="caption"
                  component="span"
                  color="textSecondary"
                >
                  {maxLabel ?? `${max}${units ? ' ' + units : ''}`}
                </Typography>
              </Grid>
            </Grid>

            <ErrorMessage>{errorMessage}</ErrorMessage>
          </FormControl>
        );
      }}
    />
  );
}
