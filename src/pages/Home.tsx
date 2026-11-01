import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Heart, 
  Cake, 
  Users, 
  ShieldCheck, 
  Compass, 
  Flame, 
  Star,
  Layers,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useEvents } from '../context/EventContext';

export const Home: React.FC = () => {
  const { events, setActiveEventId } = useEvents();

  const categories = [
    {
      id: 'wedding',
      title: 'Weddings & Receptions',
      subtitle: 'Royal, Traditional & Contemporary Nuptials',
      description: 'Design your fairytale wedding with mandap decor concepts, multi-ceremony timelines, customized catering menus, and bridal vendor coordination.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      badge: 'Most Popular',
      accentColor: 'from-rose-500 to-rose-700',
      tagColor: 'bg-rose-100 text-rose-800 border-rose-200',
      features: ['Multi-day Ceremony Timelines', 'Bridal & Groom Styling Planners', 'Mandap & Reception Decor Renders']
    },
    {
      id: 'birthday',
      title: 'Birthday Parties',
      subtitle: 'Milestone Celebrations & Themed Bashes',
      description: 'From 1st birthday sensory wonderlands to 25th boho terrace parties and 50th golden milestones, craft unforgettable themes and custom designer cake orders.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
      badge: 'Trending',
      accentColor: 'from-lavender-600 to-lavender-800',
      tagColor: 'bg-lavender-100 text-lavender-900 border-lavender-200',
      features: ['Age-Specific Thematic Concepts', 'Curated Games & Live Entertainment', 'Interactive Mocktail & Cake Guides']
    },
    {
      id: 'community',
      title: 'Community Events',
      subtitle: 'Cultural Festivals, Carnivals & Gatherings',
      description: 'Streamline large-scale neighborhood galas, cultural societies, eco-friendly carnivals, stage sound requirements, municipal permissions, and volunteer kits.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      badge: 'Community First',
      accentColor: 'from-navy-700 to-navy-950',
      tagColor: 'bg-navy-100 text-navy-900 border-navy-200',
      features: ['Municipal NOC & Permit Checklists', 'Stage, Truss & Sound Line Array Plans', 'Volunteer & Stall Logistics Management']
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Enter Event Requirements',
      desc: 'Select your event category, estimated Indian Rupee (INR ₹) budget, date, city, guest count, and your desired style aesthetic.'
    },
    {
      step: '02',
      title: 'Generative AI Synthesizes Plan',
      desc: 'Our Gemini-powered engine crafts an end-to-end plan: custom theme, balanced budget allocations, chronological tasks, and vendor checklists.'
    },
    {
      step: '03',
      title: 'Interactive Dashboard Control',
      desc: 'Track actual vs. estimated expenses with dynamic charts, check off timeline milestones, and collaborate seamlessly from start to finish.'
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 lg:pt-16 pb-12">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-lavender-200/40 via-rose-100/30 to-transparent blur-3xl pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender-100/80 border border-lavender-200 text-xs font-semibold text-lavender-900 shadow-soft-sm">
                <Sparkles className="w-4 h-4 text-rose-500 animate-spin" />
                <span>Next-Generation Event Intelligence</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight leading-[1.15]">
                Plan Smarter. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender-700 via-rose-600 to-navy-900">
                  Celebrate Better.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-navy-700/85 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Your personal AI event planner for unforgettable celebrations. From weddings to birthdays and community events, make every moment special.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/plan"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-navy-900 hover:bg-navy-800 text-ivory font-semibold text-sm tracking-wide shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  <span>Start Planning</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#categories"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-ivory-100 text-navy-900 font-semibold text-sm border border-lavender-200 shadow-soft-sm transition-all flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-lavender-600" />
                  <span>Explore Events</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-lavender-200/60 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="text-2xl font-bold font-serif text-navy-900">₹10Cr+</p>
                  <p className="text-xs text-navy-500 font-medium">Budgets Optimized</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-serif text-navy-900">100%</p>
                  <p className="text-xs text-navy-500 font-medium">INR ₹ Precision</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-serif text-navy-900">24/7</p>
                  <p className="text-xs text-navy-500 font-medium">AI Co-Pilot Guidance</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-soft-xl border border-lavender-200/80 group">
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
                    alt="Elegant celebration hall"
                    className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent"></div>

                  {/* Floating AI Insight Card */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-lavender-100 shadow-soft-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-navy-900">AI Plan Preview</span>
                      </div>
                      <span className="text-[10px] font-semibold text-lavender-700 bg-lavender-100 px-2 py-0.5 rounded-full">
                        Curated in seconds
                      </span>
                    </div>
                    <p className="text-xs text-navy-700 font-medium">
                      "Royal Heritage Sunset Reception — 350 Guests, Curated ₹8 Lakh Budget Breakdown with Sitar Band & Live Chaat Stations."
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-navy-500 pt-1 border-t border-gray-100">
                      <span>Venue • Catering • Florals</span>
                      <span className="font-bold text-emerald-700">₹7,80,000 Total</span>
                    </div>
                  </div>
                </div>

                {/* Decorative floating pills */}
                <div className="absolute -top-4 -left-4 bg-white px-3.5 py-2 rounded-2xl shadow-soft border border-lavender-100 flex items-center gap-2 text-xs font-semibold text-navy-800 animate-float">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Weddings</span>
                </div>

                <div className="absolute -bottom-3 -right-3 bg-white px-3.5 py-2 rounded-2xl shadow-soft border border-lavender-100 flex items-center gap-2 text-xs font-semibold text-navy-800">
                  <Cake className="w-4 h-4 text-lavender-600" />
                  <span>Birthdays & Milestones</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-bold text-navy-950">
            Intelligent Tools for Seamless Celebrations
          </h2>
          <p className="text-sm text-navy-600 mt-2">
            Every feature is engineered to replace stress and spreadsheets with delight and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft hover:shadow-soft-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-lavender-100 text-lavender-800 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-navy-900 mb-1">AI Event Blueprint</h3>
            <p className="text-xs text-navy-600 leading-relaxed">
              Synthesize bespoke event concepts, theme color codes, decor blueprints, and personalized menus tailored to your culture.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft hover:shadow-soft-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-navy-900 mb-1">Smart INR ₹ Budgeting</h3>
            <p className="text-xs text-navy-600 leading-relaxed">
              Interactive calculator with Indian Rupee formatting, expense categories, actual spending tracking, and over-budget warnings.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft hover:shadow-soft-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-navy-900 mb-1">Dynamic Timeline</h3>
            <p className="text-xs text-navy-600 leading-relaxed">
              Chronological milestone checklist automatically mapped from your event date with priority tagging and progress meters.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft hover:shadow-soft-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-navy-100 text-navy-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-navy-900 mb-1">Vendor Manager</h3>
            <p className="text-xs text-navy-600 leading-relaxed">
              Structured vendor categories with contact details, quotes, status tracking from contacted to booked, and deliverables.
            </p>
          </div>
        </div>
      </section>

      {/* Event Category Cards */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-lavender-700 tracking-wider uppercase">Event Categories</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mt-1">
              Select Your Event Experience
            </h2>
          </div>
          <Link
            to="/plan"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-lavender-800 hover:text-lavender-950 transition-colors"
          >
            <span>Start with any category</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group rounded-3xl bg-white border border-lavender-100 overflow-hidden shadow-soft hover:shadow-soft-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm ${cat.tagColor}`}>
                    {cat.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-xl font-bold">{cat.title}</h3>
                  <p className="text-xs text-ivory-200/80">{cat.subtitle}</p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs text-navy-700 leading-relaxed">
                  {cat.description}
                </p>

                <div className="space-y-2 border-t border-gray-100 pt-4">
                  {cat.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-navy-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/plan?category=${cat.id}`}
                  className="w-full py-3 rounded-xl bg-ivory-200 hover:bg-navy-900 hover:text-white text-navy-900 font-semibold text-xs text-center transition-all duration-200 flex items-center justify-center gap-2 shadow-soft-sm"
                >
                  <span>Plan This Event</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-b from-ivory-100 via-white to-ivory-100 py-16 border-y border-lavender-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-lavender-700 tracking-wider uppercase">Simple 3-Step Process</span>
            <h2 className="font-serif text-3xl font-bold text-navy-950 mt-1">
              How EventEase AI Works
            </h2>
            <p className="text-sm text-navy-600 mt-2">
              Transforming your rough party idea into a professional production plan in under a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="relative p-8 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-4"
              >
                <span className="font-serif text-4xl font-extrabold text-lavender-300 block">
                  {item.step}
                </span>
                <h3 className="font-bold text-lg text-navy-950">{item.title}</h3>
                <p className="text-xs text-navy-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-lavender-700 hover:bg-lavender-800 text-white font-medium text-xs tracking-wide shadow-soft transition-all"
            >
              <span>Try the AI Planner Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose EventEase AI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-lavender-700 tracking-wider uppercase">Built For Discerning Hosts</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 leading-tight">
              Why Celebrants Trust EventEase AI
            </h2>
            <p className="text-sm text-navy-700 leading-relaxed">
              Traditional event management is fractured between notes, lost WhatsApp vendor quotes, and budget surprises. EventEase AI unifies the entire lifecycle under one refined dashboard.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-lavender-100 shadow-soft-sm">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-navy-900">Cultural & Regional Fluency</h4>
                  <p className="text-xs text-navy-600 mt-0.5">
                    Understands Indian wedding nuances (Sangeet, Mandap, Jain meals) and local community permit requirements.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-lavender-100 shadow-soft-sm">
                <div className="w-10 h-10 rounded-xl bg-lavender-50 text-lavender-700 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-navy-900">Zero Overspending Traps</h4>
                  <p className="text-xs text-navy-600 mt-0.5">
                    Our financial algorithm strictly prevents budget creep, suggesting high-impact alternatives when quotes get high.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-lavender-100 shadow-soft-sm">
                <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-700 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-navy-900">All-in-One Dynamic Management</h4>
                  <p className="text-xs text-navy-600 mt-0.5">
                    Modify tasks, log real vendor quotes, and adjust budgets in real time with seamless cloud and local persistence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-navy-950 text-white shadow-soft-xl overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-lavender-300">Live Dashboard Showcase</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active Blueprint
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Aarav & Meera's Royal Wedding</h3>
                  <p className="text-xs text-navy-200/80 mt-1">Udaipur Palace Lawns • 350 Guests</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[11px] text-navy-300">Total Budget</p>
                    <p className="text-xl font-bold text-white font-serif mt-1">₹8,00,000</p>
                    <p className="text-[10px] text-emerald-400 mt-1">94% Allocated</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[11px] text-navy-300">Preparation Tasks</p>
                    <p className="text-xl font-bold text-white font-serif mt-1">9 Milestones</p>
                    <p className="text-[10px] text-lavender-300 mt-1">3 Completed</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-navy-200">Planning Progress</span>
                    <span className="font-bold text-emerald-300">65% Completed</span>
                  </div>
                  <div className="w-full bg-navy-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-lavender-400 to-rose-400 h-2 rounded-full w-[65%]"></div>
                  </div>
                </div>

                <Link
                  to="/my-events"
                  className="block w-full py-3 rounded-xl bg-white hover:bg-ivory-100 text-navy-950 font-bold text-xs text-center transition-colors"
                >
                  View Sample Event in Dashboard
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-tr from-navy-900 via-lavender-900 to-navy-900 text-white text-center space-y-6 shadow-soft-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-white/10 text-rose-300 mb-2">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to Craft an Unforgettable Event?
            </h2>
            <p className="text-sm sm:text-base text-ivory-200/80 leading-relaxed">
              Experience the power of Generative AI. Generate your complete event blueprint, budget breakdown, and timeline in seconds.
            </p>
            <div className="pt-2">
              <Link
                to="/plan"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-navy-950 font-bold text-sm hover:bg-ivory-100 transition-all shadow-soft-lg transform hover:scale-105"
              >
                <span>Create Your Free Event Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

