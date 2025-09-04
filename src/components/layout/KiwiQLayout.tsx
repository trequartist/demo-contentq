"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  BookOpen,
  Settings,
  Search,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Zap,
  Layers,
  Activity,
  Brain
} from 'lucide-react';
import { DEMO_CONFIG } from '@/lib/demo/demo-config';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string | number;
  description?: string;
}

const navigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/demo/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and key metrics'
  },
  {
    name: 'Content Studio',
    href: '/demo/content-studio',
    icon: FileText,
    description: 'Create and manage content'
  },
  {
    name: 'Diagnostics',
    href: '/demo/diagnostics', 
    icon: Activity,
    description: 'Performance analysis'
  },
  {
    name: 'Playbook',
    href: '/demo/playbook',
    icon: BookOpen,
    description: 'Strategic content planning'
  },
  {
    name: 'Insights',
    href: '/demo/insights',
    icon: Brain,
    description: 'AI-powered insights'
  },
  {
    name: 'Analytics',
    href: '/demo/analytics',
    icon: BarChart3,
    description: 'Performance tracking'
  },
  {
    name: 'Assets',
    href: '/demo/assets',
    icon: Layers,
    description: 'Manage content channels'
  },
  {
    name: 'Settings',
    href: '/demo/settings',
    icon: Settings,
    description: 'System configuration'
  },
];

interface KiwiQLayoutProps {
  children: React.ReactNode;
}

export default function KiwiQLayout({ children }: KiwiQLayoutProps) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-gray-50 border-r border-gray-200 flex-shrink-0 transition-all duration-300`}>
        <div className="h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">KiwiQ</h1>
                  <p className="text-xs text-gray-500">Demo Mode</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon
                    className={`flex-shrink-0 w-5 h-5 ${
                      isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                    }`}
                  />
                  {!sidebarCollapsed && (
                    <>
                      <span className="ml-3 truncate">{item.name}</span>
                      {item.badge && (
                        <span className={`ml-auto px-2 py-0.5 text-xs font-medium rounded-full ${
                          isActive 
                            ? 'bg-white text-black' 
                            : 'bg-gray-900 text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-3 border-t border-gray-200">
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {DEMO_CONFIG.USER.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {DEMO_CONFIG.USER.role}
                  </p>
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{DEMO_CONFIG.USER.company}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Online</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
              <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-xs text-gray-400 bg-gray-100 rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {/* Demo Badge */}
            <div className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full">
              Demo Mode
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}