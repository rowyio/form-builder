import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../utils';
import { ChromePicker, ColorResult } from 'react-color';

import {
  makeStyles,
  createStyles,
  FormControl,
  ButtonBase,
  Grid,
  Typography,
  Collapse,
} from '@material-ui/core';

import Label from '../Label';
import ErrorMessage from '../ErrorMessage';

const useStyles = makeStyles(theme =>
  createStyles({
    wrapper: { display: 'flex' },

    root: {
      height: 56,
      cursor: 'pointer',
      textAlign: 'left',
      borderRadius: theme.shape.borderRadius,

      backgroundColor:
        theme.palette.type === 'light'
          ? 'rgba(0, 0, 0, 0.09)'
          : 'rgba(255, 255, 255, 0.09)',
      margin: 0,
      width: '100%',
      padding: theme.spacing(0, 0.75),
    },
    colorIndicator: {
      width: 20,
      height: 20,
      marginLeft: 2,

      boxShadow: `0 0 0 1px ${theme.palette.text.disabled} inset`,
      borderRadius: theme.shape.borderRadius,
    },
  })
);

export interface IColorProps extends IFieldComponentProps {}

export default function Color({
  control,
  name,
  errorMessage,
  label,
}: IColorProps) {
  const classes = useStyles();

  const [showPicker, setShowPicker] = useState(false);
  const toggleOpen = () => setShowPicker(s => !s);

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => (
        <FormControl className={classes.wrapper} onClick={onBlur}>
          <Label error={!!errorMessage}>{label}</Label>

          <Grid
            container
            alignItems="center"
            spacing={1}
            className={classes.root}
            onClick={toggleOpen}
            component={ButtonBase}
            focusRipple
          >
            <Grid item>
              <div
                className={classes.colorIndicator}
                style={{ backgroundColor: value?.hex }}
              />
            </Grid>

            <Grid item xs>
              <Typography
                variant="body1"
                color={value?.hex ? 'textPrimary' : 'textSecondary'}
              >
                {value?.hex ?? 'Choose a color…'}
              </Typography>
            </Grid>
          </Grid>

          <Collapse in={showPicker}>
            <ChromePicker color={value?.rgb} onChangeComplete={onChange} />
          </Collapse>

          <ErrorMessage>{errorMessage}</ErrorMessage>
        </FormControl>
      )}
    />
  );
}
