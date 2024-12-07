import { useQuery } from 'react-query';

// API
import { fetchResidents } from '../../../api/residentsApi/residents-api';

// Types
import { Resident } from '../../../libs/types/resources/Resident';

// Custom hook for fetching residents
const useFetchResidents = () => {
  return useQuery<Resident[], Error>('residents', () => fetchResidents(), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });
};

export default useFetchResidents;
