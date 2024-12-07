import React, { FunctionComponent, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
  TextField,
  Button,
  Box,
} from '@mui/material';

// Types
import { Resident } from '../../libs/types/resources/Resident';

type AddAttendeeDialogProps = {
  open: boolean;
  onClose: () => void;
  residents: Resident[];
  onAddAttendee: (resident: Resident) => void;
};

const AddAttendeeDialog: FunctionComponent<AddAttendeeDialogProps> = ({
  open,
  onClose,
  residents,
  onAddAttendee,
}) => {
  const [selectedResident, setSelectedResident] = useState<Resident | null>(
    null
  );

  const handleAdd = () => {
    if (selectedResident) {
      onAddAttendee(selectedResident);
      setSelectedResident(null); // Reset selection
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Attendee</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Autocomplete
            options={residents}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Search Resident" />
            )}
            value={selectedResident}
            onChange={(event, newValue) => setSelectedResident(newValue)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            disablePortal={false}
            fullWidth
            ListboxProps={{
              style: {
                maxHeight: '300px',
                overflow: 'auto',
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            disabled={!selectedResident}
          >
            Add Resident
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddAttendeeDialog;
