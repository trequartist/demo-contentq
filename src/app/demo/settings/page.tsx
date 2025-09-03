"use client";

import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Monitor,
  Zap,
  Database,
  Key,
  Mail,
  Smartphone,
  HelpCircle,
  ChevronRight,
  Check,
  X,
  Save,
  RefreshCw,
  LogOut,
  Download,
  Upload,
  AlertCircle
} from 'lucide-react';
import { useDemo } from '@/lib/demo/demo-context';
import { useRouter } from 'next/navigation';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export default function SettingsPage() {
  const { state, actions } = useDemo();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form states
  const [profile, setProfile] = useState({
    name: state.user.name,
    email: state.user.email,
    company: state.user.company,
    role: 'Content Manager',
    timezone: 'America/New_York'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    desktop: true,
    weeklyReport: true,
    contentAlerts: true,
    systemUpdates: false
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    contentView: 'grid',
    autoSave: true,
    spellCheck: true
  });

  const sections: SettingSection[] = [
    { id: 'profile', title: 'Profile', description: 'Manage your account information', icon: User },
    { id: 'notifications', title: 'Notifications', description: 'Configure alerts and updates', icon: Bell },
    { id: 'preferences', title: 'Preferences', description: 'Customize your experience', icon: Globe },
    { id: 'security', title: 'Security', description: 'Protect your account', icon: Shield },
    { id: 'integrations', title: 'Integrations', description: 'Connect external services', icon: Zap },
    { id: 'data', title: 'Data & Storage', description: 'Manage your content data', icon: Database }
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Save settings logic here
    setSaving(false);
    setIsDirty(false);
  };

  const handleExportData = () => {
    const data = {
      user: state.user,
      documents: state.documents,
      assets: state.assets,
      settings: { profile, notifications, preferences }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kiwiq-export.json';
    a.click();
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          // Import data logic here
          console.log('Imported data:', data);
        } catch (error) {
          console.error('Error importing data:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200">
          <div className="p-6">
            <h1 className="text-xl font-semibold text-black mb-1">Settings</h1>
            <p className="text-sm text-gray-600">Manage your account</p>
          </div>
          
          <nav className="px-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 mb-1 rounded-lg text-sm transition-all ${
                    activeSection === section.id
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <div className="flex-1 text-left">
                    <span className="font-medium">{section.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            <button 
              onClick={() => router.push('/')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          {isDirty && (
            <div className="bg-gray-50 border-b border-gray-200 px-8 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">You have unsaved changes</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setIsDirty(false);
                    // Reset forms
                  }}
                  className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3 h-3" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="px-8 py-6 max-w-3xl">
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <div>
                <h2 className="text-2xl font-semibold text-black mb-1">Profile</h2>
                <p className="text-sm text-gray-600 mb-6">Manage your account information</p>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => {
                          setProfile({ ...profile, name: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => {
                          setProfile({ ...profile, email: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={profile.company}
                        onChange={(e) => {
                          setProfile({ ...profile, company: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <select
                        value={profile.role}
                        onChange={(e) => {
                          setProfile({ ...profile, role: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value="Content Manager">Content Manager</option>
                        <option value="Editor">Editor</option>
                        <option value="Admin">Admin</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={profile.timezone}
                      onChange={(e) => {
                        setProfile({ ...profile, timezone: e.target.value });
                        setIsDirty(true);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div>
                <h2 className="text-2xl font-semibold text-black mb-1">Notifications</h2>
                <p className="text-sm text-gray-600 mb-6">Configure how you receive updates</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-black mb-4">Notification Channels</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                            <p className="text-xs text-gray-500">Receive updates via email</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setNotifications({ ...notifications, email: !notifications.email });
                            setIsDirty(true);
                          }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.email ? 'bg-black' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.email ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Monitor className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Desktop Notifications</p>
                            <p className="text-xs text-gray-500">Show browser notifications</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setNotifications({ ...notifications, desktop: !notifications.desktop });
                            setIsDirty(true);
                          }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.desktop ? 'bg-black' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.desktop ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                            <p className="text-xs text-gray-500">Mobile app notifications</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setNotifications({ ...notifications, push: !notifications.push });
                            setIsDirty(true);
                          }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.push ? 'bg-black' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.push ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-black mb-4">Notification Types</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'weeklyReport', label: 'Weekly Reports', description: 'Summary of your content performance' },
                        { key: 'contentAlerts', label: 'Content Alerts', description: 'Updates about your content' },
                        { key: 'systemUpdates', label: 'System Updates', description: 'Platform updates and maintenance' }
                      ].map((item) => (
                        <label key={item.key} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications] as boolean}
                            onChange={() => {
                              setNotifications({
                                ...notifications,
                                [item.key]: !notifications[item.key as keyof typeof notifications]
                              });
                              setIsDirty(true);
                            }}
                            className="rounded border-gray-300 text-black focus:ring-black"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeSection === 'preferences' && (
              <div>
                <h2 className="text-2xl font-semibold text-black mb-1">Preferences</h2>
                <p className="text-sm text-gray-600 mb-6">Customize your experience</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'light', label: 'Light', icon: Sun },
                        { value: 'dark', label: 'Dark', icon: Moon },
                        { value: 'system', label: 'System', icon: Monitor }
                      ].map((theme) => {
                        const Icon = theme.icon;
                        return (
                          <button
                            key={theme.value}
                            onClick={() => {
                              setPreferences({ ...preferences, theme: theme.value });
                              setIsDirty(true);
                            }}
                            className={`p-4 rounded-lg border transition-all ${
                              preferences.theme === theme.value
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <Icon className="w-5 h-5 mx-auto mb-2" />
                            <span className="text-sm font-medium">{theme.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) => {
                          setPreferences({ ...preferences, language: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Format
                      </label>
                      <select
                        value={preferences.dateFormat}
                        onChange={(e) => {
                          setPreferences({ ...preferences, dateFormat: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Auto-save documents</span>
                      <button
                        onClick={() => {
                          setPreferences({ ...preferences, autoSave: !preferences.autoSave });
                          setIsDirty(true);
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.autoSave ? 'bg-black' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.autoSave ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>

                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Enable spell check</span>
                      <button
                        onClick={() => {
                          setPreferences({ ...preferences, spellCheck: !preferences.spellCheck });
                          setIsDirty(true);
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.spellCheck ? 'bg-black' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.spellCheck ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div>
                <h2 className="text-2xl font-semibold text-black mb-1">Security</h2>
                <p className="text-sm text-gray-600 mb-6">Protect your account</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-black mb-4">Password</h3>
                    <p className="text-sm text-gray-600 mb-4">Last changed 30 days ago</p>
                    <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors">
                      Change Password
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-black mb-4">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
                    <button className="px-4 py-2 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-black mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <Monitor className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Chrome on MacOS</p>
                            <p className="text-xs text-gray-500">Current session</p>
                          </div>
                        </div>
                        <span className="text-xs text-green-600">Active now</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Section */}
            {activeSection === 'data' && (
              <div>
                <h2 className="text-2xl font-semibold text-black mb-1">Data & Storage</h2>
                <p className="text-sm text-gray-600 mb-6">Manage your content data</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-black mb-4">Storage Usage</h3>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Used</span>
                        <span className="font-medium text-gray-900">2.3 GB of 10 GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-black h-2 rounded-full" style={{ width: '23%' }} />
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Documents</span>
                        <span className="text-gray-900">1.2 GB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Media</span>
                        <span className="text-gray-900">800 MB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Analytics</span>
                        <span className="text-gray-900">300 MB</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-black mb-4">Export Data</h3>
                    <p className="text-sm text-gray-600 mb-4">Download all your content and settings</p>
                    <button
                      onClick={handleExportData}
                      className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export All Data</span>
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-black mb-4">Import Data</h3>
                    <p className="text-sm text-gray-600 mb-4">Restore from a previous export</p>
                    <label className="flex items-center space-x-2 px-4 py-2 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Choose File</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}