import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Calendar as CalendarIcon,
  Plus,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  Megaphone,
  BookOpen,
  Building,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FoundationStrategy } from "@/components/strategy/FoundationStrategy";
import { PlaybookWizard } from "@/components/strategy/PlaybookWizard";
import { QuickOnboard } from "@/components/strategy/QuickOnboard";
import { RelatedDocuments } from "@/components/brain/RelatedDocuments";
import { useDemoStore } from "@/stores/demoStore";

interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: "ideation" | "draft" | "review" | "scheduled" | "published";
  date?: Date;
  campaign?: string;
}

interface Campaign {
  id: string;
  name: string;
  goal: string;
  audience: string;
  startDate: Date;
  endDate: Date;
  status: "planning" | "active" | "completed";
  contentCount: number;
}

interface Audience {
  id: string;
  name: string;
  demographics: string;
  interests: string[];
  size: string;
}

export default function Strategy() {
  const { brainDocuments } = useDemoStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddingCampaign, setIsAddingCampaign] = useState(false);
  const [isAddingAudience, setIsAddingAudience] = useState(false);
  const [activeTab, setActiveTab] = useState("foundation");
  
  // Get strategy-related documents
  const strategyDocs = brainDocuments.filter(
    doc => doc.active && (
      doc.category === 'Strategic Foundation' || 
      doc.category === 'Content Strategy' ||
      doc.category === 'Market Intelligence'
    )
  );
  const { brainDocuments } = useDemoStore();
  
  // Check if foundation strategy exists
  const hasFoundation = brainDocuments.some(doc => 
    doc.category === 'Strategic Foundation' && (doc.name === 'Foundation Strategy' || doc.name.includes('Profile'))
  );
  
  // Check if playbooks exist
  const hasPlaybooks = brainDocuments.some(doc => 
    doc.category === 'Content Strategy' && doc.fileType === 'Playbook'
  );

  // Mock data
  const [contentItems] = useState<ContentItem[]>([
    {
      id: "1",
      title: "AI in Healthcare Blog Post",
      type: "Blog",
      status: "scheduled",
      date: new Date(2025, 10, 15),
      campaign: "Healthcare Series",
    },
    {
      id: "2",
      title: "Product Launch Announcement",
      type: "Social",
      status: "review",
      campaign: "Q4 Launch",
    },
    {
      id: "3",
      title: "Customer Success Story",
      type: "Case Study",
      status: "draft",
    },
    {
      id: "4",
      title: "Industry Trends Report",
      type: "Report",
      status: "ideation",
    },
  ]);

  const [campaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Healthcare Series",
      goal: "Establish thought leadership in healthcare AI",
      audience: "Healthcare Professionals",
      startDate: new Date(2025, 10, 1),
      endDate: new Date(2025, 11, 31),
      status: "active",
      contentCount: 12,
    },
    {
      id: "2",
      name: "Q4 Launch",
      goal: "Generate awareness for new product",
      audience: "Tech Decision Makers",
      startDate: new Date(2025, 9, 15),
      endDate: new Date(2025, 10, 30),
      status: "active",
      contentCount: 8,
    },
  ]);

  const [audiences] = useState<Audience[]>([
    {
      id: "1",
      name: "Healthcare Professionals",
      demographics: "Ages 30-55, Healthcare Industry",
      interests: ["Medical Technology", "AI", "Healthcare Innovation"],
      size: "50K-100K",
    },
    {
      id: "2",
      name: "Tech Decision Makers",
      demographics: "Ages 35-60, C-Level & Directors",
      interests: ["Technology", "Innovation", "Business Strategy"],
      size: "100K-250K",
    },
  ]);

  const getStatusIcon = (status: ContentItem["status"]) => {
    switch (status) {
      case "ideation":
        return <Circle className="h-4 w-4 text-muted-foreground" />;
      case "draft":
        return <Clock className="h-4 w-4 text-warning" />;
      case "review":
        return <AlertCircle className="h-4 w-4 text-info" />;
      case "scheduled":
        return <CalendarIcon className="h-4 w-4 text-primary" />;
      case "published":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
    }
  };

  const getStatusBadge = (status: ContentItem["status"]) => {
    const variants: Record<ContentItem["status"], any> = {
      ideation: "secondary",
      draft: "warning",
      review: "info",
      scheduled: "default",
      published: "success",
    };
    return (
      <Badge variant={variants[status]} className="gap-1">
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Strategy Room</h1>
          <p className="text-muted-foreground">
            Build your strategic foundation, create playbooks, and plan your content
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="foundation" className="gap-2">
            <Building className="h-4 w-4" />
            Foundation
            {!hasFoundation && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">New</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="playbooks" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Playbooks
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="gap-2">
            <Megaphone className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
        </TabsList>

        {/* Foundation Tab */}
        <TabsContent value="foundation" className="space-y-6 mt-6">
          {!hasFoundation ? (
            <Card className="p-6 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <Building className="h-12 w-12 text-primary mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Start with Your Foundation</h3>
                  <p className="text-sm text-muted-foreground">
                    Build your strategic foundation first, or use Quick Onboarding to get started in minutes.
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <QuickOnboard />
                </div>
              </div>
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
          {!hasPlaybooks && !hasFoundation ? (
            <Card className="p-6 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Foundation Required</h3>
                  <p className="text-sm text-muted-foreground">
                    Create your strategic foundation first to generate outcome-focused playbooks.
                  </p>
                </div>
                <Button onClick={() => setActiveTab("foundation")}>
                  Go to Foundation
                </Button>
              </div>
            </Card>
          ) : (
            <PlaybookWizard />
          )}
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6 mt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 hover:shadow-lg transition-shadow">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className={cn("rounded-md border-0 pointer-events-auto")}
              />
            </Card>

            <div className="space-y-4">
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-3">
                  {format(selectedDate, "MMMM d, yyyy")}
                </h3>
                <div className="space-y-2">
                  {contentItems
                    .filter(
                      (item) =>
                        item.date &&
                        format(item.date, "yyyy-MM-dd") ===
                          format(selectedDate, "yyyy-MM-dd")
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all cursor-pointer animate-scale-in"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-sm">{item.title}</p>
                          {getStatusBadge(item.status)}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.type}</p>
                        {item.campaign && (
                          <Badge variant="outline" className="mt-2">
                            {item.campaign}
                          </Badge>
                        )}
                      </div>
                    ))}
                  {contentItems.filter(
                    (item) =>
                      item.date &&
                      format(item.date, "yyyy-MM-dd") ===
                        format(selectedDate, "yyyy-MM-dd")
                  ).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No content scheduled for this date
                    </p>
                  )}
                </div>
                <Button variant="outline" className="w-full mt-4 gap-2 hover-scale">
                  <Plus className="h-4 w-4" />
                  Schedule Content
                </Button>
              </Card>
            </div>
          </div>
        </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6 mt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Campaigns</h2>
              <p className="text-sm text-muted-foreground">
                Manage your content campaigns
              </p>
            </div>
            <Dialog open={isAddingCampaign} onOpenChange={setIsAddingCampaign}>
              <DialogTrigger asChild>
                <Button className="gap-2 hover-scale">
                  <Plus className="h-4 w-4" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="animate-scale-in">
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                  <DialogDescription>
                    Set up a new content campaign with goals and timeline
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Campaign Name</Label>
                    <Input placeholder="e.g., Q1 Product Launch" />
                  </div>
                  <div className="space-y-2">
                    <Label>Goal</Label>
                    <Textarea
                      placeholder="What do you want to achieve with this campaign?"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {audiences.map((aud) => (
                          <SelectItem key={aud.id} value={aud.id}>
                            {aud.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingCampaign(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddingCampaign(false)}>
                    Create Campaign
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="p-6 hover:shadow-lg transition-all hover-scale cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Megaphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <Badge
                        variant={
                          campaign.status === "active"
                            ? "success"
                            : campaign.status === "planning"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {campaign.goal}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Audience:</span>
                    <span className="font-medium">{campaign.audience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">
                      {format(campaign.startDate, "MMM d")} -{" "}
                      {format(campaign.endDate, "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Content:</span>
                    <span className="font-medium">{campaign.contentCount} pieces</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 hover-scale">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 hover-scale">
                    Add Content
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
