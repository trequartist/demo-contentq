import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestionChips = [
  "Help me write a blog post",
  "Create a LinkedIn update",
  "Research market trends",
  "Analyze competitors",
];

export function AssistantPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setIsThinking(true);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm here to help! This is a placeholder response.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-heading">ContentQ</h2>
        </div>
        <p className="text-small text-muted-foreground">
          Your AI assistant for content creation
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="mb-2 text-subheading">How can I help you today?</h3>
              <p className="text-small text-muted-foreground">
                Ask me anything about your content workflow
              </p>
            </div>
            {/* Suggestion Chips */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {suggestionChips.map((chip, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:border-primary hover:bg-primary/5"
                  onClick={() => setInput(chip)}
                >
                  {chip}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col gap-1",
                  message.role === "user" && "items-end"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
            {isThinking && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-xs">Thinking...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask me anything..."
            className="min-h-[60px] resize-none"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            size="icon"
            className="h-[60px] w-[60px] shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
