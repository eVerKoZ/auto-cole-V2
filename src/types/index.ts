export enum UserRole {
  CLIENT = 'client',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone: string;
  nephCode?: string;
  codeExamPassed?: boolean;
  createdAt: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  hours: number;
  type: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  model: string;
  year: number;
  transmission: string;
  createdAt: string;
}

export interface Reservation {
  id: string;
  clientId: string;
  instructorId: string;
  vehicleId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Feedback {
  id: string;
  reservationId: string;
  instructorId: string;
  clientId: string;
  content: string;
  createdAt: string;
}

export interface UserPackage {
  userId: string;
  packageId: string;
  purchaseDate: string;
  hoursUsed: number;
}