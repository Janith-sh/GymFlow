import React, { useState } from 'react';
import { Plus, Download, Eye, TrendingUp, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, Search, Filter } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [notification, setNotification] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

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

  // Filter payments based on search and status
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.plan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Show notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExport = () => {
    // Export functionality - could be CSV, PDF, etc.
    showNotification('Payment data exported successfully!', 'success');
    console.log('Exporting payment data...');
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setShowViewModal(true);
  };

  const handleRecordPayment = () => {
    setShowRecordModal(true);
  };

  const handleSavePayment = () => {
    setShowRecordModal(false);
    showNotification('Payment recorded successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg animate-slide-in ${
          notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
          <span className={`text-sm font-medium ${
            notification.type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}>
            {notification.message}
          </span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Payment Management</h1>
        <p className="text-[var(--color-secondary)] mt-1">Track and manage all financial transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue Card */}
        <div className="bg-[var(--color-main)] rounded-lg p-6 border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-green-50">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-[var(--color-secondary)]">Total Revenue</p>
              </div>
              <p className="text-3xl font-bold text-[var(--color-primary)] mb-1">
                LKR {totalRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-[var(--color-secondary)]">All time earnings</p>
            </div>
          </div>
        </div>

        {/* This Month Card */}
        <div className="bg-[var(--color-main)] rounded-lg p-6 border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-blue-50">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-[var(--color-secondary)]">This Month</p>
            </div>
            <p className="text-3xl font-bold text-[var(--color-primary)] mb-2">
              LKR {thisMonthRevenue.toLocaleString()}
            </p>
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +{monthlyPercentageChange}%
              </span>
              <span className="text-xs text-[var(--color-secondary)]">vs last month</span>
            </div>
          </div>
        </div>

        {/* Pending Payments Card */}
        <div className="bg-[var(--color-main)] rounded-lg p-6 border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-orange-50">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-[var(--color-secondary)]">Pending Payments</p>
            </div>
            <p className="text-3xl font-bold text-[var(--color-primary)] mb-1">
              LKR {pendingAmount.toLocaleString()}
            </p>
            <div className="flex items-center gap-2">
              <span className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                {pendingPayments.length} payment{pendingPayments.length !== 1 ? 's' : ''}
              </span>
              <span className="text-xs text-[var(--color-secondary)]">awaiting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History Section */}
      <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] shadow-sm">
        {/* Table Header with Actions */}
        <div className="p-6 border-b border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-semibold text-[var(--color-primary)]">Payment History</h2>
            
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-3 flex-1 md:max-w-2xl">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-secondary)]" />
                <input
                  type="text"
                  placeholder="Search by member or plan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              </div>
              
              {/* Filter Dropdown */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-secondary)] pointer-events-none" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleRecordPayment}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-font-main)] rounded-lg hover:opacity-90 transition-all hover:shadow-md active:scale-95"
                title="Record a new payment"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Record Payment</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-main)] border border-[var(--color-border)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-inactive)] transition-all active:scale-95"
                title="Export payment data"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>

          {/* Results Count */}
          {searchQuery || filterStatus !== 'All' ? (
            <div className="mt-4 text-sm text-[var(--color-secondary)]">
              Showing {filteredPayments.length} of {payments.length} payment{payments.length !== 1 ? 's' : ''}
            </div>
          ) : null}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
                <th className="text-left p-4 text-sm font-semibold text-[var(--color-primary)]">Member</th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--color-primary)]">Plan</th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--color-primary)]">Amount (LKR)</th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--color-primary)]">Method</th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--color-primary)]">Date</th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--color-primary)]">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--color-primary)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-background)] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-font-main)] flex items-center justify-center text-xs font-semibold">
                          {payment.member.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-[var(--color-primary)]">{payment.member}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-[var(--color-primary)]">{payment.plan}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-semibold text-[var(--color-primary)]">{payment.amount.toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--color-background)] text-[var(--color-primary)]">
                        {payment.method}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-[var(--color-secondary)]">{payment.date}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          payment.status === 'Completed'
                            ? 'bg-[var(--color-primary)] text-[var(--color-font-main)]'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {payment.status === 'Completed' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewPayment(payment)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-inactive)] rounded-lg transition-colors"
                        title="View payment details"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <AlertCircle className="w-12 h-12 text-[var(--color-secondary)] opacity-50" />
                      <p className="text-sm text-[var(--color-secondary)]">
                        No payments found matching your criteria
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setFilterStatus('All');
                        }}
                        className="text-sm text-[var(--color-primary)] hover:underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-main)] rounded-lg shadow-2xl max-w-md w-full mx-4 animate-scale-in">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h3 className="text-xl font-semibold text-[var(--color-primary)]">Record New Payment</h3>
              <p className="text-sm text-[var(--color-secondary)] mt-1">Add a new payment transaction</p>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Form fields placeholder */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                  Member Name
                </label>
                <input
                  type="text"
                  placeholder="Enter member name"
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                    Plan
                  </label>
                  <select className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent">
                    <option>Monthly</option>
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>Yearly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                    Amount (LKR)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                  Payment Method
                </label>
                <select className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent">
                  <option>Cash</option>
                  <option>Card</option>
                  <option>Online</option>
                </select>
              </div>
              
              <p className="text-xs text-[var(--color-secondary)] bg-blue-50 border border-blue-200 rounded-lg p-3">
                <strong>Note:</strong> Payment recording functionality will be fully implemented with backend integration.
              </p>
            </div>
            
            <div className="p-6 border-t border-[var(--color-border)] flex justify-end gap-3">
              <button
                onClick={() => setShowRecordModal(false)}
                className="px-4 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] hover:bg-[var(--color-inactive)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePayment}
                className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-font-main)] rounded-lg hover:opacity-90 transition-all hover:shadow-md active:scale-95"
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Payment Modal */}
      {showViewModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-main)] rounded-lg shadow-2xl max-w-md w-full mx-4 animate-scale-in">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h3 className="text-xl font-semibold text-[var(--color-primary)]">Payment Details</h3>
              <p className="text-sm text-[var(--color-secondary)] mt-1">Transaction ID: #{selectedPayment.id}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--color-secondary)] mb-1">Member</p>
                  <p className="text-sm font-semibold text-[var(--color-primary)]">{selectedPayment.member}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-secondary)] mb-1">Plan</p>
                  <p className="text-sm font-semibold text-[var(--color-primary)]">{selectedPayment.plan}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--color-secondary)] mb-1">Amount</p>
                  <p className="text-lg font-bold text-[var(--color-primary)]">LKR {selectedPayment.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-secondary)] mb-1">Method</p>
                  <p className="text-sm font-semibold text-[var(--color-primary)]">{selectedPayment.method}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--color-secondary)] mb-1">Date</p>
                  <p className="text-sm font-semibold text-[var(--color-primary)]">{selectedPayment.date}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-secondary)] mb-1">Status</p>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      selectedPayment.status === 'Completed'
                        ? 'bg-[var(--color-primary)] text-[var(--color-font-main)]'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {selectedPayment.status === 'Completed' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {selectedPayment.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-[var(--color-border)] flex justify-end">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedPayment(null);
                }}
                className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-font-main)] rounded-lg hover:opacity-90 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;