import { SavedEvent, GeneratedEventPlan, EventInputData } from '../types/event';

export const sampleWeddingPlan: GeneratedEventPlan = {
  overview: {
    concept: "Royal Heritage with Modern Pastel Elegance",
    recommendedTheme: "Ivory, Dusty Rose & Gold Sunset Bloom",
    colorPalette: ["#FFFDF9", "#EAAFA5", "#D37682", "#C5A880", "#1E293B"],
    decorationIdeas: [
      "Fairytale floral arch entrance with mogra, eucalyptus, and pastel blush peonies",
      "Warm fairy light canopies over dining areas with suspended crystal chandeliers",
      "Custom brass urli with floating marigold and floating candles at the walkway",
      "Intimate lounge seating with velvet bolsters and antique gilded mirrors"
    ],
    personalizedSuggestions: [
      "Include a live acoustic sitar-guitar fusion band during the sunset cocktail hour",
      "Curate a personalized monogram dance floor with warm ambient uplighting",
      "Provide guests with personalized aromatic attar bottles as return favors",
      "Design an interactive live dessert counter featuring artisanal jalebi & nitro kulfi"
    ],
    highlights: [
      "Exquisite Mandap set against scenic garden backdrop",
      "Gourmet Pan-Indian & Global fusion buffet",
      "Candid cinematic photography coverage with drone cinematography"
    ]
  },
  budgetBreakdown: [
    { category: "Venue & Lawn Rentals", allocated: 220000, percentage: 27.5, description: "Banquet hall & lawn booking for 2 days including basic power backup" },
    { category: "Catering & Beverages", allocated: 280000, percentage: 35.0, description: "Multi-cuisine buffet (Appetizers, 4 live counters, Main course, Desserts) for 350 pax" },
    { category: "Floral & Decor Design", allocated: 110000, percentage: 13.8, description: "Theme stage, Mandap, entrance arch, table centerpieces & ambient lighting" },
    { category: "Photography & Cinematography", allocated: 90000, percentage: 11.2, description: "2 Traditional + 2 Candid photographers, drone footage & teaser trailer" },
    { category: "Entertainment & Sound (DJ/Live)", allocated: 45000, percentage: 5.6, description: "Professional sound system, DJ with console, Sangeet choreography mic set" },
    { category: "Invitations & Stationery", allocated: 15000, percentage: 1.9, description: "Custom digital invitations, physical scroll invites & printed signage" },
    { category: "Miscellaneous & Contingency", allocated: 40000, percentage: 5.0, description: "Logistics, guest welcome hampers, valets & emergency buffer" }
  ],
  timeline: [
    { task: "Book Wedding Venue & Finalize Dates", daysBefore: 120, priority: "High", category: "Venue", suggestedDeadlineDescription: "4 months before event" },
    { task: "Shortlist and Book Top Caterer & Tasting Session", daysBefore: 90, priority: "High", category: "Catering", suggestedDeadlineDescription: "3 months before event" },
    { task: "Hire Candid Photographer and Cinematographer", daysBefore: 75, priority: "High", category: "Media", suggestedDeadlineDescription: "2.5 months before event" },
    { task: "Finalize Decor Theme & Mandap 3D Renders", daysBefore: 60, priority: "Medium", category: "Decor", suggestedDeadlineDescription: "2 months before event" },
    { task: "Send Out Save-the-Date Digital Invites", daysBefore: 45, priority: "Medium", category: "Invitations", suggestedDeadlineDescription: "6 weeks before event" },
    { task: "Apparel Trials & Jewelry Coordination", daysBefore: 30, priority: "High", category: "Styling", suggestedDeadlineDescription: "1 month before event" },
    { task: "Finalize DJ Playlist and Sangeet Track Mixes", daysBefore: 20, priority: "Medium", category: "Entertainment", suggestedDeadlineDescription: "3 weeks before event" },
    { task: "Reconfirm Guest Count and Transport Logistics", daysBefore: 10, priority: "High", category: "Coordination", suggestedDeadlineDescription: "10 days before event" },
    { task: "Final Venue Walkthrough & Vendor Briefing", daysBefore: 3, priority: "High", category: "Logistics", suggestedDeadlineDescription: "3 days before event" }
  ],
  vendorChecklist: [
    { category: "Venue", suggestedName: "Grand Heritage Palace & Lawns", estimatedCost: 220000, importance: "Must-Have", deliverables: "Main lawn, banquet hall, 4 bridal green rooms, parking" },
    { category: "Catering", suggestedName: "Royal Feast Gourmet Caterers", estimatedCost: 280000, importance: "Must-Have", deliverables: "350 plates multi-cuisine, 4 live chaat & dessert counters" },
    { category: "Decorator", suggestedName: "Blossom & Petals Event Designers", estimatedCost: 110000, importance: "Must-Have", deliverables: "Entrance gate, Mandap, fairy light ceiling, stage backdrop" },
    { category: "Photographer", suggestedName: "Aura Cinematic Studios", estimatedCost: 90000, importance: "Must-Have", deliverables: "Album, 4K video teaser, full documentary, drone reels" },
    { category: "DJ & Sound", suggestedName: "DJ Rohit & Beats Audio", estimatedCost: 45000, importance: "Recommended", deliverables: "JBL line array sound, intelligent beam lights, wireless mics" },
    { category: "Makeup Artist", suggestedName: "Glow Bridal Studio", estimatedCost: 35000, importance: "Recommended", deliverables: "Bridal HD makeup, hair styling, saree draping for bride & mother" },
    { category: "Florist", suggestedName: "Fresh Bloom Floral Supplies", estimatedCost: 20000, importance: "Optional", deliverables: "Fresh exotic flowers, bridal varmala garlands, car decoration" }
  ],
  personalizedIdeas: {
    themeConcept: "Regal Heritage meets Contemporary Pastel Chic",
    decorStyle: "Muted blush fabrics, soft warm tungsten lighting, antique brass accents, cascading jasmine and baby's breath",
    foodMenu: {
      appetizers: ["Paneer Tikka Angara", "Crispy Lotus Stem Honey Chilli", "Dahi Ke Kebab", "Galouti Sliders"],
      mains: ["Dal Makhani Bukhara", "Paneer Lababdar", "Subz Dum Biryani with Burani Raita", "Assorted Artisanal Naans"],
      desserts: ["Shahi Tukda with Rabri Mousse", "Live Malpua counter", "Gourmet Paan Ice Cream"],
      beverages: ["Signature Kesar Thandai", "Fresh Mint Mojito Mocktails", "Rose Lavender Lemonade"]
    },
    guestActivities: [
      "Audio Guestbook booth where guests leave voice messages on vintage rotary phones",
      "Live portrait sketch artist sketching quick souvenir sketches for attendees",
      "Interactive Sangeet flash mob choreographed for cousins & friends"
    ],
    entertainment: [
      "Acoustic Sufi and Bollywood fusion band for the evening reception",
      "Synchronized cold pyro sparklers for the couple's grand entrance",
      "Dynamic 360-degree selfie video booth with customized wedding graphics"
    ],
    budgetFriendlyAlternatives: [
      "Use seasonal local flowers (rajnigandha, marigold, jasmine) instead of imported hydrangeas",
      "Opt for digital video wedding invitations with RSVP tracking rather than physical boxed invites",
      "Group venue lighting rentals into a package with the sound vendor to receive up to 15% discount"
    ]
  }
};

