import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, loginAsGuest, isFirebaseActive } = useAuth();
  const { showToast } = useToast();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!email || !password) {
          throw new Error('Please fill in email and password.');
        }
        await register(email, password, displayName);
        showToast(`Welcome to EventEase AI, ${displayName || email.split('@')[0]}!`, 'success');
      } else {
        if (!email || !password) {
          throw new Error('Please fill in email and password.');
        }
        await login(email, password);
        showToast('Signed in successfully!', 'success');
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication error. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    showToast('Signed in as Guest. Your events will persist in your browser!', 'info');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-soft-xl border border-lavender-100 overflow-hidden">
        
        {/* Header bar */}
        <div className="p-6 bg-gradient-to-br from-lavender-50 via-ivory-100 to-rose-50 border-b border-lavender-100 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-navy-400 hover:text-navy-700 hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-navy-900 text-ivory flex items-center justify-center shadow-soft-sm">
              <Sparkles className="w-4 h-4 text-rose-300" />
            </div>
            <span className="font-serif text-lg font-bold text-navy-900">EventEase AI</span>
          </div>

          <h3 className="text-xl font-bold text-navy-900">
            {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-navy-600 mt-0.5">
            {mode === 'signin' 
              ? 'Access and sync your personalized AI event blueprints' 
              : 'Join thousands planning spectacular weddings, birthdays, & events'}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-navy-700 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-lavender-200/60">
            <ShieldCheck className="w-4 h-4 text-lavender-700 shrink-0" />
            <span>
              {isFirebaseActive ? 'Live Firebase Authentication & Cloud Firestore' : 'Instant Local Persistence Mode (Active)'}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-navy-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 transition-all outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-navy-800 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-navy-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-800 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-navy-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-navy-900 text-ivory font-medium text-sm hover:bg-navy-800 transition-all shadow-soft flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>{mode === 'signin' ? 'Sign In to Dashboard' : 'Create Free Account'}</span>
              )}
            </button>
          </form>

          {/* Guest One-Click Access */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleGuestLogin}
              type="button"
              className="w-full py-2.5 rounded-xl bg-ivory-200 hover:bg-lavender-100 text-navy-900 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-lavender-600" />
              <span>Instant Guest Mode (No Password Needed)</span>
            </button>
          </div>

          {/* Toggle Signin / Signup */}
          <div className="mt-4 text-center">
            {mode === 'signin' ? (
              <p className="text-xs text-navy-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(null); }}
                  className="font-bold text-lavender-700 hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p className="text-xs text-navy-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setError(null); }}
                  className="font-bold text-lavender-700 hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

