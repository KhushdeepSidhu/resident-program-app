import React, { FunctionComponent, memo } from 'react';

// MUI
import Grid from '@mui/material/Grid2';
import { List } from '@mui/material';

// Components
import { ResidentListItem } from './resident-list-item';

// Types
import type { Resident } from '../../libs/types/resources/Resident';
import { Program } from '../../libs/types/resources/Program';

type ResidentListItemsProps = {
  residents: Resident[];
  programs: Program[];
};

const ResidentListItems: FunctionComponent<ResidentListItemsProps> = ({
  residents,
  programs,
}) => {
  return (
    <Grid container size={8} justifyContent="center" alignItems="center">
      <Grid size={12}>
        <List>
          {residents.map((resident, i) => {
            // Extract the programIds from the attendance array
            const programIds = resident.attendance?.map((r) => r.programId);

            // Find matching programs from the programs list
            const programsAttending = programs.filter((program) =>
              programIds?.includes(program.id)
            );
            return (
              <ResidentListItem
                key={i}
                resident={resident}
                programsAttending={programsAttending}
              />
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};

export default memo(ResidentListItems);
