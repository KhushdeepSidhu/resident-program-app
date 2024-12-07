// React
import React, { FunctionComponent, useState, memo, ChangeEvent } from 'react';

// MUI
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';

// Hooks
import useCreateResident from './queries/useCreateResident';

// Types
import { Feedback } from '../../libs/types/resources/Feedback';

type CreateNewResidentDialogProps = {
  handleFeedback: (feedback: Feedback) => void;
};

const CreateNewResidentDialog: FunctionComponent<
  CreateNewResidentDialogProps
> = ({ handleFeedback }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false); // State to manage filter dialog

  const { mutate: createResident } = useCreateResident();

  // State to hold form values
  const [newResident, setNewResident] = useState({
    name: '',
    firstName: '',
    lastName: '',
    preferredName: '',
    status: 'Here',
    room: '',
    levelOfCare: 'INDEPENDENT',
    ambulation: 'NOLIMITATIONS',
    birthDate: '',
    moveInDate: '',
  });

  const statuses = ['Here', 'LOA', 'Hospital', 'Isolation'];
  const levelsOfCare = ['INDEPENDENT', 'ASSISTED', 'MEMORY', 'LONGTERM'];
  const ambulationOptions = ['CANE', 'WALKER', 'NOLIMITATIONS', 'WHEELCHAIR'];

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewResident({ ...newResident, [name]: value });
  };

  const handleCreate = () => {
    createResident(newResident, {
      onSuccess: () => {
        handleDialogClose();

        // Show success feedback
        handleFeedback({
          open: true,
          message: 'Resident created successfully!',
          severity: 'success',
        });
      },
      onError: () => {
        // Show error feedback
        handleFeedback({
          open: true,
          message: 'Failed to create resident.',
          severity: 'error',
        });
      },
    });
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleDialogOpen}>
        Create New Resident
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create New Resident</DialogTitle>
        <DialogContent>
          {/* Form Fields */}
          <TextField
            label="Full Name"
            name="name"
            value={newResident.name}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="First Name"
            name="firstName"
            value={newResident.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={newResident.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Preferred Name"
            name="preferredName"
            value={newResident.preferredName}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            select
            label="Status"
            name="status"
            value={newResident.status}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            variant="outlined"
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Room Number"
            name="room"
            value={newResident.room}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            select
            label="Level of Care"
            name="levelOfCare"
            value={newResident.levelOfCare}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            variant="outlined"
          >
            {levelsOfCare.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Ambulation"
            name="ambulation"
            value={newResident.ambulation}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            variant="outlined"
          >
            {ambulationOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Birth Date"
            name="birthDate"
            value={newResident.birthDate}
            onChange={handleInputChange}
            type="date"
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Move-in Date"
            name="moveInDate"
            value={newResident.moveInDate}
            onChange={handleInputChange}
            type="date"
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(CreateNewResidentDialog);
