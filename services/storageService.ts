import { Guest, RSVPStatus, GuestCategory } from '../types';
import { supabase } from './supabaseClient';

// Helper to map DB columns (snake_case) to App Types (camelCase)
const mapFromDb = (row: any): Guest => ({
  id: row.id,
  name: row.name,
  category: row.category as GuestCategory,
  maxAdults: row.max_adults,
  maxChildren: row.max_children,
  createdAt: row.created_at
});

// Helper to map App Types to DB columns
const mapToDb = (guest: Guest) => ({
  id: guest.id,
  name: guest.name,
  category: guest.category,
  max_adults: guest.maxAdults,
  max_children: guest.maxChildren,
  created_at: guest.createdAt || new Date().toISOString()
});

export const getGuests = async (): Promise<Guest[]> => {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching guests:', error);
    return [];
  }
  return (data || []).map(mapFromDb);
};

export const getGuestById = async (id: string): Promise<Guest | undefined> => {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return undefined;
  return mapFromDb(data);
};

export const searchGuests = async (query: string): Promise<Guest[]> => {
  if (query.length < 3) return [];

  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .ilike('name', `%${query}%`);

  if (error) {
    console.error('Error searching guests:', error);
    return [];
  }
  return (data || []).map(mapFromDb);
};

export const saveGuest = async (guest: Guest): Promise<void> => {
  const payload = mapToDb(guest);
  const { error } = await supabase
    .from('guests')
    .upsert(payload);

  if (error) {
    console.error('Error saving guest:', error);
    throw error;
  }
};

export const updateGuest = async (id: string, updates: Partial<Guest>): Promise<void> => {
  const dbUpdates: any = {};
  if (updates.name) dbUpdates.name = updates.name;
  if (updates.category) dbUpdates.category = updates.category;
  if (updates.maxAdults !== undefined) dbUpdates.max_adults = updates.maxAdults;
  if (updates.maxChildren !== undefined) dbUpdates.max_children = updates.maxChildren;

  const { error } = await supabase
    .from('guests')
    .update(dbUpdates)
    .eq('id', id);

  if (error) throw error;
};

export const deleteGuest = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('guests')
    .delete()
    .eq('id', id);

  if (error) console.error("Error deleting guest", error);
};

export const bulkImportGuests = async (newGuests: Guest[]): Promise<void> => {
  const payload = newGuests.map(mapToDb);
  const { error } = await supabase
    .from('guests')
    .insert(payload);

  if (error) {
    console.error("Bulk import failed", error);
    throw error;
  }
};

export const checkInGuest = async (guestId: string, eventId: string, adults: number, children: number, checkedBy?: string): Promise<boolean> => {
  const { error } = await supabase
    .from('checkins')
    .insert({
      event_id: eventId,
      guest_id: guestId,
      adults: adults,
      children: children,
      checked_by: checkedBy,
      checked_at: new Date().toISOString()
    });

  return !error;
};

// RSVP Functions
export const getGuestRSVP = async (guestId: string) => {
  const { data, error } = await supabase.from('rsvps').select('*').eq('guest_id', guestId).single();
  if (error || !data) return undefined;

  return {
    id: data.id,
    guestId: data.guest_id,
    status: data.status as RSVPStatus,
    adults: data.adults,
    children: data.children,
    companionNames: data.companion_names ? JSON.parse(data.companion_names) : [],
    updatedAt: data.updated_at,
    eventId: data.event_id
  };
};

export const saveGuestRSVP = async (rsvp: any) => {
  const payload = {
    id: rsvp.id,
    guest_id: rsvp.guestId,
    status: rsvp.status,
    adults: rsvp.adults,
    children: rsvp.children,
    companion_names: rsvp.companionNames ? JSON.stringify(rsvp.companionNames) : null,
    updated_at: rsvp.updatedAt || new Date().toISOString(),
    event_id: rsvp.eventId
  };

  const { error } = await supabase.from('rsvps').upsert(payload);
  if (error) throw error;
};

export const getMainEvent = async () => {
  const { data, error } = await supabase.from('events').select('*').limit(1).single();
  if (error) return null;
  return data;
};