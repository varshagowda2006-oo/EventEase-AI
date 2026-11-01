import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit2, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  PieChart as PieIcon, 
  BarChart3, 
  Sparkles, 
  ArrowRight,
  Save,
  X,
  Layers
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { useEvents } from '../context/EventContext';
import { useToast } from '../context/ToastContext';
import { formatINR } from '../services/storage';
import { BudgetItem } from '../types/event';

const PALETTE_COLORS = [
  '#8C6ECD', '#C46B67', '#364B84', '#EAAFA5', '#6D52B8', 
  '#059669', '#D97706', '#DB2777', '#2563EB', '#475569'
];

export const BudgetPlanner: React.FC = () => {
  const { 
    activeEvent, 
    addBudgetItem, 
    updateBudgetItem, 
    deleteBudgetItem, 
    setTotalBudget 
  } = useEvents();
  const { showToast } = useToast();

  // State for Editing Total Budget
  const [isEditingTotal, setIsEditingTotal] = useState(false);
  const [totalBudgetInput, setTotalBudgetInput] = useState<number>(activeEvent?.input.budget || 500000);

  // State for Add Modal / Form
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newAllocated, setNewAllocated] = useState<string>('50000');
  const [newActual, setNewActual] = useState<string>('0');
  const [newNotes, setNewNotes] = useState('');

  // State for Editing Item Inline
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editAllocated, setEditAllocated] = useState<number>(0);
  const [editActual, setEditActual] = useState<number>(0);
  const [editNotes, setEditNotes] = useState<string>('');

  if (!activeEvent) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy-950">No Event Selected</h2>
        <p className="text-sm text-navy-600">Please choose or create an event first to manage its budget.</p>
        <Link
          to="/plan"
          className="inline-block px-6 py-3 rounded-xl bg-navy-900 text-ivory font-semibold text-xs shadow-soft"
        >
          Plan New Event
        </Link>
      </div>
    );
  }

  const totalBudget = activeEvent.input.budget || 0;
  const items = activeEvent.budgetItems || [];

  // Calculations
  const totalAllocated = items.reduce((sum, item) => sum + (Number(item.allocated) || 0), 0);
  const totalActual = items.reduce((sum, item) => sum + (Number(item.actual) || 0), 0);
  const remainingBudget = totalBudget - totalActual;
  const utilizationPercentage = totalBudget > 0 ? Math.round((totalActual / totalBudget) * 100) : 0;
  const allocationPercentage = totalBudget > 0 ? Math.round((totalAllocated / totalBudget) * 100) : 0;
  const isOverBudget = totalActual > totalBudget;
  const isOverAllocated = totalAllocated > totalBudget;

  const handleSaveTotalBudget = async () => {
    if (totalBudgetInput <= 0) {
      showToast('Please enter a valid positive budget amount.', 'error');
      return;
    }
    await setTotalBudget(Number(totalBudgetInput));
    setIsEditingTotal(false);
    showToast(`Total budget updated to ${formatINR(totalBudgetInput)}!`, 'success');
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      showToast('Please specify a category name.', 'error');
      return;
    }
    await addBudgetItem({
      category: newCategory.trim(),
      allocated: Number(newAllocated) || 0,
      actual: Number(newActual) || 0,
      notes: newNotes.trim()
    });

    setNewCategory('');
    setNewAllocated('50000');
    setNewActual('0');
    setNewNotes('');
    setIsAddOpen(false);
    showToast('New expense category added!', 'success');
  };

  const startEdit = (item: BudgetItem) => {
    setEditingItemId(item.id);
    setEditAllocated(item.allocated);
    setEditActual(item.actual);
    setEditNotes(item.notes || '');
  };

  const saveEdit = async (itemId: string) => {
    await updateBudgetItem(itemId, {
      allocated: Number(editAllocated) || 0,
      actual: Number(editActual) || 0,
      notes: editNotes.trim()
    });
    setEditingItemId(null);
    showToast('Expense item updated!', 'success');
  };

  const handleDeleteItem = async (itemId: string, categoryName: string) => {
    if (window.confirm(`Are you sure you want to delete "${categoryName}"?`)) {
      await deleteBudgetItem(itemId);
      showToast(`Removed "${categoryName}".`, 'info');
    }
  };

  // Chart Data
  const pieData = items
    .filter(i => (i.actual > 0 ? i.actual : i.allocated) > 0)
    .map(i => ({
      name: i.category,
      value: i.actual > 0 ? i.actual : i.allocated,
      actual: i.actual,
      allocated: i.allocated
    }));

  const barData = items.map(i => ({
    name: i.category.length > 15 ? i.category.substring(0, 14) + '...' : i.category,
    Allocated: i.allocated,
    Actual: i.actual
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-lavender-700">Financial Planning</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-semibold text-navy-600">{activeEvent.input.name}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mt-1">
            Interactive Budget Planner
          </h1>
          <p className="text-xs text-navy-600 mt-1">
            Track allocations, monitor actual vendor spends, and prevent budget overrun with live Indian Rupee (INR ₹) calculations.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-ivory font-semibold text-xs flex items-center justify-center gap-2 shadow-soft transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense Category</span>
        </button>
      </div>

      {/* Warnings & Alerts */}
      {isOverBudget && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 flex items-start gap-3 text-rose-900 animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">Budget Exceeded Warning!</h4>
            <p className="text-xs mt-0.5 leading-relaxed">
              Your actual expenditures of <strong>{formatINR(totalActual)}</strong> exceed your total set budget of <strong>{formatINR(totalBudget)}</strong> by <span className="font-bold underline">{formatINR(totalActual - totalBudget)}</span>. Consider renegotiating non-essential vendor categories or adjusting the total budget ceiling.
            </p>
          </div>
        </div>
      )}

      {isOverAllocated && !isOverBudget && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3 text-amber-900 animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">Allocated Planned Amount Exceeds Target</h4>
            <p className="text-xs mt-0.5 leading-relaxed">
              Your planned category allocations total <strong>{formatINR(totalAllocated)}</strong>, which is <span className="font-bold">{formatINR(totalAllocated - totalBudget)}</span> higher than your overall budget. Adjust allocations to keep planned commitments balanced.
            </p>
          </div>
        </div>
      )}

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Budget Card */}
        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-navy-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Budget</span>
            <button
              onClick={() => {
                setTotalBudgetInput(totalBudget);
                setIsEditingTotal(!isEditingTotal);
              }}
              className="p-1 rounded-lg hover:bg-lavender-50 text-lavender-700 transition-colors"
              title="Edit Total Budget"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {isEditingTotal ? (
            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="number"
                step="5000"
                value={totalBudgetInput}
                onChange={(e) => setTotalBudgetInput(Number(e.target.value))}
                className="w-full px-2 py-1 text-sm border rounded-lg focus:outline-none focus:border-lavender-500"
              />
              <button
                onClick={handleSaveTotalBudget}
                className="p-1.5 rounded-lg bg-navy-900 text-white hover:bg-navy-800"
              >
                <Save className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <p className="font-serif text-2xl font-bold text-navy-950">
              {formatINR(totalBudget)}
            </p>
          )}

          <p className="text-[11px] text-gray-500">Planned Ceiling</p>
        </div>

        {/* Total Allocated Card */}
        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">Estimated Total</span>
          <p className="font-serif text-2xl font-bold text-lavender-900">
            {formatINR(totalAllocated)}
          </p>
          <div className="flex items-center justify-between text-[11px] text-navy-500">
            <span>Commitment:</span>
            <span className={`font-bold ${isOverAllocated ? 'text-amber-600' : 'text-navy-800'}`}>
              {allocationPercentage}%
            </span>
          </div>
        </div>

        {/* Actual Spent Card */}
        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">Actual Spent</span>
          <p className={`font-serif text-2xl font-bold ${isOverBudget ? 'text-rose-600' : 'text-emerald-700'}`}>
            {formatINR(totalActual)}
          </p>
          <div className="flex items-center justify-between text-[11px] text-navy-500">
            <span>Utilization:</span>
            <span className={`font-bold ${isOverBudget ? 'text-rose-600' : 'text-emerald-700'}`}>
              {utilizationPercentage}%
            </span>
          </div>
        </div>

        {/* Remaining Balance Card */}
        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">Remaining Balance</span>
          <p className={`font-serif text-2xl font-bold ${remainingBudget < 0 ? 'text-rose-600' : 'text-navy-950'}`}>
            {formatINR(remainingBudget)}
          </p>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
            <div
              className={`h-1.5 rounded-full transition-all ${
                isOverBudget ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pie Chart: Expense Share */}
        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-lavender-700" />
              <span>Budget Distribution by Category</span>
            </h3>
            <span className="text-[11px] text-gray-500">{items.length} categories</span>
          </div>

          <div className="h-64 w-full">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PALETTE_COLORS[index % PALETTE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [formatINR(Number(val)), 'Amount']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E0D8F3', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-gray-400">
                No expense data available
              </div>
            )}
          </div>
        </div>

        {/* Bar Chart: Allocated vs Actual */}
        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span>Estimated vs. Actual Expenses (INR ₹)</span>
            </h3>
            <span className="text-[11px] text-gray-500">Live Comparison</span>
          </div>

          <div className="h-64 w-full">
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EAF8" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                  <Tooltip
                    formatter={(val: any) => [formatINR(Number(val)), '']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E0D8F3', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="Allocated" fill="#8C6ECD" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Actual" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-gray-400">
                No bar data available
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Expense Items Interactive Table */}
      <div className="bg-white rounded-3xl border border-lavender-100 shadow-soft overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-navy-950">Category Expense Ledger</h3>
            <p className="text-xs text-navy-600 mt-0.5">
              Click edit on any category to log actual payments or update quotes.
            </p>
          </div>

          <span className="text-xs font-semibold text-lavender-800 bg-lavender-50 px-3 py-1 rounded-full border border-lavender-200">
            {items.length} Active Expense Categories
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-100 text-navy-600 uppercase tracking-wider font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-4 text-right">Estimated (₹)</th>
                <th className="py-3.5 px-4 text-right">Actual Spent (₹)</th>
                <th className="py-3.5 px-4 text-right">Variance</th>
                <th className="py-3.5 px-6">Notes / Vendor</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => {
                const isEditing = editingItemId === item.id;
                const diff = (item.allocated || 0) - (item.actual || 0);

                return (
                  <tr key={item.id} className="hover:bg-ivory-50/60 transition-colors">
                    {/* Category Name */}
                    <td className="py-4 px-6 font-semibold text-navy-950">
                      <div className="flex items-center gap-2">
                        <span>{item.category}</span>
                        {item.isCustom && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-lavender-100 text-lavender-800">
                            Custom
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Allocated */}
                    <td className="py-4 px-4 text-right">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editAllocated}
                          onChange={(e) => setEditAllocated(Number(e.target.value))}
                          className="w-28 px-2 py-1 text-right border rounded-lg text-xs"
                        />
                      ) : (
                        <span className="font-medium text-navy-800">{formatINR(item.allocated)}</span>
                      )}
                    </td>

                    {/* Actual */}
                    <td className="py-4 px-4 text-right">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editActual}
                          onChange={(e) => setEditActual(Number(e.target.value))}
                          className="w-28 px-2 py-1 text-right border rounded-lg text-xs"
                        />
                      ) : (
                        <span className={`font-bold ${item.actual > item.allocated ? 'text-rose-600' : 'text-emerald-700'}`}>
                          {formatINR(item.actual)}
                        </span>
                      )}
                    </td>

                    {/* Variance */}
                    <td className="py-4 px-4 text-right font-semibold">
                      <span className={diff < 0 ? 'text-rose-600' : 'text-emerald-700'}>
                        {diff < 0 ? `-${formatINR(Math.abs(diff))}` : `+${formatINR(diff)}`}
                      </span>
                    </td>

                    {/* Notes */}
                    <td className="py-4 px-6 text-navy-600 max-w-xs truncate">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Optional notes"
                          className="w-full px-2 py-1 border rounded-lg text-xs"
                        />
                      ) : (
                        <span className="text-gray-600">{item.notes || '—'}</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => saveEdit(item.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                            title="Save changes"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingItemId(null)}
                            className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => startEdit(item)}
                            className="p-1.5 rounded-lg hover:bg-lavender-100 text-lavender-700 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id, item.category)}
                            className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Expense Category Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-lavender-200 shadow-soft-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-serif text-lg font-bold text-navy-950">Add Custom Expense Category</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-navy-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-navy-800 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Return Gifts & Favors, Valet Parking, Drone Pilot"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Estimated Budget (INR ₹)</label>
                  <input
                    type="number"
                    step="500"
                    placeholder="50000"
                    value={newAllocated}
                    onChange={(e) => setNewAllocated(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Actual Spent (INR ₹)</label>
                  <input
                    type="number"
                    step="500"
                    placeholder="0"
                    value={newActual}
                    onChange={(e) => setNewActual(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-navy-800 mb-1">Notes / Vendor Reference</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Quoted by CityFavors, includes packaging"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                ></textarea>
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

