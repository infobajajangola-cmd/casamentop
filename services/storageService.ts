import { Guest, RSVPStatus, GuestCategory } from '../types';
import { supabase } from './supabaseClient';

// Helper to map DB columns (snake_case) to App Types (camelCase)
const mapFromDb = (row: any): Guest => ({
  id: row.id,
  name: row.name,
  category: row.category as GuestCategory,
  maxCompanions: row.max_companions,
  confirmedCompanions: row.confirmed_companions,
  companionDetails: row.companion_details,
  status: row.status as RSVPStatus,
  tableNumber: row.table_number,
  dietaryRestrictions: row.dietary_restrictions,
  updatedAt: row.updated_at,
  qrCodeHash: row.qr_code_hash,
  checkedInAt: row.checked_in_at
});

// Helper to map App Types to DB columns
const mapToDb = (guest: Guest) => ({
  id: guest.id,
  name: guest.name,
  category: guest.category,
  max_companions: guest.maxCompanions,
  confirmed_companions: guest.confirmedCompanions,
  companion_details: guest.companionDetails,
  status: guest.status,
  table_number: guest.tableNumber,
  dietary_restrictions: guest.dietaryRestrictions,
  updated_at: new Date().toISOString(),
  qr_code_hash: guest.qrCodeHash,
  checked_in_at: guest.checkedInAt
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
    // Mapping updates specifically
    const dbUpdates: any = {};
    if (updates.name) dbUpdates.name = updates.name;
    if (updates.category) dbUpdates.category = updates.category;
    if (updates.maxCompanions !== undefined) dbUpdates.max_companions = updates.maxCompanions;
    if (updates.status) dbUpdates.status = updates.status;
    
    dbUpdates.updated_at = new Date().toISOString();

    const { error } = await supabase
        .from('guests')
        .update(dbUpdates)
        .eq('id', id);

    if (error) throw error;
};

export const checkInGuest = async (id: string): Promise<boolean> => {
    const { error } = await supabase
        .from('guests')
        .update({ checked_in_at: new Date().toISOString() })
        .eq('id', id);
    
    return !error;
}

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