import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { ChevronDown, ArrowLeft, FileDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- 1. Mock Data ---

// Data for Bar Chart (Attendance Tracking)
const barData = [
  { name: 'Mon', count: 40 },
  { name: 'Tue', count: 65 },
  { name: 'Wed', count: 50 },
  { name: 'Thu', count: 80 },
  { name: 'Fri', count: 70 },
  { name: 'Sat', count: 55 },
];

// Data for Pie Chart (Paid vs. Non paid)
const pieData = [
  { name: 'Paid', value: 720, color: '#3b82f6' }, // Blue-500
  { name: 'Non Paid', value: 780, color: '#e5e7eb' }, // Gray-200
];
const RADIAN = Math.PI / 180;

// Data for Line Chart (Progress of Attendance)
const lineData = [
  { name: 'E:41', value: 400 },
  { name: 'E:42', value: 500 },
  { name: 'E:43', value: 450 },
  { name: 'E:44', value: 650 },
  { name: 'E:45', value: 550 },
  { name: 'E:46', value: 700 },
  { name: 'E:47', value: 600 },
  { name: 'E:48', value: 800 },
];

// --- 2. Component Functions ---

// Stat Card Component
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

// Custom Label for Pie Chart (Optional, for center text)
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  if (index === 0) return null; // Only show one label if needed, or remove this function if simple

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// --- 3. Main Component ---
const AttendanceReport = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/attendance');
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={handleBackClick}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[var(--color-inactive)] transition-colors mr-3"
          >
            <ArrowLeft className="h-5 w-5 text-[var(--color-primary)]" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-1">Attendance Report</h1>
            <p className="text-[var(--color-secondary)]">Detailed analytics and insights</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 bg-[var(--color-primary)] text-[var(--color-font-main)] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
          <FileDown className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Members"
          value="1,500"
          highlight={{ bg: 'bg-green-100', text: 'text-green-700', content: 'Active' }}
        />
        <StatCard
          title="This Month Attendance"
          value="720"
          highlight={{ bg: 'bg-blue-100', text: 'text-blue-700', content: '+18%' }}
        />
        <StatCard
          title="Pending Payments"
          value="78"
          highlight={{ bg: 'bg-orange-100', text: 'text-orange-700', content: '3 overdue' }}
        />
      </div>

      {/* Charts Section */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">Analytics Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart 1: Attendance Tracking (Bar Chart) */}
          <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] shadow-sm p-6">
            <h3 className="text-lg font-medium text-[var(--color-primary)] mb-4">Attendance Tracking</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="name" stroke="var(--color-secondary)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-main)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" barSize={30} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Paid Vs. Non paid (Pie Chart) */}
          <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] shadow-sm p-6">
            <h3 className="text-lg font-medium text-[var(--color-primary)] mb-4">Payment Status</h3>
            <div className="h-64 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-main)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-[var(--color-secondary)]">Paid</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-sm text-[var(--color-secondary)]">Not Paid</span>
              </div>
            </div>
          </div>

          {/* Chart 3: Progress of attendance (Line Chart) */}
          <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] shadow-sm p-6">
            <h3 className="text-lg font-medium text-[var(--color-primary)] mb-4">Attendance Progress</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--color-secondary)" 
                    tickLine={false} 
                    axisLine={false} 
                    fontSize={10}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-main)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4f46e5" 
                    strokeWidth={2} 
                    dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#4f46e5' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Report Filters Section */}
      <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] shadow-sm p-6">
        <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">Report Filters</h2>
        <div className="flex flex-col lg:flex-row items-start lg:items-end space-y-4 lg:space-y-0 lg:space-x-6">
          
          {/* Time Range Filter */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="time-range" className="text-[var(--color-primary)] text-sm font-medium">Time Range</label>
            <div className="relative">
              <select 
                id="time-range" 
                className="block w-64 appearance-none bg-[var(--color-main)] border border-[var(--color-border)] py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-[var(--color-primary)]"
                defaultValue="April 24, 2024 - May 24, 2025"
              >
                <option>April 24, 2024 - May 24, 2025</option>
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
              <ChevronDown className="h-4 w-4 text-[var(--color-secondary)] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          
          {/* Trainer Filter */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="trainer" className="text-[var(--color-primary)] text-sm font-medium">Trainer</label>
            <div className="relative">
              <select 
                id="trainer" 
                className="block w-40 appearance-none bg-[var(--color-inactive)] border border-[var(--color-border)] py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-[var(--color-primary)]"
                defaultValue="All Trainers"
              >
                <option>All Trainers</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Mike Johnson</option>
              </select>
              <ChevronDown className="h-4 w-4 text-[var(--color-secondary)] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="bg-[var(--color-primary)] text-[var(--color-font-main)] px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Generate Report
            </button>
            <div className="relative">
              <button className="flex items-center bg-[var(--color-main)] border border-[var(--color-border)] text-[var(--color-primary)] px-6 py-2 rounded-lg font-medium hover:bg-[var(--color-inactive)] transition-colors">
                Export As
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              {/* Dropdown content would go here, hidden by default */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;