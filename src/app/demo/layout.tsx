import KiwiQLayout from '@/components/layout/KiwiQLayout';
import { DemoProvider } from '@/lib/demo/demo-context';
import PresenterProvider from './providers';

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DemoProvider>
      <PresenterProvider>
        <KiwiQLayout>
          {children}
        </KiwiQLayout>
      </PresenterProvider>
    </DemoProvider>
  );
}