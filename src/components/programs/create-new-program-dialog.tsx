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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControlLabel,
} from '@mui/material';

// Hooks
import useCreateProgram from './queries/useCreateProgram';

// Type
import { Feedback } from '../../libs/types/resources/Feedback';

type CreateNewProgramDialogProps = {
  handleFeedback: (feedback: Feedback) => void;
};

const CreateNewProgramDialog: FunctionComponent<
  CreateNewProgramDialogProps
> = ({ handleFeedback }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false); // State to manage filter dialog

  const { mutate: createProgram } = useCreateProgram();

  // State to hold form values
  const [newProgram, setNewProgram] = useState({
    name: '',
    location: '',
    allDay: false,
    start: '',
    end: '',
    tags: [] as string[],
    dimension: '',
    facilitators: [] as string[],
    levelOfCare: [] as string[],
    hobbies: [] as string[],
    recurrence: {
      type: '',
    },
    isRepeated: false as boolean,
  });

  const tagsOptions = [
    'Interest & Education',
    'Fitness',
    'Excursions',
    'outing',
    'special',
    'technology',
    'vendor',
  ];
  const facilitatorsOptions = [
    'Active Living Assistant',
    'Contractor-Other',
    'Contractor-Fitness',
    'Disney',
    'Video',
    'Rec Aide',
    'Resident',
    'Director of Rec',
  ];
  const levelOfCareOptions = ['INDEPENDENT', 'ASSISTED', 'MEMORY', 'LONG TERM'];
  const hobbiesOptions = [
    'Stretching',
    ' Aerobics',
    ' Exercice',
    'Well Being',
    ' massage',
    'Nature Appreciation',
    ' Walking',
    'Creative Writing',
    ' Poetry',
    ' Writing',
    'Documentaries',
    ' Learning',
    ' Watching television',
    ' Watching movies',
    'Debate',
    'Role Playing',
    'Board Games',
    'Storytelling',
    'Celebration',
    'Dance',
    'Arts',
    'Pub Games',
    'Boating',
    'Space',
    'Learning',
    'Virtual Reality',
    'Video Games',
    'Alcohol',
    'Paintball',
  ];

  const recurrenceTypeOptions = ['Weekly', 'Yearly', 'Monthly', 'Daily'];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProgram({ ...newProgram, [name]: value });
  };

  const handleSelectChange = (
    name: keyof typeof newProgram,
    value: string[]
  ) => {
    setNewProgram({ ...newProgram, [name]: value });
  };

  const handleRecurrenceChange = (value: string) => {
    setNewProgram((prev) => ({
      ...prev,
      recurrence: {
        ...prev.recurrence,
        type: value,
      },
    }));
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCreate = () => {
    createProgram(newProgram, {
      onSuccess: () => {
        handleDialogClose();

        // Show success feedback
        handleFeedback({
          open: true,
          message: 'Program created successfully!',
          severity: 'success',
        });
      },
      onError: () => {
        // Show error feedback
        handleFeedback({
          open: true,
          message: 'Failed to create program.',
          severity: 'error',
        });
      },
    });
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleDialogOpen}>
        Create New Program
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create New Program</DialogTitle>
        <DialogContent>
          {/* Form Fields */}
          <TextField
            label="Name"
            name="name"
            value={newProgram.name}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Location"
            name="location"
            value={newProgram.location}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newProgram.allDay}
                onChange={() =>
                  setNewProgram({ ...newProgram, allDay: !newProgram.allDay })
                }
              />
            }
            label="All Day"
          />
          <TextField
            label="Start Time"
            name="start"
            value={newProgram.start}
            onChange={handleInputChange}
            type="datetime-local"
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Time"
            name="end"
            value={newProgram.end}
            onChange={handleInputChange}
            type="datetime-local"
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Dimension"
            name="dimension"
            value={newProgram.dimension}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={newProgram.tags}
              onChange={(e) =>
                handleSelectChange('tags', e.target.value as string[])
              }
              renderValue={(selected) => selected.join(', ')}
            >
              {tagsOptions.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={newProgram.tags.includes(tag)} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Facilitators</InputLabel>
            <Select
              multiple
              value={newProgram.facilitators}
              onChange={(e) =>
                handleSelectChange('facilitators', e.target.value as string[])
              }
              renderValue={(selected) => selected.join(', ')}
            >
              {facilitatorsOptions.map((facilitator) => (
                <MenuItem key={facilitator} value={facilitator}>
                  <Checkbox
                    checked={newProgram.facilitators.includes(facilitator)}
                  />
                  <ListItemText primary={facilitator} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Level of Care</InputLabel>
            <Select
              multiple
              value={newProgram.levelOfCare}
              onChange={(e) =>
                handleSelectChange('levelOfCare', e.target.value as string[])
              }
              renderValue={(selected) => selected.join(', ')}
            >
              {levelOfCareOptions.map((level) => (
                <MenuItem key={level} value={level}>
                  <Checkbox checked={newProgram.levelOfCare.includes(level)} />
                  <ListItemText primary={level} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Hobbies</InputLabel>
            <Select
              multiple
              value={newProgram.hobbies}
              onChange={(e) =>
                handleSelectChange('hobbies', e.target.value as string[])
              }
              renderValue={(selected) => selected.join(', ')}
            >
              {hobbiesOptions.map((hobby) => (
                <MenuItem key={hobby} value={hobby}>
                  <Checkbox checked={newProgram.hobbies.includes(hobby)} />
                  <ListItemText primary={hobby} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="recurrence-type-label">Recurrence</InputLabel>
            <Select
              labelId="recurrence-type-label"
              value={newProgram.recurrence.type}
              onChange={(e) => handleRecurrenceChange(e.target.value)}
            >
              {recurrenceTypeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={newProgram.isRepeated}
                onChange={() =>
                  setNewProgram({
                    ...newProgram,
                    isRepeated: !newProgram.isRepeated,
                  })
                }
              />
            }
            label="Is Repeated"
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

export default memo(CreateNewProgramDialog);
