import { useDemoStore } from "@/stores/demoStore";
import { getDocumentsByCategory } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Brain as BrainIcon,
  Target,
  BookOpen,
  Package,
  TrendingUp,
  Palette,
  Search,
  Upload,
  FileText,
  MoreVertical,
  Eye,
  Power,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const categoryIcons = {
  'Strategic Foundation': Target,
  'Content Strategy': BookOpen,
  'Product Knowledge': Package,
  'Market Intelligence': TrendingUp,
  'Brand Assets': Palette,
};

const categoryColors = {
  'Strategic Foundation': 'text-purple-500',
  'Content Strategy': 'text-blue-500',
  'Product Knowledge': 'text-green-500',
  'Market Intelligence': 'text-orange-500',
  'Brand Assets': 'text-pink-500',
};

export default function Brain() {
  const { brainDocuments, toggleDocumentActive } = useDemoStore();
  
  const activeCount = brainDocuments.filter(doc => doc.active).length;
  const lastUpdate = brainDocuments.length > 0 
    ? formatDistanceToNow(brainDocuments[0].uploadedAt, { addSuffix: true })
    : 'Never';
  
  const categories = [
    'Strategic Foundation',
    'Content Strategy',
    'Product Knowledge',
    'Market Intelligence',
    'Brand Assets',
  ] as const;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BrainIcon className="h-8 w-8 text-primary" />
          <h1 className="text-display">Marketing Brain</h1>
        </div>
        <p className="text-body text-muted-foreground">
          Your centralized knowledge base that powers all ContentQ agents with context about your business,
          products, and strategy.
        </p>
        
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{brainDocuments.length}</div>
              <p className="text-xs text-muted-foreground">Total Documents</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{activeCount}</div>
              <p className="text-xs text-muted-foreground">Active Contexts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{lastUpdate}</div>
              <p className="text-xs text-muted-foreground">Last Updated</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Search and Upload */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-9"
          />
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Documents
        </Button>
      </div>
      
      {/* Document Categories */}
      <div className="space-y-6">
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          const docs = getDocumentsByCategory(category);
          
          if (docs.length === 0) return null;
          
          return (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon className={cn("h-5 w-5", categoryColors[category])} />
                <h2 className="text-lg font-semibold">{category}</h2>
                <Badge variant="secondary" className="ml-2">
                  {docs.length}
                </Badge>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {docs.map((doc) => (
                  <Card key={doc.id} className={cn(
                    "transition-all duration-200 hover:shadow-md",
                    doc.active && "border-primary/50 bg-primary/5"
                  )}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-sm font-medium truncate flex items-center gap-2">
                            <FileText className="h-4 w-4 flex-shrink-0" />
                            {doc.name}
                          </CardTitle>
                          <CardDescription className="text-xs mt-1">
                            {doc.fileType} • {formatDistanceToNow(doc.uploadedAt, { addSuffix: true })}
                          </CardDescription>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Summary
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleDocumentActive(doc.id)}>
                              <Power className="mr-2 h-4 w-4" />
                              {doc.active ? 'Deactivate' : 'Activate'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Use in Content
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {doc.summary && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                          {doc.summary}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={doc.active ? "default" : "outline"} 
                          className="text-xs"
                        >
                          {doc.active ? (
                            <>
                              <Power className="mr-1 h-3 w-3" />
                              Active
                            </>
                          ) : (
                            'Inactive'
                          )}
                        </Badge>
                        
                        {doc.processed && (
                          <Badge variant="secondary" className="text-xs">
                            Processed
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Empty State */}
      {brainDocuments.length === 0 && (
        <div className="text-center py-12">
          <BrainIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Documents Yet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Upload documents to build your Marketing Brain and empower ContentQ agents
          </p>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Your First Document
          </Button>
        </div>
      )}
    </div>
  );
}
