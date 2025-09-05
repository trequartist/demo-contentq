import KiwiQLayout from '@/components/layout/KiwiQLayout';
import { DemoProvider } from '@/lib/demo/demo-context';
import PresenterProvider from './providers';
import { AuthProvider } from '@/lib/auth/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';
import GlobalAiAssistant from '@/components/demo/GlobalAiAssistant';
import { UIControllerProvider } from '@/lib/ai-assistant/ui-context';

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
            <UIControllerProvider>
              <KiwiQLayout>
                {children}
              </KiwiQLayout>
              <GlobalAiAssistant />
            </UIControllerProvider>
          </ProtectedRoute>
        </PresenterProvider>
      </DemoProvider>
    </AuthProvider>
  );
}