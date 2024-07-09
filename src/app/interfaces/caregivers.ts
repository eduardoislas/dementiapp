import { User } from "../interfaces/users";


export interface apiCaregiver {
    success: boolean;
    caregiver: Caregiver[];
}

export interface Caregiver {
    status: boolean,
    _id: string,
    name: string,
    lastName: string,
    lastNameSecond: string,
    birthdate: string,
    age: number,
    gender: string,
    civilStatus: string,
    school: string,
    occupation: string,
    relation: string,
    phone: string,
    email: string,
    patient: Patient,
    registerDate: string,
    user: User;
}

export interface Patient {
    img: string;
    _id: string;
    name: string;
    lastName: string;
    lastNameSecond: string;
    phase: string;
    birthdate: string;
    diagnosis: Diagnosis[];
  }

  interface Diagnosis {
    status: string;
    _id: string;
    name: string;
  }
