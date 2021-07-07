import React from 'react';
import { IFieldComponentProps } from '../../types';

import {
  FormControl,
  Stack,
  Slider,
  SliderProps,
  Typography,
} from '@material-ui/core';

import FieldLabel from '../../FieldLabel';
import FieldErrorMessage from '../../FieldErrorMessage';
import FieldAssistiveText from '../../FieldAssistiveText';

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

export default function SliderComponent({
  field: { onChange, onBlur, value, ref },
  fieldState,
  formState,

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
}: ISliderComponentProps) {
  const handleChange = (_: any, value: number | number[]) => {
    onChange(value);
    onBlur();
  };

  const getAriaValueText = (value: number) =>
    valueWithUnits(value, units, unitsPlural);
  const getValueLabelFormat = getAriaValueText;

  return (
    <FormControl
      style={{ display: 'flex' }}
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

      <Stack direction="row" spacing={2} mt={2.5} alignItems="center">
        <Typography variant="caption" component="span" color="textSecondary">
          {minLabel || valueWithUnits(min, units, unitsPlural)}
        </Typography>

        <Slider
          valueLabelDisplay="on"
          min={min}
          max={max}
          getAriaValueText={getAriaValueText}
          valueLabelFormat={getValueLabelFormat}
          {...props}
          style={{ display: 'block', ...props.style }}
          value={value ?? min}
          onClick={onBlur}
          onChange={handleChange}
          data-type="slider"
          data-label={label ?? ''}
        />

        <Typography variant="caption" component="span" color="textSecondary">
          {maxLabel || valueWithUnits(max, units, unitsPlural)}
        </Typography>
      </Stack>

      <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
      <FieldAssistiveText disabled={!!props.disabled}>
        {assistiveText}
      </FieldAssistiveText>
    </FormControl>
  );
}
