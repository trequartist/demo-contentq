import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar as CalendarIcon,
  Plus,
  Building,
  BookOpen,
  Megaphone,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FoundationStrategy } from "@/components/strategy/FoundationStrategy";
import { PlaybookWizard } from "@/components/strategy/PlaybookWizard";
import { QuickOnboard } from "@/components/strategy/QuickOnboard";
import { RelatedDocuments } from "@/components/brain/RelatedDocuments";
import { useDemoStore } from "@/stores/demoStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: "ideation" | "draft" | "review" | "scheduled" | "published";
  date?: Date;
  campaign?: string;
}

export default function Strategy() {
  const navigate = useNavigate();
  const { brainDocuments, setContext } = useDemoStore();
  
  // Date setup
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [activeTab, setActiveTab] = useState("foundation");
  
  // Get strategy-related documents
  const strategyDocs = brainDocuments.filter(
    doc => doc.active && (
      doc.category === 'Strategic Foundation' || 
      doc.category === 'Content Strategy' ||
      doc.category === 'Market Intelligence'
    )
  );
  
  // Check if foundation strategy exists
  const hasFoundation = brainDocuments.some(doc => 
    doc.category === 'Strategic Foundation' && (doc.name === 'Foundation Strategy' || doc.name.includes('Profile'))
  );
  
  // Rich mock calendar content - spread across the current month
  
  const contentItems: ContentItem[] = [
    // This week
    {
      id: "1",
      title: "AI in Healthcare Blog Post",
      type: "Blog",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate()),
      campaign: "Healthcare Series",
    },
    {
      id: "2",
      title: "Product Launch LinkedIn Post",
      type: "LinkedIn",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate()),
      campaign: "Q4 Launch",
    },
    {
      id: "3",
      title: "Weekly Newsletter",
      type: "Email",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 1),
    },
    {
      id: "4",
      title: "Customer Success Story",
      type: "Blog",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 2),
      campaign: "Customer Stories",
    },
    {
      id: "5",
      title: "Industry Trends LinkedIn",
      type: "LinkedIn",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 3),
    },
    {
      id: "6",
      title: "How-to Guide: Getting Started",
      type: "Blog",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 4),
      campaign: "Educational Series",
    },
    // Next week
    {
      id: "7",
      title: "Product Update Announcement",
      type: "Blog",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 7),
      campaign: "Product Updates",
    },
    {
      id: "8",
      title: "Thought Leadership Piece",
      type: "LinkedIn",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 7),
    },
    {
      id: "9",
      title: "Case Study: Enterprise Client",
      type: "Blog",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 9),
      campaign: "Customer Stories",
    },
    {
      id: "10",
      title: "Webinar Promotion",
      type: "LinkedIn",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 10),
      campaign: "Events",
    },
    {
      id: "11",
      title: "Competitive Analysis Post",
      type: "Blog",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 11),
    },
    // Week after
    {
      id: "12",
      title: "Feature Deep Dive",
      type: "Blog",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 14),
      campaign: "Product Education",
    },
    {
      id: "13",
      title: "Industry Report Summary",
      type: "LinkedIn",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 14),
    },
    {
      id: "14",
      title: "Customer Interview Blog",
      type: "Blog",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 16),
      campaign: "Customer Stories",
    },
    {
      id: "15",
      title: "Best Practices Guide",
      type: "Blog",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 18),
    },
    // Later in month
    {
      id: "16",
      title: "Monthly Roundup",
      type: "Blog",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 21),
      campaign: "Monthly Series",
    },
    {
      id: "17",
      title: "Team Spotlight",
      type: "LinkedIn",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 23),
    },
    {
      id: "18",
      title: "Year-End Planning Guide",
      type: "Blog",
      status: "scheduled",
      date: new Date(currentYear, currentMonth, today.getDate() + 25),
    },
  ];

  const getStatusIcon = (status: ContentItem["status"]) => {
    switch (status) {
      case "ideation":
        return <Circle className="h-4 w-4 text-muted-foreground" />;
      case "draft":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "review":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "scheduled":
        return <CalendarIcon className="h-4 w-4 text-primary" />;
      case "published":
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusBadge = (status: ContentItem["status"]) => {
    return (
      <Badge variant="outline" className="gap-1">
        {getStatusIcon(status)}
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  const handleCreateContent = (item: ContentItem) => {
    setContext({
      source: 'calendar',
      sourceId: item.id,
      title: item.title,
      description: `Scheduled ${item.type} for ${item.date ? format(item.date, 'MMMM d, yyyy') : 'today'}`,
      data: item
    });
    
    toast.success('Loading scheduled content', {
      description: 'Creating content from calendar'
    });
    
    navigate('/studio');
  };

  return (
    <div className="px-8 py-12 space-y-12 animate-fade-in pb-16">
      {/* Header - Clean */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Strategy Room</h1>
        <p className="text-sm text-gray-600">
          Build your strategic foundation and create content playbooks
        </p>
      </div>

      {/* Tabs - Pill Style */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
        <TabsList className="inline-flex items-center gap-2 p-1 bg-gray-50 rounded-full border border-gray-200">
          <TabsTrigger value="foundation" className="gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Foundation</span>
            {!hasFoundation && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">New</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="playbooks" className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Playbooks</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Calendar</span>
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="gap-2">
            <Megaphone className="h-4 w-4" />
            <span className="hidden sm:inline">Campaigns</span>
          </TabsTrigger>
        </TabsList>

        {/* Foundation Tab */}
        <TabsContent value="foundation" className="space-y-6 mt-6">
          {!hasFoundation ? (
            <Card className="p-8 text-center">
              <Building className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Start with Your Foundation</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Build your strategic foundation first, or use Quick Onboarding to get started in minutes.
              </p>
              <QuickOnboard />
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FoundationStrategy />
              </div>
              <div className="lg:col-span-1">
                {strategyDocs.length > 0 && (
                  <div className="sticky top-6">
                    <RelatedDocuments 
                      documents={strategyDocs}
                      title="Strategy Context"
                      maxItems={8}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Playbooks Tab */}
        <TabsContent value="playbooks" className="space-y-6 mt-6">
          <PlaybookWizard />
        </TabsContent>

        {/* Calendar Tab - Simplified */}
        <TabsContent value="calendar" className="space-y-6 mt-6">
          {/* Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Scheduled</CardDescription>
                <CardTitle className="text-3xl">{contentItems.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-3xl">
                  {contentItems.filter(item => {
                    if (!item.date) return false;
                    const diff = item.date.getTime() - today.getTime();
                    return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
                  }).length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Active Campaigns</CardDescription>
                <CardTitle className="text-3xl">
                  {[...new Set(contentItems.filter(item => item.campaign).map(item => item.campaign))].length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Calendar - Clean Design */}
            <Card className="lg:col-span-3 p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>
                  View and manage your scheduled content
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                  modifiers={{
                    scheduled: contentItems
                      .filter(item => item.date)
                      .map(item => item.date!),
                  }}
                  modifiersClassNames={{
                    scheduled: 'bg-primary/10 font-semibold text-primary relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full'
                  }}
                />
              </CardContent>
            </Card>

            {/* Scheduled Content - Cleaner */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Click content to create in Studio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedDate && contentItems
                    .filter(item => item.date && format(item.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg border hover-lift cursor-pointer click-feedback transition-all"
                        onClick={() => handleCreateContent(item)}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="font-medium text-sm">{item.title}</p>
                          {getStatusBadge(item.status)}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.type}</p>
                        {item.campaign && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {item.campaign}
                          </Badge>
                        )}
                      </div>
                    ))}
                  
                  {selectedDate && contentItems.filter(
                    item => item.date && format(item.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                  ).length === 0 && (
                    <div className="text-center py-8">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        No content scheduled for this date
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Select a highlighted date to see scheduled content
                      </p>
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    className="w-full mt-4 click-feedback hover-glow"
                    onClick={() => {
                      toast.info('Schedule Content', {
                        description: 'This would open the content scheduler'
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Content
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Upcoming This Week</CardTitle>
                  <CardDescription className="text-xs">
                    Next 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {contentItems
                    .filter(item => {
                      if (!item.date) return false;
                      const diff = item.date.getTime() - today.getTime();
                      return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
                    })
                    .sort((a, b) => (a.date?.getTime() || 0) - (b.date?.getTime() || 0))
                    .slice(0, 5)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-2 rounded border-l-2 border-primary bg-primary/5 hover-lift cursor-pointer click-feedback text-xs"
                        onClick={() => handleCreateContent(item)}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium truncate">{item.title}</span>
                          <span className="text-muted-foreground shrink-0">
                            {item.date && format(item.date, "MMM d")}
                          </span>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Campaigns Tab - Simplified Placeholder */}
        <TabsContent value="campaigns" className="space-y-6 mt-6">
          <Card className="p-8 text-center">
            <Megaphone className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Campaigns</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Campaign management feature coming soon. Organize content into campaigns with shared goals.
            </p>
            <Button variant="outline" disabled>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
