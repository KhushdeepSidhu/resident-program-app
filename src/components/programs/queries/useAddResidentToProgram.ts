import { useMutation, useQueryClient } from 'react-query';

// Types
import {
  Program,
  AddResidentToProgramRequest,
  AddResidentToProgramResponse,
} from '../../../libs/types/resources/Program';

// API
import { addResidentToProgram } from '../../../api/programsApi/programs-api';

// Create add resident to a program mutation hook
const useAddResidentToProgram = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AddResidentToProgramResponse,
    Error,
    AddResidentToProgramRequest
  >(addResidentToProgram, {
    onSuccess: (programAttendee: AddResidentToProgramResponse) => {
      // Update the program list
      queryClient.setQueryData<Program[]>(['programs'], (oldPrograms) =>
        oldPrograms
          ? oldPrograms.map((program) =>
              program.id === programAttendee.programId
                ? {
                    ...program,
                    attendance: [
                      ...program.attendance!,
                      {
                        programId: programAttendee.programId,
                        residentId: programAttendee.residentId,
                        status: programAttendee.status,
                      },
                    ],
                  }
                : program
            )
          : []
      );
    },
    onError: (error) => {
      console.error('Failed to create program:', error);
    },
  });
};

export default useAddResidentToProgram;
