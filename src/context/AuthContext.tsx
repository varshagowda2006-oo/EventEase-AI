import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  isFirebaseConfigured, 
  AuthUserProfile, 
  getStoredLocalUser, 
  setStoredLocalUser 
} from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

interface AuthContextType {
  user: AuthUserProfile | null;
  loading: boolean;
  isFirebaseActive: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, displayName?: string) => Promise<void>;
  loginAsGuest: (customName?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUserProfile | null>(() => getStoredLocalUser());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const profile: AuthUserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            isGuest: false
          };
          setUser(profile);
          setStoredLocalUser(profile);
        } else {
          // If no firebase user, fallback to local guest if existed
          const local = getStoredLocalUser();
          if (local?.isGuest) {
            setUser(local);
          } else {
            setUser(null);
            setStoredLocalUser(null);
          }
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local Mode: If no user stored, create a default guest profile for instant smooth testing
      const local = getStoredLocalUser();
      if (!local) {
        const defaultGuest: AuthUserProfile = {
          uid: 'guest-' + Math.random().toString(36).substring(2, 7),
          email: 'guest@eventease.ai',
          displayName: 'Guest Planner',
          isGuest: true
        };
        setUser(defaultGuest);
        setStoredLocalUser(defaultGuest);
      } else {
        setUser(local);
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    if (isFirebaseConfigured && auth) {
      await signInWithEmailAndPassword(auth, email, pass);
    } else {
      // Local simulated login
      const localUser: AuthUserProfile = {
        uid: 'user-' + Math.random().toString(36).substring(2, 8),
        email,
        displayName: email.split('@')[0],
        isGuest: false
      };
      setUser(localUser);
      setStoredLocalUser(localUser);
    }
  };

  const register = async (email: string, pass: string, displayName?: string) => {
    if (isFirebaseConfigured && auth) {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      if (displayName && res.user) {
        await updateProfile(res.user, { displayName });
      }
    } else {
      const localUser: AuthUserProfile = {
        uid: 'user-' + Math.random().toString(36).substring(2, 8),
        email,
        displayName: displayName || email.split('@')[0],
        isGuest: false
      };
      setUser(localUser);
      setStoredLocalUser(localUser);
    }
  };

  const loginAsGuest = (customName = 'Guest Planner') => {
    const guestUser: AuthUserProfile = {
      uid: 'guest-' + Math.random().toString(36).substring(2, 7),
      email: null,
      displayName: customName,
      isGuest: true
    };
    setUser(guestUser);
    setStoredLocalUser(guestUser);
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.error(err);
      }
    }
    setUser(null);
    setStoredLocalUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseActive: isFirebaseConfigured,
        login,
        register,
        loginAsGuest,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

