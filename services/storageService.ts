import { Guest, RSVPStatus, GuestCategory } from '../types';

const STORAGE_KEY = 'lumina_wedding_data_v1';

// Mock Initial Data
const INITIAL_GUESTS: Guest[] = [
  {
    id: '1',
    name: 'Leonardo DiCaprio',
    category: GuestCategory.VIP,
    maxCompanions: 1,
    confirmedCompanions: 0,
    status: RSVPStatus.PENDING,
    updatedAt: new Date().toISOString(),
    qrCodeHash: 'leo-vip-001'
  },
  {
    id: '2',
    name: 'Margot Robbie',
    category: GuestCategory.FRIEND,
    maxCompanions: 2,
    confirmedCompanions: 1,
    status: RSVPStatus.CONFIRMED,
    updatedAt: new Date().toISOString(),
    qrCodeHash: 'margot-friend-002'
  },
  {
    id: '3',
    name: 'Cillian Murphy',
    category: GuestCategory.WORK,
    maxCompanions: 0,
    confirmedCompanions: 0,
    status: RSVPStatus.DECLINED,
    updatedAt: new Date().toISOString(),
    qrCodeHash: 'cillian-work-003'
  },
  {
    id: '4',
    name: 'Robert Downey Jr.',
    category: GuestCategory.FAMILY,
    maxCompanions: 3,
    confirmedCompanions: 0,
    status: RSVPStatus.PENDING,
    updatedAt: new Date().toISOString(),
    qrCodeHash: 'rdj-fam-004'
  }
];

export const getGuests = (): Guest[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GUESTS));
    return INITIAL_GUESTS;
  }
  return JSON.parse(stored);
};

export const getGuestById = (id: string): Guest | undefined => {
  const guests = getGuests();
  return guests.find(g => g.id === id);
};

export const searchGuests = (query: string): Guest[] => {
  if (query.length < 3) return [];
  const guests = getGuests();
  const lowerQ = query.toLowerCase();
  return guests.filter(g => g.name.toLowerCase().includes(lowerQ));
};

export const saveGuest = (guest: Guest): void => {
  const guests = getGuests();
  const index = guests.findIndex(g => g.id === guest.id);
  if (index >= 0) {
    guests[index] = { ...guest, updatedAt: new Date().toISOString() };
  } else {
    guests.push({ ...guest, updatedAt: new Date().toISOString() });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
};

export const deleteGuest = (id: string): void => {
  const guests = getGuests();
  const filtered = guests.filter(g => g.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const bulkImportGuests = (newGuests: Guest[]): void => {
  const current = getGuests();
  const merged = [...current, ...newGuests];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
};