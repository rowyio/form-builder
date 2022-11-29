import React from 'react';
import { IFieldComponentProps } from '../../types';

import { FormControl, Box, Typography } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

import FieldLabel from '../../FieldLabel';
import FieldErrorMessage from '../../FieldErrorMessage';
import FieldAssistiveText from '../../FieldAssistiveText';

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
        sx={{
          color: 'text.secondary',

          width: 32,
          height: 32,
          margin: { xs: 1, md: 0.5 },

          '&:not(:last-child), &:not(:first-child)': { borderRadius: 1 },
          '&:not(:first-child)': {
            borderLeftColor: 'palette.divider',
            marginLeft: { xs: 1, md: 0.5 },
          },
        }}
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
    >
      <FieldLabel
        error={!!errorMessage}
        disabled={!!disabled}
        required={!!required}
        sx={[
          {
            typography: 'body1',
            mb: 0,
            textTransform: 'none',
          },
          minLabel || maxLabel ? { mb: 2 } : {},
        ]}
      >
        {label}
      </FieldLabel>

      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, auto)',
          rowGap: 2,
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            md: 'repeat(2, min-content)',
          },
        }}
      >
        {minLabel && (
          <Typography
            variant="overline"
            color="textSecondary"
            style={{ gridRow: 1, gridColumn: 1 }}
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
          sx={{
            gridRow: 2,
            gridColumn: '1 / -1',

            display: 'flex',
            justifyContent: 'center',

            m: { xs: -1, md: -0.5 },
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          {buttons}
        </ToggleButtonGroup>

        {maxLabel && (
          <Typography
            variant="overline"
            color="textSecondary"
            align="right"
            sx={{ gridRow: 1, gridColumn: { xs: 3, md: 2 } }}
          >
            {maxLabel}
          </Typography>
        )}
      </Box>

      <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
      <FieldAssistiveText disabled={!!disabled}>
        {assistiveText}
      </FieldAssistiveText>
    </FormControl>
  );
}
