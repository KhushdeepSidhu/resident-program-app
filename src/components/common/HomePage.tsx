import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateResidents = () => {
    navigate(`/residents`);
  };

  const handleNavigatePrograms = () => {
    navigate(`/programs`);
  };

  return (
    <Box sx={{ textAlign: 'center', p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welbi
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNavigateResidents}
        >
          Browse Residents
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleNavigatePrograms}
        >
          Browse Programs
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
