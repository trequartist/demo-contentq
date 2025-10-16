"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Icons from 'lucide-react';
import { DEMO_CONFIG } from '@/lib/demo/demo-config';
import { useAuth } from '@/lib/auth/auth-context';
import navigationData from '@/usableclientdata/navigation.json';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  badge?: string | number | null;
  description?: string;
}

interface KiwiQLayoutProps {
  children: React.ReactNode;
}

export default function KiwiQLayout({ children }: KiwiQLayoutProps) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const { user, logout } = useAuth();
  const navigation = navigationData.navigation.filter((item: NavigationItem) => !['Diagnostics', 'Playbook', 'Insights'].includes(item.name));

  // Don't render the layout on the login page
  if (pathname === '/demo/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-[#F7F7F8] text-gray-900">
      {/* Sidebar */}
      <div
        className={`relative flex-shrink-0 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } ${sidebarCollapsed ? 'bg-black' : 'bg-white'}`}
      >
        {!sidebarCollapsed && (
          <div className="absolute inset-y-4 left-0 right-4 rounded-3xl bg-white/90 backdrop-blur border border-white/40 shadow-[0_25px_60px_-25px_rgba(15,23,42,0.25)]" />
        )}

        <div className="relative h-full flex flex-col px-5 py-6">
          {/* Logo/Brand */}
          <div className={`flex items-center mb-8 ${sidebarCollapsed ? 'flex-col gap-6' : 'justify-between'}`}>
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                sidebarCollapsed 
                  ? 'bg-white' 
                  : 'bg-black'
              } ${sidebarCollapsed ? 'mx-auto' : ''}`}
            >
              <Icons.Zap className={`h-5 w-5 ${sidebarCollapsed ? 'text-black' : 'text-white'}`} />
            </div>
            {!sidebarCollapsed && (
              <span className="ml-3 text-lg font-semibold tracking-tight">KiwiQ</span>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                sidebarCollapsed 
                  ? 'bg-white text-black hover:bg-white/90' 
                  : 'ml-auto bg-gray-100 text-gray-500 hover:text-black'
              }`}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <Icons.ChevronRight className="w-4 h-4" /> : <Icons.ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 space-y-2 overflow-y-auto ${sidebarCollapsed ? 'pr-0' : 'pr-1'}`}>
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = Icons[item.icon as keyof typeof Icons] as React.ComponentType<any>;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center transition-all ${
                    sidebarCollapsed 
                      ? 'justify-center py-3 rounded-xl' 
                      : 'gap-3 rounded-2xl px-3 py-2'
                  } ${
                    sidebarCollapsed
                      ? isActive
                        ? 'bg-white'
                        : 'hover:bg-white/10'
                      : isActive
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  {sidebarCollapsed ? (
                    <Icon className={`h-5 w-5 ${isActive ? 'text-black' : 'text-white'}`} />
                  ) : (
                    <>
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-black group-hover:text-white'
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <span className="font-medium tracking-tight text-sm">{item.name}</span>
                        {item.badge && (
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile - Only show when expanded */}
          {!sidebarCollapsed && (
            <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5">
                  <Icons.User className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user?.name || DEMO_CONFIG.USER.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.role || DEMO_CONFIG.USER.role}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span className="font-medium text-gray-700">{DEMO_CONFIG.USER.company}</span>
                <div className="flex items-center gap-1">
                  <span className="block h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Online</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}