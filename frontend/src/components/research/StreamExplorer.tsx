import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Send } from "lucide-react";
import { getFindingsByStream } from "@/data/mockData";
import { FindingCard } from "./FindingCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StreamExplorerProps {
  stream: 'competitors' | 'trends' | 'conversations';
  onBack: () => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const streamTitles = {
  competitors: 'Competitor Monitoring',
  trends: 'Industry Trends',
  conversations: 'Customer Conversations',
};

const mockResponses: Record<string, string> = {
  default: "Based on the findings in this stream, I can help you understand the implications and create content. What specific aspect would you like to explore?",
  content: "I can help you create content about this. The key angle would be to position this as a timely insight that demonstrates your market awareness. Would you like me to suggest a blog post structure or LinkedIn post?",
  impact: "This finding has significant implications for your strategy. It suggests an opportunity to differentiate by addressing this gap before competitors do. I recommend creating thought leadership content on this topic.",
  competitive: "Your competitors are making moves in this area. This presents both a threat and an opportunity. Consider creating content that addresses the same need but with your unique angle and expertise.",
};

export function StreamExplorer({ stream, onBack }: StreamExplorerProps) {
  const findings = getFindingsByStream(stream);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Simple mock response based on keywords
    setTimeout(() => {
      let response = mockResponses.default;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('content') || lowerInput.includes('write')) {
        response = mockResponses.content;
      } else if (lowerInput.includes('impact') || lowerInput.includes('mean')) {
        response = mockResponses.impact;
      } else if (lowerInput.includes('competitor') || lowerInput.includes('compare')) {
        response = mockResponses.competitive;
      }
      
      const assistantMessage: ChatMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);
    
    setInput("");
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{streamTitles[stream]}</h2>
          <p className="text-sm text-muted-foreground">
            {findings.length} findings • Always-on intelligence
          </p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Findings List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Findings</h3>
            <Badge variant="secondary">{findings.length}</Badge>
          </div>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-3">
              {findings.map(finding => (
                <FindingCard key={finding.id} finding={finding} />
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Chat Interface */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Ask About Findings</h3>
          <Card className="h-[600px] flex flex-col">
            <CardContent className="flex-1 flex flex-col p-4 space-y-4">
              {/* Messages */}
              <ScrollArea className="flex-1">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-12">
                    <p className="text-sm">Ask questions about these findings</p>
                    <p className="text-xs mt-2">Try: "What's the impact of these findings?"</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, idx) => (
                      <div
                        key={idx}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                            }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              
              <Separator />
              
              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about these findings..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button onClick={handleSend} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
