import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, MessageSquare, Brain } from "lucide-react";
import { ContentScoring } from "@/components/studio/ContentScoring";
import { AssistantPanel } from "@/components/assistant/AssistantPanel";
import { RelatedDocuments } from "@/components/brain/RelatedDocuments";
import { useWorkflowStore } from "@/stores/workflowStore";
import { useDemoStore } from "@/stores/demoStore";

interface EditorSidebarProps {
  content: string;
  title: string;
  showScoring: boolean;
  workflowType?: 'blog' | 'linkedin';
}

export function EditorSidebar({ content, title, showScoring, workflowType }: EditorSidebarProps) {
  const [activeTab, setActiveTab] = useState<string>("scoring");
  const { insertIntoInput, updateStageData, currentStageIndex, stages } = useWorkflowStore();
  const { brainDocuments } = useDemoStore();
  
  const currentStage = stages[currentStageIndex];
  
  // Get relevant active documents (filter by active status)
  const activeDocuments = brainDocuments.filter(doc => doc.active);

  return (
    <div className="w-[400px] shrink-0 border-l border-border bg-background">
      <div className="sticky top-0 h-[calc(100vh-60px)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
            <TabsTrigger value="scoring" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Score
            </TabsTrigger>
            <TabsTrigger value="brain" className="gap-2">
              <Brain className="h-4 w-4" />
              Brain
            </TabsTrigger>
            <TabsTrigger value="assistant" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Assistant
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scoring" className="flex-1 overflow-hidden m-0 p-4">
            {showScoring && workflowType && (
              <ContentScoring 
                type={workflowType}
                content={content}
                title={title}
              />
            )}
          </TabsContent>
          
          <TabsContent value="brain" className="flex-1 overflow-y-auto m-0 p-4">
            <RelatedDocuments 
              documents={activeDocuments}
              title="Active Context"
              maxItems={10}
            />
          </TabsContent>
          
          <TabsContent value="assistant" className="flex-1 overflow-hidden m-0">
            <div className="h-full">
              <AssistantPanel 
                currentInput={currentStage?.inputValue}
                onInsertContent={insertIntoInput}
                onUpdateInput={(newValue) => updateStageData({ inputValue: newValue })}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
