import React, { useState, useEffect } from 'react';
import { studentApi, adminApi } from '../api/modules';
import { GraduationCap, Search, Filter, Mail, Phone, BookOpen, UserPlus, CheckCircle } from 'lucide-react';

export default function StudentManagementPage() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [studentRes, classRes] = await Promise.all([
          studentApi.getAll(),
          adminApi.getClasses()
        ]);
        setStudents(studentRes.data || []);
        setClasses(classRes.data || []);
      } catch (err) {
        console.error('Failed to load students', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredStudents = students.filter((st) => {
    const matchesClass = !selectedClass || (st.eclass?.classId === parseInt(selectedClass) || st.classId === parseInt(selectedClass));
    const matchesSearch = !searchTerm || st.name.toLowerCase().includes(searchTerm.toLowerCase()) || st.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-violet-400" />
            Student Management System
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse enrolled student profiles, academic classes, and contact details.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by student name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">All Classes</option>
            {classes.map((c) => (
              <option key={c.classId} value={c.classId}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end text-xs font-semibold text-slate-400">
          Enrolled Total: <span className="ml-1 text-violet-400 text-sm font-bold">{filteredStudents.length}</span>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading student directory...</div>
        ) : filteredStudents.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Student ID</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Assigned Class</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-sm">
              {filteredStudents.map((st) => (
                <tr key={st.personId} className="hover:bg-slate-700/40 transition">
                  <td className="p-4 font-mono text-slate-400">#STU-{st.personId}</td>
                  <td className="p-4 font-bold text-white flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold">
                      {st.name.charAt(0)}
                    </div>
                    {st.name}
                  </td>
                  <td className="p-4 text-slate-400 flex items-center gap-1.5 mt-2">
                    <Mail className="w-3.5 h-3.5 text-slate-500" /> {st.email}
                  </td>
                  <td className="p-4 text-slate-400">
                    {st.mobileNum || 'N/A'}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold text-violet-300">
                      {st.eclass?.name || 'Class 1'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-slate-400">
            No students found matching the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
