//
import api from '../api';

// Types
import {
  AddResidentRequest,
  Resident,
} from '../../libs/types/resources/Resident';

export const fetchResidents = async (): Promise<Resident[]> => {
  const token = 'f7de8dc4-953a-457e-bf25-444bacb96a4e';
  const res = await api.get<Resident[]>('residents', {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createResident = async (
  newResident: AddResidentRequest
): Promise<Resident> => {
  const token = 'f7de8dc4-953a-457e-bf25-444bacb96a4e';
  const res = await api.post<Resident>(
    'residents',
    { ...newResident },
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
