import React from 'react';

// Components
import LoadingIndicator from '../common/loading-indicator';
import ResidentListHeader from './resident-list-header';
import ResidentListItems from './resident-list-items';

// MUI
import { Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';

// Hooks
import useFetchResidents from './queries/useFetchResidents';
import useFetchPrograms from '../programs/queries/useFetchPrograms';

const ResidentList = () => {
  const {
    data: residents,
    isLoading: isLoadingResidents,
    isFetching: isFetchingResidents,
    isSuccess: isSuccessResidents,
    isError: isErrorResidents,
    error: errorResidents,
  } = useFetchResidents();

  const {
    data: programs,
    isLoading: isLoadingPrograms,
    isFetching: isFetchingPrograms,
    isSuccess: isSuccessPrograms,
    isError: isErrorPrograms,
    error: errorPrograms,
  } = useFetchPrograms();

  const isLoading = isLoadingResidents || isLoadingPrograms;
  const isError = isErrorResidents || isErrorPrograms;
  const error = errorResidents || errorPrograms;

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
          <ResidentListHeader />
        </Grid>
      </Grid>

      {isSuccessResidents && isSuccessPrograms ? (
        <Grid container size={12} justifyContent="center" alignItems="center">
          {isFetchingResidents && isFetchingPrograms ? (
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
            <ResidentListItems residents={residents} programs={programs} />
          )}
        </Grid>
      ) : null}
    </Grid>
  );
};

export default ResidentList;
