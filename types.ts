export enum RSVPStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED'
}

export enum GuestCategory {
  FAMILY = 'Family',
  FRIEND = 'Friend',
  WORK = 'Work',
  VIP = 'VIP'
}

export interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  category: GuestCategory;
  maxCompanions: number;
  confirmedCompanions: number;
  companionDetails?: string; // Stores names of companions
  status: RSVPStatus;
  tableNumber?: number;
  dietaryRestrictions?: string;
  updatedAt: string; // ISO Date
  qrCodeHash: string;
}

export interface EventStats {
  totalGuests: number;
  confirmed: number;
  declined: number;
  pending: number;
  totalPax: number; // Including companions
}

export interface ChartDataPoint {
  name: string;
  value: number;
}