import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit2, 
  Phone, 
  Mail, 
  User, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Save, 
  X,
  Building,
  Check,
  Search
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { useToast } from '../context/ToastContext';
import { Vendor } from '../types/event';
import { formatINR } from '../services/storage';

export const VendorChecklist: React.FC = () => {
  const { 
    activeEvent, 
    addVendor, 
    updateVendor, 
    deleteVendor 
  } = useEvents();
  const { showToast } = useToast();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Vendor Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Venue');
  const [newContactPerson, setNewContactPerson] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newEstimatedCost, setNewEstimatedCost] = useState<string>('50000');
  const [newActualCost, setNewActualCost] = useState<string>('0');
  const [newStatus, setNewStatus] = useState<Vendor['status']>('Pending');
  const [newNotes, setNewNotes] = useState('');

  // Edit Inline State
  const [editingVendorId, setEditingVendorId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<Vendor['status']>('Pending');
  const [editActualCost, setEditActualCost] = useState<number>(0);
  const [editPhone, setEditPhone] = useState<string>('');
  const [editNotes, setEditNotes] = useState<string>('');

  if (!activeEvent) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy-950">No Event Selected</h2>
        <p className="text-sm text-navy-600">Please choose or create an event first to manage vendors.</p>
        <Link
          to="/plan"
          className="inline-block px-6 py-3 rounded-xl bg-navy-900 text-ivory font-semibold text-xs shadow-soft"
        >
          Plan New Event
        </Link>
      </div>
    );
  }

  const vendors = activeEvent.vendors || [];

  // Metrics
  const totalVendors = vendors.length;
  const bookedVendors = vendors.filter(v => v.status === 'Booked').length;
  const contactedVendors = vendors.filter(v => v.status === 'Contacted' || v.status === 'Shortlisted').length;
  const totalCommittedSpend = vendors.reduce((sum, v) => sum + (v.status === 'Booked' ? (v.actualCost || v.estimatedCost) : 0), 0);

  // Categories list
  const categoryOptions = Array.from(new Set(vendors.map(v => v.category)));

  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      showToast('Please enter a vendor or agency name.', 'error');
      return;
    }

    await addVendor({
      name: newName.trim(),
      category: newCategory.trim() || 'General',
      contactPerson: newContactPerson.trim(),
      phone: newPhone.trim(),
      email: newEmail.trim(),
      estimatedCost: Number(newEstimatedCost) || 0,
      actualCost: Number(newActualCost) || 0,
      status: newStatus,
      notes: newNotes.trim()
    });

    setNewName('');
    setNewContactPerson('');
    setNewPhone('');
    setNewEmail('');
    setNewEstimatedCost('50000');
    setNewActualCost('0');
    setNewNotes('');
    setIsAddOpen(false);
    showToast('Vendor added to directory!', 'success');
  };

  const handleQuickStatusChange = async (vendorId: string, status: Vendor['status']) => {
    await updateVendor(vendorId, { status });
    showToast(`Vendor status updated to ${status}.`, 'success');
  };

  const startEdit = (v: Vendor) => {
    setEditingVendorId(v.id);
    setEditStatus(v.status);
    setEditActualCost(v.actualCost || 0);
    setEditPhone(v.phone || '');
    setEditNotes(v.notes || '');
  };

  const saveEdit = async (vendorId: string) => {
    await updateVendor(vendorId, {
      status: editStatus,
      actualCost: Number(editActualCost) || 0,
      phone: editPhone.trim(),
      notes: editNotes.trim()
    });
    setEditingVendorId(null);
    showToast('Vendor details saved!', 'success');
  };

  const handleDelete = async (vendorId: string, name: string) => {
    if (window.confirm(`Remove vendor "${name}" from your checklist?`)) {
      await deleteVendor(vendorId);
      showToast('Vendor removed.', 'info');
    }
  };

  const filteredVendors = vendors.filter(v => {
    if (filterStatus !== 'all' && v.status !== filterStatus) return false;
    if (filterCategory !== 'all' && v.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = v.name.toLowerCase().includes(q);
      const matchCat = v.category.toLowerCase().includes(q);
      const matchContact = v.contactPerson?.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchContact) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Vendor Management</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-semibold text-navy-600">{activeEvent.input.name}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mt-1">
            Vendor Checklist & Directory
          </h1>
          <p className="text-xs text-navy-600 mt-1">
            Coordinate quotes, phone contacts, deliverables, and booking agreements in one directory.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-ivory font-semibold text-xs flex items-center justify-center gap-2 shadow-soft transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Vendor</span>
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">Total Vendors</span>
          <p className="font-serif text-3xl font-bold text-navy-950">{totalVendors}</p>
          <p className="text-[11px] text-gray-500">Categories covered</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">Booked & Locked</span>
          <p className="font-serif text-3xl font-bold text-emerald-700">{bookedVendors}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">Agreements finalized</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">In Discussion</span>
          <p className="font-serif text-3xl font-bold text-lavender-800">{contactedVendors}</p>
          <p className="text-[11px] text-gray-500">Contacted / Shortlisted</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">Booked Spend</span>
          <p className="font-serif text-2xl font-bold text-navy-950">{formatINR(totalCommittedSpend)}</p>
          <p className="text-[11px] text-gray-500">Committed contracts</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-lavender-100 shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search vendor name, category, or person..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs text-navy-900 focus:outline-none focus:border-lavender-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white font-medium text-navy-800 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Booked">Booked</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Contacted">Contacted</option>
              <option value="Pending">Pending</option>
              <option value="Declined">Declined</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-500">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white font-medium text-navy-800 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-lavender-100 shadow-soft">
            <Building className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h4 className="font-bold text-sm text-navy-900">No vendors found matching this criteria</h4>
            <p className="text-xs text-gray-500 mt-1">Try resetting filters or adding a new vendor above.</p>
          </div>
        ) : (
          filteredVendors.map((vendor) => {
            const isEditing = editingVendorId === vendor.id;

            return (
              <div
                key={vendor.id}
                className={`p-6 rounded-3xl bg-white border transition-all duration-200 shadow-soft hover:shadow-soft-lg flex flex-col justify-between space-y-4 ${
                  vendor.status === 'Booked'
                    ? 'border-emerald-200 ring-1 ring-emerald-100'
                    : 'border-lavender-100'
                }`}
              >
                {/* Header: Category + Status Badge */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-lavender-700">
                      {vendor.category}
                    </span>
                    
                    {/* Status Pill with quick status selector */}
                    <div className="relative group">
                      <select
                        value={vendor.status}
                        onChange={(e) => handleQuickStatusChange(vendor.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer outline-none transition-colors ${
                          vendor.status === 'Booked'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : vendor.status === 'Shortlisted'
                            ? 'bg-lavender-50 text-lavender-800 border-lavender-200'
                            : vendor.status === 'Contacted'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : vendor.status === 'Declined'
                            ? 'bg-gray-100 text-gray-600 border-gray-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Booked">Booked ✓</option>
                        <option value="Declined">Declined</option>
                      </select>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-navy-950">{vendor.name}</h3>
                  {vendor.contactPerson && (
                    <p className="text-xs text-navy-600 flex items-center gap-1.5 mt-1">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>{vendor.contactPerson}</span>
                    </p>
                  )}
                </div>

                {/* Contact and Cost Information */}
                <div className="space-y-2 py-2 border-y border-gray-100 text-xs">
                  {isEditing ? (
                    <div className="space-y-2">
                      <div>
                        <label className="text-[10px] text-gray-400 block">Phone</label>
                        <input
                          type="text"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 block">Actual Final Cost (INR ₹)</label>
                        <input
                          type="number"
                          value={editActualCost}
                          onChange={(e) => setEditActualCost(Number(e.target.value))}
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 block">Notes</label>
                        <textarea
                          rows={2}
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      {vendor.phone && (
                        <p className="flex items-center gap-2 text-navy-700">
                          <Phone className="w-3.5 h-3.5 text-lavender-600" />
                          <a href={`tel:${vendor.phone}`} className="hover:underline">{vendor.phone}</a>
                        </p>
                      )}
                      {vendor.email && (
                        <p className="flex items-center gap-2 text-navy-700 truncate">
                          <Mail className="w-3.5 h-3.5 text-lavender-600" />
                          <a href={`mailto:${vendor.email}`} className="hover:underline truncate">{vendor.email}</a>
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-gray-500">Estimated:</span>
                        <span className="font-semibold text-navy-800">{formatINR(vendor.estimatedCost)}</span>
                      </div>

                      {vendor.actualCost ? (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 font-semibold">Final Agreed Cost:</span>
                          <span className="font-bold text-emerald-800">{formatINR(vendor.actualCost)}</span>
                        </div>
                      ) : null}

                      {vendor.notes && (
                        <p className="text-[11px] text-gray-600 italic pt-1 leading-relaxed">
                          "{vendor.notes}"
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2 w-full justify-end">
                      <button
                        onClick={() => setEditingVendorId(null)}
                        className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveEdit(vendor.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <Save className="w-3 h-3" /> Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-1">
                        {vendor.status !== 'Booked' && (
                          <button
                            onClick={() => handleQuickStatusChange(vendor.id, 'Booked')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-semibold transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" /> Mark Booked
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEdit(vendor)}
                          className="p-1.5 rounded-lg hover:bg-lavender-100 text-lavender-700 transition-colors"
                          title="Edit Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(vendor.id, vendor.name)}
                          className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Delete Vendor"
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

      {/* Add Vendor Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-lavender-200 shadow-soft-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-serif text-lg font-bold text-navy-950">Add Custom Vendor</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-navy-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddVendor} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-navy-800 mb-1">Vendor / Studio Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Banquet & Lawns, Aura Photography"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Venue, Caterer, Florist, DJ"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500 bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Booked">Booked</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Rajesh Kumar"
                    value={newContactPerson}
                    onChange={(e) => setNewContactPerson(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-navy-800 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="contact@vendor.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Estimated Cost (INR ₹)</label>
                  <input
                    type="number"
                    step="500"
                    value={newEstimatedCost}
                    onChange={(e) => setNewEstimatedCost(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-800 mb-1">Agreed Final Cost (INR ₹)</label>
                  <input
                    type="number"
                    step="500"
                    value={newActualCost}
                    onChange={(e) => setNewActualCost(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-lavender-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-navy-800 mb-1">Deliverables & Notes</label>
                <textarea
                  rows={2}
                  placeholder="Includes 4K teaser, full drone coverage, printed photo book..."
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
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

