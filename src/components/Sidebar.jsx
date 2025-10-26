import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserRound,
  CreditCard,
  ClipboardCheck,
  CalendarDays,
  BarChart3,
  MessageSquare,
  Settings,
  UserCircle,
  LogOut,
} from 'lucide-react';

// Main navigation items
const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Members', icon: Users, path: '/members' },
  { name: 'Trainers', icon: UserRound, path: '/trainers' },
  { name: 'Payments', icon: CreditCard, path: '/payments' },
  { name: 'Attendance', icon: ClipboardCheck, path: '/attendance' },
  { name: 'Schedule', icon: CalendarDays, path: '/schedule' },
  { name: 'Reports', icon: BarChart3, path: '/reports' },
  { name: 'Feedback', icon: MessageSquare, path: '/feedback' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user data (if you add localStorage later)
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen flex flex-col border-r border-[var(--color-border)] bg-[var(--color-main)] overflow-hidden z-10">
      {/* Top section: Logo and Nav */}
      <div className="flex-1">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 p-4">
          <div className="p-2 rounded-lg bg-[var(--color-primary)]">
            <img src="/logo.png" alt="BlueFeathers" className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-[var(--color-primary)]">BlueFeathers</h1>
            <p className="text-sm text-[var(--color-secondary)]">admin</p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="mt-6 px-2">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                    isActive 
                      ? 'bg-[var(--color-primary)] text-[var(--color-font-main)]' 
                      : 'text-[var(--color-secondary)] hover:bg-[var(--color-inactive)]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Bottom section: User and Logout */}
      <div className="p-4">
        <div className="border-t mb-4 border-[var(--color-inactive)]"></div>
        
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-4">
          <UserCircle className="w-10 h-10 text-[var(--color-secondary)]" />
          <div>
            <p className="text-sm font-medium text-[var(--color-primary)]">Bhathiya Kulathunga</p>
            <p className="text-xs text-[var(--color-secondary)]">Admin</p>
          </div>
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 w-full p-2 rounded-lg border bg-[var(--color-inactive)] text-[var(--color-secondary)] border-[var(--color-inactive)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-font-main)] transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;