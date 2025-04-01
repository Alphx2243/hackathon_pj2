export interface User {
  id: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  name: string;
  createdAt: Date;
}

export interface Patient {
  id: string;
  userId: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  address: string;
  phone: string;
  medicalHistory: string[];
}

export interface Doctor {
  id: string;
  userId: string;
  specialization: string;
  qualification: string;
  experience: number;
  department: string;
  availableSlots: TimeSlot[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  symptoms: string;
  diagnosis?: string;
  prescription?: Prescription;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  medications: Medication[];
  instructions: string;
  issuedDate: Date;
  followUpDate?: Date;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}