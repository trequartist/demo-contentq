"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { 
  Package, 
  BarChart3, 
  BookOpen, 
  LayoutDashboard, 
  Sparkles, 
  Settings,
  Globe,
  Lightbulb,
  Activity,
  FileText
} from 'lucide-react';

interface KiwiQLayoutProps {
  children: React.ReactNode;
}

const KiwiQLayout: React.FC<KiwiQLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  
  const navigation = [
    { name: 'Dashboard', href: '/demo/dashboard', icon: LayoutDashboard },
    { name: 'Insights Hub', href: '/demo/insights', icon: Lightbulb },
    { name: 'Content Studio', href: '/demo/content-studio', icon: FileText },
    { name: 'Analytics', href: '/demo/analytics', icon: BarChart3 },
    { name: 'Diagnostics', href: '/demo/diagnostics', icon: Activity },
    { name: 'Playbook', href: '/demo/playbook', icon: BookOpen },
    { name: 'Assets', href: '/demo/assets', icon: Package },
    { name: 'Settings', href: '/demo/settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-[200px] bg-white border-r border-gray-200 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6">
          <Link href="/demo/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">KiwiQ</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          {navigation.map((item) => {
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 mb-1 rounded-lg text-sm transition-all ${
                  active 
                    ? 'bg-gray-100 text-gray-900 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-700">A</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Ashish</p>
              <p className="text-xs text-gray-500">ashish@kiwiq.ai</p>
            </div>
          </div>
          <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[200px]">
        {children}
      </main>
    </div>
  );
};

export default KiwiQLayout;