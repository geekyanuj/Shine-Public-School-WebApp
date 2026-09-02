import React, { useState, useEffect } from 'react';
import { noticeApi } from '../api/modules';
import { Bell, Plus, Calendar, Tag, Trash2, ShieldAlert, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function NoticeBoardPage() {
  const { isAdmin } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterRole, setFilterRole] = useState('ALL');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetRole: 'ALL',
    priority: 'HIGH',
    category: 'General'
  });

  const loadNotices = async () => {
    setLoading(true);
    try {
      const res = await noticeApi.getAll();
      setNotices(res.data || []);
    } catch (err) {
      console.error('Failed to fetch notices', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      await noticeApi.create({
        ...formData,
        postedDate: new Date().toISOString().split('T')[0]
      });
      setShowModal(false);
      setFormData({
        title: '',
        content: '',
        targetRole: 'ALL',
        priority: 'MEDIUM',
        category: 'General'
      });
      loadNotices();
    } catch (err) {
      console.error('Error creating notice', err);
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      await noticeApi.delete(id);
      loadNotices();
    } catch (err) {
      console.error('Error deleting notice', err);
    }
  };

  const filteredNotices = notices.filter(n => filterRole === 'ALL' || n.targetRole === 'ALL' || n.targetRole === filterRole);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-10 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Bell className="w-7 h-7 text-rose-400" />
            Notice Board & Announcements
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Official school circulars, academic notices, and event updates.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-600/30 transition"
          >
            <Plus className="w-4 h-4" /> Publish Announcement
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
        <div className="flex gap-2">
          {['ALL', 'STUDENT', 'TEACHER'].map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                filterRole === role
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              Audience: {role}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Showing {filteredNotices.length} notice(s)
        </span>
      </div>

      {/* Notice Cards List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading announcements...</div>
      ) : filteredNotices.length > 0 ? (
        <div className="space-y-4">
          {filteredNotices.map((n) => (
            <div
              key={n.noticeId}
              className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-3 relative hover:border-rose-500/50 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                      n.priority === 'HIGH'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : n.priority === 'MEDIUM'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {n.priority} PRIORITY
                  </span>
                  <span className="px-3 py-1 bg-slate-900 text-slate-300 text-xs font-semibold rounded-full border border-slate-700">
                    Target: {n.targetRole}
                  </span>
                  <span className="px-3 py-1 bg-slate-900 text-slate-400 text-xs font-semibold rounded-full border border-slate-700">
                    Category: {n.category || 'General'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Posted: {n.postedDate}
                  </span>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteNotice(n.noticeId)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Delete Notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">{n.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{n.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800 p-12 rounded-2xl text-center text-slate-400 border border-slate-700">
          No notices available for this target audience.
        </div>
      )}

      {/* Publish Notice Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h3 className="text-lg font-bold text-white">Publish New Notice</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Notice Title"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Content / Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write notice description..."
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Audience</label>
                  <select
                    value={formData.targetRole}
                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                  >
                    <option value="ALL">ALL</option>
                    <option value="STUDENT">STUDENT</option>
                    <option value="TEACHER">TEACHER</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Academic / General"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-xl text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-600/30"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
