import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Calendar, Users, GraduationCap, BookOpen, DollarSign, Bell, Clock, LogIn } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-600/30 group-hover:scale-105 transition">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white tracking-tight">Shine Public School</span>
                <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">Management ERP System</span>
              </div>
            </Link>

            {isAuthenticated && (
              <nav className="hidden lg:flex space-x-1 border-l border-slate-800 pl-6">
                <Link to="/dashboard" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                  <LayoutDashboard className="w-4 h-4 text-blue-400" /> Dashboard
                </Link>
                <Link to="/attendance" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" /> Attendance
                </Link>
                <Link to="/staff" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-400" /> Staff
                </Link>
                <Link to="/students" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-violet-400" /> Students
                </Link>
                <Link to="/exams" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" /> Exams
                </Link>
                <Link to="/fees" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Fees
                </Link>
                <Link to="/notices" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-rose-400" /> Notices
                </Link>
                <Link to="/timetable" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-400" /> Timetable
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-white">{user?.name}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">{user?.role?.replace('ROLE_', '')}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-slate-800 hover:bg-rose-600/20 hover:text-rose-400 text-slate-300 rounded-xl border border-slate-700 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/" className="text-slate-300 hover:text-white text-xs font-bold px-3 py-2">Home</Link>
                <Link to="/notices" className="text-slate-300 hover:text-white text-xs font-bold px-3 py-2">Notices</Link>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" /> ERP Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
