// Mock Workflow Definitions for Content Studio
// These define the complete workflow stages and mock outputs

import { WorkflowStage } from "@/stores/workflowStore";

// Mock Research Results
export const mockResearchResults = {
  sources: [
    { title: "The State of AI in Healthcare 2025", url: "https://example.com/ai-healthcare" },
    { title: "Machine Learning Applications in Medicine", url: "https://example.com/ml-medicine" },
    { title: "Healthcare AI Adoption Report", url: "https://example.com/adoption-report" },
  ],
  keyInsights: [
    "AI reduces diagnostic errors by 45% in radiology",
    "Patient outcomes improved by 30% with AI-assisted care",
    "73% of healthcare providers plan to adopt AI in next 2 years",
    "Predictive analytics preventing 60% of readmissions",
  ],
  trendingTopics: [
    "Predictive patient care",
    "AI-powered diagnostics",
    "Healthcare cost reduction",
    "Remote patient monitoring",
  ],
};

// Mock Topic Angles
export const mockTopicAngles = [
  {
    id: "angle1",
    title: "The Transformation Story",
    description: "How AI is fundamentally changing healthcare delivery and patient outcomes",
    reasoning: "This angle works well for thought leadership and appeals to decision-makers looking at strategic transformation.",
  },
  {
    id: "angle2",
    title: "The Practical Guide",
    description: "5 ways healthcare providers can implement AI today",
    reasoning: "Actionable content performs well. This angle attracts practitioners ready to adopt AI solutions.",
  },
  {
    id: "angle3",
    title: "The Future Vision",
    description: "What healthcare will look like in 2030 with AI integration",
    reasoning: "Future-focused content generates discussion and positions you as a forward-thinking expert.",
  },
  {
    id: "angle4",
    title: "The Case Study Approach",
    description: "Real-world examples of AI success in major hospitals",
    reasoning: "Proof-based content builds credibility and provides concrete examples readers can relate to.",
  },
];

// Mock Content Brief
export const mockBrief = {
  title: "AI in Healthcare: Revolutionizing Patient Care",
  targetWordCount: 1500,
  estimatedReadTime: 7,
  keywords: ["AI healthcare", "patient care", "medical AI", "healthcare technology", "diagnostic AI"],
  outline: [
    {
      section: "Introduction",
      points: [
        "The current state of healthcare challenges",
        "Why AI is becoming essential",
        "What readers will learn",
      ],
    },
    {
      section: "The Impact of AI on Patient Outcomes",
      points: [
        "Improved diagnostic accuracy",
        "Faster treatment decisions",
        "Personalized care plans",
        "Real-time patient monitoring",
      ],
    },
    {
      section: "Key Applications",
      points: [
        "Radiology and imaging analysis",
        "Predictive analytics for patient care",
        "Drug discovery and development",
        "Administrative automation",
      ],
    },
    {
      section: "Implementation Considerations",
      points: [
        "Data privacy and security",
        "Integration with existing systems",
        "Staff training and adoption",
        "ROI and cost considerations",
      ],
    },
    {
      section: "Conclusion",
      points: [
        "The inevitable future of AI in healthcare",
        "Getting started today",
        "Call to action",
      ],
    },
  ],
  targetAudience: "Healthcare executives and IT leaders",
  tone: "Professional, informative, optimistic",
};

