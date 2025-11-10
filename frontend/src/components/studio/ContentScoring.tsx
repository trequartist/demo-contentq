import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Target,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentScoringProps {
  type: 'blog' | 'linkedin';
  content: string;
  title?: string;
}

interface ScoreMetric {
  label: string;
  score: number;
  status: 'good' | 'warning' | 'poor';
  suggestion?: string;
}

export function ContentScoring({ type, content, title = "" }: ContentScoringProps) {
  const [overallScore, setOverallScore] = useState(0);
  const [metrics, setMetrics] = useState<ScoreMetric[]>([]);
  
  useEffect(() => {
    // Debounce the calculation
    const timer = setTimeout(() => {
      if (type === 'blog') {
        calculateBlogScore(content, title);
      } else {
        calculateLinkedInScore(content);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [content, title, type]);
  
  const calculateBlogScore = (text: string, titleText: string) => {
    const wordCount = text.trim().split(/\s+/).length;
    const hasKeywords = /\b(AI|healthcare|patient|technology|data|innovation)\b/gi.test(text);
    const hasHeadings = /^#{1,3}\s/gm.test(text);
    const hasLists = /^[\*\-\d]\s/gm.test(text);
    const hasLinks = /\[.+\]\(.+\)/g.test(text);
    const titleLength = titleText.length;
    
    // Calculate individual metrics
    const lengthScore = Math.min(100, (wordCount / 1500) * 100);
    const keywordScore = hasKeywords ? 85 : 45;
    const structureScore = (hasHeadings ? 40 : 0) + (hasLists ? 30 : 0) + (hasLinks ? 30 : 0);
    const titleScore = titleLength >= 40 && titleLength <= 70 ? 90 : 60;
    const readabilityScore = wordCount > 300 ? 80 : 50;
    
    // Calculate overall score
    const overall = Math.round(
      (lengthScore * 0.25) + 
      (keywordScore * 0.25) + 
      (structureScore * 0.2) + 
      (titleScore * 0.15) + 
      (readabilityScore * 0.15)
    );
    
    setOverallScore(Math.min(95, overall)); // Cap at 95 for realism
    
    setMetrics([
      {
        label: "Content Length",
        score: Math.round(lengthScore),
        status: lengthScore >= 70 ? 'good' : lengthScore >= 50 ? 'warning' : 'poor',
        suggestion: lengthScore < 70 ? `Add ${Math.round((1500 - wordCount) * 0.7)} more words for optimal length` : undefined,
      },
      {
        label: "SEO Keywords",
        score: Math.round(keywordScore),
        status: hasKeywords ? 'good' : 'warning',
        suggestion: !hasKeywords ? "Include relevant keywords naturally in your content" : undefined,
      },
      {
        label: "Structure & Formatting",
        score: Math.round(structureScore),
        status: structureScore >= 70 ? 'good' : structureScore >= 50 ? 'warning' : 'poor',
        suggestion: !hasHeadings ? "Add headings to improve readability" : undefined,
      },
      {
        label: "Title Optimization",
        score: Math.round(titleScore),
        status: titleScore >= 80 ? 'good' : 'warning',
        suggestion: titleLength < 40 ? "Title could be more descriptive" : titleLength > 70 ? "Title is a bit long" : undefined,
      },
      {
        label: "Readability",
        score: Math.round(readabilityScore),
        status: readabilityScore >= 70 ? 'good' : 'warning',
        suggestion: wordCount < 300 ? "Add more content for better context" : undefined,
      },
    ]);
  };
  
  const calculateLinkedInScore = (text: string) => {
    const length = text.length;
    const hasEmojis = /[\u{1F300}-\u{1F9FF}]/gu.test(text);
    const hasHashtags = /#\w+/g.test(text);
    const hasBullets = /[•→▸]/g.test(text) || /^\s*[\*\-]/gm.test(text);
    const hasQuestion = /\?/g.test(text);
    const lineBreaks = (text.match(/\n/g) || []).length;
    const hasCallToAction = /(comment|DM|link|connect|share|thoughts)/gi.test(text);
    
    // Calculate individual metrics
    const lengthScore = length >= 150 && length <= 1500 ? 90 : length < 150 ? 50 : 70;
    const engagementScore = (hasEmojis ? 25 : 0) + (hasQuestion ? 25 : 0) + (hasCallToAction ? 30 : 0) + (hasBullets ? 20 : 0);
    const formattingScore = lineBreaks >= 5 ? 85 : lineBreaks >= 3 ? 70 : 50;
    const hashtagScore = hasHashtags ? 90 : 40;
    
    // Calculate overall score
    const overall = Math.round(
      (lengthScore * 0.25) + 
      (engagementScore * 0.35) + 
      (formattingScore * 0.2) + 
      (hashtagScore * 0.2)
    );
    
    setOverallScore(Math.min(95, overall));
    
    setMetrics([
      {
        label: "Post Length",
        score: Math.round(lengthScore),
        status: lengthScore >= 80 ? 'good' : lengthScore >= 60 ? 'warning' : 'poor',
        suggestion: length < 150 ? "Add more context for better engagement" : length > 1500 ? "Consider shortening for better readability" : undefined,
      },
      {
        label: "Engagement Triggers",
        score: Math.round(engagementScore),
        status: engagementScore >= 70 ? 'good' : engagementScore >= 50 ? 'warning' : 'poor',
        suggestion: !hasCallToAction ? "Add a call-to-action to encourage engagement" : !hasQuestion ? "Questions increase comment rates" : undefined,
      },
      {
        label: "Mobile Formatting",
        score: Math.round(formattingScore),
        status: formattingScore >= 70 ? 'good' : 'warning',
        suggestion: lineBreaks < 5 ? "Add more line breaks for mobile readability" : undefined,
      },
      {
        label: "Discoverability",
        score: Math.round(hashtagScore),
        status: hasHashtags ? 'good' : 'poor',
        suggestion: !hasHashtags ? "Add 3-5 relevant hashtags to increase reach" : undefined,
      },
    ]);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };
  
  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Work";
    return "Poor";
  };
  
  const getStatusIcon = (status: string) => {
    if (status === 'good') return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    return <AlertCircle className="h-4 w-4 text-orange-600" />;
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>
              {type === 'blog' ? 'AEO/SEO Score' : 'Algorithm Optimization Score'}
            </CardTitle>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            <span className={cn("font-bold", getScoreColor(overallScore))}>
              {overallScore}
            </span>
            <span className="text-muted-foreground">/100</span>
          </Badge>
        </div>
        <CardDescription>
          {type === 'blog' 
            ? 'Optimized for Answer Engine and Search Engine visibility'
            : 'Optimized for LinkedIn algorithm and engagement'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Overall Score Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Overall Score</span>
            <span className={cn("font-semibold", getScoreColor(overallScore))}>
              {getScoreStatus(overallScore)}
            </span>
          </div>
          <Progress value={overallScore} className="h-3" />
        </div>
        
        <Separator />
        
        {/* Individual Metrics */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">Breakdown</h4>
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(metric.status)}
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className={cn("text-sm font-semibold", getScoreColor(metric.score))}>
                  {metric.score}
                </span>
              </div>
              <Progress value={metric.score} className="h-1.5" />
              {metric.suggestion && (
                <p className="text-xs text-muted-foreground ml-6">
                  💡 {metric.suggestion}
                </p>
              )}
            </div>
          ))}
        </div>
        
        {/* Quick Stats */}
        {type === 'blog' && (
          <>
            <Separator />
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Words</div>
                <div className="text-lg font-semibold">
                  {content.trim().split(/\s+/).length}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Read Time</div>
                <div className="text-lg font-semibold">
                  {Math.ceil(content.trim().split(/\s+/).length / 200)} min
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Headings</div>
                <div className="text-lg font-semibold">
                  {(content.match(/^#{1,3}\s/gm) || []).length}
                </div>
              </div>
            </div>
          </>
        )}
        
        {type === 'linkedin' && (
          <>
            <Separator />
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Characters</div>
                <div className="text-lg font-semibold">{content.length}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Hashtags</div>
                <div className="text-lg font-semibold">
                  {(content.match(/#\w+/g) || []).length}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Emojis</div>
                <div className="text-lg font-semibold">
                  {(content.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length}
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
