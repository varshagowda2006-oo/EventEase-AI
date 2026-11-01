import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  AlertCircle, 
  Filter, 
  Sparkles,
  ArrowRight,
  Check,
  X,
  Save,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEvents } from '../context/EventContext';
import { useToast } from '../context/ToastContext';
import { TimelineTask } from '../types/event';

export const EventTimeline: React.FC = () => {
  const { 
    activeEvent, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleTaskCompletion 
  } = useEvents();
  const { showToast } = useToast();

  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  
  // Modal / Form state for new task
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newCategory, setNewCategory] = useState('Planning');

  // Inline edit state
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTargetDate, setEditTargetDate] = useState('');
  const [editPriority, setEditPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  if (!activeEvent) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy-950">No Event Selected</h2>
        <p className="text-sm text-navy-600">Please choose or create an event first to manage its timeline.</p>
        <Link
          to="/plan"
          className="inline-block px-6 py-3 rounded-xl bg-navy-900 text-ivory font-semibold text-xs shadow-soft"
        >
          Plan New Event
        </Link>
      </div>
    );
  }

  const tasks = activeEvent.timelineTasks || [];
  const todayStr = new Date().toISOString().split('T')[0];

  // Progress metrics
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(t => t.completed).length;
  const progressPercent = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const isOverdue = (task: TimelineTask) => {
    if (task.completed || !task.targetDate) return false;
    return task.targetDate < todayStr;
  };

  const overdueTasksCount = tasks.filter(isOverdue).length;

  const handleToggle = async (taskId: string, isNowCompleted: boolean) => {
    await toggleTaskCompletion(taskId);
    if (!isNowCompleted) {
      showToast('Milestone achieved! Great progress.', 'success');
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch {}
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Please enter a task title.', 'error');
      return;
    }

    await addTask({
      title: newTitle.trim(),
      description: newDesc.trim() || 'Milestone preparation',
      targetDate: newTargetDate,
      deadlineDaysBefore: 15,
      priority: newPriority,
      completed: false,
      category: newCategory
    });

    setNewTitle('');
    setNewDesc('');
    setNewTargetDate('');
    setIsAddOpen(false);
    showToast('New milestone added to your timeline!', 'success');
  };

  const startEdit = (t: TimelineTask) => {
    setEditingTaskId(t.id);
    setEditTitle(t.title);
    setEditTargetDate(t.targetDate || '');
    setEditPriority(t.priority);
  };

  const saveEdit = async (taskId: string) => {
    await updateTask(taskId, {
      title: editTitle.trim(),
      targetDate: editTargetDate,
      priority: editPriority
    });
    setEditingTaskId(null);
    showToast('Task updated successfully.', 'success');
  };

  const handleDeleteTask = async (taskId: string, title: string) => {
    if (window.confirm(`Delete milestone "${title}"?`)) {
      await deleteTask(taskId);
      showToast('Task removed.', 'info');
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(t => {
    if (filterStatus === 'pending' && t.completed) return false;
    if (filterStatus === 'completed' && !t.completed) return false;
    if (filterStatus === 'overdue' && !isOverdue(t)) return false;
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-lavender-700">Project Management</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-semibold text-navy-600">{activeEvent.input.name}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mt-1">
            Smart Event Timeline
          </h1>
          <p className="text-xs text-navy-600 mt-1">
            Keep vendors and milestones on track with chronological deadlines and automated completion tracking.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-ivory font-semibold text-xs flex items-center justify-center gap-2 shadow-soft transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Milestone</span>
        </button>
      </div>

      {/* Progress & Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Overall Progress */}
        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">Planning Progress</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              {progressPercent}% Complete
            </span>
          </div>
          <p className="font-serif text-3xl font-bold text-navy-950">
            {completedTasksCount} <span className="text-base text-gray-400 font-normal">/ {totalTasksCount} done</span>
          </p>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-lavender-600 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">Pending Actions</span>
          <p className="font-serif text-3xl font-bold text-navy-950">
            {totalTasksCount - completedTasksCount}
          </p>
          <p className="text-xs text-navy-500">Upcoming milestones before event day</p>
        </div>

        {/* Overdue Warnings */}
        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">Attention Needed</span>
            {overdueTasksCount > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            )}
          </div>
          <p className={`font-serif text-3xl font-bold ${overdueTasksCount > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
            {overdueTasksCount} {overdueTasksCount === 1 ? 'task' : 'tasks'}
          </p>
          <p className="text-xs text-navy-500">
            {overdueTasksCount > 0 ? 'Past target deadline' : 'All milestones on schedule'}
          </p>
        </div>

      </div>

      {/* Filter and View Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-lavender-100 shadow-soft-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterStatus === 'all' ? 'bg-navy-900 text-white' : 'text-navy-700 hover:bg-ivory-100'
            }`}
          >
            All ({totalTasksCount})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterStatus === 'pending' ? 'bg-navy-900 text-white' : 'text-navy-700 hover:bg-ivory-100'
            }`}
          >
            Pending ({totalTasksCount - completedTasksCount})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterStatus === 'completed' ? 'bg-navy-900 text-white' : 'text-navy-700 hover:bg-ivory-100'
            }`}
          >
            Completed ({completedTasksCount})
          </button>
          {overdueTasksCount > 0 && (
            <button
              onClick={() => setFilterStatus('overdue')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterStatus === 'overdue' ? 'bg-rose-600 text-white' : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              Overdue ({overdueTasksCount})
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">Priority:</span>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-gray-200 text-xs text-navy-800 bg-white focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Chronological Timeline List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-lavender-100 shadow-soft">
            <CheckSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h4 className="font-bold text-sm text-navy-900">No tasks match this filter</h4>
            <p className="text-xs text-gray-500 mt-1">Try switching filters or add a new milestone above.</p>
          </div>
        ) : (
          filteredTasks.map((task, index) => {
            const isEditing = editingTaskId === task.id;
            const overdue = isOverdue(task);

            return (
              <div
                key={task.id}
                className={`p-5 rounded-3xl bg-white border transition-all duration-200 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  task.completed
                    ? 'border-gray-200 bg-gray-50/60 opacity-80'
                    : overdue
                    ? 'border-rose-300 bg-rose-50/30'
                    : 'border-lavender-100 hover:border-lavender-300'
                }`}
              >
                {/* Left side: Checkbox + Title + Description */}
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleToggle(task.id, task.completed)}
                    className="mt-0.5 p-1 rounded-lg hover:bg-lavender-100 text-navy-700 transition-colors shrink-0"
                    title={task.completed ? "Mark incomplete" : "Mark completed"}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-lavender-600" />
                    )}
                  </button>

                  <div className="space-y-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="px-2 py-1 text-xs border rounded-lg w-full max-w-md font-semibold"
                      />
                    ) : (
                      <h4 className={`font-bold text-sm text-navy-950 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                        {task.title}
                      </h4>
                    )}

                    <p className="text-xs text-navy-600">
                      {task.description || 'Milestone checkpoint'}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-gray-500">
                      {task.targetDate && (
                        <span className={`flex items-center gap-1 font-medium ${overdue ? 'text-rose-600 font-bold' : ''}`}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Deadline: {task.targetDate}</span>
                          {overdue && <span className="bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded text-[10px]">Overdue</span>}
                        </span>
                      )}
                      <span className="text-gray-300">•</span>
                      <span className="capitalize">{task.category}</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Priority Tag + Actions */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={editTargetDate}
                        onChange={(e) => setEditTargetDate(e.target.value)}
                        className="px-2 py-1 border rounded text-xs"
                      />
                      <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value as any)}
                        className="px-2 py-1 border rounded text-xs bg-white"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="p-1.5 rounded-lg bg-emerald-600 text-white"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingTaskId(null)}
                        className="p-1.5 rounded-lg bg-gray-200 text-gray-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          task.priority === 'High'
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : task.priority === 'Medium'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {task.priority} Priority
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEdit(task)}
                          className="p-1.5 rounded-lg hover:bg-lavender-100 text-lavender-700 transition-colors"
                          title="Edit Task"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id, task.title)}
                          className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Delete Task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Task Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-lavender-200 shadow-soft-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-serif text-lg font-bold text-navy-950">Add Timeline Milestone</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-navy-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-navy-800 mb-1">Task / Milestone Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule bridal hair & makeup trial"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-800 mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Bring along jewelry and veil for accurate trial"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Target Deadline Date</label>
                  <input
                    type="date"
                    value={newTargetDate}
                    onChange={(e) => setNewTargetDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500 bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-navy-800 mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Venue, Styling, Catering, Logistics"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-ivory-200 text-navy-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold shadow-soft hover:bg-navy-800"
                >
                  Add Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

