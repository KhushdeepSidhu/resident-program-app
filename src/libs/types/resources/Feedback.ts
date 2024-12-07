import { AlertColor } from '@mui/material';

export type Feedback = {
  open: boolean;
  message: string;
  severity: AlertColor;
};
