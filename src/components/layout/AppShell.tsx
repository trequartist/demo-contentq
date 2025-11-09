import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { AssistantPanel } from "../assistant/AssistantPanel";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Header with Navigation - Fixed 60px */}
      <header className="fixed top-0 z-50 h-[60px] w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navigation />
      </header>

      {/* Main Content Area */}
      <div className="mt-[60px] flex flex-1 overflow-hidden">
        {/* Main Workspace - Flex 1 */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1400px] p-6 lg:p-8">
            {children}
          </div>
        </main>

        {/* Assistant Panel - Fixed 400px (hidden on mobile) */}
        <aside className="hidden w-[400px] border-l border-border bg-background lg:block">
          <AssistantPanel />
        </aside>
      </div>
    </div>
  );
}
