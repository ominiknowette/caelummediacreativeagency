import { BookingOrder, CreatorProfile, Service } from '@/types';
import { INITIAL_PROFILE, INITIAL_SERVICES } from '@/data/mockData';
import { isSupabaseConfigured, supabase } from './supabaseClient';

const STORAGE_KEYS = {
  SERVICES: 'editorial_platform_services_v1',
  PROFILE: 'editorial_platform_profile_v1',
  ORDERS: 'editorial_platform_orders_v1',
};

// Client-side helper to read localStorage safely
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

// Client-side helper to write localStorage safely
function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

// ======================
// PROFILE OPERATIONS
// ======================
export async function getProfile(): Promise<CreatorProfile> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .single();

      if (!error && data) {
        return data as CreatorProfile;
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local store', err);
    }
  }

  return getLocalItem<CreatorProfile>(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
}

export async function updateProfile(updated: CreatorProfile): Promise<CreatorProfile> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('profile')
        .upsert({ id: 'primary', ...updated });

      if (error) throw error;
    } catch (err) {
      console.warn('Supabase update failed, saving locally', err);
    }
  }

  setLocalItem(STORAGE_KEYS.PROFILE, updated);
  return updated;
}

// ======================
// SERVICES OPERATIONS
// ======================
export async function getServices(): Promise<Service[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Service[];
      }
    } catch (err) {
      console.warn('Supabase services fetch failed, falling back to local store', err);
    }
  }

  const local = getLocalItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  return local.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getServices();
  const match = services.find((s) => s.slug === slug);
  return match || null;
}

export async function saveService(service: Service): Promise<Service> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('services').upsert(service);
      if (error) throw error;
    } catch (err) {
      console.warn('Supabase saveService failed, saving locally', err);
    }
  }

  const current = await getServices();
  const index = current.findIndex((s) => s.id === service.id);
  let updatedList: Service[];

  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = service;
  } else {
    updatedList = [...current, service];
  }

  setLocalItem(STORAGE_KEYS.SERVICES, updatedList);
  return service;
}

export async function deleteService(serviceId: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);
      if (error) throw error;
    } catch (err) {
      console.warn('Supabase deleteService failed, saving locally', err);
    }
  }

  const current = await getServices();
  const filtered = current.filter((s) => s.id !== serviceId);
  setLocalItem(STORAGE_KEYS.SERVICES, filtered);
  return true;
}

export async function reorderServices(orderedIds: string[]): Promise<Service[]> {
  const current = await getServices();
  const reordered = current.map((item) => {
    const newIdx = orderedIds.indexOf(item.id);
    return {
      ...item,
      displayOrder: newIdx !== -1 ? newIdx + 1 : item.displayOrder,
    };
  }).sort((a, b) => a.displayOrder - b.displayOrder);

  if (isSupabaseConfigured && supabase) {
    try {
      for (const item of reordered) {
        await supabase
          .from('services')
          .update({ display_order: item.displayOrder })
          .eq('id', item.id);
      }
    } catch (err) {
      console.warn('Supabase reorder failed, saving locally', err);
    }
  }

  setLocalItem(STORAGE_KEYS.SERVICES, reordered);
  return reordered;
}

// ======================
// ORDERS & BOOKINGS
// ======================
export async function saveOrder(order: BookingOrder): Promise<BookingOrder> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('orders').insert(order);
      if (error) throw error;
    } catch (err) {
      console.warn('Supabase saveOrder failed, saving locally', err);
    }
  }

  const orders = getLocalItem<BookingOrder[]>(STORAGE_KEYS.ORDERS, []);
  orders.unshift(order);
  setLocalItem(STORAGE_KEYS.ORDERS, orders);
  return order;
}

export async function getOrders(): Promise<BookingOrder[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data as BookingOrder[];
      }
    } catch (err) {
      console.warn('Supabase getOrders failed, fallback to local', err);
    }
  }

  return getLocalItem<BookingOrder[]>(STORAGE_KEYS.ORDERS, []);
}
