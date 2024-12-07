import { useMutation, useQueryClient } from 'react-query';

// Types
import { Resident } from '../../../libs/types/resources/Resident';

// API
import { createResident } from '../../../api/residentsApi/residents-api';

// Create resident mutation hook
const useCreateResident = () => {
  const queryClient = useQueryClient();

  return useMutation<Resident, Error, Resident>(createResident, {
    onSuccess: (newResident: Resident) => {
      // Update the resident list
      queryClient.setQueryData<Resident[]>('residents', (oldResidents) =>
        oldResidents ? [...oldResidents, newResident] : [newResident]
      );
    },
    onError: (error) => {
      console.error('Failed to create resident:', error);
    },
  });
};

export default useCreateResident;
