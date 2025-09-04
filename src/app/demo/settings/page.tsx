"use client";

import React, { useState } from 'react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Badge } from '@/components/ui';
import { 
  Settings, 
  User, 
  Shield, 
  Key,
  Save,
  Check,
  CreditCard,
  Zap,
  Link,
  Brain,
  CheckCircle,
  BarChart3,
  Users
} from 'lucide-react';
import settingsData from '@/usableclientdata/data/settings/settings.json';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);
  const data = settingsData;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'general', name: 'Company', icon: Settings },
    { id: 'account', name: 'Team', icon: User },
    { id: 'content', name: 'Content', icon: Brain },
    { id: 'integrations', name: 'Integrations', icon: Zap },
    { id: 'ai', name: 'AI Settings', icon: Brain },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-600 mt-1">
                {data.account.company.name} • {data.account.subscription.plan} Plan
              </p>
            </div>
            {saved && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Settings saved</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            {activeTab === 'general' && (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Basic information about your organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <Input 
                        type="text" 
                        defaultValue={data.account.company.name}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <Input 
                        type="url" 
                        defaultValue={data.account.company.website}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry
                      </label>
                      <Input 
                        type="text" 
                        defaultValue={data.account.company.industry}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Size
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900">
                        <option>{data.account.company.size}</option>
                        <option>1-10</option>
                        <option>11-50</option>
                        <option>51-200</option>
                        <option>201-1000</option>
                        <option>1000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Headquarters
                      </label>
                      <Input 
                        type="text" 
                        defaultValue={data.account.company.headquarters}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900">
                        <option>{data.account.company.timezone}</option>
                        <option>America/New_York</option>
                        <option>America/Chicago</option>
                        <option>America/Denver</option>
                        <option>America/Los_Angeles</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand Tagline
                    </label>
                    <Input 
                      type="text" 
                      defaultValue={data.account.branding.tagline}
                      className="w-full"
                    />
                  </div>

                  <Button onClick={handleSave} className="bg-gray-900 text-white hover:bg-gray-800">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'account' && (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage your team and permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {data.account.team.users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="capitalize">
                            {user.permissions}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Last active: {new Date(user.lastActive).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="bg-gray-900 text-white hover:bg-gray-800">
                    <User className="w-4 h-4 mr-2" />
                    Invite Team Member
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'content' && (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Content Preferences</CardTitle>
                  <CardDescription>Configure default content settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Content Length</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Blog Posts</label>
                        <Input 
                          type="text" 
                          defaultValue={data.contentPreferences.defaults.contentLength.blog}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">LinkedIn Posts</label>
                        <Input 
                          type="text" 
                          defaultValue={data.contentPreferences.defaults.contentLength.linkedin}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Target Keywords</h3>
                    <div className="space-y-2">
                      {data.contentPreferences.keywords.primary.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="mr-2">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Competitors to Track</h3>
                    <div className="space-y-2">
                      {data.contentPreferences.competitors.track.map((competitor, index) => (
                        <Badge key={index} variant="secondary" className="mr-2">
                          {competitor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSave} className="bg-gray-900 text-white hover:bg-gray-800">
                    <Save className="w-4 h-4 mr-2" />
                    Save Content Settings
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'integrations' && (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connect with external services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {/* Analytics */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <BarChart3 className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">Google Analytics</p>
                            <p className="text-sm text-gray-600">Track website performance</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-50 text-green-700">
                          Connected
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Last sync: {new Date(data.integrations.analytics.googleAnalytics.lastSync).toLocaleString()}
                      </p>
                    </div>

                    {/* LinkedIn */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">LinkedIn Company</p>
                            <p className="text-sm text-gray-600">Post and track engagement</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-50 text-green-700">
                          Connected
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Last sync: {new Date(data.integrations.social.linkedin.company.lastSync).toLocaleString()}
                      </p>
                    </div>

                    {/* HubSpot */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">HubSpot</p>
                            <p className="text-sm text-gray-600">Sync leads and contacts</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-50 text-green-700">
                          Connected
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Account ID: {data.integrations.crm.hubspot.accountId}
                      </p>
                    </div>
                  </div>

                  <Button variant="secondary">
                    <Link className="w-4 h-4 mr-2" />
                    Add Integration
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'ai' && (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>AI Settings</CardTitle>
                  <CardDescription>Configure AI behavior and optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Content Generation</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Model</span>
                        <Badge variant="secondary">{data.aiSettings.contentGeneration.model}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Creativity Level</span>
                        <Badge variant="secondary">{data.aiSettings.contentGeneration.creativity}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Fact Checking</span>
                        <Badge variant="secondary" className="bg-green-50 text-green-700">
                          {data.aiSettings.contentGeneration.factChecking ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Optimization</h3>
                    <div className="space-y-3">
                      {Object.entries(data.aiSettings.optimization).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <input 
                            type="checkbox" 
                            defaultChecked={value as boolean}
                            className="rounded border-gray-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSave} className="bg-gray-900 text-white hover:bg-gray-800">
                    <Save className="w-4 h-4 mr-2" />
                    Save AI Settings
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'billing' && (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>Manage your subscription and payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Current Plan</p>
                        <p className="text-2xl font-bold text-gray-900">{data.billing.subscription.plan}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monthly Cost</p>
                        <p className="text-2xl font-bold text-gray-900">{data.billing.subscription.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Next billing date</span>
                      <span className="font-medium text-gray-900">
                        {new Date(data.billing.subscription.nextBilling).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Usage</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Content Created</span>
                          <span className="font-medium text-gray-900">
                            {data.billing.usage.current.content} / {data.billing.usage.included.content}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">AI Credits</span>
                          <span className="font-medium text-gray-900">
                            {data.billing.usage.current.aiCredits.toLocaleString()} / {data.billing.usage.included.aiCredits.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-black h-2 rounded-full"
                            style={{ width: `${(data.billing.usage.current.aiCredits / data.billing.usage.included.aiCredits) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="secondary">Update Payment Method</Button>
                    <Button variant="secondary">View Invoices</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Protect your account and data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-600">Add an extra layer of security</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-50 text-green-700">
                        {data.security.twoFactor.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">API Keys</p>
                          <p className="text-sm text-gray-600">{data.security.apiKeys.active} active keys</p>
                        </div>
                      </div>
                      <Button variant="secondary" size="sm">Manage</Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Compliance</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(data.security.compliance).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <CheckCircle className={`w-4 h-4 ${value === true ? 'text-green-600' : 'text-gray-400'}`} />
                          <span className="text-sm text-gray-700 uppercase">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="bg-gray-900 text-white hover:bg-gray-800">
                    <Shield className="w-4 h-4 mr-2" />
                    Update Security Settings
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}