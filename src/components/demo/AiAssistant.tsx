import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import aiAssistantContent from '@/usableclientdata/ai-assistant-content.json';

const { MessageSquare, X, Send, Sparkles, ChevronDown, ChevronUp } = Icons;

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
  icon?: string;
  data?: any;
}

export default function AiAssistant({ context, onAction }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const contextData = aiAssistantContent.contexts[context];
  const { prompts, responses, followUpActions } = aiAssistantContent;

  const getContextualSuggestions = () => {
    return contextData.suggestions || [];
  };

  const getWelcomeMessage = () => {
    return contextData.welcomeMessage || "How can I help you today?";
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
    return prompts[action as keyof typeof prompts] || action;
  };

  const getActionResponse = (action: string) => {
    return responses[action as keyof typeof responses] || responses.default;
  };

  const getFollowUpActions = (action: string): Action[] => {
    return followUpActions[action as keyof typeof followUpActions] || [];
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
              <p className="text-xs text-white/60">{contextData.title}</p>
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
                        const Icon = Icons[suggestion.icon as keyof typeof Icons] as React.ComponentType<any>;
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
                              const Icon = Icons[action.icon as keyof typeof Icons] as React.ComponentType<any>;
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