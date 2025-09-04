"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  Paperclip,
  MoreVertical,
  Lightbulb,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useMockWebSocket } from '@/lib/demo/mock-websocket';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: string;
    type: 'primary' | 'secondary';
  }>;
  metadata?: {
    type?: 'insight' | 'recommendation' | 'analysis';
    priority?: 'high' | 'medium' | 'low';
    source?: string;
  };
}

// Real conversation based on diagnostic and playbook data
const DEMO_CONVERSATION: ChatMessage[] = [
  {
    id: 'msg-001',
    role: 'assistant',
    content: 'I\'m tracking 3 high-priority opportunities from today\'s research. The Zapier price increase is the most urgent - 8,100 monthly searches for "Zapier too expensive" with zero competition. Want me to draft a response strategy?',
    timestamp: new Date(Date.now() - 60000),
    actions: [
      { label: 'Draft Strategy', action: 'draft_strategy', type: 'primary' },
      { label: 'Show Details', action: 'show_details', type: 'secondary' },
      { label: 'Later', action: 'dismiss', type: 'secondary' }
    ],
    metadata: {
      type: 'recommendation',
      priority: 'high',
      source: 'Competitive Intelligence'
    }
  },
  {
    id: 'msg-002',
    role: 'user',
    content: 'What content should we prioritize this week?',
    timestamp: new Date(Date.now() - 120000)
  },
  {
    id: 'msg-003',
    role: 'assistant',
    content: 'Based on the research feed and your 65.8 authority score: 1) Zapier pricing comparison (24-48h window), 2) AI Agents in RevOps guide (trending topic, 23% QoQ growth), 3) Migration success metrics (leverage your ChatGPT visibility boost from 15% to 23%).',
    timestamp: new Date(Date.now() - 130000),
    actions: [
      { label: 'Add to Calendar', action: 'add_calendar', type: 'primary' },
      { label: 'Create Briefs', action: 'create_briefs', type: 'primary' }
    ],
    metadata: {
      type: 'analysis',
      priority: 'high',
      source: 'Content Strategy'
    }
  }
];

const QUICK_SUGGESTIONS = [
  "What are Make and n8n doing differently?",
  "Show me RevOps content gaps", 
  "Find unserved search queries",
  "How can I improve my authority score?",
  "What's driving the AI visibility increase?",
  "Which content has the best ROI?"
];

