import React from 'react';

// Components
import LoadingIndicator from '../common/loading-indicator';
import ProgramListHeader from './program-list-header';
import ProgramListItems from './program-list-items';

// MUI
import { Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';

// Hooks
import useFetchPrograms from './queries/useFetchPrograms';
import useFetchResidents from '../residents/queries/useFetchResidents';

const ProgramList = () => {
  const {
    data: programs,
    isLoading: isLoadingPrograms,
    isFetching: isFetchingPrograms,
    isSuccess: isSuccessPrograms,
    isError: isErrorPrograms,
    error: errorPrograms,
  } = useFetchPrograms();

  const {
    data: residents,
    isLoading: isLoadingResidents,
    isFetching: isFetchingResidents,
    isSuccess: isSuccessResidents,
    isError: isErrorResidents,
    error: errorResidents,
  } = useFetchResidents();

  const isLoading = isLoadingPrograms || isLoadingResidents;
  const isError = isErrorPrograms || isErrorResidents;
  const error = errorPrograms || errorResidents;

  if (isLoading) return <LoadingIndicator />;
  if (isError)
    return (
      <Typography>Error: {error?.message || 'Something went wrong'}</Typography>
    );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid
        container
        sx={{
          backgroundColor: '#6495ED',
          padding: 2,
          mb: 2,
          borderRadius: '8px',
        }}
        size={10}
        justifyContent="center"
        alignItems="center"
      >
        <Grid size={12}>
          <ProgramListHeader />
        </Grid>
      </Grid>

      {isSuccessPrograms && isSuccessResidents ? (
        <Grid container size={12} justifyContent="center" alignItems="center">
          {isFetchingPrograms && isFetchingResidents ? (
            <Grid
              container
              size={12}
              justifyContent="center"
              alignItems="center"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '200px',
              }}
            >
              <CircularProgress sx={{ color: '#6495ED' }} size={100} />
              <Typography sx={{ mt: 2, color: '#6495ED' }} fontSize={20}>
                Loading...
              </Typography>
            </Grid>
          ) : (
            <ProgramListItems programs={programs} residents={residents} />
          )}
        </Grid>
      ) : null}
    </Grid>
  );
};

export default ProgramList;
