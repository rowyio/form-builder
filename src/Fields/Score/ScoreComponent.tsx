import React from 'react';
import { IFieldComponentProps } from '../../types';

import { makeStyles, createStyles } from '@material-ui/styles';
import { FormControl, Typography } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

import FieldLabel from '../../FieldLabel';
import FieldErrorMessage from '../../FieldErrorMessage';
import FieldAssistiveText from '../../FieldAssistiveText';

const useStyles = makeStyles(theme =>
  createStyles({
    grid: {
      display: 'grid',
      gridTemplateRows: 'repeat(4, auto)',
      rowGap: theme.spacing(2),
      gridTemplateColumns: 'repeat(2, min-content)',

      [theme.breakpoints.down('sm')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
    },

    label: {
      marginBottom: 0,
      textTransform: 'none',

      gridRow: 1,
      gridColumn: '1 / -1',
    },

    minLabel: {
      gridRow: 2,
      gridColumn: 1,
    },
    maxLabel: {
      gridRow: 2,
      gridColumn: 2,

      [theme.breakpoints.down('sm')]: { gridRow: 4 },
    },

    toggleButtonGroup: {
      gridRow: 3,
      gridColumn: '1 / -1',

      display: 'flex',
      justifyContent: 'center',

      margin: theme.spacing(-0.5),

      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        margin: theme.spacing(-1),
      },
    },

    toggleButton: {
      color: theme.palette.text.secondary,

      width: 32,
      height: 32,
      margin: theme.spacing(0.5),
      [theme.breakpoints.down('sm')]: { margin: theme.spacing(1) },

      '&:not(:last-child), &:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:not(:first-child)': {
        borderLeftColor: theme.palette.divider,
        marginLeft: theme.spacing(0.5),

        [theme.breakpoints.down('sm')]: { marginLeft: theme.spacing(1) },
      },
    },
  })
);

export interface IScoreComponentProps extends IFieldComponentProps {
  min?: number;
  max?: number;
  minLabel?: React.ReactNode;
  maxLabel?: React.ReactNode;
  step?: number;
}

export default function ScoreComponent({
  field: { onChange, value, ref },

  label,
  errorMessage,
  assistiveText,

  disabled,
  required,

  min = 0,
  max = 10,
  minLabel,
  maxLabel,
  step = 1,
}: IScoreComponentProps) {
  const classes = useStyles();

  const buttons: React.ReactNodeArray = [];
  for (let i = min; i <= max; i += step)
    buttons.push(
      <ToggleButton
        key={i}
        value={i}
        disabled={disabled}
        aria-label={`${i}${
          i === min && minLabel
            ? ` (${minLabel})`
            : i === max && maxLabel
            ? ` (${maxLabel})`
            : ''
        }`}
      >
        {i}
      </ToggleButton>
    );

  return (
    <FormControl
      error={!!errorMessage}
      disabled={disabled}
      required={!!required}
      ref={ref}
      className={classes.grid}
    >
      <FieldLabel
        error={!!errorMessage}
        disabled={!!disabled}
        required={!!required}
        className={classes.label}
      >
        <Typography variant="body1" color="inherit" component="span">
          {label}
        </Typography>
      </FieldLabel>

      {minLabel && (
        <Typography
          variant="overline"
          color="textSecondary"
          className={classes.minLabel}
        >
          {minLabel}
        </Typography>
      )}

      <ToggleButtonGroup
        value={value}
        onChange={(_, v) => {
          if (v !== null) onChange(v);
        }}
        exclusive
        aria-label="Score"
        classes={{
          root: classes.toggleButtonGroup,
          grouped: classes.toggleButton,
        }}
      >
        {buttons}
      </ToggleButtonGroup>

      {maxLabel && (
        <Typography
          variant="overline"
          color="textSecondary"
          align="right"
          className={classes.maxLabel}
        >
          {maxLabel}
        </Typography>
      )}

      <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
      <FieldAssistiveText disabled={!!disabled}>
        {assistiveText}
      </FieldAssistiveText>
    </FormControl>
  );
}
