import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  DollarSign, 
  Clock, 
  Users, 
  Layers, 
  Menu, 
  X, 
  ChevronDown, 
  Check, 
  PlusCircle, 
  User as UserIcon,
  LogOut,
  Info
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { events, activeEvent, setActiveEventId } = useEvents();
  const { user, logout, isFirebaseActive } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Plan an Event', path: '/plan' },
    { name: 'AI Event Planner', path: '/ai-planner' },
    { name: 'Budget Planner', path: '/budget' },
    { name: 'Event Timeline', path: '/timeline' },
    { name: 'Vendor Checklist', path: '/vendors' },
    { name: 'My Events', path: '/my-events' },
    { name: 'About Us', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 glass-nav transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-lavender-700 via-lavender-600 to-rose-400 flex items-center justify-center text-white shadow-soft transition-transform group-hover:scale-105 duration-300">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-navy-900 group-hover:text-lavender-700 transition-colors">
                  EventEase<span className="text-rose-500 font-sans text-sm ml-1 px-1.5 py-0.5 bg-rose-50 border border-rose-200 rounded-md">AI</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-navy-400 font-medium">Smart Event Assistant</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-lavender-100 text-lavender-900 font-semibold'
                        : 'text-navy-700 hover:text-navy-950 hover:bg-ivory-200/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Active Event Switcher & Auth */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Active Event Selector */}
              {events.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setEventDropdownOpen(!eventDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ivory-200/80 border border-lavender-200 text-xs font-medium text-navy-800 hover:bg-lavender-50 transition-colors shadow-soft-sm max-w-[200px]"
                    title="Active Event"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="truncate">
                      {activeEvent ? activeEvent.input.name : 'Select Event'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-navy-500 shrink-0" />
                  </button>

                  {eventDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-soft-xl border border-lavender-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                      onMouseLeave={() => setEventDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Switch Active Event</p>
                      </div>
                      <div className="max-h-60 overflow-y-auto py-1">
                        {events.map((evt) => (
                          <button
                            key={evt.id}
                            onClick={() => {
                              setActiveEventId(evt.id);
                              setEventDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-xs hover:bg-lavender-50 transition-colors ${
                              evt.id === activeEvent?.id ? 'bg-lavender-50/70 text-lavender-900 font-semibold' : 'text-navy-800'
                            }`}
                          >
                            <div className="truncate mr-2">
                              <p className="truncate font-medium">{evt.input.name}</p>
                              <span className="text-[10px] text-gray-500 capitalize">{evt.input.category} • ₹{evt.input.budget.toLocaleString('en-IN')}</span>
                            </div>
                            {evt.id === activeEvent?.id && <Check className="w-4 h-4 text-lavender-700 shrink-0" />}
                          </button>
                        ))}
                      </div>
                      <div className="px-3 pt-2 border-t border-gray-100">
                        <Link
                          to="/plan"
                          onClick={() => setEventDropdownOpen(false)}
                          className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg bg-lavender-50 text-lavender-800 text-xs font-medium hover:bg-lavender-100 transition-colors"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          Plan New Event
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* User / Auth Button */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white border border-lavender-200 text-xs font-semibold text-navy-900 hover:shadow-soft transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-lavender-200 text-lavender-800 flex items-center justify-center font-bold text-xs uppercase">
                      {user.displayName?.charAt(0) || 'U'}
                    </div>
                    <span className="max-w-[100px] truncate">{user.displayName}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-navy-400" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-soft-xl border border-lavender-100 py-2 z-50"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-medium text-navy-900">{user.displayName}</p>
                        <p className="text-[11px] text-gray-500 truncate">{user.email || 'Guest Mode Session'}</p>
                        <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {isFirebaseActive ? 'Firebase Sync Active' : 'Local Storage Mode'}
                        </div>
                      </div>
                      <Link
                        to="/my-events"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-navy-700 hover:bg-lavender-50 hover:text-lavender-900"
                      >
                        My Saved Events ({events.length})
                      </Link>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-navy-700 hover:text-navy-950 hover:bg-white/80 transition-colors"
                >
                  Sign In
                </button>
              )}

              {/* Get Started CTA */}
              <Link
                to="/plan"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-navy-900 text-ivory font-medium text-xs tracking-wide shadow-soft hover:bg-navy-800 hover:shadow-soft-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex xl:hidden items-center space-x-2">
              <Link
                to="/plan"
                className="px-3 py-1.5 rounded-lg bg-navy-900 text-ivory font-medium text-xs shadow-soft"
              >
                Plan Event
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-ivory-200/80 text-navy-800 hover:bg-lavender-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-lavender-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-100">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? 'bg-lavender-100 text-lavender-900 font-semibold'
                      : 'text-navy-800 hover:bg-ivory-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Active Event Info */}
            {activeEvent && (
              <div className="p-3 bg-ivory-100 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-navy-400 font-semibold">Active Event</p>
                  <p className="text-xs font-bold text-navy-900 truncate max-w-[200px]">{activeEvent.input.name}</p>
                </div>
                <Link
                  to="/my-events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-lavender-700 hover:underline"
                >
                  Change
                </Link>
              </div>
            )}

            {/* Mobile Auth Controls */}
            <div className="pt-2 flex items-center justify-between">
              {user ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-lavender-200 text-lavender-800 flex items-center justify-center font-bold text-xs uppercase">
                      {user.displayName?.charAt(0) || 'U'}
                    </div>
                    <span className="text-xs font-semibold text-navy-900">{user.displayName}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-rose-600 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-lavender-100 text-lavender-900 font-semibold text-xs text-center"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

