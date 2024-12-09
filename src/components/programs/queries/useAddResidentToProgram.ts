import { useMutation, useQueryClient } from 'react-query';

// Types
import {
  Program,
  AddResidentToProgramRequest,
  AddResidentToProgramResponse,
} from '../../../libs/types/resources/Program';
import { Resident } from '../../../libs/types/resources/Resident';

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

      // Update the resident list
      queryClient.setQueryData<Resident[]>(['residents'], (oldResidents) =>
        oldResidents
          ? oldResidents.map((resident) =>
              resident.id === programAttendee.residentId
                ? {
                    ...resident,
                    attendance: [
                      ...resident.attendance,
                      {
                        programId: programAttendee.programId,
                        residentId: programAttendee.residentId,
                        status: programAttendee.status,
                      },
                    ],
                  }
                : resident
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
