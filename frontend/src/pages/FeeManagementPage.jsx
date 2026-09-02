import React, { useState, useEffect } from 'react';
import { feeApi } from '../api/modules';
import { DollarSign, Plus, CheckCircle2, CreditCard, Receipt, Calendar, X } from 'lucide-react';

export default function FeeManagementPage() {
  const [feeStructures, setFeeStructures] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);

  const [feeForm, setFeeForm] = useState({
    classId: 1,
    feeType: 'Tuition Fee Q2',
    amount: 12000,
    dueDate: '2026-10-31',
    description: 'Quarter 2 Tuition Fee'
  });

  const [payForm, setPayForm] = useState({
    personId: 3,
    studentName: 'Student One',
    feeStructureId: 1,
    amountPaid: 12000,
    paymentMode: 'ONLINE',
    transactionId: 'TXN-' + Math.floor(100000 + Math.random() * 900000),
    status: 'PAID'
  });

  const loadFeeData = async () => {
    setLoading(true);
    try {
      const [structRes, payRes] = await Promise.all([
        feeApi.getStructures(),
        feeApi.getAllPayments()
      ]);
      setFeeStructures(structRes.data || []);
      setPayments(payRes.data || []);
    } catch (err) {
      console.error('Failed to load fee data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeeData();
  }, []);

  const handleCreateStructure = async (e) => {
    e.preventDefault();
    try {
      await feeApi.createStructure(feeForm);
      setShowFeeModal(false);
      loadFeeData();
    } catch (err) {
      console.error('Failed to create fee structure', err);
    }
  };

  const handleRecordPayment = async (e) => {
    e.preventDefault();
    try {
      await feeApi.recordPayment(payForm);
      setShowPayModal(false);
      loadFeeData();
    } catch (err) {
      console.error('Failed to record payment', err);
    }
  };

  const totalCollected = payments.reduce((sum, p) => sum + (p.amountPaid || 0), 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <DollarSign className="w-7 h-7 text-emerald-400" />
            Fee & Payment Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure fee structures, track dues, and record student tuition payments.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowFeeModal(true)}
            className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Fee Structure
          </button>
          <button
            onClick={() => setShowPayModal(true)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
          >
            <Receipt className="w-4 h-4" /> Record Payment
          </button>
        </div>
      </div>

      {/* Summary Widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-lg">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Collected</p>
          <p className="text-3xl font-black text-emerald-400 mt-1">${totalCollected.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-lg">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Transactions</p>
          <p className="text-3xl font-black text-blue-400 mt-1">{payments.length}</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-lg">
          <p className="text-xs font-bold text-slate-400 uppercase">Active Fee Categories</p>
          <p className="text-3xl font-black text-violet-400 mt-1">{feeStructures.length}</p>
        </div>
      </div>

      {/* Fee Structures Grid */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white">Class Fee Structures</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {feeStructures.map((fs) => (
            <div key={fs.feeStructureId} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-bold uppercase">
                  Class {fs.classId}
                </span>
                <span className="text-xs text-slate-400 font-medium">Due: {fs.dueDate}</span>
              </div>
              <h4 className="text-base font-bold text-white">{fs.feeType}</h4>
              <p className="text-2xl font-extrabold text-emerald-400">${fs.amount.toLocaleString()}</p>
              <p className="text-xs text-slate-400">{fs.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white">Payment Transactions & Receipts</h3>
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">Loading fee payment records...</div>
          ) : payments.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-700 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Txn ID</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Amount Paid</th>
                  <th className="p-4">Mode</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-sm">
                {payments.map((p) => (
                  <tr key={p.paymentId} className="hover:bg-slate-700/40 transition">
                    <td className="p-4 font-mono text-xs text-slate-400">{p.transactionId || `#PAY-${p.paymentId}`}</td>
                    <td className="p-4 font-bold text-white">{p.studentName || `Student #${p.personId}`}</td>
                    <td className="p-4 font-extrabold text-emerald-400">${p.amountPaid.toLocaleString()}</td>
                    <td className="p-4 text-xs font-semibold text-slate-300">{p.paymentMode}</td>
                    <td className="p-4 text-xs text-slate-400">{p.paymentDate}</td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-slate-400">No payment transactions recorded yet.</div>
          )}
        </div>
      </div>

      {/* Add Fee Structure Modal */}
      {showFeeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h3 className="text-lg font-bold text-white">Create Fee Structure</h3>
              <button onClick={() => setShowFeeModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStructure} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Class</label>
                <select
                  value={feeForm.classId}
                  onChange={(e) => setFeeForm({ ...feeForm, classId: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                >
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Fee Type</label>
                <input
                  type="text"
                  required
                  value={feeForm.feeType}
                  onChange={(e) => setFeeForm({ ...feeForm, feeType: e.target.value })}
                  placeholder="Tuition / Transport / Exam"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Amount ($)</label>
                  <input
                    type="number"
                    required
                    value={feeForm.amount}
                    onChange={(e) => setFeeForm({ ...feeForm, amount: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Due Date</label>
                  <input
                    type="date"
                    value={feeForm.dueDate}
                    onChange={(e) => setFeeForm({ ...feeForm, dueDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Description</label>
                <input
                  type="text"
                  value={feeForm.description}
                  onChange={(e) => setFeeForm({ ...feeForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowFeeModal(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-xl text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold"
                >
                  Save Structure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h3 className="text-lg font-bold text-white">Record Fee Payment</h3>
              <button onClick={() => setShowPayModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  value={payForm.studentName}
                  onChange={(e) => setPayForm({ ...payForm, studentName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Amount ($)</label>
                  <input
                    type="number"
                    required
                    value={payForm.amountPaid}
                    onChange={(e) => setPayForm({ ...payForm, amountPaid: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Mode</label>
                  <select
                    value={payForm.paymentMode}
                    onChange={(e) => setPayForm({ ...payForm, paymentMode: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  >
                    <option value="ONLINE">ONLINE</option>
                    <option value="CASH">CASH</option>
                    <option value="CARD">CARD</option>
                    <option value="CHEQUE">CHEQUE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Transaction Ref ID</label>
                <input
                  type="text"
                  value={payForm.transactionId}
                  onChange={(e) => setPayForm({ ...payForm, transactionId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPayModal(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-xl text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold"
                >
                  Submit Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