export const sampleBirthdayPlan: GeneratedEventPlan = {
  overview: {
    concept: "Boho Chic Starlight Garden Celebration",
    recommendedTheme: "Warm Terracotta, Sage Green & Champagne Glow",
    colorPalette: ["#FAF8F5", "#8C6ECD", "#EAAFA5", "#3D2A68", "#F5F0EA"],
    decorationIdeas: [
      "Macrame backdrop with neon 'Wild & Free' or celebratory age signage",
      "Teepee tent lounge corners with plush cushions and fairy lights",
      "Customized organic balloon arch with chrome accents and dry pampas grass",
      "Fairy-lit dessert table with wooden rustic risers and floral foliage"
    ],
    personalizedSuggestions: [
      "Personalized polaroid memory wall where guests clip instant photos with handwritten notes",
      "Curate a live mocktail bar with customized drinks named after the birthday star's favorite memories",
      "DJ accompanied by a live saxophone player for a modern upscale vibe"
    ],
    highlights: [
      "Spectacular artisanal multi-tier designer birthday cake",
      "Interactive culinary experience with wood-fired pizzas and sliders",
      "Memory video projection showcasing highlights over the years"
    ]
  },
  budgetBreakdown: [
    { category: "Venue & Rooftop Space", allocated: 45000, percentage: 30.0, description: "Boutique rooftop lounge or garden café rental for 5 hours" },
    { category: "Food & Mocktails", allocated: 55000, percentage: 36.7, description: "Pass-around tapas, live pizza counter, main buffet & beverages for 60 pax" },
    { category: "Designer Cake & Sweets", allocated: 10000, percentage: 6.7, description: "3-tier custom theme semi-naked floral cake & mini cupcakes" },
    { category: "Balloon & Boho Decor", allocated: 22000, percentage: 14.7, description: "Neon sign, organic balloon garland, photo booth & teepee setups" },
    { category: "Photography & Reels", allocated: 12000, percentage: 8.0, description: "Professional photographer + 3 curated Instagram reels" },
    { category: "Games & Music Host", allocated: 6000, percentage: 4.0, description: "Acoustic performer or MC for games and music" }
  ],
  timeline: [
    { task: "Lock in Venue and Date", daysBefore: 30, priority: "High", category: "Venue", suggestedDeadlineDescription: "1 month before" },
    { task: "Order Custom Themed Birthday Cake", daysBefore: 18, priority: "High", category: "Bakery", suggestedDeadlineDescription: "2.5 weeks before" },
    { task: "Design & Dispatch Digital Invites with RSVP", daysBefore: 15, priority: "Medium", category: "Invites", suggestedDeadlineDescription: "2 weeks before" },
    { task: "Finalize Decor Styling & Custom Neon Sign", daysBefore: 10, priority: "Medium", category: "Decor", suggestedDeadlineDescription: "10 days before" },
    { task: "Curate Party Playlist & Activity Rundown", daysBefore: 5, priority: "Low", category: "Fun", suggestedDeadlineDescription: "5 days before" },
    { task: "Confirm Food Headcount with Caterer", daysBefore: 3, priority: "High", category: "Food", suggestedDeadlineDescription: "3 days before" },
    { task: "Day of Event Setup Coordination", daysBefore: 0, priority: "High", category: "Execution", suggestedDeadlineDescription: "Day of Event" }
  ],
  vendorChecklist: [
    { category: "Venue", suggestedName: "Skyline Garden Bistro", estimatedCost: 45000, importance: "Must-Have", deliverables: "Private terrace, mood lights, tables & seating" },
    { category: "Catering", suggestedName: "Artisan Kitchen Bites", estimatedCost: 55000, importance: "Must-Have", deliverables: "Live tacos & slider station, pasta bar, mocktail mixers" },
    { category: "Bakery", suggestedName: "Crème & Petal Pâtisserie", estimatedCost: 10000, importance: "Must-Have", deliverables: "3-kg Belgium chocolate truffle cake with edible flowers" },
    { category: "Decorator", suggestedName: "Whimsical Balloon Co.", estimatedCost: 22000, importance: "Recommended", deliverables: "Double organic balloon ring, custom neon name sign, LED floor letters" },
    { category: "Photographer", suggestedName: "Candid Moments Photography", estimatedCost: 12000, importance: "Recommended", deliverables: "150 edited high-res photos, 3 vertical social media reels" }
  ],
  personalizedIdeas: {
    themeConcept: "Sunset Bohemian Starlight Soirée",
    decorStyle: "Pampas grass, warm copper fairy lights, woven cane fixtures, velvet emerald and blush cushions",
    foodMenu: {
      appetizers: ["Truffle Mushroom Crostini", "Smoked Paneer Quesadillas", "Crispy Peri-Peri Popcorn", "Loaded Nachos Bar"],
      mains: ["Woodfired Thin Crust Pizzas", "Creamy Pesto Penne Pasta", "Gourmet Mini Sliders", "Herbed Garlic Bread"],
      desserts: ["Nutella Sea Salt Brownie Bites", "Red Velvet Macarons", "Belgium Chocolate Celebration Cake"],
      beverages: ["Blueberry Lavender Fizz", "Peach Basil Iced Tea", "Virgin Sangria Spritzer"]
    },
    guestActivities: [
      "Custom trivia game about the birthday celebrant using smartphones",
      "Polaroid photo station with funky props and metallic markers",
      "Karaoke hour with acoustic backing guitar"
    ],
    entertainment: [
      "Upbeat DJ playlist paired with wireless strobe lighting",
      "Sparkler candle moment for the cake cutting countdown"
    ],
    budgetFriendlyAlternatives: [
      "Host at an aesthetic Airbnb or community clubhouse to save on high restaurant minimum spends",
      "Make the balloon garland using DIY balloon kits with a hand pump, saving up to 50% on decor installation"
    ]
  }
};

