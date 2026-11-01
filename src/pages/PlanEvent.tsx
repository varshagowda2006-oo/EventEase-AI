import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Palette, 
  Sliders, 
  FileText, 
  Heart, 
  Cake, 
  Building2, 
  Check, 
  AlertCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EventCategory, EventStyle, EventInputData } from '../types/event';
import { generateEventPlanWithAI } from '../services/gemini';
import { useEvents } from '../context/EventContext';
import { useToast } from '../context/ToastContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const PlanEvent: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { createEvent } = useEvents();
  const { showToast } = useToast();

  const [category, setCategory] = useState<EventCategory>(
    (searchParams.get('category') as EventCategory) || 'wedding'
  );

  useEffect(() => {
    const cat = searchParams.get('category') as EventCategory;
    if (cat && ['wedding', 'birthday', 'community'].includes(cat)) {
      setCategory(cat);
    }
  }, [searchParams]);

  // Form Fields
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState<number | string>(500000);
  const [guestCount, setGuestCount] = useState<number | string>(150);
  const [theme, setTheme] = useState('');
  const [style, setStyle] = useState<EventStyle>('Modern');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // Category Specific Fields
  // Wedding
  const [brideName, setBrideName] = useState('');
  const [groomName, setGroomName] = useState('');
  const [selectedCeremonies, setSelectedCeremonies] = useState<string[]>([
    'Mehendi & Sangeet', 'Main Wedding Ceremony', 'Evening Reception'
  ]);
  const [dietaryPreference, setDietaryPreference] = useState('Multi-Cuisine Vegetarian & Jain Options');

  // Birthday
  const [ageMilestone, setAgeMilestone] = useState<string>('25');
  const [cakeFlavor, setCakeFlavor] = useState('Chocolate Truffle with Berry Compote');
  const [targetAgeGroup, setTargetAgeGroup] = useState<'Kids' | 'Teens' | 'Young Adults' | 'Adults' | 'Seniors'>('Young Adults');

  // Community
  const [communityType, setCommunityType] = useState('Residential Welfare Association (RWA)');
  const [entryType, setEntryType] = useState<'Free Open Access' | 'Ticketed' | 'Invite Only'>('Free Open Access');
  const [venueType, setVenueType] = useState<'Outdoor Ground' | 'Indoor Auditorium' | 'Community Hall' | 'Hybrid'>('Outdoor Ground');
  const [permitRequired, setPermitRequired] = useState(true);

  // Status & Validation
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const weddingCeremoniesList = [
    'Roka & Engagement',
    'Haldi & Chooda',
    'Mehendi & Sangeet',
    'Main Wedding Ceremony',
    'Evening Reception',
    'Post-Wedding Brunch'
  ];

  const handleCeremonyToggle = (ceremony: string) => {
    setSelectedCeremonies(prev =>
      prev.includes(ceremony)
        ? prev.filter(c => c !== ceremony)
        : [...prev, ceremony]
    );
  };

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) errs.name = 'Please enter an event name.';
    if (!date) errs.date = 'Please select the event date.';
    if (!location.trim()) errs.location = 'Please enter an event location/city.';
    if (!budget || Number(budget) <= 0) errs.budget = 'Please enter a valid budget in INR (₹).';
    if (Number(budget) < 10000) errs.budget = 'Minimum recommended budget is ₹10,000.';
    if (!guestCount || Number(guestCount) <= 0) errs.guestCount = 'Please enter expected number of guests.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please correct the highlighted fields before proceeding.', 'error');
      return;
    }

    setIsGenerating(true);

    const inputData: EventInputData = {
      category,
      name: name.trim(),
      date,
      location: location.trim(),
      budget: Number(budget),
      guestCount: Number(guestCount),
      theme: theme.trim() || 'Curated by AI',
      style,
      additionalRequirements: additionalRequirements.trim(),
      categorySpecific: {
        ...(category === 'wedding' && {
          brideName,
          groomName,
          ceremonies: selectedCeremonies,
          dietaryPreference
        }),
        ...(category === 'birthday' && {
          ageMilestone,
          cakeFlavor,
          targetAgeGroup
        }),
        ...(category === 'community' && {
          communityType,
          entryType,
          venueType,
          permitRequired
        })
      }
    };

    try {
      const result = await generateEventPlanWithAI(inputData);
      const saved = await createEvent(inputData, result.plan);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      showToast(`Master plan created for "${saved.input.name}"!`, 'success');
      navigate('/ai-planner');
    } catch (err: any) {
      console.error(err);
      showToast('Error generating plan. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="py-20">
        <LoadingSpinner
          message="Synthesizing Your AI Event Plan"
          subMessage={`Customizing ${category} blueprint for ${name || 'your celebration'} with ₹${Number(budget).toLocaleString('en-IN')} budget...`}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Interactive Plan Generator</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
          Design Your Event Experience
        </h1>
        <p className="text-sm text-navy-600 max-w-xl mx-auto">
          Provide your vision and parameters. Our Generative AI will engineer an optimized budget, task timeline, and vendor blueprint.
        </p>
      </div>

      {/* Step 1: Category Selector Cards */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-navy-700">
          Step 1: Choose Event Category
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setCategory('wedding')}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
              category === 'wedding'
                ? 'bg-rose-50/70 border-rose-300 ring-2 ring-rose-200 shadow-soft'
                : 'bg-white border-gray-200 hover:border-lavender-300 hover:bg-ivory-50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                category === 'wedding' ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-700'
              }`}>
                <Heart className="w-5 h-5 fill-current" />
              </div>
              {category === 'wedding' && <Check className="w-5 h-5 text-rose-600 font-bold" />}
            </div>
            <div>
              <h3 className="font-bold text-sm text-navy-900">Wedding</h3>
              <p className="text-[11px] text-navy-600 mt-0.5">Nuptials, Receptions, Sangeet & Traditional rituals</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setCategory('birthday')}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
              category === 'birthday'
                ? 'bg-lavender-50/80 border-lavender-300 ring-2 ring-lavender-200 shadow-soft'
                : 'bg-white border-gray-200 hover:border-lavender-300 hover:bg-ivory-50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                category === 'birthday' ? 'bg-lavender-600 text-white' : 'bg-lavender-100 text-lavender-800'
              }`}>
                <Cake className="w-5 h-5" />
              </div>
              {category === 'birthday' && <Check className="w-5 h-5 text-lavender-700 font-bold" />}
            </div>
            <div>
              <h3 className="font-bold text-sm text-navy-900">Birthday Party</h3>
              <p className="text-[11px] text-navy-600 mt-0.5">Kids bashes, 18th/21st/50th milestones & themed parties</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setCategory('community')}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
              category === 'community'
                ? 'bg-navy-50 border-navy-300 ring-2 ring-navy-200 shadow-soft'
                : 'bg-white border-gray-200 hover:border-lavender-300 hover:bg-ivory-50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                category === 'community' ? 'bg-navy-900 text-white' : 'bg-navy-100 text-navy-800'
              }`}>
                <Building2 className="w-5 h-5" />
              </div>
              {category === 'community' && <Check className="w-5 h-5 text-navy-700 font-bold" />}
            </div>
            <div>
              <h3 className="font-bold text-sm text-navy-900">Community Event</h3>
              <p className="text-[11px] text-navy-600 mt-0.5">Cultural carnivals, society galas, festivals & exhibitions</p>
            </div>
          </button>
        </div>
      </div>

      {/* Step 2: Interactive Form */}
      <form onSubmit={handleGenerate} className="bg-white rounded-3xl p-6 sm:p-10 border border-lavender-100 shadow-soft-lg space-y-8">
        
        <div>
          <h2 className="font-serif text-xl font-bold text-navy-950 pb-2 border-b border-gray-100">
            Step 2: Event Details & Specifications
          </h2>
        </div>

        {/* Core details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Name */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-navy-800 mb-1.5">
              Event Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder={
                category === 'wedding'
                  ? 'e.g. Aarav & Meera’s Royal Wedding'
                  : category === 'birthday'
                  ? 'e.g. Rhea’s 25th Boho Starlight Birthday'
                  : 'e.g. Green Meadows Annual Spring Carnival'
              }
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-gray-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200'
              }`}
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-xs font-semibold text-navy-800 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-lavender-600" />
              <span>Event Date <span className="text-rose-500">*</span></span>
            </label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setDate(e.target.value);
                if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                errors.date ? 'border-rose-400 bg-rose-50/30' : 'border-gray-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200'
              }`}
            />
            {errors.date && <p className="text-xs text-rose-500 mt-1">{errors.date}</p>}
          </div>

          {/* Event Location */}
          <div>
            <label className="block text-xs font-semibold text-navy-800 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-lavender-600" />
              <span>City / Location <span className="text-rose-500">*</span></span>
            </label>
            <input
              type="text"
              placeholder="e.g. Bangalore, Udaipur, Mumbai, Delhi NCR"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (errors.location) setErrors(prev => ({ ...prev, location: '' }));
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                errors.location ? 'border-rose-400 bg-rose-50/30' : 'border-gray-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200'
              }`}
            />
            {errors.location && <p className="text-xs text-rose-500 mt-1">{errors.location}</p>}
          </div>

          {/* Budget INR */}
          <div>
            <label className="block text-xs font-semibold text-navy-800 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Estimated Budget (INR ₹) <span className="text-rose-500">*</span></span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700">
                ₹{Number(budget || 0).toLocaleString('en-IN')}
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-sm font-semibold text-gray-500">₹</span>
              <input
                type="number"
                step="1000"
                min="10000"
                placeholder="500000"
                value={budget}
                onChange={(e) => {
                  setBudget(e.target.value);
                  if (errors.budget) setErrors(prev => ({ ...prev, budget: '' }));
                }}
                className={`w-full pl-8 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                  errors.budget ? 'border-rose-400 bg-rose-50/30' : 'border-gray-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200'
                }`}
              />
            </div>
            {errors.budget && <p className="text-xs text-rose-500 mt-1">{errors.budget}</p>}
          </div>

          {/* Guest Count */}
          <div>
            <label className="block text-xs font-semibold text-navy-800 mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-lavender-600" />
              <span>Expected Number of Guests <span className="text-rose-500">*</span></span>
            </label>
            <input
              type="number"
              min="5"
              placeholder="150"
              value={guestCount}
              onChange={(e) => {
                setGuestCount(e.target.value);
                if (errors.guestCount) setErrors(prev => ({ ...prev, guestCount: '' }));
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                errors.guestCount ? 'border-rose-400 bg-rose-50/30' : 'border-gray-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200'
              }`}
            />
            {errors.guestCount && <p className="text-xs text-rose-500 mt-1">{errors.guestCount}</p>}
          </div>

          {/* Preferred Event Theme */}
          <div>
            <label className="block text-xs font-semibold text-navy-800 mb-1.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-lavender-600" />
              <span>Preferred Event Theme</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Royal Sunset Bloom, Pastel Floral, Retro Disco, Rustic Boho"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 transition-all"
            />
          </div>

          {/* Event Style */}
          <div>
            <label className="block text-xs font-semibold text-navy-800 mb-1.5 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-lavender-600" />
              <span>Event Style</span>
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as EventStyle)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 transition-all bg-white"
            >
              <option value="Traditional">Traditional (Cultural Rituals, Authentic Decor)</option>
              <option value="Modern">Modern (Contemporary Chic, Sleek Lighting)</option>
              <option value="Luxury">Luxury (Opulent Florals, Premium Hospitality)</option>
              <option value="Minimal">Minimal (Clean Aesthetics, Subtle Elegance)</option>
              <option value="Cultural">Cultural (Community Folk Roots, Heritage)</option>
            </select>
          </div>
        </div>

        {/* Category Specific Conditional Section */}
        <div className="pt-6 border-t border-gray-100 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-lavender-800 bg-lavender-100 px-2.5 py-1 rounded-md">
              {category.toUpperCase()} Specific Preferences
            </span>
            <span className="text-xs text-gray-500">Tailored questions for deep AI personalization</span>
          </div>

          {/* Wedding Conditional Fields */}
          {category === 'wedding' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-ivory-50/70 p-5 rounded-2xl border border-lavender-100">
              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1">Bride's Name</label>
                <input
                  type="text"
                  placeholder="e.g. Meera"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1">Groom's Name</label>
                <input
                  type="text"
                  placeholder="e.g. Aarav"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-navy-800 mb-2">
                  Select Ceremonies to Include
                </label>
                <div className="flex flex-wrap gap-2">
                  {weddingCeremoniesList.map((ceremony) => {
                    const isSelected = selectedCeremonies.includes(ceremony);
                    return (
                      <button
                        type="button"
                        key={ceremony}
                        onClick={() => handleCeremonyToggle(ceremony)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          isSelected
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white text-navy-700 border-gray-200 hover:border-rose-300'
                        }`}
                      >
                        {ceremony} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-navy-800 mb-1">Dietary Preferences</label>
                <input
                  type="text"
                  placeholder="e.g. Multi-Cuisine Vegetarian, Pure Jain Counter, Halal, Pan-Asian"
                  value={dietaryPreference}
                  onChange={(e) => setDietaryPreference(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                />
              </div>
            </div>
          )}

          {/* Birthday Conditional Fields */}
          {category === 'birthday' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-ivory-50/70 p-5 rounded-2xl border border-lavender-100">
              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1">Age Milestone</label>
                <input
                  type="text"
                  placeholder="e.g. 1st, 18th, 21st, 25th, 50th"
                  value={ageMilestone}
                  onChange={(e) => setAgeMilestone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1">Cake Flavor & Aesthetic</label>
                <input
                  type="text"
                  placeholder="e.g. Belgian Truffle, Berry Floral"
                  value={cakeFlavor}
                  onChange={(e) => setCakeFlavor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1">Target Age Group</label>
                <select
                  value={targetAgeGroup}
                  onChange={(e) => setTargetAgeGroup(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-lavender-500 bg-white"
                >
                  <option value="Kids">Kids (0 - 12)</option>
                  <option value="Teens">Teens (13 - 19)</option>
                  <option value="Young Adults">Young Adults (20 - 35)</option>
                  <option value="Adults">Adults (36 - 55)</option>
                  <option value="Seniors">Seniors (55+)</option>
                </select>
              </div>
            </div>
          )}

          {/* Community Conditional Fields */}
          {category === 'community' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-ivory-50/70 p-5 rounded-2xl border border-lavender-100">
              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1">Community / Organizing Body</label>
                <input
                  type="text"
                  placeholder="e.g. RWA, Cultural Association, College Campus"
                  value={communityType}
                  onChange={(e) => setCommunityType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1">Venue Type</label>
                <select
                  value={venueType}
                  onChange={(e) => setVenueType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-lavender-500 bg-white"
                >
                  <option value="Outdoor Ground">Outdoor Ground / Lawn</option>
                  <option value="Indoor Auditorium">Indoor Auditorium</option>
                  <option value="Community Hall">Community Clubhouse / Hall</option>
                  <option value="Hybrid">Hybrid (Indoor + Amphitheatre)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1">Access / Entry Type</label>
                <select
                  value={entryType}
                  onChange={(e) => setEntryType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-lavender-500 bg-white"
                >
                  <option value="Free Open Access">Free Open Access</option>
                  <option value="Ticketed">Ticketed / Pass-based</option>
                  <option value="Invite Only">Invite Only / Member Restricted</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <input
                  type="checkbox"
                  id="permitCheck"
                  checked={permitRequired}
                  onChange={(e) => setPermitRequired(e.target.checked)}
                  className="w-4 h-4 text-navy-900 rounded border-gray-300 focus:ring-lavender-400"
                />
                <label htmlFor="permitCheck" className="text-xs text-navy-800 cursor-pointer font-medium">
                  Include Police/Municipal NOC & Fire Safety Clearance in vendor checklist
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Additional Requirements */}
        <div>
          <label className="block text-xs font-semibold text-navy-800 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-lavender-600" />
            <span>Additional Requirements / Special Requests</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Need acoustic live music during dinner, drone photography, separate vegan mocktail counter, ramp accessibility for elders..."
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 transition-all placeholder:text-gray-400"
          ></textarea>
        </div>

        {/* Submit CTA */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-navy-900 hover:bg-navy-800 text-ivory font-bold text-sm tracking-wide shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-rose-300 animate-pulse" />
            <span>Generate My Event Plan</span>
          </button>
          <p className="text-center text-[11px] text-gray-500 mt-2">
            Powered by Gemini AI • Guaranteed Indian Rupee (INR ₹) budget fidelity
          </p>
        </div>

      </form>
    </div>
  );
};

