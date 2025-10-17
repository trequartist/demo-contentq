"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CreatorShell } from '@/components/demo/creator/CreatorShell';
import { ChatPanel } from '@/components/demo/creator/ChatPanel';
import { OutputPanel } from '@/components/demo/creator/OutputPanel';
import { useCreatorStore } from '@/lib/demo/creator/store';
import {
  CreatorTab,
  PlaybookStrategy,
  PostTopic,
  DiagnosticsMode,
  PlaybookMode,
  ContentMode,
} from '@/lib/demo/creator/types';
import diagnosticsData from '@/usableclientdata/data/diagnostics/diagnostics-gumloop-v2.json';
import playbookData from '@/usableclientdata/data/playbook/playbook-gumloop.json';
import { CalendarModal } from '@/components/demo/creator/posts/CalendarModal';
import { DocumentsPanel } from '@/components/demo/creator/posts/DocumentsPanel';
import insightsHubData from '@/usableclientdata/data/insights/insights-hub.json';
// Selection/editing components now render in the right preview panel only

export default function CreatorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showDocumentsPanel, setShowDocumentsPanel] = useState(false);
  
  const {
    activeTab,
    sessions,
    modes,
    setActiveTab,
    setMode,
    addMessage,
    setOutputState,
    setDiagnosticsOutput,
    setPlaybookStrategies,
    setSelectedStrategies,
    setPlaybookOutput,
    setPostOutput,
    setIntermediateSteps,
  } = useCreatorStore();

  // Handle tab from URL
  useEffect(() => {
    const tabParam = searchParams?.get('tab') as CreatorTab | null;
    if (tabParam && ['diagnostics', 'playbook', 'posts'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams, setActiveTab]);

  const handleTabChange = (tab: CreatorTab) => {
    setActiveTab(tab);
    router.push(`/demo/creator?tab=${tab}`);
  };

  const handleSendMessage = async (text: string) => {
    const timestamp = new Date().toISOString();

    // Add user message
    addMessage(activeTab, {
      id: crypto.randomUUID(),
      role: 'user',
      text,
      timestamp,
    });

    // Route to appropriate workflow
    if (activeTab === 'diagnostics') {
      await handleDiagnosticsFlow(text);
    } else if (activeTab === 'playbook') {
      await handlePlaybookFlow(text);
    } else if (activeTab === 'posts') {
      await handlePostsFlow(text);
    }
  };

  // DIAGNOSTICS WORKFLOW
  const handleDiagnosticsFlow = async (userMessage: string) => {
    const session = sessions.diagnostics;
    const mode = modes.diagnostics;

    // If already complete, reset and regenerate
    if (session.outputState === 'complete') {
      setIntermediateSteps('diagnostics', []);
      setDiagnosticsOutput(undefined as any);
    }

    if (mode === 'insights') {
      setOutputState('diagnostics', 'processing');

      addMessage('diagnostics', {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: 'Pulling key insights and narrative highlights...',
        timestamp: new Date().toISOString(),
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For insights mode, ONLY set insights data, no diagnostics
      const insightsOutput = {
        insightsData: insightsHubData as any,
      };
      setDiagnosticsOutput({ ...insightsOutput, variant: 'insights' });
      setOutputState('diagnostics', 'complete');

      addMessage('diagnostics', {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: 'Insights are live! Explore the stories and recommendations above.',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    setOutputState('diagnostics', 'streaming');

    addMessage('diagnostics', {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: 'Starting diagnostics analysis...',
      timestamp: new Date().toISOString(),
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setOutputState('diagnostics', 'processing');
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Use real diagnostics data - ONLY diagnostics, no insights
    setDiagnosticsOutput(diagnosticsData.data);
    setOutputState('diagnostics', 'complete');

    addMessage('diagnostics', {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: 'Diagnostics complete! Review your results above.',
      timestamp: new Date().toISOString(),
    });
  };

  // PLAYBOOK WORKFLOW
  const handlePlaybookFlow = async (userMessage: string) => {
    const session = sessions.playbook;
    const mode = modes.playbook;

    // If already complete, reset and regenerate
    if (session.outputState === 'complete') {
      setIntermediateSteps('playbook', []);
      setPlaybookStrategies(undefined as any);
      setPlaybookOutput(undefined as any);
      setSelectedStrategies(undefined as any);
    }

    // CALENDAR MODE: Skip strategies, go straight to calendar view
    if (mode === 'calendar') {
      setOutputState('playbook', 'streaming');

      addMessage('playbook', {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: 'Building your campaign calendar with scheduled topics...',
        timestamp: new Date().toISOString(),
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Use calendar data directly
      const playbookOutput = {
        ...playbookData.data,
        selectedStrategies: [],
      };

      setPlaybookOutput(playbookOutput);
      setOutputState('playbook', 'complete');

      addMessage('playbook', {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: 'Your campaign calendar is ready! Browse topics and plan your content cadence.',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // PLAYBOOK MODE: Show strategies first
    if (!session.playbookStrategies) {
      setOutputState('playbook', 'streaming');

      addMessage('playbook', {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: 'Great! Let me suggest some strategies for your playbook...',
        timestamp: new Date().toISOString(),
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const strategies: PlaybookStrategy[] = [
        {
          id: 's1',
          title: 'Market Research & Validation',
          description: 'Conduct comprehensive market analysis, validate product-market fit, and identify target segments.',
          impact: 'high',
          effort: 'medium',
        },
        {
          id: 's2',
          title: 'Beta Program Strategy',
          description: 'Design and execute a beta testing program with early adopters to gather feedback and iterate.',
          impact: 'high',
          effort: 'medium',
        },
        {
          id: 's3',
          title: 'Multi-Channel Marketing Campaign',
          description: 'Launch coordinated marketing across social, content, PR, and paid channels.',
          impact: 'high',
          effort: 'high',
        },
        {
          id: 's4',
          title: 'Partnership & Integration Strategy',
          description: 'Build strategic partnerships and integrations to expand reach and credibility.',
          impact: 'medium',
          effort: 'medium',
        },
        {
          id: 's5',
          title: 'Community Building',
          description: 'Create and nurture a community around your product through forums, events, and engagement.',
          impact: 'medium',
          effort: 'low',
        },
      ];

      setPlaybookStrategies(strategies);
      setOutputState('playbook', 'awaiting_strategy');
    }
  };

  const handleStrategySelection = async (selectedIds: string[]) => {
    setSelectedStrategies(selectedIds);
    setOutputState('playbook', 'streaming');

    addMessage('playbook', {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: `Perfect! Generating your playbook with ${selectedIds.length} ${selectedIds.length === 1 ? 'strategy' : 'strategies'}...`,
      timestamp: new Date().toISOString(),
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Use real playbook data
    const playbookOutput = {
      ...playbookData.data,
      selectedStrategies: selectedIds,
    };

    setPlaybookOutput(playbookOutput);
    setOutputState('playbook', 'complete');

    const mode = modes.playbook;

    const completionText =
      mode === 'calendar'
        ? 'Your campaign cadence is live! Review the calendar above.'
        : 'Your playbook is ready! Review the steps above.';

    addMessage('playbook', {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: completionText,
      timestamp: new Date().toISOString(),
    });
  };

  // POSTS WORKFLOW
  const handlePostsFlow = async (userMessage: string) => {
    const session = sessions.posts;

    // If already complete, reset and regenerate
    if (session.outputState === 'complete') {
      setIntermediateSteps('posts', []);
      setPostOutput(undefined as any);
    }

    // Step 1: Generate topics (right panel)
    if (!session.postOutput?.topics) {
      setOutputState('posts', 'streaming');

      const mode = modes.posts;

      const introText =
        mode === 'optimize'
          ? 'Reviewing your existing asset and identifying upgrade opportunities...'
          : 'Analyzing your request and generating relevant topics...';

      addMessage('posts', {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: introText,
        timestamp: new Date().toISOString(),
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const topics: PostTopic[] = [
        {
          id: 't1',
          title: 'The Future of AI in Content Marketing',
          description: 'Explore how AI is transforming content creation, distribution, and optimization for modern marketers.',
          relevance: 0.95,
        },
        {
          id: 't2',
          title: 'Building a Content Strategy with AI',
          description: 'Step-by-step guide to leveraging AI tools for more effective content planning and execution.',
          relevance: 0.88,
        },
        {
          id: 't3',
          title: 'AI vs Human: The Perfect Content Balance',
          description: 'Finding the right mix of AI efficiency and human creativity in your content workflow.',
          relevance: 0.82,
        },
        {
          id: 't4',
          title: 'Scaling Content Production with AI',
          description: 'How to increase content output 10x while maintaining quality using AI-powered tools.',
          relevance: 0.79,
        },
      ];

      setPostOutput({ topics });
      setOutputState('posts', 'awaiting_topic');
    }
  };

  const handleTopicSelection = async (topic: PostTopic) => {
    setOutputState('posts', 'streaming');

    const mode = modes.posts;

    const briefText =
      mode === 'optimize'
        ? `Great! Surfacing improvement plan for "${topic.title}"...`
        : `Great choice! Generating content brief for "${topic.title}"...`;

    addMessage('posts', {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: briefText,
      timestamp: new Date().toISOString(),
    });

    const steps = [
      { id: '1', label: 'Analyzing topic', status: 'complete' as const },
      { id: '2', label: 'Researching content', status: 'running' as const },
      { id: '3', label: 'Creating brief', status: 'pending' as const },
    ];

    setIntermediateSteps('posts', steps);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const brief = {
      topic: topic.title,
      targetAudience: 'Marketing Professionals & Content Creators',
      audienceDetails: 'Mid-to-senior marketing leaders at B2B SaaS companies (50-500 employees) who are exploring AI tools to scale content production while managing lean teams. They are data-driven, skeptical of hype, and need practical frameworks over theoretical concepts.',
      keyMessages: [
        'AI augments human creativity rather than replacing it',
        'Efficiency gains of 3-5x without sacrificing quality',
        'Data-driven content decisions lead to better ROI',
        'The competitive advantage belongs to early, thoughtful adopters',
      ],
      tone: 'Professional, insightful, forward-thinking with a pragmatic edge',
      structure: ['Hook & Introduction', 'Current State Analysis', 'AI Benefits & Use Cases', 'Implementation Framework', 'Best Practices', 'Common Pitfalls to Avoid', 'Future Outlook', 'Call to Action'],
      seoKeywords: ['AI content marketing', 'content automation', 'AI writing tools', 'content strategy', 'marketing efficiency'],
      competitorAngles: [
        'Most competitors focus on tools; we focus on strategy and outcomes',
        'Differentiate with real data from 100+ marketing teams',
        'Address skepticism head-on with honest pros/cons analysis',
      ],
      researchNotes: [
        'Reference Gartner report: 80% of marketing leaders plan AI adoption by 2025',
        'Include case study: TechCo increased output 5x while reducing costs 40%',
        'Quote from CMO survey: "AI allows us to compete with teams 3x our size"',
        'Data point: AI-assisted content converts 23% better due to personalization',
      ],
      callouts: [
        'Sidebar: Quick-start AI content workflow for teams under 10',
        'Infographic: AI vs Human task breakdown',
        'Checklist: Is your team ready for AI content tools?',
      ],
    };

    setPostOutput({ topics: sessions.posts.postOutput?.topics, selectedTopic: topic, brief });
    setOutputState('posts', 'awaiting_brief');
  };

  const handleBriefConfirm = async (editedBrief: any) => {
    setOutputState('posts', 'streaming');

    const mode = modes.posts;

    const draftText =
      mode === 'optimize'
        ? 'Compiling optimized draft with enhancement annotations...'
        : 'Generating your content draft...';

    addMessage('posts', {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: draftText,
      timestamp: new Date().toISOString(),
    });

    const steps = [
      { id: '1', label: 'Brief finalized', status: 'complete' as const },
      { id: '2', label: 'Generating introduction', status: 'complete' as const },
      { id: '3', label: 'Writing main sections', status: 'running' as const },
      { id: '4', label: 'Adding conclusion', status: 'pending' as const },
    ];

    setIntermediateSteps('posts', steps);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const draft = {
      title: editedBrief.topic,
      sections: [
        {
          heading: 'Introduction: The AI Content Revolution',
          content: `The landscape of content marketing is undergoing a fundamental transformation. Artificial intelligence isn't just changing how we create content—it's redefining what's possible in terms of scale, personalization, and performance.

For marketing professionals and content creators, the question is no longer whether to adopt AI, but how to integrate it effectively into existing workflows while preserving the human touch that makes content resonate.

The numbers tell a compelling story. According to Gartner's 2024 Marketing Technology Survey, 80% of marketing leaders plan to adopt AI-powered content tools by the end of 2025. Yet only 23% report having a clear strategy for implementation. This gap represents both a challenge and an opportunity.

The early movers aren't just experimenting—they're seeing real results. Companies that have successfully integrated AI into their content workflows report average efficiency gains of 340%, with some high-performing teams achieving 5x improvements in output without compromising quality. These aren't hypothetical benefits; they're measurable outcomes from teams who've cracked the code on AI-human collaboration.

But here's what separates the winners from those still struggling: it's not about the tools. The marketing technology landscape is flooded with AI writing assistants, each promising to revolutionize your content game. The real differentiator is strategy—understanding where AI adds value, where human expertise remains irreplaceable, and how to orchestrate both for maximum impact.

This comprehensive guide draws on insights from over 100 marketing teams who've successfully scaled their content operations with AI. Whether you're leading a lean startup marketing team or managing content for an established B2B SaaS company, you'll find practical frameworks, honest assessments of what works (and what doesn't), and a roadmap for implementation that fits your unique context.`,
        },
        {
          heading: 'The Current State of Content Marketing',
          content: `Today's content creators face unprecedented challenges that traditional workflows simply can't address:\n\n**Volume Demands**: The average B2B company now publishes across 8-12 different channels, from blogs and social media to podcasts and video. Each channel demands regular, high-quality content. Marketing teams report that expected content output has increased 250% over the past three years while budgets have grown only 15%.\n\n**Personalization at Scale**: Generic, one-size-fits-all content no longer performs. Audiences expect personalization—content that speaks to their specific industry, role, challenges, and stage in the buyer journey. Creating truly personalized content manually for even modest audience segments quickly becomes impossible.\n\n**ROI Accountability**: Every piece of content now needs to demonstrate measurable business impact. Marketing teams spend an average of 12-15 hours per month just on performance analysis and reporting. The pressure to prove value often comes at the expense of creative work.\n\n**Attention Economics**: We're competing in the most oversaturated information environment in human history. The average professional encounters 10,000+ pieces of content daily. Breaking through requires not just quality, but strategic timing, distribution, and optimization that traditional manual processes can't support.\n\n**The Resource Paradox**: Research from the Content Marketing Institute shows that content teams spend 60-65% of their time on research, planning, coordination, and optimization—leaving only 35-40% for actual creative work. This inverted ratio makes scaling impossible without either sacrificing quality or dramatically increasing headcount.

Traditional content workflows weren't designed for this reality. The typical process—ideation meeting, research phase, outline creation, draft writing, multiple review rounds, optimization, publication—takes 20-40 hours per piece. For teams expected to publish 15-30 pieces monthly, the math simply doesn't work.

The result? Burnout, missed deadlines, declining quality, or all three. Marketing leaders report that content bottlenecks are now their #1 constraint on growth initiatives. The old model is broken, and incremental improvements won't fix it.`,
        },
        {
          heading: 'How AI Transforms Content Creation',
          content: `AI-powered tools are addressing these challenges head-on, but not in the ways most people assume. This isn't about robots writing your content—it's about intelligence augmentation that makes human creators more effective.\n\n**Speed & Efficiency: From Days to Hours**\n\nThe most immediate and measurable impact is speed. AI can generate a solid first draft in 3-5 minutes. But the real efficiency gain isn't in draft generation—it's in research and ideation. AI can analyze your top-performing content, identify patterns, suggest topics your audience will engage with, and even outline key points based on search intent and competitive analysis.\n\nOne mid-market SaaS company we studied reduced their content production timeline from 5 days to 6 hours. Their secret? Using AI for research synthesis, outline generation, and first drafts, then focusing human effort on strategic refinement, brand voice, and unique insights. The result: 5x more content with the same headcount, and quality scores (measured by engagement) actually improved 18%.\n\n**Data-Driven Insights: Let Performance Guide Creation**\n\nAI excels at pattern recognition. Feed it your analytics data, and it can identify which topics drive conversions, which formats keep readers engaged, which CTAs perform best for different audience segments, and even which headline structures generate the most clicks.\n\nThis capability transforms content from an art into a science—or more accurately, into an art informed by science. Instead of guessing what will resonate, you're working from data. Instead of repeating the same content types because "that's what we've always done," you're continuously optimizing based on what actually works.\n\nReal example: A B2B content team used AI analysis to discover that their "how-to" guides generated 4x more qualified leads than thought leadership pieces, despite leadership pieces getting more social shares. This insight led them to reallocate resources, resulting in a 67% increase in content-driven pipeline.\n\n**Consistency at Scale: Maintain Voice Across Hundreds of Pieces**\n\nBrand voice consistency becomes exponentially harder as you scale. With AI, you can train models on your best content to maintain tone, style, and messaging across everything you publish—whether it's your founding writer or a new contractor doing the work.\n\nThis isn't about making everything sound robotic. It's about ensuring that whether someone reads your LinkedIn post, blog article, or email newsletter, they experience the same brand personality and value proposition. The AI acts as a brand voice guardrail, flagging inconsistencies and suggesting adjustments.\n\n**Personalization Without the Manual Work**\n\nPerhaps AI's most powerful capability is generating variations. Write one core piece, then let AI create versions for different industries, company sizes, use cases, or buyer journey stages. What used to take a team days can now happen in minutes.\n\nA enterprise software company used this approach to transform their flagship ebook into 12 industry-specific versions. The personalized versions drove 156% higher conversion rates than the generic original, and the entire adaptation process took less than 4 hours of human time.\n\nThe key insight that successful teams have internalized: AI doesn't replace human creativity—it amplifies it. The AI handles research, first drafts, variations, and optimization suggestions. Humans provide strategy, unique insights, brand judgment, and the creative spark that makes content memorable.`,
        },
        {
          heading: 'Implementation Framework: Your 90-Day Roadmap',
          content: `Moving from traditional to AI-powered content workflows requires a structured approach. Based on implementations across 100+ marketing teams, here's a proven framework:\n\n**Phase 1: Foundation (Days 1-30)**\n\nStart with audit and definition. Document your current content process, identify bottlenecks, and set clear goals. What does success look like? Is it 3x more content? Better conversion rates? Reduced production costs? Both?\n\nSelect one content type to pilot. Don't try to transform everything at once. Most successful implementations start with blog posts or social content—high-volume, lower-risk areas where you can learn fast.\n\nChoose your tools deliberately. Evaluate 2-3 AI platforms based on your specific needs. Run the same content brief through each and compare results. Look beyond the demo—test with your actual use cases, your brand voice, your subject matter.\n\nEstablish quality baselines. How will you measure if AI-assisted content performs as well as human-only content? Set up tracking before you launch so you have data to evaluate.\n\n**Phase 2: Pilot & Iterate (Days 31-60)**\n\nRun a controlled pilot with one content stream. Create 5-10 pieces using your new AI-assisted workflow while maintaining your traditional process in parallel. This parallel approach lets you compare outcomes and builds confidence in the new system.\n\nMeasure rigorously. Track time savings, quality scores (both internal and audience metrics), and business outcomes. One team discovered their AI-assisted content actually outperformed traditional content on engagement, which accelerated adoption across the organization.\n\nRefine your prompts and process. The first pieces won't be perfect. That's expected. Each iteration teaches you how to brief the AI more effectively, where human editing adds most value, and how to maintain quality at speed.\n\n**Phase 3: Scale & Optimize (Days 61-90)**\n\nExpand to additional content types once you've proven the model. Apply learnings from your pilot to newsletters, case studies, whitepapers, or whatever content types matter most to your strategy.\n\nTrain your team comprehensively. The technology is useless if people don't know how to use it well. Invest in hands-on training, create internal best practices documentation, and celebrate early wins to drive adoption.\n\nBuild feedback loops. Set up systems to continuously analyze what's working. Which AI-generated topics drive the most engagement? Which sections need the most human editing? Where is the AI saving the most time? Use this data to keep improving.`,
        },
        {
          heading: 'Best Practices for AI-Powered Content',
          content: `Success with AI content tools isn't about the technology—it's about how you use it. Here are the practices that separate high-performing teams from those still struggling:\n\n**1. Start with Crystal-Clear Objectives and Audience Definitions**\n\nThe more specific your input, the better the output. Don't just say "write a blog post about AI." Specify: "Write a 1500-word blog post for mid-market SaaS CMOs who are skeptical about AI but feeling pressure to scale content production. Address their concerns about quality, provide specific ROI data, and include a realistic implementation timeline."\n\nSuccessful teams create detailed audience personas and content briefs that guide the AI. The brief becomes the quality control mechanism.\n\n**2. Use AI for Ideation and First Drafts, Not Final Output**\n\nThis might seem obvious, but it's worth emphasizing: AI output should never be your final output. The AI provides the structure, research synthesis, and rough content. Human creators add unique insights, brand personality, strategic positioning, and the editorial polish that turns content from "good" to "great."\n\nThink of AI as an incredibly fast junior writer who's done the research and created an outline with supporting points. You're the senior editor who shapes it into something that advances your strategic goals.\n\n**3. Maintain Human Editorial Oversight and Brand Alignment**\n\nEvery piece of AI-assisted content should go through human review focused on these questions:\n- Does this align with our brand voice and values?\n- Are we making claims we can support?\n- Have we added unique insights competitors can't copy?\n- Does this advance our strategic positioning?\n- Would we be proud to attach our name to this?\n\nOne company's practice: they run AI drafts through a "brand alignment checklist" before publication. It takes 10 minutes but catches subtle issues that would damage credibility.\n\n**4. Continuously Train AI on Your Best-Performing Content**\n\nYour AI tools get better when you feed them examples of what "good" looks like for your brand. Regularly update your reference content library with top performers. Share pieces that perfectly captured your voice. The AI learns from these examples and gets better at matching your style.\n\n**5. Measure, Iterate, and Share Learnings**\n\nTrack everything: time savings, quality metrics, engagement, conversions, SEO performance. Compare AI-assisted content against traditional content on the same metrics. Share wins (and lessons from failures) across your team.

The most successful implementations we've seen treat AI adoption as a continuous improvement process, not a one-time switch. They experiment constantly, share what works, and build institutional knowledge about how to maximize the tool's value for their specific context.`,
        },
        {
          heading: 'Common Pitfalls to Avoid',
          content: `Learning from others' mistakes can save you months of frustration. Here are the most common pitfalls in AI content adoption:\n\n**Pitfall #1: Expecting AI to Understand Your Strategy**\n\nAI is a tool, not a strategist. It can execute on a brief brilliantly, but it can't define your content strategy, identify your unique positioning, or make strategic trade-offs. Teams that succeed invest the time upfront to document their strategy, then use AI to execute it at scale.\n\n**Pitfall #2: Skipping the Human Edit**\n\nThe temptation to publish AI output directly is strong, especially when you're behind deadline. Resist it. AI-generated content without human refinement tends to be generic, potentially factually shaky, and missing the unique perspective that makes content worth reading.\n\nOne company published 20 AI-generated pieces with minimal editing. They got more content out faster, but engagement dropped 34% and three pieces contained embarrassing factual errors that damaged credibility. They spent six months rebuilding trust.\n\n**Pitfall #3: Using AI for Every Content Type**\n\nSome content benefits dramatically from AI assistance. Other types—like deeply personal founder stories, original research reports, or controversial thought leadership—need primarily human creation. Successful teams identify where AI adds most value and deploy it strategically rather than universally.\n\n**Pitfall #4: Neglecting Process Design**\n\nDropping an AI tool into a broken workflow just creates faster chaos. Before adopting AI, fix your content process. Clear briefs, defined approval flows, measurable quality standards—these fundamentals matter more than the technology.\n\n**Pitfall #5: Ignoring Content Differentiation**\n\nIf you're using AI to create content, assume your competitors are too. Many teams make the mistake of thinking AI-assisted content is inherently good enough. It's not. You still need unique data, proprietary insights, distinctive positioning, and original thinking. AI should amplify these differentiators, not replace them.`,
        },
        {
          heading: 'Future Outlook: Where AI Content is Heading',
          content: `The AI content tools available today are already powerful, but they're primitive compared to what's coming. Understanding the trajectory helps you prepare for what's next.\n\n**Multimodal Content Creation**\n\nThe next generation of AI will seamlessly create across formats. You'll brief once, and the AI will generate a blog post, a video script, social snippets, an email newsletter, and a podcast outline—all maintaining consistent messaging while optimizing for each channel's unique requirements. Early versions of this capability are already emerging.\n\n**Real-Time Personalization**\n\nStatic content will give way to dynamic content that adapts to each reader. Same URL, different content based on industry, company size, role, or behavior. AI will make this technically feasible at scale. The content marketing equivalent of personalized web experiences.\n\n**Continuous Optimization**\n\nAI will monitor content performance in real-time and suggest (or automatically implement) optimizations. Headlines that aren't clicking? The AI tests alternatives. Section that's causing reader drop-off? The AI rewrites it. CTA underperforming? New version deployed. Your content will improve continuously without manual intervention.\n\n**Strategy Intelligence**\n\nThe most exciting development: AI that doesn't just execute content strategy but helps formulate it. By analyzing market trends, competitor content, audience behavior, and business goals, AI will recommend content strategies, identify gaps in your coverage, and suggest opportunities you're missing.\n\n**What This Means for You**\n\nThe teams that start building AI-powered content capabilities now will have an insurmountable advantage in 18-24 months. The learning curve takes time, the process refinement requires iteration, and the organizational change management can't be rushed. Starting early matters.\n\nBut the opportunity window won't stay open forever. As AI content tools become ubiquitous, the competitive advantage shifts from "using AI" to "using AI exceptionally well." The sooner you start learning, the faster you'll reach that exceptional level.`,
        },
        {
          heading: 'Conclusion & Next Steps',
          content: `AI-powered content creation is no longer futuristic—it's essential for staying competitive. The teams that embrace these tools thoughtfully, maintaining quality while scaling production, will dominate their markets.\n\nThe evidence is overwhelming. Companies implementing AI content workflows report:\n- 340% average improvement in content production efficiency\n- 23% higher conversion rates due to increased personalization\n- 156% improvement in content-to-pipeline contribution\n- 40% reduction in content production costs\n- 67% of team members reporting lower burnout and higher job satisfaction\n\nBut perhaps most importantly, they report being able to compete effectively against companies with 3-5x larger marketing teams. AI democratizes content at scale.\n\n**Your Implementation Path**\n\nStart small and focused:\n\n**This Week**: Audit your current content process. Identify your biggest bottleneck—is it ideation, research, drafting, optimization, or something else? That's where AI will have the highest immediate impact.\n\n**Next 30 Days**: Select one content type for a pilot. Choose tools, create your process, and produce 5-10 pieces. Measure everything: time, quality, engagement, conversions.\n\n**Days 31-90**: Analyze pilot results, refine your approach, and expand to additional content types. Train your team, document best practices, and build internal expertise.\n\n**Beyond 90 Days**: Continuous optimization. What worked? What didn't? How can you push further? The teams seeing 5x improvements didn't get there overnight—they got there through consistent iteration and learning.\n\nThe future of content is here. The question isn't whether to adopt AI—it's whether you'll lead the transition or scramble to catch up later. The teams making the choice to lead, to learn, to experiment intelligently—they're the ones who'll own their markets two years from now.\n\nStart today. Start small. Start smart. The competitive advantage is yours to claim.`,
        },
      ],
    };

    const currentPostOutput = sessions.posts.postOutput || {};
    setPostOutput({ ...currentPostOutput, draft });
    setOutputState('posts', 'complete');

    const completionText =
      mode === 'optimize'
        ? 'Upgrade complete! Review the optimization plan above.'
        : 'Your content draft is ready! Review and edit as needed.';

    addMessage('posts', {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: completionText,
      timestamp: new Date().toISOString(),
    });
  };

  const handleCalendarTopicSelect = async (topic: any, subtopic: any) => {
    setShowCalendarModal(false);
    
    // Switch to posts tab
    setActiveTab('posts');
    router.push('/demo/creator?tab=posts');
    
    // Wait for tab switch
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Treat as topic selection from calendar - this will trigger brief generation
    await handleTopicSelection({
      id: subtopic.id,
      title: subtopic.title,
      description: subtopic.hook,
      relevance: 0.95,
    });
  };

  const currentSession = sessions[activeTab];

  return (
    <>
      {showCalendarModal && (
        <CalendarModal
          onSelectTopic={handleCalendarTopicSelect}
          onClose={() => setShowCalendarModal(false)}
        />
      )}

      {showDocumentsPanel && (
        <div className="fixed inset-0 z-50 bg-white">
          <DocumentsPanel
            onSelectDocument={(doc) => {
              setShowDocumentsPanel(false);
              // Could use document data to pre-fill or inspire new content
              addMessage('posts', {
                id: crypto.randomUUID(),
                role: 'assistant',
                text: `Selected document: "${doc.title}". Would you like to create similar content or continue it?`,
                timestamp: new Date().toISOString(),
              });
            }}
            onClose={() => setShowDocumentsPanel(false)}
          />
        </div>
      )}
      
      
    <CreatorShell
      activeTab={activeTab}
      onTabChange={handleTabChange}
      chatPanel={
        <ChatPanel
          activeTab={activeTab}
          messages={currentSession.messages}
          onSendMessage={handleSendMessage}
        />
      }
      previewPanel={
        <OutputPanel
          activeTab={activeTab}
          session={currentSession}
          onStartCreation={() => {
            if (activeTab === 'diagnostics') {
              const mode = modes.diagnostics;
              const prompt =
                mode === 'insights'
                  ? 'Reveal the most important insights from our diagnostics data'
                  : 'Run comprehensive diagnostics for my system';
              handleSendMessage(prompt);
            } else if (activeTab === 'playbook') {
              const mode = modes.playbook;
              const prompt =
                mode === 'calendar'
                  ? 'Build a four-week campaign calendar for this launch'
                  : 'I want to create a playbook for product launch';
              handleSendMessage(prompt);
            } else if (activeTab === 'posts') {
              const mode = modes.posts;
              const prompt =
                mode === 'optimize'
                  ? 'Help me improve our existing flagship blog post'
                  : 'I want to write a blog post about AI in content marketing';
              handleSendMessage(prompt);
            }
          }}
          onStrategyConfirm={handleStrategySelection}
          onPostTopicSelect={handleTopicSelection}
          onBriefConfirm={handleBriefConfirm}
          onBrowseCalendar={() => setShowCalendarModal(true)}
          onBrowseDocuments={() => setShowDocumentsPanel(true)}
          onCalendarAngleSelect={handleCalendarTopicSelect}
        />
      }
    />
    </>
  );
}
