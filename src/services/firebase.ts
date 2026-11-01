import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { SavedEvent } from '../types/event';

// Read Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey !== "your-api-key"
);

// Initialize Firebase only if config is provided
let app: any = null;
let auth: any = null;
let db: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.warn("Failed to initialize Firebase with provided credentials, falling back to local mode:", error);
  }
}

export { auth, db };

export interface AuthUserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  isGuest?: boolean;
}

const LOCAL_STORAGE_USER_KEY = 'eventease_current_user';

export const getStoredLocalUser = (): AuthUserProfile | null => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const setStoredLocalUser = (user: AuthUserProfile | null) => {
  if (user) {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }
};

