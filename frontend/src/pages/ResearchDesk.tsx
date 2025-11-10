import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, Plus, TrendingUp, FileText } from "lucide-react";
import { getFindingsByStream, mockResearchFindings } from "@/data/mockData";
import { mockSavedReports } from "@/data/researchData";
import { StreamCard } from "@/components/research/StreamCard";
import { StreamExplorer } from "@/components/research/StreamExplorer";
import { ReportCard } from "@/components/research/ReportCard";
import { ReportBuilder } from "@/components/research/ReportBuilder";
import { RelatedDocuments } from "@/components/brain/RelatedDocuments";
import { useDemoStore } from "@/stores/demoStore";

type View = 'main' | 'stream' | 'report';
type StreamType = 'competitors' | 'trends' | 'conversations' | null;

export default function ResearchDesk() {
  const { brainDocuments } = useDemoStore();
  const [currentView, setCurrentView] = useState<View>('main');
  const [activeStream, setActiveStream] = useState<StreamType>(null);
  const [selectedReport, setSelectedReport] = useState<typeof mockSavedReports[0] | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  
  // Get research-related documents
  const researchDocs = brainDocuments.filter(
    doc => doc.active && (
      doc.category === 'Market Intelligence' || 
      doc.category === 'Product Knowledge'
    )
  );

  const handleExploreStream = (stream: StreamType) => {
    setActiveStream(stream);
    setCurrentView('stream');
  };

  const handleViewReport = (report: typeof mockSavedReports[0]) => {
    setSelectedReport(report);
    setCurrentView('report');
  };

  const handleBack = () => {
    setCurrentView('main');
    setActiveStream(null);
    setSelectedReport(null);
  };

  // Stream Explorer View
  if (currentView === 'stream' && activeStream) {
    return (
      <div className="space-y-6 animate-fade-in pb-16">
        <StreamExplorer stream={activeStream} onBack={handleBack} />
      </div>
    );
  }

  // Report View
  if (currentView === 'report' && selectedReport) {
    return (
      <div className="space-y-6 animate-fade-in pb-16">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <Search className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{selectedReport.title}</h2>
            <p className="text-sm text-muted-foreground">
              {selectedReport.sections.length} sections
            </p>
          </div>
        </div>

        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm">{selectedReport.summary}</p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {selectedReport.sections.map((section, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm">{section.content}</pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Main View
  const competitorFindings = getFindingsByStream('competitors');
  const trendFindings = getFindingsByStream('trends');
  const conversationFindings = getFindingsByStream('conversations');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-16">
      <div className="lg:col-span-3 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Research Desk</h1>
            <p className="text-muted-foreground">
              Always-on intelligence and on-demand research reports
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </Button>
          </div>
        </div>

      {/* Always-On Intelligence */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Always-On Intelligence</h2>
          <p className="text-sm text-muted-foreground">
            Continuous monitoring across 3 research streams
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StreamCard
            name="Competitor Monitoring"
            stream="competitors"
            findingsCount={competitorFindings.length}
            lastUpdated={competitorFindings[0]?.date || new Date()}
            recentFindings={competitorFindings.map(f => f.title)}
            onExplore={() => handleExploreStream('competitors')}
          />

          <StreamCard
            name="Industry Trends"
            stream="trends"
            findingsCount={trendFindings.length}
            lastUpdated={trendFindings[0]?.date || new Date()}
            recentFindings={trendFindings.map(f => f.title)}
            onExplore={() => handleExploreStream('trends')}
          />

          <StreamCard
            name="Customer Conversations"
            stream="conversations"
            findingsCount={conversationFindings.length}
            lastUpdated={conversationFindings[0]?.date || new Date()}
            recentFindings={conversationFindings.map(f => f.title)}
            onExplore={() => handleExploreStream('conversations')}
          />
        </div>
      </div>

      {/* Research Reports */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Research Reports</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Commission deep-dive analysis and strategic insights
            </p>
          </div>
          <Button onClick={() => setIsBuilderOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Commission New Report
          </Button>
        </div>

        {mockSavedReports.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {mockSavedReports.map(report => (
              <ReportCard
                key={report.id}
                report={report}
                onView={() => handleViewReport(report)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Reports Yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Commission your first research report to get started
            </p>
            <Button onClick={() => setIsBuilderOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Commission Report
            </Button>
          </Card>
        )}
      </div>

        {/* Report Builder Dialog */}
        <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <ReportBuilder onClose={() => setIsBuilderOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Sidebar - Related Documents */}
      <div className="lg:col-span-1">
        {researchDocs.length > 0 && (
          <div className="sticky top-6">
            <RelatedDocuments 
              documents={researchDocs}
              title="Research Context"
              maxItems={8}
            />
          </div>
        )}
      </div>
    </div>
  );
}
