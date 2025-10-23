"use client";

import { AdvancedKnowledgeGraph } from './AdvancedKnowledgeGraph';

interface KnowledgeGraphViewProps {
  onClose?: () => void;
}

export function KnowledgeGraphView({ onClose }: KnowledgeGraphViewProps) {
  return (
    <div className="h-full">
      <AdvancedKnowledgeGraph />
    </div>
  );
}
