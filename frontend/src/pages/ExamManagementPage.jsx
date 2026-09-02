import React, { useState, useEffect } from 'react';
import { examApi, studentApi } from '../api/modules';
import { BookOpen, Plus, Award, CheckCircle2, AlertTriangle, FileText, Calendar, X } from 'lucide-react';

export default function ExamManagementPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [resultsList, setResultsList] = useState([]);

  const [examForm, setExamForm] = useState({
    examName: 'Midterm Exam 2026',
    classId: 1,
    subjectName: 'Mathematics',
    maxMarks: 100,
    passingMarks: 35,
    examDate: new Date().toISOString().split('T')[0]
  });

  const [resultForm, setResultForm] = useState({
    personId: 3,
    studentName: 'Student One',
    marksObtained: 85,
    grade: 'A',
    remarks: 'Great effort!'
  });

  const loadExams = async () => {
    setLoading(true);
    try {
      const res = await examApi.getAll();
      setExams(res.data || []);
    } catch (err) {
      console.error('Failed to load exams', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleCreateExam = async (e) => {
    e.preventDefault();
    try {
      await examApi.create(examForm);
      setShowExamModal(false);
      loadExams();
    } catch (err) {
      console.error('Failed to create exam', err);
    }
  };

  const handleOpenResults = async (exam) => {
    setSelectedExam(exam);
    setShowResultModal(true);
    try {
      const res = await examApi.getResultsByExam(exam.examId);
      setResultsList(res.data || []);
    } catch (err) {
      console.error('Failed to load exam results', err);
    }
  };

  const handleAddResult = async (e) => {
    e.preventDefault();
    if (!selectedExam) return;
    try {
      await examApi.submitResults([{
        examId: selectedExam.examId,
        personId: resultForm.personId,
        studentName: resultForm.studentName,
        marksObtained: parseFloat(resultForm.marksObtained),
        grade: resultForm.grade,
        remarks: resultForm.remarks
      }]);
      // refresh results
      const res = await examApi.getResultsByExam(selectedExam.examId);
      setResultsList(res.data || []);
    } catch (err) {
      console.error('Failed to submit result', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-10 space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-amber-400" />
            Examinations & Grading
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Schedule exams, record marks, and publish student report cards.
          </p>
        </div>

        <button
          onClick={() => setShowExamModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30 transition"
        >
          <Plus className="w-4 h-4" /> Schedule New Exam
        </button>
      </div>

      {/* Exam Cards Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading scheduled exams...</div>
      ) : exams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((ex) => (
            <div key={ex.examId} className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl space-y-4 hover:border-amber-500/50 transition">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold rounded-lg uppercase">
                  Class {ex.classId}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5" /> {ex.examDate || 'TBA'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{ex.examName}</h3>
                <p className="text-sm font-semibold text-amber-400 mt-0.5">{ex.subjectName}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                <div>
                  <span className="text-slate-400 block">Max Marks</span>
                  <strong className="text-white text-sm">{ex.maxMarks}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Passing Marks</span>
                  <strong className="text-emerald-400 text-sm">{ex.passingMarks}</strong>
                </div>
              </div>

              <button
                onClick={() => handleOpenResults(ex)}
                className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Award className="w-4 h-4 text-amber-400" /> Enter / View Marks
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800 p-12 rounded-2xl text-center text-slate-400 border border-slate-700">
          No scheduled examinations found.
        </div>
      )}

      {/* Schedule Exam Modal */}
      {showExamModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h3 className="text-lg font-bold text-white">Schedule New Exam</h3>
              <button onClick={() => setShowExamModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExam} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Exam Title</label>
                <input
                  type="text"
                  required
                  value={examForm.examName}
                  onChange={(e) => setExamForm({ ...examForm, examName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Class ID</label>
                  <select
                    value={examForm.classId}
                    onChange={(e) => setExamForm({ ...examForm, classId: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  >
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={examForm.subjectName}
                    onChange={(e) => setExamForm({ ...examForm, subjectName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Max Marks</label>
                  <input
                    type="number"
                    value={examForm.maxMarks}
                    onChange={(e) => setExamForm({ ...examForm, maxMarks: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Passing Marks</label>
                  <input
                    type="number"
                    value={examForm.passingMarks}
                    onChange={(e) => setExamForm({ ...examForm, passingMarks: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Exam Date</label>
                <input
                  type="date"
                  value={examForm.examDate}
                  onChange={(e) => setExamForm({ ...examForm, examDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowExamModal(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-xl text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-bold"
                >
                  Save Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Exam Results Modal */}
      {showResultModal && selectedExam && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedExam.examName} — Marks Matrix</h3>
                <p className="text-xs text-amber-400 font-semibold">{selectedExam.subjectName} (Max: {selectedExam.maxMarks})</p>
              </div>
              <button onClick={() => setShowResultModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Existing Results */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Recorded Student Results</h4>
              {resultsList.length > 0 ? (
                <div className="bg-slate-900 rounded-xl border border-slate-700 divide-y divide-slate-800 text-sm">
                  {resultsList.map((res) => (
                    <div key={res.resultId} className="p-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white">{res.studentName || `Student #${res.personId}`}</p>
                        <p className="text-xs text-slate-400">{res.remarks}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-amber-400 font-bold text-base">{res.marksObtained} / {selectedExam.maxMarks}</span>
                        <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded">
                          Grade: {res.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">No marks entered yet for this exam.</div>
              )}
            </div>

            {/* Add Result Form */}
            <form onSubmit={handleAddResult} className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase">Enter Marks for Student</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Student Name</label>
                  <input
                    type="text"
                    required
                    value={resultForm.studentName}
                    onChange={(e) => setResultForm({ ...resultForm, studentName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Marks Obtained</label>
                  <input
                    type="number"
                    required
                    step="0.5"
                    value={resultForm.marksObtained}
                    onChange={(e) => setResultForm({ ...resultForm, marksObtained: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Grade</label>
                  <input
                    type="text"
                    value={resultForm.grade}
                    onChange={(e) => setResultForm({ ...resultForm, grade: e.target.value })}
                    placeholder="A+, A, B, C"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Remarks</label>
                  <input
                    type="text"
                    value={resultForm.remarks}
                    onChange={(e) => setResultForm({ ...resultForm, remarks: e.target.value })}
                    placeholder="Good performance"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg transition"
              >
                Submit Marks
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
