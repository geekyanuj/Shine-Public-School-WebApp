import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AttendancePage from './pages/AttendancePage';
import StaffManagementPage from './pages/StaffManagementPage';
import StudentManagementPage from './pages/StudentManagementPage';
import ExamManagementPage from './pages/ExamManagementPage';
import FeeManagementPage from './pages/FeeManagementPage';
import NoticeBoardPage from './pages/NoticeBoardPage';
import TimetablePage from './pages/TimetablePage';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-900 text-slate-100">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/notices" element={<NoticeBoardPage />} />

          {/* Protected ERP Module Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
          <Route path="/staff" element={<ProtectedRoute><StaffManagementPage /></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute><StudentManagementPage /></ProtectedRoute>} />
          <Route path="/exams" element={<ProtectedRoute><ExamManagementPage /></ProtectedRoute>} />
          <Route path="/fees" element={<ProtectedRoute><FeeManagementPage /></ProtectedRoute>} />
          <Route path="/timetable" element={<ProtectedRoute><TimetablePage /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
