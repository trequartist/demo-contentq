import KiwiQLayout from '@/components/layout/KiwiQLayout';
import { DemoProvider } from '@/lib/demo/demo-context';
import PresenterProvider from './providers';
import { AuthProvider } from '@/lib/auth/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <DemoProvider>
        <PresenterProvider>
          <ProtectedRoute>
            <KiwiQLayout>
              {children}
            </KiwiQLayout>
          </ProtectedRoute>
        </PresenterProvider>
      </DemoProvider>
    </AuthProvider>
  );
}