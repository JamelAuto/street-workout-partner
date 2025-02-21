import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const TextField = ({ ...props }) => {
  const theme = useTheme();
  return (
    <MuiTextField {...props} sx={{...theme.components?.MuiTextField?.styleOverrides?.root, ...props.sx}}/>
  );
};

export default TextField;