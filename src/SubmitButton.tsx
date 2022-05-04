import React from 'react';

import { Button, ButtonProps } from '@mui/material';

export interface ISubmitButtonProps extends ButtonProps {
  label?: React.ReactNode;
}

export default function SubmitButton({ label, ...props }: ISubmitButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      {...props}
      sx={[
        { display: 'flex', mt: 3, mx: 'auto', mb: 0, minWidth: 120 },
        ...(Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : []),
      ]}
    >
      {label || 'Submit'}
    </Button>
  );
}
