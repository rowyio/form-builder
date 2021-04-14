import React from 'react';
import { IFieldComponentProps } from '../../types';

import {
  makeStyles,
  createStyles,
  FormControl,
  Slider,
  SliderProps,
  Grid,
  Typography,
} from '@material-ui/core';

import FieldLabel from '../../FieldLabel';
import FieldErrorMessage from '../../FieldErrorMessage';
import FieldAssistiveText from '../../FieldAssistiveText';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { display: 'flex' },
    sliderGrid: { marginTop: theme.spacing(3) },
    slider: { display: 'block' },
  })
);

export interface ISliderComponentProps
  extends IFieldComponentProps,
    Omit<SliderProps, 'name' | 'onBlur' | 'onChange' | 'ref' | 'value'> {
  units?: string;
  unitsPlural?: string;
  minLabel?: React.ReactNode;
  maxLabel?: React.ReactNode;
}

const valueWithUnits = (value: number, units?: string, unitsPlural?: string) =>
  `${value} ${(value !== 1 ? unitsPlural || '' : units) || ''}`.trim();

export const SliderComponent = React.forwardRef(function SliderComponent(
  {
    onChange,
    onBlur,
    value,

    name,
    useFormMethods,

    label,
    errorMessage,
    assistiveText,

    required,

    units,
    unitsPlural,
    minLabel,
    maxLabel,
    min = 0,
    max = 100,
    ...props
  }: ISliderComponentProps,
  ref
) {
  const classes = useStyles();

  const handleChange = (_: any, value: number | number[]) => {
    onChange(value);
    onBlur();
  };

  const getAriaValueText = (value: number) =>
    valueWithUnits(value, units, unitsPlural);
  const getValueLabelFormat = getAriaValueText;

  return (
    <FormControl
      className={classes.root}
      error={!!errorMessage}
      disabled={!!props.disabled}
      required={!!required}
    >
      <FieldLabel
        error={!!errorMessage}
        disabled={!!props.disabled}
        required={!!required}
      >
        {label}
      </FieldLabel>

      <Grid
        container
        spacing={2}
        alignItems="center"
        className={classes.sliderGrid}
      >
        <Grid item>
          <Typography variant="caption" component="span" color="textSecondary">
            {minLabel || valueWithUnits(min, units, unitsPlural)}
          </Typography>
        </Grid>

        <Grid item xs>
          <Slider
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
            ref={ref as any}
          />
        </Grid>

        <Grid item>
          <Typography variant="caption" component="span" color="textSecondary">
            {maxLabel || valueWithUnits(max, units, unitsPlural)}
          </Typography>
        </Grid>
      </Grid>

      <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
      <FieldAssistiveText disabled={!!props.disabled}>
        {assistiveText}
      </FieldAssistiveText>
    </FormControl>
  );
});

export default SliderComponent;
