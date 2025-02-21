import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Button = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <MuiButton {...props} sx={{...theme.components?.MuiButton?.styleOverrides?.root, ...props.sx}}>
      {children}
    </MuiButton>
  );
};

export default Button;