// Mock Blog Post Content
export const mockBlogPost = `# AI in Healthcare: Revolutionizing Patient Care

The healthcare industry stands at the precipice of a transformative revolution. Artificial Intelligence (AI) is no longer a futuristic concept—it's actively reshaping how we diagnose, treat, and care for patients today.

## The Current Healthcare Challenge

Healthcare providers face mounting pressures: rising costs, increasing patient volumes, staff shortages, and the constant need for improved outcomes. Traditional approaches are reaching their limits. Enter AI: a technology that promises not just incremental improvements, but fundamental transformation in how healthcare is delivered.

## How AI is Improving Patient Outcomes

### Diagnostic Accuracy Like Never Before

AI-powered diagnostic tools are achieving accuracy rates that rival—and often exceed—human experts. In radiology, AI systems can detect abnormalities in medical images with 45% fewer errors than traditional methods. This isn't about replacing doctors; it's about giving them superhuman capabilities.

### Real-Time Patient Monitoring

Modern AI systems continuously monitor patient data, identifying subtle patterns that might escape human observation. These systems can predict patient deterioration hours before traditional methods, allowing for proactive interventions that save lives.

### Personalized Treatment Plans

Every patient is unique, and AI excels at analyzing vast amounts of data to create truly personalized care plans. By considering a patient's genetic makeup, medical history, lifestyle factors, and current condition, AI helps clinicians tailor treatments for optimal outcomes.

## Key Applications Transforming Healthcare

**Radiology and Imaging**: AI algorithms analyze X-rays, MRIs, and CT scans, highlighting potential issues and even detecting early-stage cancers that might be missed by the human eye.

**Predictive Analytics**: Machine learning models predict which patients are at risk of readmission, allowing hospitals to implement preventive measures that improve outcomes and reduce costs.

**Drug Discovery**: AI accelerates the drug development process, analyzing molecular structures and predicting drug efficacy in a fraction of the time traditional methods require.

**Administrative Automation**: From scheduling to billing, AI streamlines administrative tasks, freeing healthcare professionals to focus on what matters most: patient care.

## Implementing AI in Your Healthcare Organization

While the benefits are clear, successful AI implementation requires careful planning:

### Data Privacy and Security
Patient data is sacred. Any AI implementation must prioritize HIPAA compliance and robust security measures. Choose solutions with proven track records in healthcare data protection.

### Integration Considerations
AI systems must work seamlessly with existing EHR systems. Look for solutions offering strong interoperability and clear integration paths.

### Staff Training and Change Management
Technology is only as good as the people using it. Invest in comprehensive training programs and foster a culture that embraces AI as a tool for enhancement, not replacement.

### ROI and Value Demonstration
Start with pilot programs that can demonstrate clear value. Track metrics like diagnostic accuracy, time savings, and patient outcomes to build the business case for broader adoption.

## The Path Forward

AI in healthcare isn't coming—it's here. Leading healthcare organizations are already seeing the benefits: improved patient outcomes, reduced costs, and more satisfied healthcare professionals who can focus on the human aspects of care.

The question isn't whether to adopt AI, but how quickly you can integrate it thoughtfully and effectively. Start small, measure results, and scale what works. The future of healthcare is intelligent, personalized, and more human than ever.

**Ready to explore AI solutions for your healthcare organization?** Contact us to learn how we can help you navigate this transformation.`;

// Mock LinkedIn Post Content
export const mockLinkedInPost = `🚀 Exciting news: We just launched our AI-powered content intelligence platform that's helping marketing teams save 10+ hours per week!

After talking to 100+ marketing leaders, we kept hearing the same pain points:
• Drowning in content creation demands
• Struggling to maintain consistent quality
• No clear way to measure content effectiveness
• Can't keep up with market trends

So we built something different.

ContentQ doesn't just help you write faster—it helps you think smarter. Our AI agents work behind the scenes:

📊 Research Agent: Continuously monitoring your market
🎯 Strategist Agent: Aligning every piece with your goals
✍️ Copywriter Agent: Creating content that converts
📈 Analyst Agent: Tracking what actually works

The result? Our beta customers are seeing:
→ 3x increase in content output
→ 40% improvement in engagement rates
→ 60% reduction in time-to-publish

But here's what excites me most: marketing teams are finally getting time back for strategic thinking instead of tactical execution.

Curious to see how it works? Drop a comment or DM me—I'm happy to share what we've learned building this.

#MarketingTech #AIForMarketing #ContentStrategy #MarTech`;

// Mock LinkedIn Enhancement Results
export const mockLinkedInEnhancement = {
  hooks: [
    "🚀 Exciting news: We just launched...",
    "💡 After 6 months of development...",
    "🎯 Marketing leaders are facing a crisis...",
  ],
  hashtags: ["#MarketingTech", "#AIForMarketing", "#ContentStrategy", "#MarTech", "#B2BMarketing"],
  callToActions: [
    "Drop a comment or DM me",
    "Want to see it in action? Link in comments",
    "Curious? Let's connect",
  ],
};

