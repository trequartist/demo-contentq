import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Globe, Sparkles, CheckCircle2, User, Building } from "lucide-react";
import { useDemoStore, useSimulateAgentWork } from "@/stores/demoStore";
import { mockPersonalProfile, mockCompanyProfile } from "@/data/strategyData";
import { toast } from "sonner";

export function QuickOnboard() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProfiles, setShowProfiles] = useState(false);
  const { addDocument } = useDemoStore();
  const { simulateWork } = useSimulateAgentWork();

  const handleCreate = async () => {
    if (!linkedinUrl && !websiteUrl) {
      toast.error("Please provide at least one URL");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate Research Agent analyzing
    await simulateWork(
      'Research',
      'Analyzing profiles and building context...',
      2500,
      'Extracting key information from LinkedIn profile and company website. Identifying expertise, brand voice, and strategic positioning.'
    );

    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setShowProfiles(true);
      setIsProcessing(false);
    }, 2500);
  };

  const handleSaveProfiles = () => {
    // Save personal profile
    addDocument({
      id: 'profile-personal-' + Date.now(),
      name: `${mockPersonalProfile.name} - Personal Profile`,
      category: 'Strategic Foundation',
      uploadedAt: new Date(),
      processed: true,
      active: true,
      summary: mockPersonalProfile.bio,
      fileType: 'Profile',
    });

    // Save company profile
    addDocument({
      id: 'profile-company-' + Date.now(),
      name: `${mockCompanyProfile.name} - Company Profile`,
      category: 'Strategic Foundation',
      uploadedAt: new Date(),
      processed: true,
      active: true,
      summary: mockCompanyProfile.description,
      fileType: 'Profile',
    });

    toast.success("Profiles saved to Marketing Brain!");
  };

  if (showProfiles) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Review Your Profiles</h2>
          <p className="text-sm text-muted-foreground mt-1">
            We've created strategic profiles to power your content
          </p>
        </div>

        {/* Personal Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{mockPersonalProfile.name}</CardTitle>
                  <CardDescription>{mockPersonalProfile.title} at {mockPersonalProfile.company}</CardDescription>
                </div>
              </div>
              <Badge variant="secondary">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Processed
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">{mockPersonalProfile.bio}</p>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Expertise:</p>
              <div className="flex flex-wrap gap-1.5">
                {mockPersonalProfile.expertise.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Content Focus:</p>
              <p className="text-sm">{mockPersonalProfile.contentFocus.join(', ')}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Tone:</p>
              <p className="text-sm">{mockPersonalProfile.tone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Company Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{mockCompanyProfile.name}</CardTitle>
                  <CardDescription>{mockCompanyProfile.industry}</CardDescription>
                </div>
              </div>
              <Badge variant="secondary">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Processed
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">{mockCompanyProfile.description}</p>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Differentiators:</p>
              <ul className="space-y-1">
                {mockCompanyProfile.differentiators.map((diff, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {diff}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Products:</p>
              <div className="space-y-2">
                {mockCompanyProfile.products.map((product, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="font-medium">{product.name}:</span> {product.description}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => setShowProfiles(false)}>
            Start Over
          </Button>
          <Button onClick={handleSaveProfiles} size="lg" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Save to Marketing Brain
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Quick Onboarding</h2>
        <p className="text-muted-foreground">
          Get started in minutes. We'll analyze your profiles and build your strategic foundation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Provide Your Context</CardTitle>
          <CardDescription>
            Share your LinkedIn profile and company website for AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isProcessing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                <div className="flex gap-2">
                  <Linkedin className="h-5 w-5 text-muted-foreground mt-2.5" />
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <div className="flex gap-2">
                  <Globe className="h-5 w-5 text-muted-foreground mt-2.5" />
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://your-company.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                </div>
              </div>

              <Button
                onClick={handleCreate}
                size="lg"
                className="w-full gap-2 mt-4"
                disabled={!linkedinUrl && !websiteUrl}
              >
                <Sparkles className="h-4 w-4" />
                Create Profiles
              </Button>
            </>
          ) : (
            <div className="space-y-4 py-8">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  <span className="font-medium">Research Agent analyzing...</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Extracting insights from your profiles
                </p>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                This usually takes 20-30 seconds
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">What we'll create:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Personal profile with expertise and content focus</li>
                <li>• Company profile with positioning and differentiators</li>
                <li>• Strategic context for all your content</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
