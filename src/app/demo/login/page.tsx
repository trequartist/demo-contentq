"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, Button, Input } from '@/components/ui';
import { Lock, User, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/demo/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(username, password);
    
    if (result.success) {
      router.push('/demo/dashboard');
    } else {
      setError(result.error || 'Login failed');
      setIsLoading(false);
    }
  };

  const quickLogin = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-light text-black mb-2">Welcome to KiwiQ Demo</h1>
          <p className="text-sm text-black/60">Sign in to access your content intelligence platform</p>
        </div>

        {/* Login Card */}
        <Card className="border border-black/10">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-black mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="pl-10 border-black/20 focus:border-black/40"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 border-black/20 focus:border-black/40"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/60"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-black/5 border border-black/10 rounded-lg">
                  <p className="text-sm text-black/80">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full bg-black text-white hover:bg-black/90 border-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white mr-2"></div>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                )}
              </Button>
            </form>

            {/* Demo Credentials Info */}
            {/* <div className="mt-6 pt-6 border-t border-black/10">
              <p className="text-xs text-black/60 mb-3">Quick Access (Demo Accounts):</p>
              <div className="space-y-2">
                <button
                  onClick={() => quickLogin('demo', 'kiwiq2024')}
                  className="w-full text-left p-2 rounded-lg bg-black/[0.02] hover:bg-black/[0.05] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-black">Demo User</p>
                      <p className="text-xs text-black/40">demo / kiwiq2024</p>
                    </div>
                    <Badge className="bg-black/10 text-black/60 text-xs border-0">Admin</Badge>
                  </div>
                </button>
                <button
                  onClick={() => quickLogin('gumloop', 'demo123')}
                  className="w-full text-left p-2 rounded-lg bg-black/[0.02] hover:bg-black/[0.05] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-black">Gumloop Team</p>
                      <p className="text-xs text-black/40">gumloop / demo123</p>
                    </div>
                    <Badge className="bg-black/10 text-black/60 text-xs border-0">Admin</Badge>
                  </div>
                </button>
                <button
                  onClick={() => quickLogin('test', 'test123')}
                  className="w-full text-left p-2 rounded-lg bg-black/[0.02] hover:bg-black/[0.05] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-black">Test User</p>
                      <p className="text-xs text-black/40">test / test123</p>
                    </div>
                    <Badge className="bg-black/10 text-black/60 text-xs border-0">Viewer</Badge>
                  </div>
                </button>
              </div>
            </div> */}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-black/40">
            © 2024 KiwiQ Demo. For demonstration purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}

// Add Badge component import if needed
function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}
