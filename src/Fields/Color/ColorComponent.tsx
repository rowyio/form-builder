import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../../types';
import { ChromePicker } from 'react-color';

import {
  makeStyles,
  createStyles,
  FormControl,
  ButtonBase,
  Grid,
  InputLabel,
  Typography,
  Popover,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import FieldErrorMessage from '../../FieldErrorMessage';
import FieldAssistiveText from '../../FieldAssistiveText';

const useStyles = makeStyles(theme =>
  createStyles({
    wrapper: { display: 'flex' },

    root: {
      height: 56,
      textAlign: 'left',

      margin: 0,
      width: '100%',
      padding: theme.spacing(0, 1),
    },

    label: {
      position: 'relative',
      transform: 'scale(0.875)',
      top: 2,
      margin: '1px 0',
      cursor: 'inherit',
    },

    colorIndicator: {
      width: 20,
      height: 20,

      boxShadow: `0 0 0 1px ${theme.palette.action.disabled} inset`,
      borderRadius: '50%',
    },

    placeholder: { color: theme.palette.text.disabled },
    value: { color: theme.palette.text.secondary },

    arrow: { marginRight: theme.spacing(-0.5) },

    picker: {
      boxShadow: 'none !important',
      borderRadius: '0 !important',

      '& > div': { borderRadius: '0 !important' },
    },
  })
);

export interface IColorComponentProps extends IFieldComponentProps {
  enableAlpha?: boolean;
}

export default function ColorComponent({
  control,
  name,

  label,
  errorMessage,
  assistiveText,

  required,
  disabled,

  enableAlpha,
}: IColorComponentProps) {
  const classes = useStyles();

  const anchorEl = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(s => !s);

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => (
        <FormControl
          className={classes.wrapper}
          onClick={onBlur}
          error={!!errorMessage}
          disabled={disabled}
        >
          <Grid
            container
            alignItems="center"
            wrap="nowrap"
            spacing={2}
            className={clsx(
              classes.root,
              'MuiFilledInput-root',
              errorMessage && 'Mui-error'
            )}
            onClick={toggleOpen}
            component={ButtonBase}
            focusRipple
            data-type="color"
            data-label={label ?? ''}
            disabled={disabled}
            ref={anchorEl}
          >
            <Grid item>
              <div
                className={classes.colorIndicator}
                style={{ backgroundColor: value?.hex }}
              />
            </Grid>

            <Grid item xs>
              <InputLabel
                className={classes.label}
                error={!!errorMessage}
                disabled={disabled}
                required={required}
              >
                {label}
              </InputLabel>
              <Typography
                variant="body1"
                className={clsx(
                  !value || disabled ? classes.placeholder : classes.value
                )}
              >
                {value?.hex ?? 'Choose a color…'}
              </Typography>
            </Grid>

            <Grid item>
              {open ? (
                <ArrowDropUpIcon
                  aria-label="Hide color picker"
                  color={disabled ? 'disabled' : 'inherit'}
                  className={classes.arrow}
                />
              ) : (
                <ArrowDropDownIcon
                  aria-label="Show color picker"
                  color={disabled ? 'disabled' : 'inherit'}
                  className={classes.arrow}
                />
              )}
            </Grid>
          </Grid>

          {anchorEl.current && (
            <Popover
              open={open}
              anchorEl={anchorEl.current}
              onClose={() => setOpen(false)}
              PaperProps={
                { 'data-type': 'color-picker', variant: 'outlined' } as any
              }
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <ChromePicker
                color={value?.rgb}
                onChangeComplete={onChange}
                disableAlpha={!enableAlpha}
                className={classes.picker}
              />
            </Popover>
          )}

          <FieldErrorMessage variant="filled">{errorMessage}</FieldErrorMessage>
          <FieldAssistiveText disabled={!!disabled} variant="filled">
            {assistiveText}
          </FieldAssistiveText>
        </FormControl>
      )}
    />
  );
}
