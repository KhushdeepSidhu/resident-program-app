import React, { FunctionComponent, useState } from 'react';
import { ListItem, ListItemText, Button, Snackbar, Alert } from '@mui/material';

// Types
import { Program } from '../../libs/types/resources/Program';
import { Resident } from '../../libs/types/resources/Resident';
import { Feedback } from '../../libs/types/resources/Feedback';

// Hooks
import useAddResidentToProgram from './queries/useAddResidentToProgram';

// Components
import AddAttendeeDialog from './add-attendee-dialog';

type ProgramListItemProps = {
  program: Program;
  residents: Resident[];
};

export const ProgramListItem: FunctionComponent<ProgramListItemProps> = ({
  program,
  residents,
}) => {
  const [feedback, setFeedback] = useState<Feedback>({
    open: false,
    message: '',
    severity: 'success',
  });
  const { mutate: addResidentToProgram } = useAddResidentToProgram();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseFeedback = () => {
    setFeedback({ ...feedback, open: false });
  };

  const handleFeedback = (feedback: Feedback) => {
    setFeedback(feedback);
  };

  const { id, name, location, dimension } = program;

  // Extract the residentIds from the attendance array
  const attendeeIds = program.attendance?.map((a) => a.residentId) || [];

  // Find matching residents from the residents list
  const attendees = residents.filter((resident) =>
    attendeeIds.includes(resident.id)
  );

  // Create a comma-separated list of attendee names
  const attendeeNames = attendees.map((attendee) => attendee.name).join(', ');

  // Filter residents for the dropdown: exclude attendees
  const filteredResidents = residents.filter(
    (resident) => !attendeeIds.includes(resident.id)
  );

  const handleAddAttendee = (resident: Resident) => {
    addResidentToProgram(
      { programId: id, residentId: resident.id },
      {
        onSuccess: () => {
          setIsDialogOpen(false);

          // Show success feedback
          handleFeedback({
            open: true,
            message: 'Attendee added to program successfully!',
            severity: 'success',
          });
        },
        onError: () => {
          // Show error feedback
          handleFeedback({
            open: true,
            message: 'Failed to add attendee to program.',
            severity: 'error',
          });
        },
      }
    );
  };

  return (
    <ListItem key={id} divider>
      <ListItemText
        primary={name}
        secondary={
          <>
            <strong>Location:</strong> {location}
            <br />
            <strong>Dimension:</strong> {dimension}
            <br />
            {attendees.length > 0 && (
              <>
                <strong>Attendees:</strong> {attendeeNames}
              </>
            )}
          </>
        }
      />
      <Button variant="outlined" onClick={() => setIsDialogOpen(true)}>
        Add Attendee
      </Button>

      <AddAttendeeDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        residents={filteredResidents}
        onAddAttendee={handleAddAttendee}
      />

      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
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
    </ListItem>
  );
};

export default ProgramListItem;
