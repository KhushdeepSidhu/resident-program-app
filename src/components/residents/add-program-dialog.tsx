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
import { Program } from '../../libs/types/resources/Program';

type AddProgramDialogProps = {
  open: boolean;
  onClose: () => void;
  programs: Program[];
  onAddProgram: (program: Program) => void;
};

const AddProgramDialog: FunctionComponent<AddProgramDialogProps> = ({
  open,
  onClose,
  programs,
  onAddProgram,
}) => {
  const [selectedProgram, setselectedProgram] = useState<Program | null>(null);

  const handleAdd = () => {
    if (selectedProgram) {
      onAddProgram(selectedProgram);
      setselectedProgram(null); // Reset selection
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add to Program</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Autocomplete
            options={programs}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Search Program" />
            )}
            value={selectedProgram}
            onChange={(event, newValue) => setselectedProgram(newValue)}
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
            disabled={!selectedProgram}
          >
            Add Program
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddProgramDialog;
