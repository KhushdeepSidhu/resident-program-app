import React, { FunctionComponent } from 'react';

// MUI
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from '@mui/material';

// Types
import type { Resident } from '../../libs/types/resources/Resident';
import type { Program } from '../../libs/types/resources/Program';

type ResidentListItemProps = {
  resident: Resident;
  programsAttending: Program[];
};

export const ResidentListItem: FunctionComponent<ResidentListItemProps> = ({
  resident,
  programsAttending,
}) => {
  const { id, firstName, lastName, status, room, levelOfCare } = resident;

  // Create a comma-separated list of program names
  const programsAttendingNames = programsAttending
    .map((program) => program.name)
    .join(', ');

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
    </ListItem>
  );
};
