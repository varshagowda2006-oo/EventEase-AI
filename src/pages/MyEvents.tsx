import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  ArrowRight, 
  Heart, 
  Cake, 
  Building2, 
  Plus, 
  Layers, 
  ShieldCheck, 
  Save, 
  X,
  ExternalLink,
  Clock
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatINR } from '../services/storage';
import { SavedEvent } from '../types/event';

export const MyEvents: React.FC = () => {
  const navigate = useNavigate();
  const { events, activeEventId, setActiveEventId, updateEvent, deleteEvent } = useEvents();
  const { user, isFirebaseActive } = useAuth();
  const { showToast } = useToast();

  // Edit Modal State
  const [editingEvent, setEditingEvent] = useState<SavedEvent | null>(null);
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editBudget, setEditBudget] = useState<number>(0);
  const [editGuests, setEditGuests] = useState<number>(0);

  // Delete Confirmation Modal State
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);
  const [deletingEventName, setDeletingEventName] = useState<string>('');

  const handleOpenEvent = (id: string) => {
    setActiveEventId(id);
    navigate('/ai-planner');
  };

  const startEdit = (event: SavedEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingEvent(event);
    setEditName(event.input.name);
    setEditDate(event.input.date);
    setEditLocation(event.input.location);
    setEditBudget(event.input.budget);
    setEditGuests(event.input.guestCount);
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    const updated: SavedEvent = {
      ...editingEvent,
      input: {
        ...editingEvent.input,
        name: editName.trim(),
        date: editDate,
        location: editLocation.trim(),
        budget: Number(editBudget),
        guestCount: Number(editGuests)
      }
    };

    await updateEvent(updated);
    setEditingEvent(null);
    showToast(`Updated "${updated.input.name}" successfully!`, 'success');
  };

  const confirmDelete = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingEventId(id);
    setDeletingEventName(name);
  };

  const executeDelete = async () => {
    if (!deletingEventId) return;
    const success = await deleteEvent(deletingEventId);
    if (success) {
      showToast(`Event "${deletingEventName}" was deleted.`, 'info');
    }
    setDeletingEventId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-lavender-700">Master Control</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {isFirebaseActive ? 'Cloud Firestore Synchronized' : 'Local Storage Mode'}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mt-1">
            My Events Dashboard
          </h1>
          <p className="text-xs text-navy-600 mt-1">
            Manage your active celebrations, review financial allocations, and track milestone execution.
          </p>
        </div>

        <Link
          to="/plan"
          className="px-5 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-ivory font-semibold text-xs flex items-center justify-center gap-2 shadow-soft transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Celebration</span>
        </Link>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-3xl border border-lavender-100 shadow-soft max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-lavender-100 text-lavender-800 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-navy-950">No Saved Events Yet</h3>
          <p className="text-xs text-navy-600 leading-relaxed">
            Begin by providing your celebration requirements to generate an AI blueprint with tailored budget, timeline, and vendor checklists.
          </p>
          <div className="pt-2">
            <Link
              to="/plan"
              className="px-6 py-3 rounded-xl bg-navy-900 text-ivory font-semibold text-xs shadow-soft hover:bg-navy-800 transition-colors inline-flex items-center gap-2"
            >
              <span>Create First Event Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => {
            const isActive = evt.id === activeEventId;
            const tasksCount = evt.timelineTasks?.length || 0;
            const completedCount = evt.timelineTasks?.filter(t => t.completed).length || 0;
            const progress = tasksCount > 0 ? Math.round((completedCount / tasksCount) * 100) : 0;
            const actualSpent = evt.budgetItems?.reduce((sum, b) => sum + (b.actual || 0), 0) || 0;

            return (
              <div
                key={evt.id}
                onClick={() => handleOpenEvent(evt.id)}
                className={`p-6 rounded-3xl bg-white border cursor-pointer transition-all duration-300 shadow-soft hover:shadow-soft-xl flex flex-col justify-between space-y-5 relative group ${
                  isActive
                    ? 'border-lavender-400 ring-2 ring-lavender-200'
                    : 'border-lavender-100 hover:border-lavender-300'
                }`}
              >
                {/* Active Tag */}
                {isActive && (
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Active Selection
                    </span>
                  </div>
                )}

                {/* Top: Icon + Category + Title */}
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${
                      evt.input.category === 'wedding'
                        ? 'bg-rose-500'
                        : evt.input.category === 'birthday'
                        ? 'bg-lavender-600'
                        : 'bg-navy-900'
                    }`}>
                      {evt.input.category === 'wedding' && <Heart className="w-4 h-4 fill-white" />}
                      {evt.input.category === 'birthday' && <Cake className="w-4 h-4" />}
                      {evt.input.category === 'community' && <Building2 className="w-4 h-4" />}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-navy-400 capitalize">
                        {evt.input.category} • {evt.input.style}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-navy-950 group-hover:text-lavender-800 transition-colors">
                    {evt.input.name}
                  </h3>

                  <p className="text-xs text-navy-600 mt-1 line-clamp-1 italic">
                    "{evt.plan.overview.recommendedTheme || evt.plan.overview.concept}"
                  </p>
                </div>

                {/* Details list */}
                <div className="space-y-2 py-3 border-y border-gray-100 text-xs">
                  <div className="flex items-center justify-between text-navy-700">
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-lavender-600" /> Date:
                    </span>
                    <span className="font-semibold">{evt.input.date || 'TBD'}</span>
                  </div>

                  <div className="flex items-center justify-between text-navy-700">
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-lavender-600" /> City:
                    </span>
                    <span className="font-semibold truncate max-w-[140px]">{evt.input.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-navy-700">
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Budget:
                    </span>
                    <span className="font-bold text-emerald-800">{formatINR(evt.input.budget)}</span>
                  </div>

                  <div className="flex items-center justify-between text-navy-700">
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <Users className="w-3.5 h-3.5 text-lavender-600" /> Guests:
                    </span>
                    <span className="font-semibold">{evt.input.guestCount} Pax</span>
                  </div>
                </div>

                {/* Planning Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-navy-500 font-medium">Progress</span>
                    <span className="font-bold text-navy-800">{progress}% ({completedCount}/{tasksCount} tasks)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-lavender-600 to-rose-400 h-1.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Card Bottom Controls */}
                <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                  <span className="text-xs font-bold text-lavender-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Open Plan</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => startEdit(evt, e)}
                      className="p-1.5 rounded-lg hover:bg-lavender-100 text-lavender-700 transition-colors"
                      title="Edit event information"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => confirmDelete(evt.id, evt.input.name, e)}
                      className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600 transition-colors"
                      title="Delete event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Edit Event Information Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-lavender-200 shadow-soft-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-serif text-lg font-bold text-navy-950">Edit Event Information</h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="p-1.5 rounded-full text-gray-400 hover:text-navy-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={saveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-navy-800 mb-1">Event Name *</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Location / City</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Budget (INR ₹)</label>
                  <input
                    type="number"
                    step="1000"
                    value={editBudget}
                    onChange={(e) => setEditBudget(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Guest Count</label>
                  <input
                    type="number"
                    value={editGuests}
                    onChange={(e) => setEditGuests(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2.5 rounded-xl bg-ivory-200 text-navy-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold shadow-soft hover:bg-navy-800 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingEventId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-rose-200 shadow-soft-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg font-bold text-navy-950">Confirm Deletion</h3>
              <p className="text-xs text-navy-600">
                Are you sure you want to permanently delete <strong>"{deletingEventName}"</strong>? This will remove all associated budgets, tasks, and vendor checklists.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setDeletingEventId(null)}
                className="flex-1 py-2.5 rounded-xl bg-ivory-200 text-navy-800 text-xs font-semibold hover:bg-ivory-300 transition-colors"
              >
                Keep Event
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-soft transition-colors"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

