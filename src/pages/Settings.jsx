import React, { useState } from 'react';
import {
  Bell,
  Lock,
  User,
  Palette,
  LogOut,
  Eye,
  EyeOff,
  Check,
  X,
  Save,
  RotateCcw,
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    gymName: 'FitFlow Gym',
    email: 'admin@fitflow.com',
    phone: '+1 (555) 123-4567',
    timezone: 'UTC-5',
    language: 'English',
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    memberAlerts: true,
    paymentReminders: true,
    classNotifications: true,
    pushNotifications: false,
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
  });

  // Theme Settings
  const [themeSettings, setThemeSettings] = useState({
    theme: 'light',
    accentColor: '#0A0A0A',
  });

  const handleGeneralChange = (field, value) => {
    setGeneralSettings({ ...generalSettings, [field]: value });
  };

  const handleNotificationToggle = (field) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: !notificationSettings[field],
    });
  };

  const handleSecurityChange = (field, value) => {
    setSecuritySettings({ ...securitySettings, [field]: value });
  };

  const handleThemeChange = (field, value) => {
    setThemeSettings({ ...themeSettings, [field]: value });
  };

  const handleSaveSettings = (section) => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    console.log(`${section} settings saved:`, {
      general: generalSettings,
      notifications: notificationSettings,
      security: securitySettings,
      theme: themeSettings,
    }[section.toLowerCase()]);
  };

  const handleResetSettings = (section) => {
    if (section === 'general') {
      setGeneralSettings({
        gymName: 'FitFlow Gym',
        email: 'admin@fitflow.com',
        phone: '+1 (555) 123-4567',
        timezone: 'UTC-5',
        language: 'English',
      });
    } else if (section === 'security') {
      setSecuritySettings({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorAuth: false,
      });
    }
  };

  const SettingItem = ({ icon: Icon, label, description, children }) => (
    <div className="flex items-start justify-between p-4 border-b border-[var(--color-border)] last:border-b-0">
      <div className="flex items-start gap-4 flex-1">
        <Icon className="w-5 h-5 text-[var(--color-secondary)] mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium text-[var(--color-primary)]">{label}</h4>
          {description && (
            <p className="text-sm text-[var(--color-secondary)] mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
          Settings
        </h1>
        <p className="text-[var(--color-secondary)]">
          Manage your application preferences and account settings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6 border-b border-[var(--color-border)] overflow-x-auto">
        {[
          { id: 'general', label: 'General', icon: User },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'security', label: 'Security', icon: Lock },
          { id: 'theme', label: 'Theme', icon: Palette },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`pb-4 px-4 font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === id
                ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <Check className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-700">Settings saved successfully!</span>
        </div>
      )}

      {/* General Settings Tab */}
      {activeTab === 'general' && (
        <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] overflow-hidden">
          <SettingItem
            icon={User}
            label="Gym Name"
            description="The name of your gym facility"
          >
            <input
              type="text"
              value={generalSettings.gymName}
              onChange={(e) =>
                handleGeneralChange('gymName', e.target.value)
              }
              className="w-64 px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </SettingItem>

          <SettingItem
            icon={User}
            label="Email Address"
            description="Primary contact email"
          >
            <input
              type="email"
              value={generalSettings.email}
              onChange={(e) =>
                handleGeneralChange('email', e.target.value)
              }
              className="w-64 px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </SettingItem>

          <SettingItem
            icon={User}
            label="Phone Number"
            description="Contact phone number"
          >
            <input
              type="tel"
              value={generalSettings.phone}
              onChange={(e) =>
                handleGeneralChange('phone', e.target.value)
              }
              className="w-64 px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </SettingItem>

          <SettingItem
            icon={User}
            label="Timezone"
            description="Set your local timezone"
          >
            <select
              value={generalSettings.timezone}
              onChange={(e) =>
                handleGeneralChange('timezone', e.target.value)
              }
              className="w-64 px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option>UTC-5</option>
              <option>UTC-6</option>
              <option>UTC-7</option>
              <option>UTC-8</option>
              <option>UTC</option>
              <option>UTC+1</option>
              <option>UTC+2</option>
            </select>
          </SettingItem>

          <SettingItem
            icon={User}
            label="Language"
            description="Select your preferred language"
          >
            <select
              value={generalSettings.language}
              onChange={(e) =>
                handleGeneralChange('language', e.target.value)
              }
              className="w-64 px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Chinese</option>
            </select>
          </SettingItem>

          <div className="p-4 bg-[var(--color-background)] flex gap-3 justify-end border-t border-[var(--color-border)]">
            <button
              onClick={() => handleResetSettings('general')}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-border)] transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={() => handleSaveSettings('general')}
              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Notifications Settings Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] overflow-hidden">
          <SettingItem
            icon={Bell}
            label="Email Notifications"
            description="Receive email updates about system events"
          >
            <button
              onClick={() =>
                handleNotificationToggle('emailNotifications')
              }
              className={`relative w-12 h-7 rounded-full transition-colors ${
                notificationSettings.emailNotifications
                  ? 'bg-green-500'
                  : 'bg-[var(--color-inactive)]'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  notificationSettings.emailNotifications
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </SettingItem>

          <SettingItem
            icon={Bell}
            label="Member Alerts"
            description="Get notified about new member registrations"
          >
            <button
              onClick={() => handleNotificationToggle('memberAlerts')}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                notificationSettings.memberAlerts
                  ? 'bg-green-500'
                  : 'bg-[var(--color-inactive)]'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  notificationSettings.memberAlerts
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </SettingItem>

          <SettingItem
            icon={Bell}
            label="Payment Reminders"
            description="Notify about upcoming payment due dates"
          >
            <button
              onClick={() =>
                handleNotificationToggle('paymentReminders')
              }
              className={`relative w-12 h-7 rounded-full transition-colors ${
                notificationSettings.paymentReminders
                  ? 'bg-green-500'
                  : 'bg-[var(--color-inactive)]'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  notificationSettings.paymentReminders
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </SettingItem>

          <SettingItem
            icon={Bell}
            label="Class Notifications"
            description="Alerts for class schedule changes"
          >
            <button
              onClick={() =>
                handleNotificationToggle('classNotifications')
              }
              className={`relative w-12 h-7 rounded-full transition-colors ${
                notificationSettings.classNotifications
                  ? 'bg-green-500'
                  : 'bg-[var(--color-inactive)]'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  notificationSettings.classNotifications
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </SettingItem>

          <SettingItem
            icon={Bell}
            label="Push Notifications"
            description="Receive push notifications on your device"
          >
            <button
              onClick={() =>
                handleNotificationToggle('pushNotifications')
              }
              className={`relative w-12 h-7 rounded-full transition-colors ${
                notificationSettings.pushNotifications
                  ? 'bg-green-500'
                  : 'bg-[var(--color-inactive)]'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  notificationSettings.pushNotifications
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </SettingItem>

          <div className="p-4 bg-[var(--color-background)] flex gap-3 justify-end border-t border-[var(--color-border)]">
            <button
              onClick={() => handleSaveSettings('notifications')}
              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Security Settings Tab */}
      {activeTab === 'security' && (
        <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] overflow-hidden">
          <SettingItem
            icon={Lock}
            label="Current Password"
            description="Enter your current password"
          >
            <div className="relative w-64">
              <input
                type={showPassword ? 'text' : 'password'}
                value={securitySettings.currentPassword}
                onChange={(e) =>
                  handleSecurityChange('currentPassword', e.target.value)
                }
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[var(--color-secondary)]"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </SettingItem>

          <SettingItem
            icon={Lock}
            label="New Password"
            description="Enter your new password"
          >
            <input
              type={showPassword ? 'text' : 'password'}
              value={securitySettings.newPassword}
              onChange={(e) =>
                handleSecurityChange('newPassword', e.target.value)
              }
              className="w-64 px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </SettingItem>

          <SettingItem
            icon={Lock}
            label="Confirm Password"
            description="Confirm your new password"
          >
            <div className="relative w-64">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={securitySettings.confirmPassword}
                onChange={(e) =>
                  handleSecurityChange('confirmPassword', e.target.value)
                }
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] pr-10"
              />
              <button
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-2.5 text-[var(--color-secondary)]"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </SettingItem>

          <SettingItem
            icon={Lock}
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
          >
            <button
              onClick={() =>
                handleSecurityChange('twoFactorAuth', !securitySettings.twoFactorAuth)
              }
              className={`relative w-12 h-7 rounded-full transition-colors ${
                securitySettings.twoFactorAuth
                  ? 'bg-green-500'
                  : 'bg-[var(--color-inactive)]'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  securitySettings.twoFactorAuth
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </SettingItem>

          <div className="p-4 bg-[var(--color-background)] flex gap-3 justify-end border-t border-[var(--color-border)]">
            <button
              onClick={() => handleResetSettings('security')}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-border)] transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={() => handleSaveSettings('security')}
              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Theme Settings Tab */}
      {activeTab === 'theme' && (
        <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] overflow-hidden">
          <SettingItem
            icon={Palette}
            label="Theme"
            description="Choose your preferred theme"
          >
            <select
              value={themeSettings.theme}
              onChange={(e) =>
                handleThemeChange('theme', e.target.value)
              }
              className="w-64 px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </SettingItem>

          <SettingItem
            icon={Palette}
            label="Accent Color"
            description="Customize the primary accent color"
          >
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={themeSettings.accentColor}
                onChange={(e) =>
                  handleThemeChange('accentColor', e.target.value)
                }
                className="w-12 h-10 rounded-lg border border-[var(--color-border)] cursor-pointer"
              />
              <span className="text-sm text-[var(--color-secondary)]">
                {themeSettings.accentColor}
              </span>
            </div>
          </SettingItem>

          <div className="p-6 border-t border-[var(--color-border)]">
            <h4 className="font-medium text-[var(--color-primary)] mb-4">
              Preview
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-secondary)] mb-2">
                  Button Preview
                </p>
                <button
                  style={{ backgroundColor: themeSettings.accentColor }}
                  className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                >
                  Sample Button
                </button>
              </div>
              <div className="p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-secondary)] mb-2">
                  Text Preview
                </p>
                <p
                  style={{ color: themeSettings.accentColor }}
                  className="font-medium text-sm"
                >
                  Sample Text
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[var(--color-background)] flex gap-3 justify-end border-t border-[var(--color-border)]">
            <button
              onClick={() => handleSaveSettings('theme')}
              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Danger Zone */}
      <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
          <X className="w-5 h-5" />
          Danger Zone
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-red-700">Logout</p>
            <p className="text-sm text-red-600 mt-1">
              Sign out from your account
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;