export const sampleCommunityPlan: GeneratedEventPlan = {
  overview: {
    concept: "Community Cultural & Eco-Sustainability Carnival",
    recommendedTheme: "Vibrant Earth & Community Harmony",
    colorPalette: ["#2A3A69", "#7551BE", "#8C6ECD", "#FAF8F5", "#DDD0BE"],
    decorationIdeas: [
      "Eco-friendly bamboo arches decorated with recycled colorful fabric buntings",
      "Solar-powered string lamps lighting the pedestrian walkway pathways",
      "Central stage backdrop crafted from reusable wooden pallets and lush vertical green wall",
      "Color-coded activity stalls with distinct handmade chalkboard signage"
    ],
    personalizedSuggestions: [
      "Organize an open-mic cultural segment celebrating local neighborhood talents",
      "Set up an organic farmers & artisanal flea market section to foster local entrepreneurs",
      "Deploy a zero-waste policy with compostable areca nut leaf plates and water refill stations"
    ],
    highlights: [
      "Grand inauguration with local community elders & dignitaries",
      "Inter-neighborhood cultural dance & musical competitions",
      "Interactive kid zone with clay pottery and science exhibition tables"
    ]
  },
  budgetBreakdown: [
    { category: "Ground / Amphitheatre & Municipal Permissions", allocated: 65000, percentage: 21.7, description: "Township ground booking, local police & fire NOC compliance fees" },
    { category: "Stage, High-Output Sound & Truss Lighting", allocated: 85000, percentage: 28.3, description: "32x24ft covered stage, line-array speakers, stage lights, generator backup" },
    { category: "Canopy Stalls & Community Seating", allocated: 60000, percentage: 20.0, description: "25 vendor canopy tents, 400 banquet chairs, carpets & barricades" },
    { category: "Food Court Logistics & Refreshments", allocated: 45000, percentage: 15.0, description: "Water dispensing stations, volunteer snacks, tea/coffee bar, waste bins" },
    { category: "Promotions, Badges & Volunteer Kits", allocated: 25000, percentage: 8.3, description: "Posters, social banners, volunteer t-shirts, identity lanyards & wristbands" },
    { category: "First Aid, Security & Sanitation", allocated: 20000, percentage: 6.7, description: "Private security guards, paramedic first-aid booth, housekeeping crew" }
  ],
  timeline: [
    { task: "Form Community Committee & Draft Event Charter", daysBefore: 60, priority: "High", category: "Governance", suggestedDeadlineDescription: "2 months before" },
    { task: "Apply for Municipal Permissions & Ground NOC", daysBefore: 45, priority: "High", category: "Permits", suggestedDeadlineDescription: "6 weeks before" },
    { task: "Book Sound, Stage & Electrical Generator Vendors", daysBefore: 30, priority: "High", category: "Infrastructure", suggestedDeadlineDescription: "1 month before" },
    { task: "Call for Stalls & Cultural Performers Registration", daysBefore: 25, priority: "Medium", category: "Outreach", suggestedDeadlineDescription: "3.5 weeks before" },
    { task: "Print Banners, Directional Signs & Volunteer Badges", daysBefore: 12, priority: "Medium", category: "Media", suggestedDeadlineDescription: "12 days before" },
    { task: "Volunteer Dry Run & Stage Schedule Finalization", daysBefore: 4, priority: "High", category: "Operations", suggestedDeadlineDescription: "4 days before" },
    { task: "Carnival Execution Day & Zero-Waste Clean Up", daysBefore: 0, priority: "High", category: "Execution", suggestedDeadlineDescription: "Event Day" }
  ],
  vendorChecklist: [
    { category: "Stage & Sound", suggestedName: "Apex Sound & Trussing Systems", estimatedCost: 85000, importance: "Must-Have", deliverables: "Main covered stage, 8 line arrays, cordless mics, monitor wedges" },
    { category: "Tents & Furniture", suggestedName: "National Tent & Exhibition Rentals", estimatedCost: 60000, importance: "Must-Have", deliverables: "25 waterproof German canopies, 400 chairs, red carpet" },
    { category: "Security & Housekeeping", suggestedName: "ShieldForce Facility Services", estimatedCost: 20000, importance: "Must-Have", deliverables: "6 guards, 8 housekeeping staff for continuous trash clearing" },
    { category: "Promotions & Print", suggestedName: "CityPrint Solutions", estimatedCost: 25000, importance: "Recommended", deliverables: "Cloth entry banners, volunteer tees, visitor wristbands" },
    { category: "Sanitation & Water", suggestedName: "PureFlow Drinking Water Supplies", estimatedCost: 15000, importance: "Must-Have", deliverables: "8 bubble top water dispensers, 100 20L jars, biodegradable cups" }
  ],
  personalizedIdeas: {
    themeConcept: "Vibrant Neighborhood Green Carnival",
    decorStyle: "Upcycled fabric streamers, earthen terracotta lamps, jute table runners, living potted plant arrangements",
    foodMenu: {
      appetizers: ["Assorted Millet Chaat Bowls", "Street Style Samosas", "Crispy Corn Fritters", "Dhokla Platter"],
      mains: ["Pav Bhaji Live Counter", "South Indian Tiffin Counter (Idli, Vada, Dosa)", "Chole Bhature", "Hyderabadi Veg Biryani"],
      desserts: ["Hot Gulab Jamun", "Kesar Badam Kulfi", "Jalebi Rabri"],
      beverages: ["Masala Chai Station", "Fresh Sugarcane Juice", "Sweet Lassi", "Aam Panna"]
    },
    guestActivities: [
      "Pottery wheel workshop where kids and parents mold their own clay pots",
      "Friendly tug-of-war competition between different neighborhood blocks",
      "Eco-swap station: Bring 3 books or plants to exchange with neighbors"
    ],
    entertainment: [
      "Folk dance troupe performance showcasing classical & regional dances",
      "Evening rock & acoustic performance by high-school & youth community band",
      "Grand lucky draw raffle with prizes donated by local shops"
    ],
    budgetFriendlyAlternatives: [
      "Invite local food truck partners who pay a nominal stall fee, offsetting overall catering budget",
      "Engage high school and college volunteers with participation certificates instead of hiring paid stage hands"
    ]
  }
};