// Blog Workflow Definition
export const blogWorkflow: WorkflowStage[] = [
  {
    id: "input",
    stepId: "input",
    title: "What would you like to write about?",
    description: "Share your topic, key ideas, or upload supporting documents",
    type: "input",
    canGoBack: false,
    primaryAction: "Continue",
    inputLabel: "Topic or Brief",
    placeholder: "e.g., 'AI in Healthcare: How machine learning is revolutionizing patient care'",
    inputValue: "",
    allowFileUpload: true,
    acceptedFiles: ".pdf,.doc,.docx,.txt",
    uploadedFiles: [],
  },
  {
    id: "research",
    stepId: "research",
    title: "Researching your topic...",
    description: "Our Research Agent is gathering relevant information and analyzing trends",
    type: "processing",
    canGoBack: false,
    primaryAction: "Continue",
    processingStage: "Research",
    progress: 0,
    message: "Analyzing market data and gathering insights...",
    agent: "Research",
    agentReasoning: "Scanning industry reports, competitor content, and trending topics related to AI in healthcare. Found 47 relevant sources, identifying key themes and statistics.",
    mockOutput: mockResearchResults,
  },
  {
    id: "topics",
    stepId: "topics",
    title: "Choose your angle",
    description: "Our Strategist Agent analyzed your topic and recommends these approaches",
    type: "selection",
    canGoBack: true,
    primaryAction: "Continue",
    multiSelect: false,
    options: mockTopicAngles,
    selectedOptions: [],
  },
  {
    id: "brief-generation",
    stepId: "brief",
    title: "Creating your content brief...",
    description: "Building a structured outline and research brief",
    type: "processing",
    canGoBack: false,
    primaryAction: "Continue",
    processingStage: "Brief Generation",
    progress: 0,
    message: "Structuring your content outline...",
    agent: "Strategist",
    agentReasoning: "Creating comprehensive outline based on selected angle. Incorporating SEO keywords, optimal structure for engagement, and ensuring alignment with brand voice and target audience.",
    mockOutput: mockBrief,
  },
  {
    id: "brief-approval",
    stepId: "brief",
    title: "Review your content brief",
    description: "Approve or request changes to the outline",
    type: "approval",
    canGoBack: true,
    primaryAction: "Approve & Generate Content",
  },
  {
    id: "content-generation",
    stepId: "content",
    title: "Writing your blog post...",
    description: "Our Copywriter Agent is crafting your content",
    type: "processing",
    canGoBack: false,
    primaryAction: "Continue",
    processingStage: "Content Generation",
    progress: 0,
    message: "Writing introduction...",
    agent: "Copywriter",
    agentReasoning: "Generating content that balances SEO optimization with readability. Including data points, compelling narratives, and clear calls-to-action. Ensuring tone matches brand guidelines.",
    mockOutput: mockBlogPost,
  },
  {
    id: "editor",
    stepId: "content",
    title: "Edit and publish",
    description: "Review and refine your content",
    type: "editor",
    canGoBack: false,
    primaryAction: "Publish",
    showScoring: true,
  },
];

