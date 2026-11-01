import { SavedEvent } from '../types/event';
import { defaultStarterEvents } from './sampleData';
import { db, isFirebaseConfigured, auth } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';

const LOCAL_STORAGE_EVENTS_KEY = 'eventease_events_store';
const LOCAL_STORAGE_ACTIVE_ID_KEY = 'eventease_active_event_id';

// Initialize local storage with starters if empty
function initializeLocalStorage(): SavedEvent[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(defaultStarterEvents));
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_ID_KEY, defaultStarterEvents[0].id);
      return defaultStarterEvents;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Local storage error:", err);
    return defaultStarterEvents;
  }
}

export async function getAllEvents(userId?: string): Promise<SavedEvent[]> {
  // If Firebase is configured and user is logged in
  if (isFirebaseConfigured && db && auth?.currentUser && !auth.currentUser.isAnonymous) {
    try {
      const q = query(collection(db, 'events'), where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const events: SavedEvent[] = [];
      querySnapshot.forEach((docSnap) => {
        events.push(docSnap.data() as SavedEvent);
      });
      if (events.length > 0) {
        return events;
      }
    } catch (err) {
      console.warn("Firestore fetch failed, falling back to local storage:", err);
    }
  }

  // Fallback to localStorage
  return initializeLocalStorage();
}

export async function getEventById(id: string): Promise<SavedEvent | null> {
  const all = await getAllEvents();
  return all.find(e => e.id === id) || null;
}

export async function saveEvent(event: SavedEvent): Promise<SavedEvent> {
  // Try Firestore if logged in
  if (isFirebaseConfigured && db && auth?.currentUser) {
    try {
      await setDoc(doc(db, 'events', event.id), event);
    } catch (err) {
      console.warn("Firestore save failed, saving to local storage:", err);
    }
  }

  // Always update local storage for fast access and offline resilience
  try {
    const events = initializeLocalStorage();
    const index = events.findIndex(e => e.id === event.id);
    if (index >= 0) {
      events[index] = event;
    } else {
      events.unshift(event);
    }
    localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(events));
    setActiveEventId(event.id);
  } catch (err) {
    console.error("Local storage write failed:", err);
  }

  return event;
}

export async function deleteEvent(id: string): Promise<boolean> {
  if (isFirebaseConfigured && db && auth?.currentUser) {
    try {
      await deleteDoc(doc(db, 'events', id));
    } catch (err) {
      console.warn("Firestore delete failed:", err);
    }
  }

  try {
    const events = initializeLocalStorage().filter(e => e.id !== id);
    localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(events));
    
    // If active was deleted, pick the first available
    const active = getActiveEventId();
    if (active === id && events.length > 0) {
      setActiveEventId(events[0].id);
    }
    return true;
  } catch {
    return false;
  }
}

export function getActiveEventId(): string | null {
  try {
    return localStorage.getItem(LOCAL_STORAGE_ACTIVE_ID_KEY) || defaultStarterEvents[0].id;
  } catch {
    return defaultStarterEvents[0].id;
  }
}

export function setActiveEventId(id: string): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_ID_KEY, id);
    window.dispatchEvent(new CustomEvent('eventease_active_changed', { detail: { id } }));
  } catch (err) {
    console.error("Failed to set active event ID:", err);
  }
}

export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return "₹0";
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

