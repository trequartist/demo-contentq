import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles,
  Lightbulb,
  BarChart3,
  BookOpen,
  Target,
  TrendingUp,
  Brain,
  Plus,
  FileText,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Zap
} from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';

interface AiAssistantProps {
  context: 'insights' | 'analytics' | 'playbook';
  onAction?: (action: string, data?: any) => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: Action[];
}

interface Action {
  label: string;
  action: string;
  icon?: React.ComponentType<any>;
  data?: any;
}

export default function AiAssistant({ context, onAction }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getContextualSuggestions = () => {
    switch (context) {
      case 'insights':
        return [
          { label: 'Analyze top opportunities', action: 'analyze_opportunities', icon: Lightbulb },
          { label: 'Generate action plan', action: 'generate_action_plan', icon: Target },
          { label: 'Compare with competitors', action: 'compare_competitors', icon: TrendingUp },
          { label: 'Find content gaps', action: 'find_gaps', icon: Brain }
        ];
      case 'analytics':
        return [
          { label: 'Explain metrics', action: 'explain_metrics', icon: BarChart3 },
          { label: 'Identify trends', action: 'identify_trends', icon: TrendingUp },
          { label: 'Optimization suggestions', action: 'get_optimizations', icon: Zap },
          { label: 'Export report', action: 'export_report', icon: FileText }
        ];
      case 'playbook':
        return [
          { label: 'Create new playbook', action: 'create_playbook', icon: Plus },
          { label: 'Refine strategy', action: 'refine_strategy', icon: RefreshCw },
          { label: 'Generate content ideas', action: 'generate_ideas', icon: Lightbulb },
          { label: 'Timeline optimization', action: 'optimize_timeline', icon: Target }
        ];
      default:
        return [];
    }
  };

  const getWelcomeMessage = () => {
    switch (context) {
      case 'insights':
        return "I'm here to help you understand your insights and create actionable strategies. What would you like to explore?";
      case 'analytics':
        return "Let me help you understand your analytics data and identify optimization opportunities. What metrics interest you?";
      case 'playbook':
        return "I can help you create and refine playbooks, generate content ideas, and optimize your strategy. How can I assist?";
      default:
        return "How can I help you today?";
    }
  };

  const handleSuggestionClick = async (action: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: getActionPrompt(action),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getActionResponse(action),
        timestamp: new Date(),
        actions: getFollowUpActions(action)
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Trigger action if handler provided
      if (onAction) {
        onAction(action);
      }
    }, 1500);
  };

  const getActionPrompt = (action: string) => {
    const prompts: Record<string, string> = {
      analyze_opportunities: "Analyze my top opportunities",
      generate_action_plan: "Generate an action plan based on insights",
      compare_competitors: "Compare my performance with competitors",
      find_gaps: "Find content gaps I should address",
      explain_metrics: "Explain my current metrics",
      identify_trends: "Identify trends in my data",
      get_optimizations: "Suggest optimizations",
      export_report: "Export analytics report",
      create_playbook: "Create a new playbook",
      refine_strategy: "Refine my current strategy",
      generate_ideas: "Generate content ideas",
      optimize_timeline: "Optimize my content timeline"
    };
    return prompts[action] || action;
  };

  const getActionResponse = (action: string) => {
    const responses: Record<string, string> = {
      analyze_opportunities: `Based on your data, here are your top 3 opportunities:

1. **Zero visibility for "Zapier too expensive"** - 8,100 monthly searches
   • Potential impact: $50K MRR
   • Action: Create comparison page immediately
   
2. **Migration content opportunity** - 12.3% conversion rate
   • 6x better than average content
   • Action: Create 5 migration guides this month
   
3. **LinkedIn personal account** - 10x reach potential
   • 561% more engagement than company pages
   • Action: Connect founder account today`,
      
      generate_action_plan: `Here's your prioritized 30-day action plan:

**Week 1: Quick Wins**
• Add structured data to all existing posts (8 hours)
• Create "Zapier too expensive" comparison page (4 hours)
• Connect founder LinkedIn account (30 minutes)

**Week 2-3: Content Creation**
• Develop 3 migration guides
• Launch weekly LinkedIn posts from founder
• Update top 5 performing posts with AI optimization

**Week 4: Scale & Measure**
• Implement content velocity increase to 15 posts/month
• Set up tracking for all new initiatives
• Review metrics and adjust strategy`,
      
      create_playbook: `I'll help you create a new playbook. Let's start with your goals:

**Playbook Framework:**
1. Define your primary objective
2. Identify target audience segments
3. Map content themes to buyer journey
4. Set measurable KPIs
5. Create timeline and milestones

What's your main business goal for this playbook?
• Increase brand awareness?
• Drive conversions?
• Establish thought leadership?
• Generate qualified leads?`,
      
      explain_metrics: `Here's what your metrics tell us:

**Traffic Growth: +127%** 
Your organic traffic has more than doubled, primarily from long-tail keywords. This indicates strong content-market fit.

**AI Visibility: 78.5%**
You're appearing in most AI-powered search results for your category, but competitors still dominate for high-volume terms.

**Conversion Rate: 7.2%**
3x industry average! Your content effectively converts visitors, especially migration guides (12.3%).

**Content Gap: 40%**
You're missing critical comparison and pricing content that drives bottom-funnel conversions.`,
      
      identify_trends: `I've identified 3 significant trends in your data:

📈 **Positive Trends:**
• Migration content consistently outperforms (12.3% conversion)
• AI visibility growing 12% month-over-month
• Long-form content gets 3x more engagement

📉 **Concerning Patterns:**
• Publishing velocity declining (3 posts vs competitors' 32)
• Social engagement dropped 40% last month
• Missing high-intent search traffic

💡 **Opportunities:**
• Friday posts get 3.2x engagement
• Video content showing 450% growth potential
• Competitor weaknesses in technical content`,
      
      refine_strategy: `Based on your current playbook performance, here are refinements:

**What's Working (Keep):**
• Migration-focused content strategy
• Technical deep-dives for developers
• Friday publishing schedule

**What to Adjust:**
• Increase velocity from 3 to 15 posts/month
• Add comparison content (missing entirely)
• Implement founder-led LinkedIn strategy

**What to Stop:**
• Generic industry news posts (0.5% engagement)
• Unfocused social media presence
• Ignoring high-intent keywords

**New Additions:**
• Interactive ROI calculators
• Weekly competitor analysis posts
• Customer success story series`
    };
    
    return responses[action] || "I'm processing your request. Here's what I found...";
  };

  const getFollowUpActions = (action: string): Action[] => {
    const followUps: Record<string, Action[]> = {
      analyze_opportunities: [
        { label: 'Create action plan', action: 'generate_action_plan', icon: Target },
        { label: 'View detailed metrics', action: 'view_metrics', icon: BarChart3 }
      ],
      create_playbook: [
        { label: 'Use AI template', action: 'use_template', icon: FileText },
        { label: 'Start from scratch', action: 'start_blank', icon: Plus }
      ],
      identify_trends: [
        { label: 'Get recommendations', action: 'get_recommendations', icon: Lightbulb },
        { label: 'Export findings', action: 'export_trends', icon: FileText }
      ]
    };
    
    return followUps[action] || [];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I understand you want to know about "${inputValue}". Let me help you with that...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group z-50"
      >
        <Sparkles className="w-6 h-6" />
        <span className="absolute -top-2 -left-2 w-4 h-4 bg-black rounded-full animate-ping" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all ${
      isMinimized ? 'w-80' : 'w-96'
    }`}>
      <Card className="border border-black/20 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium text-sm">AI Assistant</h3>
              <p className="text-xs text-white/60">
                {context === 'insights' && 'Insights Helper'}
                {context === 'analytics' && 'Analytics Expert'}
                {context === 'playbook' && 'Strategy Builder'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-96 overflow-y-auto bg-white p-4">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-black" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-black/70">
                        {getWelcomeMessage()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <p className="text-xs text-black/40 font-medium">Quick Actions</p>
                    <div className="grid grid-cols-2 gap-2">
                      {getContextualSuggestions().map((suggestion) => {
                        const Icon = suggestion.icon;
                        return (
                          <button
                            key={suggestion.action}
                            onClick={() => handleSuggestionClick(suggestion.action)}
                            className="p-3 bg-white border border-black/10 rounded-lg hover:bg-black/[0.02] hover:border-black/20 transition-all text-left group"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {Icon && <Icon className="w-4 h-4 text-black/40 group-hover:text-black/60" />}
                              <span className="text-xs font-medium text-black">
                                {suggestion.label}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex items-start gap-3 ${
                      message.type === 'user' ? 'justify-end' : ''
                    }`}>
                      {message.type === 'assistant' && (
                        <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-black" />
                        </div>
                      )}
                      <div className={`flex-1 max-w-[80%] ${
                        message.type === 'user' ? 'bg-black text-white rounded-lg px-3 py-2' : ''
                      }`}>
                        <p className={`text-sm whitespace-pre-wrap ${
                          message.type === 'user' ? 'text-white' : 'text-black/80'
                        }`}>
                          {message.content}
                        </p>
                        {message.actions && message.actions.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.actions.map((action) => {
                              const Icon = action.icon;
                              return (
                                <button
                                  key={action.action}
                                  onClick={() => handleSuggestionClick(action.action)}
                                  className="px-3 py-1.5 bg-white border border-black/10 rounded-lg hover:bg-black hover:text-white hover:border-black transition-all text-xs font-medium flex items-center gap-1"
                                >
                                  {Icon && <Icon className="w-3 h-3" />}
                                  {action.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-black" />
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-black/10 p-4 bg-black/[0.02]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/20 transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-black text-white rounded-lg hover:bg-black/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-black/40 mt-2 text-center">
                Powered by AI • {context} mode
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
