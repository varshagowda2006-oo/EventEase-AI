export type EventCategory = 'wedding' | 'birthday' | 'community';

export type EventStyle = 'Traditional' | 'Modern' | 'Luxury' | 'Minimal' | 'Cultural';

export interface EventInputData {
  id?: string;
  category: EventCategory;
  name: string;
  date: string;
  location: string;
  budget: number;
  guestCount: number;
  theme: string;
  style: EventStyle;
  additionalRequirements: string;
  // Category specific fields
  categorySpecific?: {
    // Wedding
    ceremonies?: string[];
    brideName?: string;
    groomName?: string;
    dietaryPreference?: string;
    // Birthday
    ageMilestone?: number | string;
    cakeFlavor?: string;
    targetAgeGroup?: 'Kids' | 'Teens' | 'Young Adults' | 'Adults' | 'Seniors';
    // Community
    communityType?: string;
    entryType?: 'Free Open Access' | 'Ticketed' | 'Invite Only';
    venueType?: 'Outdoor Ground' | 'Indoor Auditorium' | 'Community Hall' | 'Hybrid';
    permitRequired?: boolean;
  };
}

export interface BudgetItem {
  id: string;
  category: string;
  allocated: number;
  actual: number;
  notes?: string;
  isCustom?: boolean;
}

export interface TimelineTask {
  id: string;
  title: string;
  description: string;
  deadlineDaysBefore: number; // e.g. 60 days before event
  targetDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  category: string;
}

export interface Vendor {
  id: string;
  category: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  estimatedCost: number;
  actualCost?: number;
  status: 'Pending' | 'Contacted' | 'Shortlisted' | 'Booked' | 'Declined';
  notes?: string;
}

export interface GeneratedEventPlan {
  overview: {
    concept: string;
    recommendedTheme: string;
    colorPalette: string[];
    decorationIdeas: string[];
    personalizedSuggestions: string[];
    highlights: string[];
  };
  budgetBreakdown: {
    category: string;
    allocated: number;
    percentage: number;
    description: string;
  }[];
  timeline: {
    task: string;
    daysBefore: number;
    priority: 'High' | 'Medium' | 'Low';
    category: string;
    suggestedDeadlineDescription: string;
  }[];
  vendorChecklist: {
    category: string;
    suggestedName: string;
    estimatedCost: number;
    importance: 'Must-Have' | 'Recommended' | 'Optional';
    deliverables: string;
  }[];
  personalizedIdeas: {
    themeConcept: string;
    decorStyle: string;
    foodMenu: {
      appetizers: string[];
      mains: string[];
      desserts: string[];
      beverages: string[];
    };
    guestActivities: string[];
    entertainment: string[];
    budgetFriendlyAlternatives: string[];
  };
}

export interface SavedEvent {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  input: EventInputData;
  plan: GeneratedEventPlan;
  budgetItems: BudgetItem[];
  timelineTasks: TimelineTask[];
  vendors: Vendor[];
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

