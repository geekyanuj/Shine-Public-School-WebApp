import React, { useState, useEffect } from 'react';
import { timetableApi, adminApi } from '../api/modules';
import { Clock, Plus, MapPin, User, Calendar, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TimetablePage() {
  const { isAdmin } = useAuth();
  const [selectedClass, setSelectedClass] = useState('1');
  const [classes, setClasses] = useState([]);
  const [timetableSlots, setTimetableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    classId: 1,
    className: 'Class 1',
    subjectName: 'Mathematics',
    teacherName: 'Teacher One',
    dayOfWeek: 'MONDAY',
    startTime: '09:00 AM',
    endTime: '09:45 AM',
    roomNumber: 'Room 101'
  });

  const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  useEffect(() => {
    async function loadClasses() {
      try {
        const res = await adminApi.getClasses();
        setClasses(res.data || []);
      } catch (err) {
        console.error('Failed to load classes', err);
      }
    }
    loadClasses();
  }, []);

  const loadTimetable = async () => {
    if (!selectedClass) return;
    setLoading(true);
    try {
      const res = await timetableApi.getByClass(selectedClass);
      setTimetableSlots(res.data || []);
    } catch (err) {
      console.error('Failed to fetch timetable', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTimetable();
  }, [selectedClass]);

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    try {
      await timetableApi.createSlot({
        ...form,
        classId: parseInt(selectedClass),
        className: `Class ${selectedClass}`
      });
      setShowModal(false);
      loadTimetable();
    } catch (err) {
      console.error('Failed to save timetable slot', err);
    }
  };

  const handleDeleteSlot = async (id) => {
    if (!window.confirm('Remove this schedule slot?')) return;
    try {
      await timetableApi.deleteSlot(id);
      loadTimetable();
    } catch (err) {
      console.error('Failed to delete slot', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-10 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Clock className="w-7 h-7 text-indigo-400" />
            Class Timetable & Schedules
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Weekly academic schedule and period allocation per class.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition"
          >
            <Plus className="w-4 h-4" /> Add Period Slot
          </button>
        )}
      </div>

      {/* Class Selector */}
      <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex items-center gap-4">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {classes.length > 0 ? (
            classes.map(c => (
              <option key={c.classId} value={c.classId}>{c.name}</option>
            ))
          ) : (
            <>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
            </>
          )}
        </select>
      </div>

      {/* Weekly Schedule Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading timetable slots...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DAYS.map((day) => {
            const daySlots = timetableSlots.filter(s => s.dayOfWeek?.toUpperCase() === day);
            return (
              <div key={day} className="bg-slate-800 rounded-2xl border border-slate-700 p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                  <h3 className="font-extrabold text-white text-base tracking-wide flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" /> {day}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {daySlots.length} Slots
                  </span>
                </div>

                {daySlots.length > 0 ? (
                  <div className="space-y-3">
                    {daySlots.map((slot) => (
                      <div key={slot.timetableId} className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 space-y-2 relative group">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                            {slot.startTime} - {slot.endTime}
                          </span>
                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteSlot(slot.timetableId)}
                              className="text-slate-500 hover:text-rose-400 text-xs"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <h4 className="font-bold text-white text-base">{slot.subjectName}</h4>

                        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-slate-500" /> {slot.teacherName || 'Faculty'}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-slate-300">
                            <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {slot.roomNumber || 'Room 101'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-500 italic">
                    No periods assigned for {day}.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Slot Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h3 className="text-lg font-bold text-white">Add Period Slot</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSlot} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Day of Week</label>
                <select
                  value={form.dayOfWeek}
                  onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                >
                  {DAYS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subjectName}
                    onChange={(e) => setForm({ ...form, subjectName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Teacher</label>
                  <input
                    type="text"
                    required
                    value={form.teacherName}
                    onChange={(e) => setForm({ ...form, teacherName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Start Time</label>
                  <input
                    type="text"
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    placeholder="09:00 AM"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">End Time</label>
                  <input
                    type="text"
                    value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                    placeholder="09:45 AM"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Room / Lab Number</label>
                <input
                  type="text"
                  value={form.roomNumber}
                  onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                  placeholder="Room 101 / Lab 2"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                />
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
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30"
                >
                  Save Period Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
