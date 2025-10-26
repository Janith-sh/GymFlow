import React, { useState, useEffect, useRef } from 'react';
import { Download, Calendar, User, TrendingUp, Users, Star, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for charts
const membershipData = [
  { month: 'Jan', growth: 20 },
  { month: 'Feb', growth: 35 },
  { month: 'Mar', growth: 45 },
  { month: 'Apr', growth: 30 },
  { month: 'May', growth: 50 },
  { month: 'Jun', growth: 40 },
  { month: 'Jul', growth: 60 },
  { month: 'Aug', growth: 55 },
];

const incomeExpenseData = [
  { name: 'Income', value: 65, color: '#3B82F6' },
  { name: 'Expenses', value: 35, color: '#E5E7EB' },
];

const trainerPerformanceData = [
  { name: 'B-01', performance: 4.2 },
  { name: 'B-02', performance: 4.5 },
  { name: 'B-03', performance: 4.3 },
  { name: 'B-04', performance: 4.7 },
  { name: 'B-05', performance: 4.4 },
  { name: 'B-06', performance: 4.6 },
  { name: 'B-07', performance: 4.5 },
  { name: 'B-08', performance: 4.8 },
];

const Reports = () => {
  const [timeRange, setTimeRange] = useState('April 24, 2024 - May 24, 2025');
  const [selectedTrainer, setSelectedTrainer] = useState('Trainer');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowExportDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Generate Report
  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log the filters being used
    console.log('Generating report with filters:', {
      timeRange,
      selectedTrainer
    });
    
    // Here you would typically make an API call to generate the report
    alert(`Report generated successfully!\n\nTime Range: ${timeRange}\nTrainer: ${selectedTrainer}`);
    
    setIsGenerating(false);
  };

  const metrics = [
    {
      title: 'Total Income',
      value: '45,231',
      currency: 'LKR',
      icon: <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-700"><DollarSign className="w-5 h-5" /></div>,
    },
    {
      title: 'Total Members',
      value: '120',
      icon: <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700"><Users className="w-5 h-5" /></div>,
    },
    {
      title: 'Trainer Performance',
      value: '4.5',
      icon: <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-700"><Star className="w-5 h-5" /></div>,
    },
    {
      title: 'Membership Growth',
      value: '25%',
      icon: <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-700"><TrendingUp className="w-5 h-5" /></div>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-2">Reports & Analytics</h1>
        <p className="text-[var(--color-secondary)]">Analyze performance and track growth</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-[var(--color-main)] p-6 rounded-lg border border-[var(--color-border)] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[var(--color-secondary)]">{metric.title}</h3>
              {metric.icon}
            </div>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-[var(--color-primary)]">{metric.value}</p>
              {metric.currency && (
                <span className="text-sm text-[var(--color-secondary)]">{metric.currency}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Membership Growth Chart */}
        <div className="lg:col-span-2 bg-[var(--color-main)] p-6 rounded-lg border border-[var(--color-border)] shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-6">Membership Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={membershipData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#717182" />
              <YAxis stroke="#717182" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #E5E5E5',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="growth" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Income Vs Expenses Chart */}
        <div className="bg-[var(--color-main)] p-6 rounded-lg border border-[var(--color-border)] shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-6">Income Vs. Expenses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={incomeExpenseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {incomeExpenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trainer Performance Chart */}
      <div className="bg-[var(--color-main)] p-6 rounded-lg border border-[var(--color-border)] shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-6">Trainer Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trainerPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#717182" />
            <YAxis stroke="#717182" domain={[4.0, 5.0]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #E5E5E5',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="performance" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Report Filters */}
      <div className="bg-[var(--color-main)] p-6 rounded-lg border border-[var(--color-border)] shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-6">Report Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Time Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-primary)] flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Time Range
            </label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-main)] text-[var(--color-primary)] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>April 24, 2024 - May 24, 2025</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>

          {/* Trainer */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-primary)] flex items-center">
              <User className="w-4 h-4 mr-2" />
              Trainer
            </label>
            <select
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-main)] text-[var(--color-primary)] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Trainer</option>
              <option>All Trainers</option>
              <option>Trainer A</option>
              <option>Trainer B</option>
              <option>Trainer C</option>
            </select>
          </div>

          {/* Generate Report Button */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-transparent">Generate</label>
            <button 
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className={`w-full px-4 py-2 bg-[var(--color-primary)] text-[var(--color-font-main)] rounded-lg font-medium hover:opacity-90 transition-opacity ${
                isGenerating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </button>
          </div>

          {/* Export As Button */}
          <div className="space-y-2 relative" ref={dropdownRef}>
            <label className="text-sm font-medium text-transparent">Export</label>
            <div className="relative">
              <button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                className="w-full px-4 py-2 bg-[var(--color-inactive)] text-[var(--color-primary)] rounded-lg font-medium hover:bg-[var(--color-secondary)] hover:text-[var(--color-font-main)] transition-colors flex items-center justify-center"
              >
                Export As
                <Download className="w-4 h-4 ml-2" />
              </button>
              
              {/* Dropdown Menu */}
              {showExportDropdown && (
                <div className="absolute top-full left-0 mt-2 w-full bg-[var(--color-main)] border border-[var(--color-border)] rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      setShowExportDropdown(false);
                      // Handle PDF export
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-[var(--color-primary)] hover:bg-[var(--color-inactive)] transition-colors rounded-t-lg"
                  >
                    Export as PDF
                  </button>
                  <button
                    onClick={() => {
                      setShowExportDropdown(false);
                      // Handle Excel export
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-[var(--color-primary)] hover:bg-[var(--color-inactive)] transition-colors rounded-b-lg"
                  >
                    Export as Excel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;