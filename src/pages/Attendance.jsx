import React from 'react';
import { Edit3, FileText } from 'lucide-react';

// --- Data Structure for the Table (Mock Data) ---
const attendanceData = [
  {
    trackingID: '#20462',
    member: 'Matt Dickerson',
    date: '13/05/2022',
    inTime: '6.00 am',
    paymentDate: '22/05/2022',
    status: 'paid',
  },
  {
    trackingID: '#18933',
    member: 'Wiktoria',
    date: '22/05/2022',
    inTime: '6.30 am',
    paymentDate: '22/05/2022',
    status: 'paid',
  },
  {
    trackingID: '#45169',
    member: 'Trixie Byrd',
    date: '15/06/2022',
    inTime: '7.00 am',
    paymentDate: '22/05/2022',
    status: 'delay',
  },
  {
    trackingID: '#34304',
    member: 'Brad Mason',
    date: '06/09/2022',
    inTime: '7.15 am',
    paymentDate: '22/05/2022',
    status: 'delay',
  },
  {
    trackingID: '#17188',
    member: 'Sanderson',
    date: '25/09/2022',
    inTime: '7.20 am',
    paymentDate: '22/05/2022',
    status: 'not paid',
  },
  {
    trackingID: '#73003',
    member: 'Jun Redfern',
    date: '04/10/2022',
    inTime: '7.40 am',
    paymentDate: '22/05/2022',
    status: 'paid',
  },{
    trackingID: '#34304',
    member: 'Brad Mason',
    date: '06/09/2022',
    inTime: '7.15 am',
    paymentDate: '22/05/2022',
    status: 'delay',
  },
  {
    trackingID: '#17188',
    member: 'Sanderson',
    date: '25/09/2022',
    inTime: '7.20 am',
    paymentDate: '22/05/2022',
    status: 'not paid',
  },
  {
    trackingID: '#73003',
    member: 'Jun Redfern',
    date: '04/10/2022',
    inTime: '7.40 am',
    paymentDate: '22/05/2022',
    status: 'paid',
  },
];

// --- Utility function for status styles ---
const getStatusStyles = (status) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-700';
    case 'delay':
      return 'bg-yellow-100 text-yellow-700';
    case 'not paid':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-[var(--color-inactive)] text-[var(--color-secondary)]';
  }
};

// --- Stat Card Component ---
const StatCard = ({ title, value, subValue, highlight }) => (
  <div className="p-6 bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] shadow-sm">
    <p className="text-[var(--color-secondary)] text-sm font-medium">{title}</p>
    <div className="flex items-end justify-between mt-2">
      <p className="text-2xl font-bold text-[var(--color-primary)]">{value}</p>
      {highlight && (
        <span className={`px-2 py-1 text-xs font-medium rounded-md ${highlight.bg} ${highlight.text}`}>
          {highlight.content}
        </span>
      )}
      {subValue && <span className="text-xl font-semibold text-green-600 ml-2">{subValue}</span>}
    </div>
  </div>
);

const Attendance = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-2">Attendance Tracking</h1>
          <p className="text-[var(--color-secondary)]">Track and manage all attendance of members</p>
        </div>
        <button className="flex items-center space-x-2 bg-[var(--color-primary)] text-[var(--color-font-main)] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
          <FileText className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Members */}
        <StatCard
          title="Total Members"
          value="1,500"
          highlight={{ bg: 'bg-green-100', text: 'text-green-700', content: 'Active' }}
        />

        {/* Card 2: This Month */}
        <StatCard
          title="This Month Attendance"
          value="720"
          highlight={{ bg: 'bg-blue-100', text: 'text-blue-700', content: '+18%' }}
        />

        {/* Card 3: Pending Payments */}
        <StatCard
          title="Pending Payments"
          value="78"
          highlight={{ bg: 'bg-orange-100', text: 'text-orange-700', content: '3 overdue' }}
        />
      </div>

      {/* Attendance Table Section */}
      <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--color-border)]">
            <thead className="bg-[var(--color-inactive)]">
              <tr>
                {['Tracking ID', 'Member', 'Date', 'In Time', 'Payment Date', 'Status', 'Action'].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {attendanceData.map((row) => (
                <tr key={row.trackingID} className="hover:bg-[var(--color-background)] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-primary)]">
                    {row.trackingID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-primary)]">
                    {row.member}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-secondary)]">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-secondary)]">
                    {row.inTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-secondary)]">
                    {row.paymentDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] focus:outline-none transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center py-4 border-t border-[var(--color-border)] bg-[var(--color-background)]">
          <nav className="flex items-center space-x-1" aria-label="Pagination">
            <button className="px-3 py-2 text-sm font-medium text-[var(--color-secondary)] bg-[var(--color-main)] border border-[var(--color-border)] rounded-l-md hover:bg-[var(--color-inactive)] transition-colors">
              Previous
            </button>
            <button className="px-3 py-2 text-sm font-medium text-[var(--color-font-main)] bg-[var(--color-primary)] border border-[var(--color-primary)]">
              1
            </button>
            <button className="px-3 py-2 text-sm font-medium text-[var(--color-secondary)] bg-[var(--color-main)] border border-[var(--color-border)] hover:bg-[var(--color-inactive)] transition-colors">
              2
            </button>
            <button className="px-3 py-2 text-sm font-medium text-[var(--color-secondary)] bg-[var(--color-main)] border border-[var(--color-border)] hover:bg-[var(--color-inactive)] transition-colors">
              3
            </button>
            <button className="px-3 py-2 text-sm font-medium text-[var(--color-secondary)] bg-[var(--color-main)] border border-[var(--color-border)] rounded-r-md hover:bg-[var(--color-inactive)] transition-colors">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Attendance;