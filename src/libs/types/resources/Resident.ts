export type Attendance = {
  programId: number;
  residentId: number;
  status: string;
};

export type Resident = {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  preferredName: string | null;
  status: string;
  room: string;
  levelOfCare: string;
  ambulation: string;
  birthDate: string; // ISO Date string
  moveInDate: string; // ISO Date string
  createdAt?: string; // ISO Date string
  updatedAt?: string; // ISO Date string
  applicantId?: number | null;
  attendance?: Attendance[];
};
