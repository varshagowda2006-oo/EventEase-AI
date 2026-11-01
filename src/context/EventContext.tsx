import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  SavedEvent, 
  EventInputData, 
  GeneratedEventPlan, 
  BudgetItem, 
  TimelineTask, 
  Vendor 
} from '../types/event';
import { 
  getAllEvents, 
  saveEvent, 
  deleteEvent as deleteEventStorage, 
  getActiveEventId, 
  setActiveEventId as setActiveEventIdStorage 
} from '../services/storage';
import { useAuth } from './AuthContext';

interface EventContextType {
  events: SavedEvent[];
  activeEventId: string | null;
  activeEvent: SavedEvent | null;
  loading: boolean;
  setActiveEventId: (id: string) => void;
  refreshEvents: () => Promise<void>;
  createEvent: (input: EventInputData, plan: GeneratedEventPlan) => Promise<SavedEvent>;
  updateEvent: (event: SavedEvent) => Promise<void>;
  deleteEvent: (id: string) => Promise<boolean>;
  // Budget operations
  addBudgetItem: (item: Omit<BudgetItem, 'id'>) => Promise<void>;
  updateBudgetItem: (itemId: string, updates: Partial<BudgetItem>) => Promise<void>;
  deleteBudgetItem: (itemId: string) => Promise<void>;
  setTotalBudget: (newBudget: number) => Promise<void>;
  // Timeline operations
  addTask: (task: Omit<TimelineTask, 'id'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<TimelineTask>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  toggleTaskCompletion: (taskId: string) => Promise<void>;
  // Vendor operations
  addVendor: (vendor: Omit<Vendor, 'id'>) => Promise<void>;
  updateVendor: (vendorId: string, updates: Partial<Vendor>) => Promise<void>;
  deleteVendor: (vendorId: string) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [events, setEvents] = useState<SavedEvent[]>([]);
  const [activeEventId, setActiveIdState] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllEvents(user?.uid);
      setEvents(data);
      const storedActiveId = getActiveEventId();
      if (storedActiveId && data.some(e => e.id === storedActiveId)) {
        setActiveIdState(storedActiveId);
      } else if (data.length > 0) {
        setActiveIdState(data[0].id);
        setActiveEventIdStorage(data[0].id);
      } else {
        setActiveIdState(null);
      }
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  const setActiveEventId = (id: string) => {
    setActiveIdState(id);
    setActiveEventIdStorage(id);
  };

  const activeEvent = events.find(e => e.id === activeEventId) || null;

  const createEvent = async (input: EventInputData, plan: GeneratedEventPlan): Promise<SavedEvent> => {
    const id = 'evt-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    
    // Transform plan budget items into initial interactive budgetItems
    const initialBudgetItems: BudgetItem[] = plan.budgetBreakdown.map((b, idx) => ({
      id: `bi-${idx}-${Date.now()}`,
      category: b.category,
      allocated: b.allocated,
      actual: 0,
      notes: b.description
    }));

    // Transform plan timeline into interactive timelineTasks
    const eventDateObj = new Date(input.date || Date.now() + 60 * 86400000);
    const initialTasks: TimelineTask[] = plan.timeline.map((t, idx) => {
      const targetDateObj = new Date(eventDateObj.getTime() - (t.daysBefore * 86400000));
      return {
        id: `task-${idx}-${Date.now()}`,
        title: t.task,
        description: t.suggestedDeadlineDescription,
        deadlineDaysBefore: t.daysBefore,
        targetDate: isNaN(targetDateObj.getTime()) ? '' : targetDateObj.toISOString().split('T')[0],
        priority: t.priority,
        completed: false,
        category: t.category
      };
    });

    // Transform plan vendors into interactive vendors
    const initialVendors: Vendor[] = plan.vendorChecklist.map((v, idx) => ({
      id: `vnd-${idx}-${Date.now()}`,
      category: v.category,
      name: v.suggestedName,
      estimatedCost: v.estimatedCost,
      actualCost: 0,
      status: 'Pending',
      notes: `${v.importance}: ${v.deliverables}`
    }));

    const newEvent: SavedEvent = {
      id,
      userId: user?.uid || 'guest',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      input: { ...input, id },
      plan,
      budgetItems: initialBudgetItems,
      timelineTasks: initialTasks,
      vendors: initialVendors
    };

    const saved = await saveEvent(newEvent);
    setEvents(prev => [saved, ...prev.filter(e => e.id !== id)]);
    setActiveEventId(saved.id);
    return saved;
  };

  const updateEvent = async (event: SavedEvent) => {
    const updated = { ...event, updatedAt: new Date().toISOString() };
    await saveEvent(updated);
    setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    const success = await deleteEventStorage(id);
    if (success) {
      setEvents(prev => prev.filter(e => e.id !== id));
      if (activeEventId === id) {
        const remaining = events.filter(e => e.id !== id);
        const nextId = remaining.length > 0 ? remaining[0].id : null;
        setActiveIdState(nextId);
        if (nextId) setActiveEventIdStorage(nextId);
      }
    }
    return success;
  };

  // Budget operations
  const addBudgetItem = async (item: Omit<BudgetItem, 'id'>) => {
    if (!activeEvent) return;
    const newItem: BudgetItem = {
      ...item,
      id: 'bi-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      isCustom: true
    };
    const updatedEvent: SavedEvent = {
      ...activeEvent,
      budgetItems: [...activeEvent.budgetItems, newItem],
      updatedAt: new Date().toISOString()
    };
    await updateEvent(updatedEvent);
  };

  const updateBudgetItem = async (itemId: string, updates: Partial<BudgetItem>) => {
    if (!activeEvent) return;
    const updatedItems = activeEvent.budgetItems.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    );
    const updatedEvent: SavedEvent = {
      ...activeEvent,
      budgetItems: updatedItems,
      updatedAt: new Date().toISOString()
    };
    await updateEvent(updatedEvent);
  };

