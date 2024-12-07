export type Program = {
  id: number;
  parentId?: number | null;
  name: string;
  location: string;
  allDay: boolean;
  start: string; // ISO date string
  end: string; // ISO date string
  tags: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  dimension: string;
  facilitators: string[];
  levelOfCare: string[];
  hobbies: string[];
  recurrence: {
    type: string; // e.g., "Weekly"
  };
  isRepeated: boolean;
  applicantId: number | null;
  attendance: Attendance[];
};

export type Attendance = {
  programId: number;
  residentId: number;
  status: string; // e.g., "Active"
};

export type AddResidentToProgramResponse = {
  status: string;
  programId: number;
  residentId: number;
  applicantId: number;
};

export type AddResidentToProgramRequest = {
  programId: number;
  residentId: number;
};
