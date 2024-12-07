import React, { FunctionComponent, memo, useState } from 'react';

// MUI
import Grid from '@mui/material/Grid2';
import { List } from '@mui/material';

// Components
import { ProgramListItem } from './program-list-item';

// Types
import type { Program } from '../../libs/types/resources/Program';
import type { Resident } from '../../libs/types/resources/Resident';

type ProgramListItemsProps = {
  programs: Program[];
  residents: Resident[];
};

const ProgramListItems: FunctionComponent<ProgramListItemsProps> = ({
  programs,
  residents,
}) => {
  return (
    <Grid container size={8} justifyContent="center" alignItems="center">
      <Grid size={12}>
        <List>
          {programs.map((program, i) => {
            return (
              <ProgramListItem
                key={i}
                program={program}
                residents={residents}
              />
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};

export default memo(ProgramListItems);