  const deleteBudgetItem = async (itemId: string) => {
    if (!activeEvent) return;
    const updatedItems = activeEvent.budgetItems.filter(item => item.id !== itemId);
    const updatedEvent: SavedEvent = {
      ...activeEvent,
      budgetItems: updatedItems,
      updatedAt: new Date().toISOString()
    };
    await updateEvent(updatedEvent);
  };

  const setTotalBudget = async (newBudget: number) => {
    if (!activeEvent) return;
    const updatedEvent: SavedEvent = {
      ...activeEvent,
      input: {
        ...activeEvent.input,
        budget: newBudget
      },
      updatedAt: new Date().toISOString()
    };
    await updateEvent(updatedEvent);
  };

  // Timeline operations
  const addTask = async (task: Omit<TimelineTask, 'id'>) => {
    if (!activeEvent) return;
    const newTask: TimelineTask = {
      ...task,
      id: 'task-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5)
    };
    const updatedEvent: SavedEvent = {
      ...activeEvent,
      timelineTasks: [...activeEvent.timelineTasks, newTask],
      updatedAt: new Date().toISOString()
    };
    await updateEvent(updatedEvent);
  };

  const updateTask = async (taskId: string, updates: Partial<TimelineTask>) => {
    if (!activeEvent) return;
    const updatedTasks = activeEvent.timelineTasks.map(t =>
      t.id === taskId ? { ...t, ...updates } : t
    );
    const updatedEvent: SavedEvent = {
      ...activeEvent,
      timelineTasks: updatedTasks,
      updatedAt: new Date().toISOString()
    };
    await updateEvent(updatedEvent);
  };

  const deleteTask = async (taskId: string) => {
    if (!activeEvent) return;
    const updatedTasks = activeEvent.timelineTasks.filter(t => t.id !== taskId);
    const updatedEvent: SavedEvent = {
      ...activeEvent,
      timelineTasks: updatedTasks,
      updatedAt: new Date().toISOString()
    };
    await updateEvent(updatedEvent);
  };

  const toggleTaskCompletion = async (taskId: string) => {
    if (!activeEvent) return;
    const updatedTasks = activeEvent.timelineTasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    const updatedEvent: SavedEvent = {
      ...activeEvent,
      timelineTasks: updatedTasks,
      updatedAt: new Date().toISOString()
    };
    await updateEvent(updatedEvent);
  };

  // Vendor operations
  const addVendor = async (vendor: Omit<Vendor, 'id'>) => {
    if (!activeEvent) return;
    const newVendor: Vendor = {
      ...vendor,
      id: 'vnd-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5)
    };
    const updatedEvent: SavedEvent = {
      ...activeEvent,
      vendors: [...activeEvent.vendors, newVendor],
      updatedAt: new Date().toISOString()
    };
    await updateEvent(updatedEvent);
  };

  const updateVendor = async (vendorId: string, updates: Partial<Vendor>) => {
    if (!activeEvent) return;
    const updatedVendors = activeEvent.vendors.map(v =>
      v.id === vendorId ? { ...v, ...updates } : v
    );
    const updatedEvent: SavedEvent = {
      ...activeEvent,
      vendors: updatedVendors,
      updatedAt: new Date().toISOString()
    };
    await updateEvent(updatedEvent);
  };

  const deleteVendor = async (vendorId: string) => {
    if (!activeEvent) return;
    const updatedVendors = activeEvent.vendors.filter(v => v.id !== vendorId);
    const updatedEvent: SavedEvent = {
      ...activeEvent,
      vendors: updatedVendors,
      updatedAt: new Date().toISOString()
    };
    await updateEvent(updatedEvent);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        activeEventId,
        activeEvent,
        loading,
        setActiveEventId,
        refreshEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        addBudgetItem,
        updateBudgetItem,
        deleteBudgetItem,
        setTotalBudget,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        addVendor,
        updateVendor,
        deleteVendor
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

