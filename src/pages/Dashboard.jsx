import React from 'react';
import { Users, UserCheck, DollarSign, TrendingUp, TrendingDown, Clock, CreditCard, Calendar, Plus, FileText, Settings as SettingsIcon, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Sample data for the chart
  const chartData = [
    { month: 'Jan', members: 35000, revenue: 30000 },
    { month: 'Feb', members: 37000, revenue: 32000 },
    { month: 'Mar', members: 39000, revenue: 35000 },
    { month: 'Apr', members: 42000, revenue: 38000 },
    { month: 'May', members: 45000, revenue: 42000 },
    { month: 'Jun', members: 48000, revenue: 45000 }
  ];

  // Weekly attendance data
  const weeklyAttendanceData = [
    { day: 'Mon', attendance: 180 },
    { day: 'Tue', attendance: 160 },
    { day: 'Wed', attendance: 200 },
    { day: 'Thu', attendance: 175 },
    { day: 'Fri', attendance: 220 },
    { day: 'Sat', attendance: 250 },
    { day: 'Sun', attendance: 120 }
  ];

  // Membership plans data
  const membershipData = [
    { name: '3 Months', value: 450, color: '#3b82f6' },
    { name: '6 Months', value: 584, color: '#8b5cf6' },
    { name: 'Yearly', value: 200, color: '#ec4899' }
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      type: 'New member registered',
      description: 'Sarah Johnson',
      time: '5 min ago',
      icon: Users,
      iconColor: 'text-green-600'
    },
    {
      id: 2,
      type: 'Payment received',
      description: 'Michael Chen',
      time: '12 min ago',
      icon: CreditCard,
      iconColor: 'text-blue-600'
    },
    {
      id: 3,
      type: 'Class booking',
      description: 'Yoga Session - Emma Wilson',
      time: '23 min ago',
      icon: Calendar,
      iconColor: 'text-purple-600'
    },
    {
      id: 4,
      type: 'Membership renewed',
      description: 'David Brown',
      time: '1 hour ago',
      icon: Clock,
      iconColor: 'text-orange-600'
    },
    {
      id: 5,
      type: 'Trainer assigned',
      description: 'Alex Rodriguez to John Doe',
      time: '2 hours ago',
      icon: UserCheck,
      iconColor: 'text-indigo-600'
    }
  ];

  // Dashboard metrics
  const metrics = [
    {
      title: 'Total Members',
      value: '1,234',
      icon: Users,
      change: '+17%',
      isPositive: true,
      color: 'text-blue-600'
    },
    {
      title: 'Active Trainers',
      value: '24',
      icon: UserCheck,
      change: '+2',
      isPositive: true,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,231',
      icon: DollarSign,
      change: '+18%',
      isPositive: true,
      color: 'text-emerald-600'
    },
    {
      title: 'Attendance Rate',
      value: '87%',
      icon: TrendingUp,
      change: '-3%',
      isPositive: false,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex space-x-3">
            <Link
              to="/members"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Link>
            <Link
              to="/reports"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </Link>
            <Link
              to="/settings"
              className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <SettingsIcon className="w-4 h-4 mr-2" />
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${metric.color} bg-opacity-10`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                metric.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.isPositive ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {metric.change}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue & Members Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Revenue & Members</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="members" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                name="members"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                name="revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Attendance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Attendance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAttendanceData}>
                <XAxis 
                  dataKey="day" 
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar 
                  dataKey="attendance" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Membership Plans */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Membership Plans</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={membershipData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {membershipData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {membershipData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            <Link 
              to="/reports" 
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${activity.iconColor} bg-opacity-10 flex-shrink-0`}>
                  <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/members"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
          >
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Manage Members</p>
              <p className="text-sm text-gray-600">Add, edit, or view members</p>
            </div>
          </Link>
          
          <Link
            to="/trainers"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
          >
            <UserCheck className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Manage Trainers</p>
              <p className="text-sm text-gray-600">View trainer schedules</p>
            </div>
          </Link>
          
          <Link
            to="/attendance"
            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
          >
            <Calendar className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Track Attendance</p>
              <p className="text-sm text-gray-600">Monitor member check-ins</p>
            </div>
          </Link>
          
          <Link
            to="/payments"
            className="flex items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors group"
          >
            <CreditCard className="w-8 h-8 text-emerald-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Payment Management</p>
              <p className="text-sm text-gray-600">Process payments</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;