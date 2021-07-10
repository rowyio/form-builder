import React, { useRef, useState } from 'react';
import { IFieldComponentProps } from '../../types';
import { ChromePicker } from 'react-color';

import { makeStyles, createStyles } from '@material-ui/styles';
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
  Popover,
} from '@material-ui/core';
import PaletteIcon from '@material-ui/icons/Palette';

import FieldAssistiveText from '../../FieldAssistiveText';

const useStyles = makeStyles(theme =>
  createStyles({
    colorIndicator: {
      width: 20,
      height: 20,

      boxShadow: `0 0 0 1px ${theme.palette.action.disabled} inset`,
      borderRadius: '50%',
    },

    picker: {
      boxShadow: 'none !important',
      borderRadius: '0 !important',

      '& > div': { borderRadius: '0 !important' },
    },
  })
);

export interface IColorComponentProps extends IFieldComponentProps {
  enableAlpha?: boolean;
  TextFieldProps?: Partial<TextFieldProps>;
}

export default function ColorComponent({
  field: { onChange, onBlur, value, ref },

  label,
  errorMessage,
  assistiveText,

  required,
  disabled,

  enableAlpha,
  TextFieldProps,
}: IColorComponentProps) {
  const classes = useStyles();

  const anchorEl = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: value?.hex && (
            <InputAdornment position="start">
              <div
                className={classes.colorIndicator}
                style={{ backgroundColor: value.hex }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleOpen}
                aria-label="Open color picker"
                edge="end"
                disabled={disabled}
              >
                <PaletteIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onClick={handleOpen}
        {...TextFieldProps}
        value={value?.hex}
        label={label}
        inputProps={{ readOnly: true, required: false }}
        error={!!errorMessage}
        helperText={
          (errorMessage || assistiveText) && (
            <>
              {errorMessage}

              <FieldAssistiveText style={{ margin: 0 }} disabled={!!disabled}>
                {assistiveText}
              </FieldAssistiveText>
            </>
          )
        }
        required={required}
        disabled={disabled}
        ref={anchorEl}
        inputRef={ref}
      />
      {!disabled && anchorEl.current && (
        <Popover
          open={open}
          anchorEl={anchorEl.current}
          onClose={() => {
            setOpen(false);
            onBlur();
          }}
          PaperProps={{ 'data-type': 'color-picker' } as any}
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
    </>
  );
}
