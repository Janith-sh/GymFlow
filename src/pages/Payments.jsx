import React, { useState } from 'react';
import { Plus, Download, Eye } from 'lucide-react';

const Payments = () => {
  // Sample payment data
  const [payments, setPayments] = useState([
    {
      id: 1,
      member: 'Janith Shan',
      plan: 'Yearly',
      amount: 999,
      method: 'Card',
      date: '2025-10-08',
      status: 'Completed',
    },
    {
      id: 2,
      member: 'Dineth',
      plan: '3months',
      amount: 499,
      method: 'Cash',
      date: '2025-10-07',
      status: 'Completed',
    },
    {
      id: 3,
      member: 'Pubudu',
      plan: '6months',
      amount: 149,
      method: 'Online',
      date: '2025-10-06',
      status: 'Completed',
    },
    {
      id: 4,
      member: 'Dilini',
      plan: 'Yearly',
      amount: 999,
      method: 'Card',
      date: '2025-10-05',
      status: 'Pending',
    },
  ]);

  const [showRecordModal, setShowRecordModal] = useState(false);

  // Calculate summary statistics
  const totalRevenue = payments
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const thisMonthRevenue = payments
    .filter(p => {
      const paymentDate = new Date(p.date);
      const now = new Date();
      return paymentDate.getMonth() === now.getMonth() && 
             paymentDate.getFullYear() === now.getFullYear() &&
             p.status === 'Completed';
    })
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = payments.filter(p => p.status === 'Pending');
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  // Calculate percentage change (mock data for now)
  const monthlyPercentageChange = 18;

  const handleExport = () => {
    // Export functionality - could be CSV, PDF, etc.
    console.log('Exporting payment data...');
    alert('Export functionality will be implemented');
  };

  const handleViewPayment = (payment) => {
    console.log('Viewing payment:', payment);
    alert(`Viewing payment details for ${payment.member}`);
  };

  const handleRecordPayment = () => {
    setShowRecordModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Payment Management</h1>
        <p className="text-[var(--color-secondary)] mt-1">Track and manage all financial transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue Card */}
        <div className="bg-[var(--color-main)] rounded-lg p-6 border border-[var(--color-border)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-secondary)] mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-[var(--color-primary)]">LKR{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
              LKR
            </div>
          </div>
        </div>

        {/* This Month Card */}
        <div className="bg-[var(--color-main)] rounded-lg p-6 border border-[var(--color-border)]">
          <div>
            <p className="text-sm text-[var(--color-secondary)] mb-1">This Month</p>
            <p className="text-2xl font-bold text-[var(--color-primary)]">LKR{thisMonthRevenue.toLocaleString()}</p>
            <div className="mt-2">
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                +{monthlyPercentageChange}%
              </span>
            </div>
          </div>
        </div>

        {/* Pending Payments Card */}
        <div className="bg-[var(--color-main)] rounded-lg p-6 border border-[var(--color-border)]">
          <div>
            <p className="text-sm text-[var(--color-secondary)] mb-1">Pending Payments</p>
            <p className="text-2xl font-bold text-[var(--color-primary)]">LKR{pendingAmount}</p>
            <p className="text-xs text-[var(--color-secondary)] mt-2">{pendingPayments.length} payments</p>
          </div>
        </div>
      </div>

      {/* Payment History Section */}
      <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)]">
        {/* Table Header with Actions */}
        <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[var(--color-primary)]">Payment History</h2>
          <div className="flex gap-3">
            <button
              onClick={handleRecordPayment}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-font-main)] rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Record Payment</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-main)] border border-[var(--color-border)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-inactive)] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left p-4 text-sm font-medium text-[var(--color-secondary)]">Member</th>
                <th className="text-left p-4 text-sm font-medium text-[var(--color-secondary)]">Plan</th>
                <th className="text-left p-4 text-sm font-medium text-[var(--color-secondary)]">Amount (LKR)</th>
                <th className="text-left p-4 text-sm font-medium text-[var(--color-secondary)]">Method</th>
                <th className="text-left p-4 text-sm font-medium text-[var(--color-secondary)]">Date</th>
                <th className="text-left p-4 text-sm font-medium text-[var(--color-secondary)]">Status</th>
                <th className="text-left p-4 text-sm font-medium text-[var(--color-secondary)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-background)] transition-colors">
                  <td className="p-4 text-sm text-[var(--color-primary)]">{payment.member}</td>
                  <td className="p-4 text-sm text-[var(--color-primary)]">{payment.plan}</td>
                  <td className="p-4 text-sm text-[var(--color-primary)]">{payment.amount}</td>
                  <td className="p-4 text-sm text-[var(--color-primary)]">{payment.method}</td>
                  <td className="p-4 text-sm text-[var(--color-primary)]">{payment.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'Completed'
                          ? 'bg-[var(--color-primary)] text-[var(--color-font-main)]'
                          : 'bg-[var(--color-inactive)] text-[var(--color-secondary)]'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewPayment(payment)}
                      className="text-sm text-[var(--color-primary)] hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal (Simple placeholder) */}
      {showRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[var(--color-main)] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-4">Record New Payment</h3>
            <p className="text-[var(--color-secondary)] mb-4">Payment recording form will be implemented here.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRecordModal(false)}
                className="px-4 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] hover:bg-[var(--color-inactive)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRecordModal(false);
                  alert('Payment recorded successfully!');
                }}
                className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-font-main)] rounded-lg hover:opacity-90 transition-opacity"
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;