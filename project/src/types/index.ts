export interface User {
  id: string;
  email: string;
  role: 'admin' | 'staff' | 'customer';
  firstName: string;
  lastName: string;
  phone: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  type: 'dog' | 'cat' | 'horse' | 'chicken' | 'other';
  breed?: string;
  age: number;
  weight: number;
  medications?: Medication[];
  careInstructions?: string;
  vetInfo: VetInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
}

export interface VetInfo {
  name: string;
  phone: string;
  address: Address;
  email?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isTimeSlotBased: boolean;
  isRecurringAvailable: boolean;
  type: 'dog_walking' | 'pet_sitting' | 'poop_scooping' | 'farm_animal_care';
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  customerId: string;
  petIds: string[];
  serviceId: string;
  staffId?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  startTime: Date;
  endTime: Date;
  isRecurring: boolean;
  recurringSchedule?: RecurringSchedule;
  price: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecurringSchedule {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number;
  endDate?: Date;
}