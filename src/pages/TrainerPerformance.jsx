import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter, Calendar, User, Dumbbell } from 'lucide-react';

// --- Mock Performance Data ---
const performanceData = [
  {
    trainerId: 1,
    trainerName: 'Alex Mitchell',
    avgFeedback: 4.8,
    sessionsCount: 45,
    attendanceRate: 92,
    classType: 'Strength & Conditioning',
    membersAssigned: 12,
  },
  {
    trainerId: 2,
    trainerName: 'Ayesha Fernando',
    avgFeedback: 4.6,
    sessionsCount: 38,
    attendanceRate: 88,
    classType: 'Weight Loss',
    membersAssigned: 15,
  },
  {
    trainerId: 3,
    trainerName: 'Marcus Davis',
    avgFeedback: 4.9,
    sessionsCount: 52,
    attendanceRate: 95,
    classType: 'CrossFit',
    membersAssigned: 18,
  },
  {
    trainerId: 4,
    trainerName: 'Sofia Patel',
    avgFeedback: 4.7,
    sessionsCount: 41,
    attendanceRate: 90,
    classType: 'Yoga',
    membersAssigned: 20,
  },
  {
    trainerId: 5,
    trainerName: 'Rohan Kumar',
    avgFeedback: 4.5,
    sessionsCount: 35,
    attendanceRate: 85,
    classType: 'HIIT',
    membersAssigned: 10,
  },
];

const feedbackTrendData = [
  { month: 'Jan', feedback: 4.3 },
  { month: 'Feb', feedback: 4.4 },
  { month: 'Mar', feedback: 4.5 },
  { month: 'Apr', feedback: 4.6 },
  { month: 'May', feedback: 4.7 },
  { month: 'Jun', feedback: 4.8 },
];

const sessionsPerTrainerData = performanceData.map(trainer => ({
  name: trainer.trainerName.split(' ')[0],
  sessions: trainer.sessionsCount,
}));

const classTypeDistribution = [
  { name: 'Strength & Conditioning', value: 25, color: '#0A0A0A' },
  { name: 'Weight Loss', value: 20, color: '#717182' },
  { name: 'CrossFit', value: 28, color: '#E5E5E5' },
  { name: 'Yoga', value: 18, color: '#ECECF0' },
  { name: 'HIIT', value: 15, color: '#F3F3F5' },
];

