import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Mail, Phone, MapPin, ShieldCheck, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-ivory-200 pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lavender-600 to-rose-400 flex items-center justify-center text-white shadow-soft">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                EventEase<span className="text-rose-400 font-sans text-xs ml-1.5 px-1.5 py-0.5 bg-rose-950/60 border border-rose-800 rounded">AI</span>
              </span>
            </Link>
            <p className="text-sm text-navy-200/80 max-w-sm leading-relaxed">
              Your intelligent, full-spectrum event planning assistant. Powered by state-of-the-art Generative AI to design unforgettable weddings, birthdays, and community gatherings.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-lavender-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Smart Indian Rupee (INR ₹) budget optimization & timeline automation</span>
            </div>
          </div>

          {/* Planning Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Main Features</h4>
            <ul className="space-y-2 text-sm text-navy-200/70">
              <li><Link to="/plan" className="hover:text-white transition-colors">Plan an Event</Link></li>
              <li><Link to="/ai-planner" className="hover:text-white transition-colors">AI Event Planner</Link></li>
              <li><Link to="/budget" className="hover:text-white transition-colors">Budget Calculator</Link></li>
              <li><Link to="/timeline" className="hover:text-white transition-colors">Event Timeline</Link></li>
              <li><Link to="/vendors" className="hover:text-white transition-colors">Vendor Checklist</Link></li>
              <li><Link to="/my-events" className="hover:text-white transition-colors">My Events Dashboard</Link></li>
            </ul>
          </div>

          {/* Event Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Event Categories</h4>
            <ul className="space-y-2 text-sm text-navy-200/70">
              <li><Link to="/plan?category=wedding" className="hover:text-white transition-colors">Royal & Modern Weddings</Link></li>
              <li><Link to="/plan?category=birthday" className="hover:text-white transition-colors">Milestone & Theme Birthdays</Link></li>
              <li><Link to="/plan?category=community" className="hover:text-white transition-colors">Community & Cultural Carnivals</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Our AI Engine</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact & Support</h4>
            <ul className="space-y-2.5 text-sm text-navy-200/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-lavender-400 shrink-0" />
                <span className="truncate">support@eventease-ai.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-lavender-400 shrink-0" />
                <span>+91 (800) 425-3273</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-lavender-400 shrink-0" />
                <span>Bangalore & Mumbai, India</span>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-[11px] text-emerald-300 font-medium">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  Gemini AI Powered
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-navy-400 gap-4">
          <p>© {new Date().getFullYear()} EventEase AI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for seamless celebrations.
          </p>
        </div>
      </div>
    </footer>
  );
};

