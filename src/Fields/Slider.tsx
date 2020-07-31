import React from 'react'
import { Controller } from 'react-hook-form'
import { IFieldComponentProps } from '../utils'

import {
  makeStyles,
  createStyles,
  FormControl,
  Slider as MuiSlider,
  SliderProps,
  Grid,
  Typography,
} from '@material-ui/core'

import Label from '../Label'
import ErrorMessage from '../ErrorMessage'

const useStyles = makeStyles(theme =>
  createStyles({
    root: { display: 'flex' },
    slider: { display: 'block' },

    thumb: {
      width: 16,
      height: 16,
      marginTop: -7,
      marginLeft: -8,
    },

    valueLabel: {
      top: -22,
      ...theme.typography.overline,
      color: theme.palette.primary.main,

      '& > *': {
        width: 'auto',
        minWidth: 24,
        height: 24,

        whiteSpace: 'nowrap',
        borderRadius: 500,

        padding: theme.spacing(0, 0.75, 0, 1),
      },
      '& *': { transform: 'none' },
    },
  })
)

export interface ISliderProps
  extends IFieldComponentProps,
    Omit<SliderProps, 'name'> {
  units?: string
  minLabel?: React.ReactNode
  maxLabel?: React.ReactNode
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
  ...props
}: ISliderProps) {
  const classes = useStyles()

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => {
        const handleChange = (_, value: number | number[]) => {
          onChange(value)
          onBlur()
        }

        const getAriaValueText = (value: number) =>
          `${value}${units ? ' ' + units : ''}`

        const getValueLabelFormat = (value: number) =>
          `${value}${units ? ' ' + units : ''}`

        return (
          <FormControl className={classes.root}>
            <Label error={!!errorMessage}>{label}</Label>

            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography
                  variant="overline"
                  component="span"
                  color="textSecondary"
                >
                  {minLabel ?? `${min}${units ? ' ' + units : ''}`}
                </Typography>
              </Grid>

              <Grid item xs>
                <MuiSlider
                  valueLabelDisplay="auto"
                  min={min}
                  max={max}
                  getAriaValueText={getAriaValueText}
                  valueLabelFormat={getValueLabelFormat}
                  {...props}
                  value={value ?? min}
                  onClick={onBlur}
                  onChange={handleChange}
                  classes={{
                    root: classes.slider,
                    thumb: classes.thumb,
                    valueLabel: classes.valueLabel,
                  }}
                />
              </Grid>

              <Grid item>
                <Typography
                  variant="overline"
                  component="span"
                  color="textSecondary"
                >
                  {maxLabel ?? `${max}${units ? ' ' + units : ''}`}
                </Typography>
              </Grid>
            </Grid>

            <ErrorMessage>{errorMessage}</ErrorMessage>
          </FormControl>
        )
      }}
    />
  )
}
