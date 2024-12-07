import React, { FunctionComponent } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingIndicator: FunctionComponent = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt: 4,
    }}
  >
    <CircularProgress />
    <Typography>Loading...</Typography>
  </Box>
);

export default LoadingIndicator;
