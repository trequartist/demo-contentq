import { useState } from "react";
import { useDemoStore } from "@/stores/demoStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Brain,
  Search,
  Target,
  FileEdit,
  CheckCircle2,
  Activity,
  ChevronUp,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const agentIcons = {
  Research: Search,
  Strategist: Target,
  Copywriter: FileEdit,
  Editor: CheckCircle2,
  Analyst: Brain,
};

const agentDots = {
  Research: "bg-blue-500",
  Strategist: "bg-purple-500",
  Copywriter: "bg-primary",
  Editor: "bg-orange-500",
  Analyst: "bg-pink-500",
};

const agentColors = {
  Research: "text-blue-500",
  Strategist: "text-purple-500",
  Copywriter: "text-primary",
  Editor: "text-orange-500",
  Analyst: "text-pink-500",
};

export function ContentQStatus() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { activeAgents, agentHistory, showAgentDetails } = useDemoStore();
  
  const hasActiveWork = activeAgents.length > 0;
  
  if (!hasActiveWork) return null;
  
  return (
    <>
      {/* Status Card - Floating */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "flex items-center gap-4 px-5 py-3",
          "rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-lg",
          "transition-all duration-300 animate-slide-in"
        )}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center gap-2",
              hasActiveWork && "animate-pulse"
            )}>
              <Activity className={cn(
                "h-4 w-4",
                hasActiveWork ? "text-primary" : "text-muted-foreground"
              )} />
              <span className="text-sm font-medium">
                {hasActiveWork ? "ContentQ Working" : "ContentQ Idle"}
              </span>
            </div>
            
            {hasActiveWork && (
              <>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-3">
                  {activeAgents.map((agent) => {
                    const dotColor = agentDots[agent.agent];
                    return (
                      <div 
                        key={agent.agent}
                        className="flex items-center gap-1.5"
                        title={`${agent.agent}: ${agent.task}`}
                      >
                        <div className={cn(
                          "h-2 w-2 rounded-full animate-pulse-subtle",
                          dotColor
                        )} />
                        <span className="text-xs text-muted-foreground">{agent.agent}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="text-xs"
          >
            <span>View Details</span>
            <ChevronUp className="ml-1 h-3 w-3" />
          </Button>
        </div>
        
        {/* Active Tasks Preview */}
        {hasActiveWork && activeAgents.length > 0 && (
          <div className="border-t border-border/50 bg-muted/30 px-4 py-1">
            <div className="container mx-auto">
              <p className="text-xs text-muted-foreground truncate">
                {activeAgents[0].task}
                {activeAgents.length > 1 && ` (+${activeAgents.length - 1} more)`}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Expanded Details Sheet */}
      <Sheet open={isExpanded} onOpenChange={setIsExpanded}>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Agent Activity</SheetTitle>
            <SheetDescription>
              See what ContentQ agents are working on and their recent activity
            </SheetDescription>
          </SheetHeader>
          
          <ScrollArea className="h-[calc(80vh-120px)] mt-6">
            <div className="space-y-6 pr-4">
              {/* Active Agents */}
              {activeAgents.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary animate-pulse" />
                    Currently Working
                  </h3>
                  <div className="space-y-3">
                    {activeAgents.map((agent) => {
                      const Icon = agentIcons[agent.agent];
                      return (
                        <Card key={agent.agent}>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <Icon className={cn("h-5 w-5", agentColors[agent.agent])} />
                                <CardTitle className="text-base">{agent.agent}</CardTitle>
                              </div>
                              <Badge variant="secondary" className="animate-pulse">
                                Working
                              </Badge>
                            </div>
                            <CardDescription className="text-sm mt-1">
                              {agent.task}
                            </CardDescription>
                          </CardHeader>
                          
                          {showAgentDetails && agent.reasoning && (
                            <CardContent>
                              <div className="rounded-lg bg-muted p-3">
                                <p className="text-xs font-medium text-muted-foreground mb-1">
                                  Reasoning:
                                </p>
                                <p className="text-sm">{agent.reasoning}</p>
                              </div>
                              {agent.startedAt && (
                                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Started {formatDistanceToNow(agent.startedAt, { addSuffix: true })}
                                </p>
                              )}
                            </CardContent>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Recent Activity */}
              {agentHistory.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {agentHistory.slice(0, 10).map((agent, idx) => {
                      const Icon = agentIcons[agent.agent];
                      return (
                        <Card key={`${agent.agent}-${idx}`} className="bg-muted/30">
                          <CardHeader className="py-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <Icon className={cn("h-4 w-4", agentColors[agent.agent])} />
                                <div>
                                  <CardTitle className="text-sm">{agent.agent}</CardTitle>
                                  <CardDescription className="text-xs mt-0.5">
                                    {agent.task}
                                  </CardDescription>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                Completed
                              </Badge>
                            </div>
                            {agent.completedAt && (
                              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDistanceToNow(agent.completedAt, { addSuffix: true })}
                              </p>
                            )}
                          </CardHeader>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {activeAgents.length === 0 && agentHistory.length === 0 && (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No agent activity yet
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
