import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { SavedReport } from "@/data/researchData";

interface ReportCardProps {
  report: SavedReport;
  onView: () => void;
}

const reportTypeLabels = {
  diagnostics: 'Initial Diagnostics',
  deepdive: 'Quarterly Deep-Dive',
  competitive: 'Competitive Intelligence',
};

const reportTypeColors = {
  diagnostics: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  deepdive: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  competitive: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

export function ReportCard({ report, onView }: ReportCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base">{report.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={reportTypeColors[report.type]} variant="secondary">
                  {reportTypeLabels[report.type]}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(report.createdAt, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="text-sm">
          {report.summary}
        </CardDescription>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{report.sections.length} sections</span>
        </div>
        
        <Button onClick={onView} size="sm" className="w-full gap-2">
          <Eye className="h-4 w-4" />
          View Report
        </Button>
      </CardContent>
    </Card>
  );
}
