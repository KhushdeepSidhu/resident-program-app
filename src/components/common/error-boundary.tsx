import React, { ReactNode } from 'react';

import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true });
  }

  handleGoBack = () => {
    // Go back to the previous page
    window.history.back();
  };

  handleRefresh = () => {
    // Refresh the page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Grid
          container
          direction={'column'}
          spacing={2}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Grid>
            <Typography variant={'h5'}>Something went wrong.</Typography>
          </Grid>
          <Grid>
            <Typography>
              Please refresh the page. If the problem still persists you can
              contact our customer support.
            </Typography>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid>
              <Button
                variant={'outlined'}
                color={'primary'}
                startIcon={<ArrowBackIcon />}
                onClick={this.handleGoBack}
              >
                Go Back
              </Button>
            </Grid>

            <Grid>
              <Button
                variant={'contained'}
                color={'primary'}
                startIcon={<RefreshIcon />}
                onClick={this.handleRefresh}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        </Grid>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
