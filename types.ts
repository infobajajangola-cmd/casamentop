export enum RSVPStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  DECLINED = 'declined'
}

export enum GuestCategory {
  FAMILY_BRIDE = 'Família da Noiva',
  FAMILY_GROOM = 'Família do Noivo',
  FRIEND = 'Amigo',
  WORK = 'Trabalho',
  VIP = 'VIP'
}

export enum FamilySide {
  BRIDE = 'Noiva',
  GROOM = 'Noivo',
  BOTH = 'Ambos',
  NONE = 'Nenhum'
}

export interface Guest {
  id: string;
  name: string;
  category?: GuestCategory;
  familySide?: FamilySide; // Lado da família
  maxAdults: number;
  maxChildren: number;
  createdAt: string; // ISO Date
  rsvpStatus?: RSVPStatus;
  confirmedAdults?: number;
  confirmedChildren?: number;
  rsvpDate?: string; // ISO Date
}

export interface GuestRSVP {
  id: string;
  guestId: string;
  status: RSVPStatus;
  adults: number;
  children: number;
  companionNames?: string[]; // Nomes dos acompanhantes
  updatedAt: string; // ISO Date
  eventId?: string;
}

export interface GuestCheckIn {
  id: string;
  eventId: string;
  guestId: string;
  adults: number;
  children: number;
  checkedBy?: string;
  checkedAt: string; // ISO Date
}

export interface InvitationToken {
  id: string;
  guestId: string;
  token: string;
  generatedAt: string; // ISO Date
  usedAt?: string; // ISO Date
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