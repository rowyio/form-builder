import React, { useRef, useState } from 'react';
import { IFieldComponentProps } from '../../types';
import { ColorPicker, toColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

import {
  TextField,
  TextFieldProps,
  InputAdornment,
  Box,
  IconButton,
  Popover,
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';

import FieldAssistiveText from '../../FieldAssistiveText';

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
              <Box
                sx={{
                  width: 20,
                  height: 20,

                  boxShadow: (theme) =>
                    `0 0 0 1px ${theme.palette.action.disabled} inset`,
                  borderRadius: '50%',

                  backgroundColor: value.hex,
                }}
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
          <ColorPicker
            width={240}
            height={180}
            color={value?.hex ? value : toColor('hex', '#fff')}
            onChange={onChange}
            alpha={enableAlpha}
          />
        </Popover>
      )}
    </>
  );
}