// LinkedIn Workflow Definition
export const linkedinWorkflow: WorkflowStage[] = [
  {
    id: "input",
    stepId: "input",
    title: "What's your LinkedIn post about?",
    description: "Share your message, insight, or announcement",
    type: "input",
    canGoBack: false,
    primaryAction: "Continue",
    inputLabel: "Your Message",
    placeholder: "e.g., 'Just launched our new AI feature that helps teams save 10 hours per week'",
    inputValue: "",
    allowFileUpload: false,
  },
  {
    id: "enhancement",
    stepId: "enhance",
    title: "Enhancing your post...",
    description: "Our Research Agent is optimizing for engagement",
    type: "processing",
    canGoBack: false,
    primaryAction: "Continue",
    processingStage: "Enhancement",
    progress: 0,
    message: "Analyzing trending topics and engagement patterns...",
    agent: "Research",
    agentReasoning: "Analyzing current LinkedIn trends, optimal post structure, and engagement triggers. Identifying hashtags with high relevance and reach.",
    mockOutput: mockLinkedInEnhancement,
  },
  {
    id: "tone-selection",
    stepId: "tone",
    title: "Choose your tone",
    description: "Select the voice that matches your brand",
    type: "selection",
    canGoBack: true,
    primaryAction: "Continue",
    multiSelect: false,
    options: [
      {
        id: "professional",
        title: "Professional & Authoritative",
        description: "Establish thought leadership with a formal, expert tone",
        reasoning: "Best for establishing credibility and positioning as an industry expert.",
      },
      {
        id: "conversational",
        title: "Conversational & Friendly",
        description: "Build connections with an approachable, relatable voice",
        reasoning: "Drives higher engagement through relatability and authenticity.",
      },
      {
        id: "inspiring",
        title: "Inspiring & Motivational",
        description: "Energize your audience with uplifting, action-oriented language",
        reasoning: "Creates emotional connection and motivates audience action.",
      },
    ],
    selectedOptions: [],
  },
  {
    id: "post-generation",
    stepId: "generate",
    title: "Generating your post...",
    description: "Creating optimized content for LinkedIn",
    type: "processing",
    canGoBack: false,
    primaryAction: "Continue",
    processingStage: "Generation",
    progress: 0,
    message: "Crafting compelling hooks and structure...",
    agent: "Copywriter",
    agentReasoning: "Creating post with proven LinkedIn engagement patterns: strong hook, clear value proposition, social proof, and compelling CTA. Optimizing line breaks and emoji usage for mobile readability.",
    mockOutput: mockLinkedInPost,
  },
  {
    id: "editor",
    stepId: "generate",
    title: "Review and post",
    description: "Final review before posting to LinkedIn",
    type: "editor",
    canGoBack: true,
    primaryAction: "Post to LinkedIn",
    showScoring: true,
  },
];

// Calendar Events (for "From Calendar" workflow)
export const mockCalendarEvents = [
  {
    id: "event1",
    title: "Product Launch Announcement",
    description: "Scheduled for tomorrow • Blog post about new AI features",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    type: "blog",
    context: "Announcing our new AI-powered content intelligence features, including Research Agent and enhanced content scoring.",
    suggestedAngle: "Product announcement with customer benefits focus",
  },
  {
    id: "event2",
    title: "Industry Trends Report",
    description: "Due in 3 days • Analysis of Q1 2025 marketing trends",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    type: "blog",
    context: "Quarterly analysis of marketing technology trends, focusing on AI adoption, content strategies, and ROI metrics.",
    suggestedAngle: "Data-driven analysis with forward-looking predictions",
  },
  {
    id: "event3",
    title: "Customer Success Story",
    description: "Due next week • Case study with Acme Corp",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    type: "blog",
    context: "How Acme Corp increased content output by 3x while maintaining quality, featuring quotes from their CMO and specific metrics.",
    suggestedAngle: "Narrative case study with concrete results",
  },
  {
    id: "event4",
    title: "LinkedIn Thought Leadership",
    description: "Weekly series • This week: The future of content marketing",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    type: "linkedin",
    context: "Share perspective on where content marketing is heading in 2025, focusing on AI, personalization, and efficiency.",
    suggestedAngle: "Personal insights with industry data",
  },
];

// Helper function to get workflow by type
export const getWorkflowByType = (type: 'blog' | 'linkedin' | 'calendar'): WorkflowStage[] => {
  if (type === 'blog') return blogWorkflow;
  if (type === 'linkedin') return linkedinWorkflow;
  return []; // Calendar workflow will be generated dynamically
};

// Helper to create calendar workflow
export const createCalendarWorkflow = (event: typeof mockCalendarEvents[0]): WorkflowStage[] => {
  const baseWorkflow = event.type === 'blog' ? blogWorkflow : linkedinWorkflow;
  
  // Pre-fill the first input stage with event context
  const modifiedWorkflow = [...baseWorkflow];
  modifiedWorkflow[0] = {
    ...modifiedWorkflow[0],
    inputValue: event.context,
    calendarEvent: event,
  };
  
  return modifiedWorkflow;
};
