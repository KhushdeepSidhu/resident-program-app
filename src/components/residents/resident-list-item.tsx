import React, { FunctionComponent, useState } from 'react';

// MUI
import { ListItem, ListItemText, Button, Snackbar, Alert } from '@mui/material';

// Types
import type { Resident } from '../../libs/types/resources/Resident';
import type { Program } from '../../libs/types/resources/Program';
import { Feedback } from '../../libs/types/resources/Feedback';

// Components
import AddProgramDialog from './add-program-dialog';

// Hooks
import useAddResidentToProgram from '../programs/queries/useAddResidentToProgram';

type ResidentListItemProps = {
  resident: Resident;
  programs: Program[];
};

export const ResidentListItem: FunctionComponent<ResidentListItemProps> = ({
  resident,
  programs,
}) => {
  const [feedback, setFeedback] = useState<Feedback>({
    open: false,
    message: '',
    severity: 'success',
  });

  const { mutate: addResidentToProgram } = useAddResidentToProgram();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { id, firstName, lastName, status, room, levelOfCare } = resident;

  const handleCloseFeedback = () => {
    setFeedback({ ...feedback, open: false });
  };

  const handleFeedback = (feedback: Feedback) => {
    setFeedback(feedback);
  };

  // Extract the programIds from the attendance array
  const programIds = resident.attendance?.map((r) => r.programId) || [];

  // Find matching programs from the programs list
  const programsAttending = programs.filter((program) =>
    programIds.includes(program.id)
  );

  // Create a comma-separated list of program names
  const programsAttendingNames = programsAttending
    .map((program) => program.name)
    .join(', ');

  // Filter residents for the dropdown: exclude programs that the resident is already attending
  const filteredPrograms = programs.filter(
    (program) => !programIds.includes(program.id)
  );

  const handleAddToProgram = (program: Program) => {
    addResidentToProgram(
      { programId: program.id, residentId: id },
      {
        onSuccess: () => {
          setIsDialogOpen(false);

          // Show success feedback
          handleFeedback({
            open: true,
            message: 'Resident added to program successfully!',
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
        primary={`${firstName} ${lastName}`}
        secondary={
          <>
            <strong>Status:</strong> {status}
            <br />
            <strong>Room:</strong> {room}
            <br />
            <strong>Level of Care:</strong> {levelOfCare}
            <br />
            {programsAttendingNames.length > 0 && (
              <>
                <strong>Programs Attending:</strong> {programsAttendingNames}
              </>
            )}
          </>
        }
      />
      <Button variant="outlined" onClick={() => setIsDialogOpen(true)}>
        Add to Program
      </Button>

      <AddProgramDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        programs={filteredPrograms}
        onAddProgram={handleAddToProgram}
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
