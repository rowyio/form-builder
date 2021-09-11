import React from 'react';

import { Typography, TypographyProps } from '@mui/material';

export interface ISubmitErrorProps extends TypographyProps {}

export default function SubmitError(props: ISubmitErrorProps) {
  return (
    <Typography
      variant="body2"
      color="error"
      align="center"
      {...props}
      children={
        props.children ||
        'Cannot continue. Make sure all the required fields are in the correct format.'
      }
      sx={{ mt: 1, userSelect: 'none', ...props.sx }}
    />
  );
}
