import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  Users, 
  Award,
  ArrowRight
} from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender-100 text-lavender-900 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>Our Vision & Mission</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy-950 tracking-tight">
          Empowering Extraordinary Celebrations with Generative AI
        </h1>
        <p className="text-base text-navy-700 leading-relaxed">
          EventEase AI was built on a simple premise: planning life’s most cherished celebrations should be as joyful and inspiring as the event itself, not a storm of confusing quotes and spreadsheet chaos.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h3 className="font-serif text-xl font-bold text-navy-950">Deep Cultural Resonance</h3>
          <p className="text-xs text-navy-600 leading-relaxed">
            From multi-day Indian wedding rituals (Haldi, Sangeet, Mandap ceremonies) to milestone birthday themes and neighborhood carnivals, our AI is trained to understand the cultural soul of every occasion.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-navy-950">Financial Precision in INR (₹)</h3>
          <p className="text-xs text-navy-600 leading-relaxed">
            Budget creep is the #1 pain point in event hosting. EventEase AI enforces real mathematical rigor, distributing venue, catering, and decor budgets strictly within your declared INR limits with zero guesswork.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-navy-100 text-navy-800 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-navy-950">Unifying the Lifecycle</h3>
          <p className="text-xs text-navy-600 leading-relaxed">
            Moving beyond static checklist documents into dynamic interactive modules where budgets, vendor communication logs, and countdown timelines stay in live sync across all devices.
          </p>
        </div>
      </div>

      {/* Architecture & AI Engine Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-lavender-950 text-white shadow-soft-xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Technical Foundation</span>
          <h2 className="font-serif text-3xl font-bold text-white">How EventEase AI Thinks</h2>
          <p className="text-xs text-navy-200/80 leading-relaxed">
            Built using Google Gemini Generative AI, structured JSON Schema output controls, and reactive state persistence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
              <Zap className="w-4 h-4" />
              <span>Gemini 1.5 / 2.0 Engine</span>
            </div>
            <p className="text-xs text-navy-200/70 leading-relaxed">
              Synthesizes creative narratives, color codes, dietary menus, and theme decors in sub-second inference speed.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Firebase & Local Hybrid</span>
            </div>
            <p className="text-xs text-navy-200/70 leading-relaxed">
              Automatic offline fallback with browser localStorage, coupled with Firebase Cloud Firestore for multi-device sync.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-lavender-300 font-bold text-xs">
              <Cpu className="w-4 h-4" />
              <span>Deterministic Validation</span>
            </div>
            <p className="text-xs text-navy-200/70 leading-relaxed">
              Every numerical cost output is rigorously audited to ensure line items sum up precisely to the target budget ceiling.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <Users className="w-4 h-4" />
              <span>Conversational Assistant</span>
            </div>
            <p className="text-xs text-navy-200/70 leading-relaxed">
              On-demand co-pilot ready to answer questions like "How to plan a ₹3L wedding" or recommend customized vegetarian feast menus.
            </p>
          </div>
        </div>
      </div>

      {/* Values & Quality Commitment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-lavender-700">Integrity First</span>
          <h2 className="font-serif text-3xl font-bold text-navy-950">
            Engineered for Real-World Hosts, Not Just Demos
          </h2>
          <p className="text-sm text-navy-700 leading-relaxed">
            Too many AI apps stop at generating a paragraph of text. EventEase AI translates prompt outputs into fully interactive, mutable database records that you can adjust throughout months of planning.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-xs text-navy-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Every single button, tab, and calculation is fully interactive.</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-navy-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Real-time Indian Rupee (INR ₹) variance tracking prevents surprises.</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-navy-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero external dependency lock-in with intelligent offline modes.</span>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-ivory-100 border border-lavender-200 shadow-soft space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-serif font-bold">
              E
            </div>
            <div>
              <h4 className="font-bold text-sm text-navy-950">EventEase AI Design Studio</h4>
              <p className="text-xs text-gray-500">Bangalore & Mumbai, India</p>
            </div>
          </div>

          <p className="text-xs text-navy-700 leading-relaxed italic">
            "We believe celebrations are the punctuation marks of human memory. Our ambition is to give every host the supercharged capability of a high-end luxury event director at zero cost."
          </p>

          <div className="pt-2 border-t border-lavender-200 flex items-center justify-between">
            <span className="text-xs font-bold text-navy-900">Start Planning Today</span>
            <Link
              to="/plan"
              className="px-4 py-2 rounded-xl bg-navy-900 text-ivory text-xs font-semibold hover:bg-navy-800 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

