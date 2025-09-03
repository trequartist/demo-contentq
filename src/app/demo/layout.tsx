import KiwiQLayout from '@/components/layout/KiwiQLayout';
import { DemoProvider } from '@/lib/demo/demo-context';

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DemoProvider>
      <KiwiQLayout>
        {children}
      </KiwiQLayout>
    </DemoProvider>
  );
}