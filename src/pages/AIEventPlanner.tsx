import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  DollarSign, 
  Clock, 
  Users, 
  MapPin, 
  Calendar, 
  Palette, 
  Utensils, 
  Music, 
  Smile, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Share2, 
  Printer, 
  ShieldCheck, 
  AlertTriangle,
  Lightbulb,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { useToast } from '../context/ToastContext';
import { isGeminiConfigured } from '../services/gemini';
import { formatINR } from '../services/storage';

export const AIEventPlanner: React.FC = () => {
  const navigate = useNavigate();
  const { activeEvent, events } = useEvents();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'timeline' | 'vendors' | 'ideas'>('overview');

  if (!activeEvent) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-lavender-100 text-lavender-800 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-navy-950">No Event Plan Selected</h2>
        <p className="text-sm text-navy-600">
          Create a personalized event plan using our Generative AI form, or select one from your saved events dashboard.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            to="/plan"
            className="px-6 py-3 rounded-xl bg-navy-900 text-ivory font-semibold text-xs shadow-soft hover:bg-navy-800 transition-colors"
          >
            Create New Event Plan
          </Link>
          <Link
            to="/my-events"
            className="px-6 py-3 rounded-xl bg-white border border-lavender-200 text-navy-900 font-semibold text-xs shadow-soft hover:bg-ivory-100 transition-colors"
          >
            Open Saved Events
          </Link>
        </div>
      </div>
    );
  }

  const { input, plan } = activeEvent;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${input.name} - EventEase AI Blueprint`,
        text: `Check out our AI-generated event blueprint for ${input.name}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Event link copied to clipboard!', 'info');
    }
  };

  const totalCalculatedBudget = plan.budgetBreakdown.reduce((sum, item) => sum + item.allocated, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Mode Notice Banner */}
      {!isGeminiConfigured && (
        <div className="p-4 rounded-2xl bg-lavender-50 border border-lavender-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-navy-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-lavender-600 shrink-0"></span>
            <div>
              <span className="font-bold text-lavender-900">Demo Simulation Mode:</span>
              <span className="text-navy-700 ml-1">
                Showing realistic simulated AI event plan. Add your <code className="bg-lavender-100 px-1 py-0.5 rounded text-[11px] font-mono">VITE_GEMINI_API_KEY</code> in <code className="bg-lavender-100 px-1 py-0.5 rounded text-[11px] font-mono">.env</code> to activate live Gemini AI generation.
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white font-semibold text-[10px] text-lavender-700 border border-lavender-200 self-start sm:self-auto shrink-0">
            Simulated Blueprint Active
          </span>
        </div>
      )}

      {/* Plan Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-lavender-950 text-white p-6 sm:p-10 shadow-soft-xl overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider capitalize">
                {input.category} Blueprint
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-ivory text-xs font-medium border border-white/10">
                {input.style} Style
              </span>
            </div>

            {/* Quick Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Print or Save PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>
              <button
                onClick={handleShare}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <Link
                to="/plan"
                className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-soft"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Plan</span>
              </Link>
            </div>
          </div>

          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              {input.name}
            </h1>
            <p className="text-sm text-ivory-200/80 mt-1 max-w-2xl font-serif italic">
              "{plan.overview.concept}"
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-rose-300">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-navy-300 uppercase tracking-wider">Date</p>
                <p className="text-xs font-bold text-white">{input.date || 'TBD'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-rose-300">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-navy-300 uppercase tracking-wider">Location</p>
                <p className="text-xs font-bold text-white truncate max-w-[120px]">{input.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-navy-300 uppercase tracking-wider">Budget Target</p>
                <p className="text-xs font-bold text-emerald-300">{formatINR(input.budget)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lavender-300">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-navy-300 uppercase tracking-wider">Guest Count</p>
                <p className="text-xs font-bold text-white">{input.guestCount} Guests</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-lavender-200 pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-navy-900 text-ivory shadow-soft'
              : 'text-navy-700 hover:bg-ivory-200/80'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-300" />
          <span>A. Event Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'budget'
              ? 'bg-navy-900 text-ivory shadow-soft'
              : 'text-navy-700 hover:bg-ivory-200/80'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          <span>B. Budget Breakdown</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'timeline'
              ? 'bg-navy-900 text-ivory shadow-soft'
              : 'text-navy-700 hover:bg-ivory-200/80'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-lavender-300" />
          <span>C. Preparation Timeline</span>
        </button>

        <button
          onClick={() => setActiveTab('vendors')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'vendors'
              ? 'bg-navy-900 text-ivory shadow-soft'
              : 'text-navy-700 hover:bg-ivory-200/80'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
          <span>D. Vendor Checklist</span>
        </button>

        <button
          onClick={() => setActiveTab('ideas')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'ideas'
              ? 'bg-navy-900 text-ivory shadow-soft'
              : 'text-navy-700 hover:bg-ivory-200/80'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>E. Personalized Ideas</span>
        </button>
      </div>

      {/* Tab A: Event Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Concept & Recommended Theme Card */}
            <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-lavender-700">Artistic Vision</span>
                <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                  {plan.overview.recommendedTheme}
                </h3>
                <p className="text-sm text-navy-700 mt-2 leading-relaxed">
                  {plan.overview.concept}
                </p>
              </div>

              {/* Color Palette */}
              <div>
                <p className="text-xs font-bold text-navy-800 mb-2 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-lavender-600" />
                  <span>Curated Color Palette</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {plan.overview.colorPalette?.map((color, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-ivory-100 border border-gray-200 shadow-soft-sm">
                      <div
                        className="w-7 h-7 rounded-lg shadow-sm border border-black/10"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-xs font-mono font-semibold text-navy-800 uppercase">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <p className="text-xs font-bold text-navy-800">Event Highlights</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {plan.overview.highlights?.map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-navy-800 p-2.5 rounded-xl bg-ivory-50 border border-lavender-100/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Interactive Tool Links */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-lavender-50 via-white to-ivory-100 border border-lavender-200 shadow-soft space-y-4">
              <h4 className="font-bold text-sm text-navy-900">Manage Event Modules</h4>
              <p className="text-xs text-navy-600">
                This AI blueprint automatically pre-populated your interactive tools. Jump into any module to customize numbers and tasks.
              </p>

              <div className="space-y-2.5 pt-2">
                <Link
                  to="/budget"
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 text-xs font-bold text-navy-900 transition-all shadow-soft-sm group"
                >
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Open Budget Calculator</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/timeline"
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-lavender-50 border border-gray-200 hover:border-lavender-200 text-xs font-bold text-navy-900 transition-all shadow-soft-sm group"
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-lavender-700" />
                    <span>Open Timeline & Tasks</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/vendors"
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-rose-50 border border-gray-200 hover:border-rose-200 text-xs font-bold text-navy-900 transition-all shadow-soft-sm group"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-rose-600" />
                    <span>Open Vendor Manager</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

          {/* Decoration Ideas & Personalized Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-4">
              <h4 className="font-serif text-lg font-bold text-navy-900 flex items-center gap-2">
                <Palette className="w-4 h-4 text-rose-500" />
                <span>Decoration & Staging Concepts</span>
              </h4>
              <ul className="space-y-3">
                {plan.overview.decorationIdeas?.map((idea, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-navy-700 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-4">
              <h4 className="font-serif text-lg font-bold text-navy-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lavender-600" />
                <span>Personalized Host Suggestions</span>
              </h4>
              <ul className="space-y-3">
                {plan.overview.personalizedSuggestions?.map((sug, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-navy-700 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-lavender-100 text-lavender-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* Tab B: Budget Breakdown */}
      {activeTab === 'budget' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-navy-400">Total Estimated Budget</span>
              <p className="font-serif text-3xl font-bold text-navy-950 mt-0.5">
                {formatINR(totalCalculatedBudget)}
              </p>
              <p className="text-xs text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Engineered strictly within your ₹{input.budget.toLocaleString('en-IN')} ceiling</span>
              </p>
            </div>

            <Link
              to="/budget"
              className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-soft"
            >
              <span>Launch Interactive Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.budgetBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-lavender-100 shadow-soft-sm space-y-2 hover:border-lavender-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-navy-900">{item.category}</h4>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {formatINR(item.allocated)}
                  </span>
                </div>
                <p className="text-xs text-navy-600 leading-relaxed">{item.description}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500">
                  <span>Share of Total:</span>
                  <span className="font-semibold text-navy-800">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-lavender-600 h-1.5 rounded-full"
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab C: Preparation Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft">
            <div>
              <h3 className="font-serif text-xl font-bold text-navy-950">Milestone Task Schedule</h3>
              <p className="text-xs text-navy-600 mt-1">
                Tasks arranged in countdown order from early bookings to event day execution.
              </p>
            </div>

            <Link
              to="/timeline"
              className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-soft"
            >
              <span>Manage & Check Off Tasks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {plan.timeline.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-lavender-100 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-lavender-200 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-lavender-100 text-lavender-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-navy-900">{item.task}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.suggestedDeadlineDescription}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-ivory-200 text-navy-700 font-medium border border-gray-200">
                    {item.category}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      item.priority === 'High'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : item.priority === 'Medium'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {item.priority} Priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab D: Vendor Checklist */}
      {activeTab === 'vendors' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft">
            <div>
              <h3 className="font-serif text-xl font-bold text-navy-950">Recommended Vendor Categories</h3>
              <p className="text-xs text-navy-600 mt-1">
                Categories required for a smooth {input.category} with estimated cost brackets.
              </p>
            </div>

            <Link
              to="/vendors"
              className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-soft"
            >
              <span>Track Vendor Contacts & Quotes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.vendorChecklist.map((v, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-lavender-100 shadow-soft-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-lavender-700">
                    {v.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      v.importance === 'Must-Have'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : 'bg-lavender-50 text-lavender-800 border-lavender-200'
                    }`}
                  >
                    {v.importance}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-base text-navy-950">{v.suggestedName}</h4>
                  <p className="text-xs text-navy-600 mt-1 leading-relaxed">
                    <strong>Deliverables:</strong> {v.deliverables}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Estimated Allocation:</span>
                  <span className="font-bold text-emerald-800">{formatINR(v.estimatedCost)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab E: Personalized Ideas */}
      {activeTab === 'ideas' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Food Menu Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Culinary Experience</span>
                <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-rose-500" />
                  <span>Curated Catering & Beverage Menu</span>
                </h3>
              </div>
              <span className="text-xs font-semibold text-navy-600 bg-ivory-200 px-3 py-1 rounded-full">
                {input.guestCount} Guests
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Appetizers */}
              <div className="p-4 rounded-2xl bg-ivory-50 border border-lavender-100 space-y-2">
                <p className="text-xs font-bold text-navy-900 uppercase tracking-wider">Appetizers & Starters</p>
                <ul className="space-y-1.5 text-xs text-navy-700">
                  {plan.personalizedIdeas?.foodMenu?.appetizers?.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mains */}
              <div className="p-4 rounded-2xl bg-ivory-50 border border-lavender-100 space-y-2">
                <p className="text-xs font-bold text-navy-900 uppercase tracking-wider">Main Course & Breads</p>
                <ul className="space-y-1.5 text-xs text-navy-700">
                  {plan.personalizedIdeas?.foodMenu?.mains?.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-lavender-500"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Desserts */}
              <div className="p-4 rounded-2xl bg-ivory-50 border border-lavender-100 space-y-2">
                <p className="text-xs font-bold text-navy-900 uppercase tracking-wider">Desserts & Sweets</p>
                <ul className="space-y-1.5 text-xs text-navy-700">
                  {plan.personalizedIdeas?.foodMenu?.desserts?.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Beverages */}
              <div className="p-4 rounded-2xl bg-ivory-50 border border-lavender-100 space-y-2">
                <p className="text-xs font-bold text-navy-900 uppercase tracking-wider">Beverages & Mocktails</p>
                <ul className="space-y-1.5 text-xs text-navy-700">
                  {plan.personalizedIdeas?.foodMenu?.beverages?.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-navy-500"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Activities & Entertainment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-4">
              <h4 className="font-serif text-lg font-bold text-navy-950 flex items-center gap-2">
                <Smile className="w-4 h-4 text-emerald-600" />
                <span>Guest Activities & Keepsakes</span>
              </h4>
              <ul className="space-y-3">
                {plan.personalizedIdeas?.guestActivities?.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-navy-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-4">
              <h4 className="font-serif text-lg font-bold text-navy-950 flex items-center gap-2">
                <Music className="w-4 h-4 text-lavender-600" />
                <span>Entertainment & Performances</span>
              </h4>
              <ul className="space-y-3">
                {plan.personalizedIdeas?.entertainment?.map((ent, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-navy-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-lavender-600 shrink-0 mt-0.5" />
                    <span>{ent}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Budget-Friendly Alternatives */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-ivory-100 border border-amber-200 shadow-soft space-y-4">
            <h4 className="font-serif text-lg font-bold text-navy-950 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-600" />
              <span>Smart Cost-Saving Alternatives</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plan.personalizedIdeas?.budgetFriendlyAlternatives?.map((alt, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-amber-200/60 shadow-soft-sm space-y-1">
                  <span className="text-[10px] font-bold text-amber-700 uppercase">Tip #{idx + 1}</span>
                  <p className="text-xs text-navy-800 leading-relaxed">{alt}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

