import { useMutation, useQueryClient } from 'react-query';

// Types
import {
  AddProgramRequest,
  Program,
} from '../../../libs/types/resources/Program';

// API
import { createProgram } from '../../../api/programsApi/programs-api';

// Create program mutation hook
const useCreateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation<Program, Error, AddProgramRequest>(createProgram, {
    onSuccess: (newProgram: Program) => {
      // Update the program list
      queryClient.setQueryData<Program[]>('programs', (oldPrograms) =>
        oldPrograms ? [...oldPrograms, newProgram] : [newProgram]
      );
    },
    onError: (error) => {
      console.error('Failed to create program:', error);
    },
  });
};

export default useCreateProgram;
