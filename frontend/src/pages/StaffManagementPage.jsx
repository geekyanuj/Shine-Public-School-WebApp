import React, { useState, useEffect } from 'react';
import { staffApi } from '../api/modules';
import { Users, Plus, Mail, Phone, Briefcase, Award, Trash2, Edit3, X } from 'lucide-react';

export default function StaffManagementPage() {
  const [staffList, setStaffList] = useState([]);
  const [filterDept, setFilterDept] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNum: '',
    designation: 'Senior Teacher',
    department: 'Mathematics',
    qualification: 'M.Sc., B.Ed.',
    salary: 45000,
    joiningDate: new Date().toISOString().split('T')[0]
  });

  const loadStaff = async () => {
    setLoading(true);
    try {
      const res = await staffApi.getAll(filterDept);
      setStaffList(res.data || []);
    } catch (err) {
      console.error('Failed to load staff list', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, [filterDept]);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    try {
      await staffApi.create({
        ...formData,
        personId: Math.floor(Math.random() * 1000) + 10
      });
      setShowModal(false);
      setFormData({
        name: '',
        email: '',
        mobileNum: '',
        designation: 'Teacher',
        department: 'Science',
        qualification: 'B.Sc.',
        salary: 40000,
        joiningDate: new Date().toISOString().split('T')[0]
      });
      loadStaff();
    } catch (err) {
      console.error('Error saving staff member', err);
    }
  };

  const handleDeleteStaff = async (id) => {
    if (!window.confirm('Are you sure you want to remove this staff member?')) return;
    try {
      await staffApi.delete(id);
      loadStaff();
    } catch (err) {
      console.error('Error deleting staff', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-10 space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-400" />
            Staff & Faculty Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage teachers, administrative officers, and support staff records.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition"
        >
          <Plus className="w-4 h-4" /> Add Staff Member
        </button>
      </div>

      {/* Filter Row */}
      <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full max-w-xs">
          <label className="text-xs font-bold text-slate-400 uppercase">Department:</label>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Administration">Administration</option>
          </select>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Showing {staffList.length} staff member(s)
        </span>
      </div>

      {/* Staff Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading staff members...</div>
      ) : staffList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffList.map((st) => (
            <div key={st.staffId} className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl relative group hover:border-blue-500/50 transition">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                    {st.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{st.name}</h3>
                    <p className="text-xs text-blue-400 font-semibold">{st.designation}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteStaff(st.staffId)}
                  className="text-slate-500 hover:text-rose-400 p-1.5 transition"
                  title="Remove Staff"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-5 space-y-2 text-xs text-slate-300 border-t border-slate-700/80 pt-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>Dept: <strong className="text-slate-200">{st.department}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-slate-400" />
                  <span>Qualification: <strong className="text-slate-200">{st.qualification || 'N/A'}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{st.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{st.mobileNum || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  {st.status || 'ACTIVE'}
                </span>
                <span className="text-slate-400 font-mono">
                  Salary: ${(st.salary || 0).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800 p-12 rounded-2xl text-center text-slate-400 border border-slate-700">
          No staff records found for this department filter.
        </div>
      )}

      {/* Add Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h3 className="text-lg font-bold text-white">Add New Staff Member</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Rajesh Kumar"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rajesh@school.com"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Mobile Number</label>
                  <input
                    type="text"
                    required
                    value={formData.mobileNum}
                    onChange={(e) => setFormData({ ...formData, mobileNum: e.target.value })}
                    placeholder="9876543210"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="Senior Faculty"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Qualification</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="Ph.D. / M.Sc."
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Monthly Salary ($)</label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/30"
                >
                  Save Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
