import api from './client';

// Attendance API
export const attendanceApi = {
  getAll: () => api.get('/attendance'),
  getByClass: (classId, date) => api.get(`/attendance/class/${classId}${date ? `?date=${date}` : ''}`),
  getByStudent: (personId) => api.get(`/attendance/student/${personId}`),
  markBatch: (records) => api.post('/attendance/mark', records),
  saveSingle: (record) => api.post('/attendance', record),
};

// Staff API
export const staffApi = {
  getAll: (dept) => api.get(`/staff${dept ? `?department=${dept}` : ''}`),
  getById: (id) => api.get(`/staff/${id}`),
  create: (staffData) => api.post('/staff', staffData),
  update: (id, staffData) => api.put(`/staff/${id}`, staffData),
  delete: (id) => api.delete(`/staff/${id}`),
};

// Students API
export const studentApi = {
  getAll: () => api.get('/students'),
  getByClass: (classId) => api.get(`/students/class/${classId}`),
  getById: (id) => api.get(`/students/${id}`),
};

// Exams API
export const examApi = {
  getAll: () => api.get('/exams'),
  getByClass: (classId) => api.get(`/exams/class/${classId}`),
  create: (examData) => api.post('/exams', examData),
  delete: (id) => api.delete(`/exams/${id}`),
  getResultsByExam: (examId) => api.get(`/exams/results/exam/${examId}`),
  getReportCard: (personId) => api.get(`/exams/results/student/${personId}`),
  submitResults: (results) => api.post('/exams/results', results),
};

// Fee API
export const feeApi = {
  getStructures: () => api.get('/fees/structures'),
  getStructuresByClass: (classId) => api.get(`/fees/structures/class/${classId}`),
  createStructure: (data) => api.post('/fees/structures', data),
  deleteStructure: (id) => api.delete(`/fees/structures/${id}`),
  getAllPayments: () => api.get('/fees/payments'),
  getStudentPayments: (personId) => api.get(`/fees/payments/student/${personId}`),
  recordPayment: (paymentData) => api.post('/fees/payments', paymentData),
};

// Notices API
export const noticeApi = {
  getAll: () => api.get('/notices'),
  getPublic: () => api.get('/notices/public'),
  create: (data) => api.post('/notices', data),
  delete: (id) => api.delete(`/notices/${id}`),
};

// Timetable API
export const timetableApi = {
  getAll: () => api.get('/timetable'),
  getByClass: (classId) => api.get(`/timetable/class/${classId}`),
  getByTeacher: (teacherName) => api.get(`/timetable/teacher/${teacherName}`),
  createSlot: (data) => api.post('/timetable', data),
  deleteSlot: (id) => api.delete(`/timetable/${id}`),
};

// Admin Classes & Subjects API
export const adminApi = {
  getClasses: () => api.get('/admin/classes'),
  addClass: (data) => api.post('/admin/classes', data),
  deleteClass: (id) => api.delete(`/admin/classes/${id}`),
  getSubjects: () => api.get('/admin/subjects'),
  addSubject: (data) => api.post('/admin/subjects', data),
  deleteSubject: (id) => api.delete(`/admin/subjects/${id}`),
};
