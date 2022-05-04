import React from 'react';
import { IFieldComponentProps } from '../../types';

import { Box, Typography, TypographyProps, Divider } from '@mui/material';

export interface IContentHeaderComponentProps
  extends IFieldComponentProps,
    Partial<Omit<TypographyProps, 'title' | 'onChange' | 'onBlur' | 'ref'>> {}

export default function ContentHeaderComponent({
  field,
  fieldState,
  formState,

  index,
  label,
  children,
  className,

  disabled,
  errorMessage,
  name,
  useFormMethods,
  ...props
}: IContentHeaderComponentProps) {
  return (
    <Box
      className={className}
      sx={[
        {
          mt: 3,
          mb: -1,
          width: '100%',

          whiteSpace: 'pre-line',
          cursor: 'default',
        },
        index === 0 && { mt: 0 },
      ]}
    >
      <Typography
        variant="subtitle1"
        {...({ component: 'h3' } as any)}
        {...props}
      >
        {children ?? label}
      </Typography>

      <Divider sx={{ mt: 0.5 }} />
    </Box>
  );
}
