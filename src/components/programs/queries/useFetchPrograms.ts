import { useQuery } from 'react-query';

// API
import { fetchPrograms } from '../../../api/programsApi/programs-api';

// Types
import { Program } from '../../../libs/types/resources/Program';

// Custom hook for fetching programs
const useFetchPrograms = () => {
  return useQuery<Program[], Error>('programs', () => fetchPrograms(), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });
};

export default useFetchPrograms;
