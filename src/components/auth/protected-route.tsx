"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/demo/login') {
      router.push('/demo/login');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-black/20 border-t-black mx-auto"></div>
          <p className="mt-4 text-black/50 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/demo/login') {
    return null;
  }

  return <>{children}</>;
}
