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
  Brain,
  LogOut
} from 'lucide-react';
import { DEMO_CONFIG } from '@/lib/demo/demo-config';
import { useAuth } from '@/lib/auth/auth-context';

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
  const { user, logout } = useAuth();

  // Don't render the layout on the login page
  if (pathname === '/demo/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-black/10 flex-shrink-0 transition-all duration-300`}>
        <div className="h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-black/10">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-black">KiwiQ</span>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 text-black/40 hover:text-black/60 transition-colors">
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-black text-white'
                      : 'text-black/70 hover:text-black hover:bg-black/5'
                    }
                    ${sidebarCollapsed ? 'justify-center' : ''}
                  `}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className={`w-5 h-5 ${!sidebarCollapsed && 'mr-3'}`} />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span className={`
                          px-2 py-0.5 text-xs rounded-full
                          ${isActive ? 'bg-white/20' : 'bg-black/10'}
                        `}>
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
          <div className="p-4 border-t border-black/10">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-black/60" />
              </div>
              {!sidebarCollapsed && (
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-black truncate">
                    {user?.name || DEMO_CONFIG.USER.name}
                  </p>
                  <p className="text-xs text-black/50 truncate">
                    {user?.role || DEMO_CONFIG.USER.role}
                  </p>
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <div className="mt-3 flex items-center justify-between text-xs text-black/50">
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
        <header className="h-16 bg-white border-b border-black/10 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black/40" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-80 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/20 transition-colors"
              />
              <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-xs text-black/40 bg-black/5 rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Welcome */}
            <span className="text-sm text-black/60">
              Welcome, {user?.name || 'Demo User'}
            </span>

            {/* Notifications */}
            <button className="relative p-2 text-black/40 hover:text-black/60 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 text-black/40 hover:text-black/60 transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {/* Logout Button */}
            <button 
              onClick={logout}
              className="p-2 text-black/40 hover:text-black/60 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>

            {/* Demo Badge */}
            <div className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded-full">
              Demo Mode
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}