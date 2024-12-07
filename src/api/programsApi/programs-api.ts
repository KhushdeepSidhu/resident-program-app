// API
import api from '../api';

// Types
import type {
  Program,
  AddResidentToProgramRequest,
  AddResidentToProgramResponse,
} from '../../libs/types/resources/Program';

export const fetchPrograms = async (): Promise<Program[]> => {
  const token = 'f7de8dc4-953a-457e-bf25-444bacb96a4e';
  const res = await api.get<Program[]>('programs', {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createProgram = async (newProgram: Program): Promise<Program> => {
  const token = 'f7de8dc4-953a-457e-bf25-444bacb96a4e';
  const res = await api.post<Program>(
    'programs',
    { ...newProgram },
    {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data;
};

export const addResidentToProgram = async ({
  programId,
  residentId,
}: AddResidentToProgramRequest): Promise<AddResidentToProgramResponse> => {
  const token = 'f7de8dc4-953a-457e-bf25-444bacb96a4e';
  const res = await api.post<AddResidentToProgramResponse>(
    `programs/${programId}/attend`,
    {
      residentId,
      status: 'Active',
    },
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