export const defaultStarterEvents: SavedEvent[] = [
  {
    id: "sample-wedding-001",
    userId: "guest",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    input: {
      id: "sample-wedding-001",
      category: "wedding",
      name: "Aarav & Meera's Royal Wedding",
      date: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      location: "Udaipur & Jaipur Palace Lawns",
      budget: 800000,
      guestCount: 350,
      theme: "Royal Pastel & Floral Bloom",
      style: "Luxury",
      additionalRequirements: "Grand Sangeet night, authentic Rajasthani live food stations, sitar fusion for entry",
      categorySpecific: {
        brideName: "Meera Sharma",
        groomName: "Aarav Singhania",
        ceremonies: ["Mehendi", "Sangeet", "Pheras", "Grand Reception"],
        dietaryPreference: "Strict Vegetarian & Jain Food options"
      }
    },
    plan: sampleWeddingPlan,
    budgetItems: [
      { id: "b1", category: "Venue & Lawn Rentals", allocated: 220000, actual: 215000, notes: "Down payment done, 10% discount negotiated" },
      { id: "b2", category: "Catering & Beverages", allocated: 280000, actual: 290000, notes: "Added 2 extra dessert live counters" },
      { id: "b3", category: "Floral & Decor Design", allocated: 110000, actual: 105000, notes: "Includes fresh rose mandap" },
      { id: "b4", category: "Photography & Cinematography", allocated: 90000, actual: 90000, notes: "Booked Aura Studios" },
      { id: "b5", category: "Entertainment & Sound (DJ/Live)", allocated: 45000, actual: 40000, notes: "DJ + LED wall included" },
      { id: "b6", category: "Invitations & Stationery", allocated: 15000, actual: 12000, notes: "Digital video invitations sent" },
      { id: "b7", category: "Miscellaneous & Contingency", allocated: 40000, actual: 15000, notes: "Buffer fund active" }
    ],
    timelineTasks: [
      { id: "t1", title: "Book Wedding Venue & Finalize Dates", description: "Grand Heritage Palace secured", deadlineDaysBefore: 120, targetDate: "2026-08-10", priority: "High", completed: true, category: "Venue" },
      { id: "t2", title: "Shortlist and Book Top Caterer & Tasting Session", description: "Tasting completed and menu approved", deadlineDaysBefore: 90, targetDate: "2026-09-10", priority: "High", completed: true, category: "Catering" },
      { id: "t3", title: "Hire Candid Photographer and Cinematographer", description: "Advance paid to Aura Studios", deadlineDaysBefore: 75, targetDate: "2026-09-25", priority: "High", completed: true, category: "Media" },
      { id: "t4", title: "Finalize Decor Theme & Mandap 3D Renders", description: "Blossom & Petals sent 3D designs", deadlineDaysBefore: 60, targetDate: "2026-10-10", priority: "Medium", completed: false, category: "Decor" },
      { id: "t5", title: "Send Out Save-the-Date Digital Invites", description: "WhatsApp & Email blast to 350 families", deadlineDaysBefore: 45, targetDate: "2026-10-25", priority: "Medium", completed: false, category: "Invitations" },
      { id: "t6", title: "Apparel Trials & Jewelry Coordination", description: "Sherwani and Lehenga final fittings", deadlineDaysBefore: 30, targetDate: "2026-11-10", priority: "High", completed: false, category: "Styling" }
    ],
    vendors: [
      { id: "v1", category: "Venue", name: "Grand Heritage Palace & Lawns", contactPerson: "Rajesh Rathore", phone: "+91 98290 12345", email: "events@grandheritage.com", estimatedCost: 220000, actualCost: 215000, status: "Booked", notes: "Advance ₹50,000 paid" },
      { id: "v2", category: "Catering", name: "Royal Feast Gourmet Caterers", contactPerson: "Chef Vikram", phone: "+91 98450 67890", email: "contact@royalfeast.in", estimatedCost: 280000, actualCost: 290000, status: "Booked", notes: "Menu locked for 350 pax" },
      { id: "v3", category: "Decorator", name: "Blossom & Petals Event Designers", contactPerson: "Sunaina Kapoor", phone: "+91 97110 54321", email: "sunaina@blossompetals.com", estimatedCost: 110000, actualCost: 105000, status: "Shortlisted", notes: "Reviewing sample canopy mockups" },
      { id: "v4", category: "Photographer", name: "Aura Cinematic Studios", contactPerson: "Kunal Verma", phone: "+91 99887 76655", email: "kunal@aurastudios.com", estimatedCost: 90000, actualCost: 90000, status: "Booked", notes: "Teaser delivery promised within 72 hrs" },
      { id: "v5", category: "DJ & Sound", name: "DJ Rohit & Beats Audio", contactPerson: "Rohit D'Souza", phone: "+91 98200 44556", email: "djrohitbeats@gmail.com", estimatedCost: 45000, actualCost: 40000, status: "Contacted", notes: "Requested his Sangeet mixes reel" }
    ]
  },
  {
    id: "sample-birthday-002",
    userId: "guest",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    input: {
      id: "sample-birthday-002",
      category: "birthday",
      name: "Rhea's 25th Boho Starlight Birthday",
      date: new Date(Date.now() + 25 * 86400000).toISOString().split('T')[0],
      location: "Skyline Garden Bistro & Terrace, Bangalore",
      budget: 150000,
      guestCount: 60,
      theme: "Boho Chic with Neon Glow",
      style: "Modern",
      additionalRequirements: "Live acoustic guitar, wood-fired pizza counter, custom cocktail mixers",
      categorySpecific: {
        ageMilestone: 25,
        cakeFlavor: "Belgian Chocolate Truffle with Raspberry Coulis",
        targetAgeGroup: "Young Adults"
      }
    },
    plan: sampleBirthdayPlan,
    budgetItems: [
      { id: "bb1", category: "Venue & Rooftop Space", allocated: 45000, actual: 42000, notes: "Includes audio equipment usage" },
      { id: "bb2", category: "Food & Mocktails", allocated: 55000, actual: 58000, notes: "Extended mocktail menu added" },
      { id: "bb3", category: "Designer Cake & Sweets", allocated: 10000, actual: 9500, notes: "Ordered from Crème & Petal" },
      { id: "bb4", category: "Balloon & Boho Decor", allocated: 22000, actual: 20000, notes: "Neon 'Twenty-Five' sign confirmed" },
      { id: "bb5", category: "Photography & Reels", allocated: 12000, actual: 12000, notes: "Photographer booked for 4 hrs" },
      { id: "bb6", category: "Games & Music Host", allocated: 6000, actual: 5000, notes: "Acoustic duo shortlisted" }
    ],
    timelineTasks: [
      { id: "tb1", title: "Lock in Venue and Date", description: "Rooftop bistro advance cleared", deadlineDaysBefore: 30, targetDate: "2026-10-15", priority: "High", completed: true, category: "Venue" },
      { id: "tb2", title: "Order Custom Themed Birthday Cake", description: "Flavors selected & advance paid", deadlineDaysBefore: 18, targetDate: "2026-10-27", priority: "High", completed: true, category: "Bakery" },
      { id: "tb3", title: "Design & Dispatch Digital Invites with RSVP", description: "Digital invites sent to 60 friends", deadlineDaysBefore: 15, targetDate: "2026-10-30", priority: "Medium", completed: true, category: "Invites" },
      { id: "tb4", title: "Finalize Decor Styling & Custom Neon Sign", description: "Confirm balloon colors (sage + champagne)", deadlineDaysBefore: 10, targetDate: "2026-11-04", priority: "Medium", completed: false, category: "Decor" },
      { id: "tb5", title: "Curate Party Playlist & Activity Rundown", description: "Create Spotify playlist", deadlineDaysBefore: 5, targetDate: "2026-11-09", priority: "Low", completed: false, category: "Fun" }
    ],
    vendors: [
      { id: "vb1", category: "Venue", name: "Skyline Garden Bistro", contactPerson: "Ananya Roy", phone: "+91 98451 22334", email: "bookings@skylinebistro.com", estimatedCost: 45000, actualCost: 42000, status: "Booked", notes: "Terrace space confirmed" },
      { id: "vb2", category: "Bakery", name: "Crème & Petal Pâtisserie", contactPerson: "Farhan Ali", phone: "+91 97400 99887", email: "order@cremepetal.in", estimatedCost: 10000, actualCost: 9500, status: "Booked", notes: "Delivery at 6 PM sharp" },
      { id: "vb3", category: "Decorator", name: "Whimsical Balloon Co.", contactPerson: "Priya Nair", phone: "+91 99160 55443", email: "priya@whimsicalballoons.com", estimatedCost: 22000, actualCost: 20000, status: "Booked", notes: "Setting up from 3 PM" }
    ]
  }
];