const TrainerPerformance = () => {
  const [trainers] = useState(performanceData);
  const [selectedTrainer, setSelectedTrainer] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedClassType, setSelectedClassType] = useState('all');
  // eslint-disable-next-line no-unused-vars
  const [chartType] = useState('bar');

  const filteredTrainers = trainers.filter(trainer => {
    if (selectedTrainer !== 'all' && trainer.trainerId !== parseInt(selectedTrainer)) {
      return false;
    }
    if (selectedClassType !== 'all' && trainer.classType !== selectedClassType) {
      return false;
    }
    return true;
  });

  const avgFeedback = (filteredTrainers.reduce((sum, t) => sum + t.avgFeedback, 0) / filteredTrainers.length).toFixed(1);
  const totalSessions = filteredTrainers.reduce((sum, t) => sum + t.sessionsCount, 0);
  const avgAttendance = (filteredTrainers.reduce((sum, t) => sum + t.attendanceRate, 0) / filteredTrainers.length).toFixed(1);
  const totalMembers = filteredTrainers.reduce((sum, t) => sum + t.membersAssigned, 0);

  const exportPDF = () => {
    alert('PDF export functionality would be integrated with a library like jsPDF or html2pdf');
  };

  const exportExcel = () => {
    alert('Excel export functionality would be integrated with a library like xlsx');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
          Trainer Performance Summary
        </h1>
        <p className="text-(--color-secondary)">Monitor trainer KPIs and performance metrics</p>
      </div>

      {/* Filter Section */}
      <div className="bg-(--color-main) rounded-lg shadow-sm border border-(--color-border) p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-(--color-primary)" />
          <h3 className="text-lg font-semibold text-(--color-primary)">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-(--color-primary) mb-2">
              Start Date
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-(--color-secondary)" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
              End Date
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--color-secondary)]" />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Trainer Filter */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
              Trainer
            </label>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--color-secondary)]" />
              <select
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
                className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="all">All Trainers</option>
                {trainers.map(trainer => (
                  <option key={trainer.trainerId} value={trainer.trainerId}>
                    {trainer.trainerName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Class Type Filter */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
              Class Type
            </label>
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-[var(--color-secondary)]" />
              <select
                value={selectedClassType}
                onChange={(e) => setSelectedClassType(e.target.value)}
                className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="all">All Classes</option>
                <option value="Strength & Conditioning">Strength & Conditioning</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="CrossFit">CrossFit</option>
                <option value="Yoga">Yoga</option>
                <option value="HIIT">HIIT</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Average Feedback */}
        <div className="bg-[var(--color-main)] rounded-lg shadow-sm border border-[var(--color-border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-secondary)]">Avg Feedback Rating</h3>
            <div className="w-10 h-10 rounded-full bg-[var(--color-inactive)] flex items-center justify-center">
              <span className="text-lg">⭐</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--color-primary)]">{avgFeedback}</p>
          <p className="text-xs text-[var(--color-secondary)] mt-2">Out of 5.0</p>
        </div>

        {/* Sessions Conducted */}
        <div className="bg-[var(--color-main)] rounded-lg shadow-sm border border-[var(--color-border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-secondary)]">Sessions Conducted</h3>
            <div className="w-10 h-10 rounded-full bg-[var(--color-inactive)] flex items-center justify-center">
              <span className="text-lg">📊</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--color-primary)]">{totalSessions}</p>
          <p className="text-xs text-[var(--color-secondary)] mt-2">This period</p>
        </div>

        {/* Attendance Rate */}
        <div className="bg-[var(--color-main)] rounded-lg shadow-sm border border-[var(--color-border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-secondary)]">Avg Attendance Rate</h3>
            <div className="w-10 h-10 rounded-full bg-[var(--color-inactive)] flex items-center justify-center">
              <span className="text-lg">📈</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--color-primary)]">{avgAttendance}%</p>
          <p className="text-xs text-[var(--color-secondary)] mt-2">Member attendance</p>
        </div>

        {/* Total Members */}
        <div className="bg-[var(--color-main)] rounded-lg shadow-sm border border-[var(--color-border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-secondary)]">Members Assigned</h3>
            <div className="w-10 h-10 rounded-full bg-[var(--color-inactive)] flex items-center justify-center">
              <span className="text-lg">👥</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--color-primary)]">{totalMembers}</p>
          <p className="text-xs text-[var(--color-secondary)] mt-2">Active members</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions Per Trainer Chart */}
        <div className="bg-[var(--color-main)] rounded-lg shadow-sm border border-[var(--color-border)] p-6">
          <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">Sessions Per Trainer</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sessionsPerTrainerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--color-primary)' }} />
              <YAxis tick={{ fill: 'var(--color-primary)' }} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-main)', border: '1px solid var(--color-border)' }} />
              <Bar dataKey="sessions" fill="#0A0A0A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Feedback Trend Chart */}
        <div className="bg-[var(--color-main)] rounded-lg shadow-sm border border-[var(--color-border)] p-6">
          <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">Feedback Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={feedbackTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--color-primary)' }} />
              <YAxis tick={{ fill: 'var(--color-primary)' }} domain={[4, 5]} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-main)', border: '1px solid var(--color-border)' }} />
              <Line type="monotone" dataKey="feedback" stroke="#0A0A0A" strokeWidth={3} dot={{ fill: '#0A0A0A', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Class Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-[var(--color-main)] rounded-lg shadow-sm border border-[var(--color-border)] p-6">
          <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">Class Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={classTypeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#0A0A0A"
                dataKey="value"
              >
                {classTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-main)', border: '1px solid var(--color-border)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Table */}
        <div className="lg:col-span-2 bg-[var(--color-main)] rounded-lg shadow-sm border border-[var(--color-border)] p-6">
          <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">Detailed Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="px-4 py-3 text-left font-semibold text-[var(--color-primary)]">Trainer</th>
                  <th className="px-4 py-3 text-left font-semibold text-[var(--color-primary)]">Feedback</th>
                  <th className="px-4 py-3 text-left font-semibold text-[var(--color-primary)]">Sessions</th>
                  <th className="px-4 py-3 text-left font-semibold text-[var(--color-primary)]">Attendance</th>
                  <th className="px-4 py-3 text-left font-semibold text-[var(--color-primary)]">Members</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainers.map((trainer, index) => (
                  <tr key={index} className="border-b border-[var(--color-border)] hover:bg-[var(--color-inactive)] transition-colors">
                    <td className="px-4 py-3 text-[var(--color-primary)] font-medium">{trainer.trainerName}</td>
                    <td className="px-4 py-3 text-[var(--color-primary)]">⭐ {trainer.avgFeedback}</td>
                    <td className="px-4 py-3 text-[var(--color-primary)]">{trainer.sessionsCount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        trainer.attendanceRate >= 90
                          ? 'bg-[var(--color-primary)] text-[var(--color-main)]'
                          : trainer.attendanceRate >= 85
                          ? 'bg-[var(--color-inactive)] text-[var(--color-primary)]'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {trainer.attendanceRate}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-primary)]">{trainer.membersAssigned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-[var(--color-main)] rounded-lg shadow-sm border border-[var(--color-border)] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">Export Report</h3>
            <p className="text-sm text-[var(--color-secondary)]">Download performance metrics in your preferred format</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-main)] rounded-lg hover:opacity-90 transition-opacity"
            >
              <Download className="w-5 h-5" />
              Export as PDF
            </button>
            <button
              onClick={exportExcel}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-main)] rounded-lg hover:opacity-90 transition-opacity"
            >
              <Download className="w-5 h-5" />
              Export as Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerPerformance;
