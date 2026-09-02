import React, { useState, useEffect } from 'react';
import { attendanceApi, adminApi, studentApi } from '../api/modules';
import { Calendar, CheckCircle2, XCircle, Clock, AlertCircle, Save, Filter, User } from 'lucide-react';

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState('1');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendanceState, setAttendanceState] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await adminApi.getClasses();
        setClasses(res.data || []);
      } catch (err) {
        console.error('Failed to load classes', err);
      }
    }
    fetchClasses();
  }, []);

  useEffect(() => {
    async function loadAttendanceData() {
      if (!selectedClass) return;
      setLoading(true);
      setMessage('');
      try {
        const [studentsRes, attendanceRes] = await Promise.all([
          studentApi.getByClass(selectedClass),
          attendanceApi.getByClass(selectedClass, date)
        ]);

        const classStudents = studentsRes.data || [];
        const existingAttendance = attendanceRes.data || [];

        setStudents(classStudents);

        // Map existing attendance to state
        const initialMap = {};
        classStudents.forEach(st => {
          const match = existingAttendance.find(a => a.personId === st.personId);
          initialMap[st.personId] = match ? match.status : 'PRESENT';
        });
        setAttendanceState(initialMap);
      } catch (err) {
        console.error('Error fetching attendance data', err);
      } finally {
        setLoading(false);
      }
    }
    loadAttendanceData();
  }, [selectedClass, date]);

  const handleStatusChange = (personId, status) => {
    setAttendanceState(prev => ({ ...prev, [personId]: status }));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage('');
    try {
      const records = students.map(st => ({
        personId: st.personId,
        personName: st.name,
        classId: parseInt(selectedClass),
        attendanceDate: date,
        status: attendanceState[st.personId] || 'PRESENT',
        remarks: ''
      }));

      await attendanceApi.markBatch(records);
      setMessage('Attendance submitted successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to save attendance.');
    } finally {
      setSaving(false);
    }
  };

  const counts = {
    present: Object.values(attendanceState).filter(s => s === 'PRESENT').length,
    absent: Object.values(attendanceState).filter(s => s === 'ABSENT').length,
    late: Object.values(attendanceState).filter(s => s === 'LATE').length,
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-10 space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Calendar className="w-7 h-7 text-emerald-400" />
            Attendance Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Record daily student attendance by class and date.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving || students.length === 0}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Submit Attendance'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-semibold text-center border ${
          message.includes('successfully') 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {message}
        </div>
      )}

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Select Class
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Attendance Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Quick Summary Counts */}
        <div className="flex items-center justify-around bg-slate-900 rounded-xl p-2 border border-slate-700">
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Present</p>
            <p className="text-lg font-black text-emerald-400">{counts.present}</p>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Absent</p>
            <p className="text-lg font-black text-rose-400">{counts.absent}</p>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Late</p>
            <p className="text-lg font-black text-amber-400">{counts.late}</p>
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Loading student roster...
          </div>
        ) : students.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Student ID</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Email</th>
                <th className="p-4 text-center">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-sm">
              {students.map((st) => {
                const currentStatus = attendanceState[st.personId] || 'PRESENT';
                return (
                  <tr key={st.personId} className="hover:bg-slate-700/40 transition">
                    <td className="p-4 font-mono text-slate-400">#STU-{st.personId}</td>
                    <td className="p-4 font-semibold text-white flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        {st.name.charAt(0)}
                      </div>
                      {st.name}
                    </td>
                    <td className="p-4 text-slate-400">{st.email}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.personId, 'PRESENT')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                            currentStatus === 'PRESENT'
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                              : 'bg-slate-900 text-slate-400 hover:text-emerald-400 border border-slate-700'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" /> Present
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.personId, 'ABSENT')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                            currentStatus === 'ABSENT'
                              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                              : 'bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-700'
                          }`}
                        >
                          <XCircle className="w-4 h-4" /> Absent
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.personId, 'LATE')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                            currentStatus === 'LATE'
                              ? 'bg-amber-500 text-slate-900 font-extrabold shadow-md shadow-amber-500/30'
                              : 'bg-slate-900 text-slate-400 hover:text-amber-400 border border-slate-700'
                          }`}
                        >
                          <Clock className="w-4 h-4" /> Late
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <p>No students enrolled in Class {selectedClass}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
