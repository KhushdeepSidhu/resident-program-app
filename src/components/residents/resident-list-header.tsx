import React, { FunctionComponent, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI
import { Typography, Button, Box, Snackbar, Alert } from '@mui/material';

// Dialog
import CreateNewResidentDialog from './create-new-reisdent-dialog';

// Type
import { Feedback } from '../../libs/types/resources/Feedback';

const ResidentListHeader: FunctionComponent = () => {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState<Feedback>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCloseFeedback = () => {
    setFeedback({ ...feedback, open: false });
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleFeedback = (feedback: Feedback) => {
    setFeedback(feedback);
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Button variant="contained" color="secondary" onClick={handleHomeClick}>
          Home
        </Button>
        <Typography variant="h5" color="white" align="center" flexGrow={1}>
          Residents
        </Typography>

        <CreateNewResidentDialog handleFeedback={handleFeedback} />
      </Box>
      <Snackbar
        open={feedback.open}
        autoHideDuration={4000} // Closes after 4 seconds
        onClose={handleCloseFeedback}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseFeedback}
          severity={feedback.severity}
          sx={{ width: '100%' }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default memo(ResidentListHeader);