export default function AIAssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(DEMO_CONVERSATION);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isConnected, lastEvent } = useMockWebSocket();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for WebSocket events and add them as assistant messages
  useEffect(() => {
    if (lastEvent && lastEvent.data) {
      const event = lastEvent.data;
      
      // Convert WebSocket events to chat messages
      let assistantMessage = '';
      let messageType = 'insight';
      
      switch (event.type) {
        case 'opportunity':
          assistantMessage = `🚨 ${event.title}: ${event.description}. Impact: ${event.impact}. Recommended action: ${event.action}`;
          messageType = 'recommendation';
          break;
        case 'success':
          assistantMessage = `✅ Great news! ${event.title} - ${event.description}. This validates your content strategy.`;
          messageType = 'insight';
          break;
        case 'improvement':
          assistantMessage = `📈 AI Visibility Update: ${event.platform} visibility ${event.change}. ${event.description}. ${event.recommendation}`;
          messageType = 'analysis';
          break;
        case 'competitor_move':
          assistantMessage = `⚔️ Competitive Alert: ${event.competitor} ${event.action}. ${event.impact}. Recommendation: ${event.recommendation}`;
          messageType = 'recommendation';
          break;
        default:
          return;
      }

      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: assistantMessage,
        timestamp: new Date(),
        metadata: {
          type: messageType as any,
          priority: event.impact === 'HIGH' ? 'high' : 'medium',
          source: 'Real-time Intelligence'
        }
      };

      setMessages(prev => [...prev, newMessage]);
    }
  }, [lastEvent]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response based on user input
    setTimeout(() => {
      let assistantResponse = '';
      let actions: any[] = [];

      const input = inputValue.toLowerCase();

      if (input.includes('zapier') || input.includes('competitor')) {
        assistantResponse = 'Based on competitive analysis, Zapier dominates with 32 posts/month vs your 3, but you\'re winning in AI automation (78.5% visibility). Focus on migration content - it converts at 12.3% vs 2% average. The "Zapier too expensive" opportunity (8,100 searches/month) is still wide open.';
        actions = [
          { label: 'Create Migration Guide', action: 'create_migration', type: 'primary' },
          { label: 'Show Competitive Data', action: 'show_competitive', type: 'secondary' }
        ];
      } else if (input.includes('content') || input.includes('create')) {
        assistantResponse = 'Your best performing content targets RevOps pain points. "When Rules Break" is converting at 7.2% with 3,847 views. I recommend creating more migration-focused content during the current Zapier pricing controversy window.';
        actions = [
          { label: 'Start Content Creation', action: 'start_creation', type: 'primary' },
          { label: 'View Performance Data', action: 'view_performance', type: 'secondary' }
        ];
      } else if (input.includes('improve') || input.includes('optimize')) {
        assistantResponse = 'Your authority score (65.8/100) can improve by fixing technical SEO issues: 46% of pages missing H1s, 80% missing schema markup. Also, you\'re missing 15-20 purchase-stage posts that competitors have. Quick win: Add FAQ sections for featured snippets.';
        actions = [
          { label: 'Fix Technical Issues', action: 'fix_technical', type: 'primary' },
          { label: 'Create Purchase Content', action: 'create_purchase', type: 'primary' }
        ];
      } else {
        assistantResponse = 'I can help you analyze your content performance, create new content, or optimize existing posts. Your current focus should be on capturing the $50M opportunity from Zapier switchers. What would you like to work on?';
        actions = [
          { label: 'View Opportunities', action: 'view_opportunities', type: 'primary' },
          { label: 'Create Content', action: 'create_content', type: 'secondary' }
        ];
      }

      const assistantMessage: ChatMessage = {
        id: `msg-assistant-${Date.now()}`,
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date(),
        actions,
        metadata: {
          type: 'analysis',
          priority: 'medium',
          source: 'Content Intelligence'
        }
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleAction = (action: string) => {
    // Handle action buttons in chat
    switch(action) {
      case 'draft_strategy':
        window.open('/demo/playbook', '_blank');
        break;
      case 'create_briefs':
        window.open('/demo/content-studio/create', '_blank');
        break;
      case 'add_calendar':
        window.open('/demo/calendar', '_blank');
        break;
      case 'show_competitive':
        window.open('/demo/diagnostics', '_blank');
        break;
      default:
        console.log('Action:', action);
    }
  };

  const getMessageIcon = (metadata?: ChatMessage['metadata']) => {
    if (!metadata) return null;
    
    switch(metadata.type) {
      case 'insight':
        return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'recommendation':
        return <Target className="w-4 h-4 text-blue-500" />;
      case 'analysis':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg flex flex-col h-96">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Content Strategist</h3>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
              <span className="text-xs text-gray-600">
                {isConnected ? 'Online' : 'Connecting...'}
              </span>
            </div>
          </div>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${
              message.role === 'user' 
                ? 'bg-black text-white rounded-lg rounded-br-sm' 
                : 'bg-gray-50 text-gray-900 rounded-lg rounded-bl-sm border border-gray-200'
            } p-3`}>
              {message.role === 'assistant' && message.metadata && (
                <div className="flex items-center space-x-2 mb-2">
                  {getMessageIcon(message.metadata)}
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    message.metadata.priority === 'high' ? 'bg-red-100 text-red-800' :
                    message.metadata.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {message.metadata.priority?.toUpperCase()} PRIORITY
                  </span>
                </div>
              )}
              
              <p className="text-sm leading-relaxed">{message.content}</p>
              
              {message.actions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleAction(action.action)}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                        action.type === 'primary'
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="mt-2 text-xs text-gray-500">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-50 border border-gray-200 rounded-lg rounded-bl-sm p-3 max-w-[80%]">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-4 py-2 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {QUICK_SUGGESTIONS.slice(0, 3).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleQuickSuggestion(suggestion)}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about content strategy, performance, or opportunities..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black transition-colors pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="p-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
