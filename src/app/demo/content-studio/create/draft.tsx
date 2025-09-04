"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Badge } from '@/components/ui';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered,
    Quote,
    Code,
    Link2,
    Image,
    Table,
    Minus,
    Plus,
    MoreHorizontal,
    Copy,
    Download,
    Maximize2,
    Eye,
    Save,
    Send,
    Sparkles,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    Type,
    Hash,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    TrendingUp,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

// Import the actual content from the markdown file
const ACTUAL_CONTENT = `![Image](https://beta.kiwiq.ai/generated_903847.png)

# When Rules Break: How AI Handles the 40% of Workflows Traditional Automation Can't

## Quick Playbook

1. **Audit your broken workflows** — List automations that fail weekly (expect 3-5)
2. **Identify the failure patterns** — Data format chaos, edge cases, context puzzles
3. **Pick one *angry-making workflow*** — Start with lead routing or deal prioritization
4. **Replace rules with AI reasoning** — Let AI understand intent, not just match patterns
5. **Monitor and iterate** — AI learns from corrections, rules just break again
</aside>

---

You know that workflow that breaks when a qualified enterprise buyer fills out "we're evaluating alternatives to our current platform" in the comments field, but gets routed to your generic nurture sequence because it doesn't match your "high intent" keywords? Or when someone with the title "Head of Revenue Operations & Growth" gets sent to your general sales queue because your routing rules can't decide if that's RevOps, Sales, or Marketing?

That's the 40% of automation that rules simply can't handle—the messy, human stuff that happens in every business, every single day.

At Gumloop, we have seen hundreds of RevOps teams still stuck in the pre-AI era (for a variety of reasons), building increasingly complex if-then spaghetti with traditional automation tools, trying to catch every edge case. It never worked. The more branches teams added, the more creative their users got with inputs and the harder it became to maintain. 

But here's the good news: the problem was never the workflows themselves. It was that traditional rule-based automation was being used for work that requires human-like reasoning. And that's exactly the gap that AI automation bridges.

## The Monday Morning Gut Punch

Picture this: It's 8AM Monday, and you're grabbing coffee when your sales director pings on Slack — "We just lost that $500K enterprise deal because the prospect never got routed to me—they sat in the general queue for four days while the competition closed them." The culprit? Their job title was "Chief Revenue Acceleration Officer" instead of the expected "VP Sales," so your routing rules didn't recognize them as enterprise-level.

By 9AM, your CEO is asking why a Fortune 500 company that filled out a demo request got sent a nurture email about "getting started" instead of being fast-tracked to enterprise sales. Turns out they described their company size as "large enterprise" instead of selecting "1000+ employees" from your dropdown.

If this sounds familiar, you're experiencing the real cost of traditional rule-based automation hitting its limits. These aren't just operational hiccups—they're revenue leaks caused by automation that can't understand human communication patterns. The hidden cost isn't just the 15+ hours you spend fixing these failures on weekday evenings—it's all the deals you never even know you lost.

## The 60/40 Split That Changes Everything

Through analyzing thousands of RevOps workflows at Gumloop, one clear pattern emerges. About 60% of business automation works exactly as intended—welcome email sequences fire on schedule, data syncs between systems cleanly, and reports generate without issues. These are the workflows worth keeping on traditional automation.

But the other 40% live in constant chaos. These are workflows that deal with unstructured human inputs, require contextual decision-making, or need to understand intent rather than just match exact patterns. Lead routing based on job titles, deal prioritization that considers full context, email parsing that extracts buying signals—these workflows break regularly because they're trying to solve human reasoning problems with computer logic.

Think about it like this: rule-based automation is like ordering exactly from a restaurant menu. You can get a cheeseburger, but if you want "something cheesy but not too heavy," the system fails. AI automation is like having an experienced server who understands that you probably want a grilled cheese or maybe a lighter burger, and can adapt based on your actual intent.

## Where Rules Break Down (And Why It Costs You)

The failure patterns are predictable. 

**Format rebels** break your rules daily—phone numbers come as (555) 123-4567, 555.123.4567, +1-555-123-4567, or just 5551234567. Each variation needs a new rule, and there are dozens of ways people format the same information.

**Edge cases** multiply faster. Lead score exactly 50—qualified or not? Company size "10-ish" instead of selecting your dropdown? Job title "Customer Happiness Hero" when your routing rules expect standard titles? Every exception breaks your workflow.

**Context puzzles** cost the most. An "Enterprise" inquiry from a 10-person startup needs different handling than one from Fortune 500. Someone saying they're "interested" could be a qualified buyer or competitor research. Traditional rules can't tell the difference.

At Gumloop, we've seen a $2 million deal sit in low priority for three days because of a typo in the company size field. Meanwhile, a competitor evaluation got fast-tracked because "interested" matched a high-intent keyword, despite context showing they were just shopping around.

This is exactly what AI automation solves—and why teams are migrating from rule-based platforms.

## How AI Automation Solves What Rules Never Could

AI automation doesn't try to predict every possible input variation like traditional systems. Instead, it understands intent. When someone types "ASAP!!!" in a priority field, AI recognizes urgency despite the informal format. When a job title is "Chief Everything Officer," AI has seen enough variations to know this likely means C-level leadership. When someone writes "$50kish" in a budget field, AI understands this is approximately $50,000, not a parsing error.

The difference is fundamental. Legacy rule-based systems require exact matches or explicit alternatives. AI works with understanding and context. It's been trained on millions of examples of how humans actually communicate, so it handles variations naturally without requiring teams to anticipate every possible edge case.

This isn't magic—it's pattern recognition at massive scale. The AI has seen "Chief Happiness Officer" route to customer success teams thousands of times across different companies, so when it encounters "VP of Customer Love" or "Director of Client Joy," it makes the same connection. It's learning from the collective experience of how businesses actually operate, not just how you think they should operate on paper.

## Three Teams That Made the Switch

**Sarah's Lead Routing Transformation:** Sarah runs RevOps for a 150-person SaaS company with a 17-branch decision tree in her legacy platform, still missing 15% of inbound leads due to ambiguous titles like "Growth Ninja" or "GTM Engineer." After migrating to Gumloop, she uses an LLM classification node that analyzes job titles in context—understanding that "Growth Ninja" involves marketing functions while "GTM Engineer" handles RevOps. The AI also cross-references company size and industry, and her routing accuracy jumped from 79% to 94%.

**Abhishek's Deal Prioritization Upgrade:** Abhishek's traditional scoring missed million-dollar enterprise deals that scored lower than $50K startup inquiries due to form field typos. With Gumloop, he built a workflow using multiple LLM nodes: one extracts company intelligence from domains and LinkedIn profiles, another analyzes inquiry language for intent signals ("switching from our current solution" vs. "evaluating options"), and a third cross-references previous interaction history. The system automatically flags renewal conversations differently from net-new opportunities, even when contact forms look identical, by analyzing email signatures and communication patterns.

**Lisa's Customer Intelligence Revolution:** Lisa's team at a 500-person B2B software company was missing over 60% of buying signals, because prospects don't use the exact keyword phrases their legacy system was programmed to detect. High-intent inquiries containing "looking for alternatives," "current vendor isn't working out," and "ready to make a change" were all being treated as unqualified leads. After implementing Gumloop's natural language processing node, her system now analyzes entire inquiry forms and extracts intent regardless of phrasing. The AI also performs temporal analysis—understanding that "need this implemented by Q4" implies urgency while "exploring options for next year" suggests longer sales cycles, automatically adjusting follow-up sequences and priority scoring. 

## When Traditional Rules Still Make Sense

Despite all this AI capability, there are plenty of workflows where traditional rules remain the better choice. Simple, high-volume tasks like welcome email sequences work perfectly with basic triggers. When someone signs up, send email A. Three days later, send email B. No variation, no context required, no edge cases to handle.

Compliance workflows also favor traditional rules because you need identical, audit-ready processes every single time. Financial reporting, security protocols, and regulatory compliance can't have AI making contextual decisions—they need predictable, documentable outcomes that follow exact procedures.

The key insight isn't that AI replaces all automation, but that it handles the specific subset where traditional rule-based systems break down. The most successful RevOps teams use a hybrid approach: efficient, cost-effective rules for predictable tasks, and AI for the messy, contextual work that requires human-like reasoning.

## Your Monday Morning Test

Here's how to identify which workflows need upgrading. Pick the workflow that ruins your Monday mornings—the one that generates the most "hey, this broke again" messages. Try to explain all the rules and exceptions to a colleague in under two minutes. If you can't, or if you find yourself saying "well, except when..." more than three times, you've found an AI candidate.

Count the conditional branches in your workflow. If there are more than ten decision points, you're probably fighting edge cases faster than you can solve them. Look at your manual review queues—if they're constantly backing up with borderline cases that don't fit your rules cleanly, AI can likely automate 80% of those decisions.

## The Real Implementation Story

The transition doesn't happen overnight, and it shouldn't. We recommend starting with parallel systems—run your existing rules alongside AI automation for the same workflow, and compare results for a week or two. This builds confidence before switching over completely.

Most teams using Gumloop see immediate improvement in edge case handling within the first week. By week three or four, the manual fix requests drop dramatically. The real magic happens around month three, when the AI has learned your specific business patterns and starts handling cases you didn't even realize were problems.

The learning curve is gentler than most people expect. If you can build workflows in Zapier or document a business process, you can configure Gumloop's AI automation. The interface is drag-and-drop, and the logic is closer to natural language than code.

## The Competitive Reality Check

Here's what's happening while you're fixing broken workflows: your competitors who've made the AI switch are capturing deals faster, routing leads more accurately, and freeing up their RevOps teams to focus on revenue optimization instead of rule maintenance.

The gap is widening quickly. Every month you spend adding more branches to accommodate "Chief Revenue Acceleration Officer" or "Growth Ninja", AI-powered teams are automatically handling dozens of new title variations without human intervention.

**The math is brutal:** Traditional automation locks you into a Sophie's choice between comprehensive coverage (unmaintainable complexity) or simple rules (missed opportunities). AI automation eliminates that trade-off.

Your workflows aren't breaking because you're bad at RevOps. They're breaking because you're solving 2025 problems with 2020 tools. The companies figuring this out now will have an 18-month head start on operational efficiency. While everyone else is still debugging "California" vs "CA" failures, they're building revenue systems that actually scale with business complexity.

**Stop outsmarting form-filling. Start building revenue systems.**

Pick one workflow that ruins your Monday mornings. Fix it with AI. When it correctly handles the enterprise prospect who wrote "exploring alternatives to our current solution" instead of "ready to buy," you'll never go back to rule-based routing.

The future of RevOps is intelligent automation that understands human intent. The question isn't whether you'll make the switch—it's whether you'll lead or follow.

---

🚀 **Ready to fix your most annoying workflow?**

See How Gumloop Handles Your Edge Cases →`;

export default function DraftEditorPage() {
    const router = useRouter();
    const [content, setContent] = useState(ACTUAL_CONTENT);
    const [isPreview, setIsPreview] = useState(false);
    const [viewMode, setViewMode] = useState<'edit' | 'split' | 'preview'>('edit');
    const [aiPanelOpen, setAiPanelOpen] = useState(true);
    const [seoPanelOpen, setSeoPanelOpen] = useState(false);
    const [aiMessage, setAiMessage] = useState('');
    const [aiMessages, setAiMessages] = useState<Array<{ role: string, content: string, time: string }>>([]);
    const [selectedText, setSelectedText] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(new Date());
    const [showFormatMenu, setShowFormatMenu] = useState(false);
    const [formatMenuPosition, setFormatMenuPosition] = useState({ x: 0, y: 0 });

    const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
    const targetWords = 1500;
    const readingTime = Math.ceil(wordCount / 200);

    // AI Response Generator
    const getAIResponse = (message: string) => {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('title')) {
            return "Your title is strong! Consider adding 'AI automation' at the beginning for better SEO. This could increase search visibility by 15-20%.";
        } else if (lowerMessage.includes('seo')) {
            return "To improve SEO: 1) Add more internal links, 2) Include a FAQ section for featured snippets, 3) Add schema markup for better SERP display. These changes could boost your score to 95+.";
        } else if (lowerMessage.includes('hook') || lowerMessage.includes('opening')) {
            return "Your opening is compelling! Consider adding a specific statistic or dollar amount in the first sentence to increase engagement by 40%. Example: '$500K lost because of a routing rule.'";
        } else if (lowerMessage.includes('conclusion') || lowerMessage.includes('cta')) {
            return "Add a stronger CTA with urgency. Instead of 'Learn More', try 'See How Gumloop Handles Your Edge Cases in 5 Minutes →'. This can increase conversions by 25%.";
        } else if (lowerMessage.includes('readability')) {
            return "Break up paragraphs over 4 sentences. Add more transition words like 'however', 'moreover', 'consequently'. This will improve readability score to 95+.";
        } else {
            return "I can help with: SEO optimization, improving your hook, strengthening CTAs, enhancing readability, or adding AEO elements. What would you like to focus on?";
        }
    };

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-6">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Why Your Monday Morning Automation Failures Are Costing You Customers
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="secondary"
                            className="text-sm"
                            onClick={() => setIsPreview(!isPreview)}
                        >
                            {isPreview ? 'Edit' : 'Preview'}
                        </Button>

                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>Draft</span>
                            <span>{wordCount} / {targetWords} words</span>
                                                         <span>SEO: <span className="text-gray-900 font-medium">86%</span></span>
                             <span>Readability: <span className="text-gray-900 font-medium">92%</span></span>
                        </div>

                        <Button
                            variant="secondary"
                            onClick={async () => {
                                setIsSaving(true);
                                await new Promise(resolve => setTimeout(resolve, 1000));
                                setLastSaved(new Date());
                                setIsSaving(false);
                                // Show success toast/notification
                            }}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Draft'}
                        </Button>

                        <Button
                            className="bg-gray-900 text-white hover:bg-gray-800"
                            onClick={async () => {
                                setIsSaving(true);
                                await new Promise(resolve => setTimeout(resolve, 1500));
                                router.push('/demo/content-studio');
                            }}
                            disabled={isSaving}
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Publish
                        </Button>
                    </div>
                </div>
            </div>

            {/* Editor Toolbar */}
            <div className="border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between px-6 py-2">
                    <div className="flex items-center gap-4">
                        {/* Tab buttons */}
                        <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
                            <button
                                onClick={() => setViewMode('edit')}
                                className={`px-3 py-1 text-sm font-medium rounded ${viewMode === 'edit'
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setViewMode('split')}
                                className={`px-3 py-1 text-sm font-medium rounded ${viewMode === 'split'
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Split
                            </button>
                            <button
                                onClick={() => setViewMode('preview')}
                                className={`px-3 py-1 text-sm font-medium rounded ${viewMode === 'preview'
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Preview
                            </button>
                        </div>

                        {/* Formatting buttons */}
                        <div className="flex items-center gap-1">
                            <button
                                className="p-1.5 hover:bg-gray-100 rounded"
                                onClick={() => {
                                    const textarea = document.querySelector('textarea');
                                    if (textarea) {
                                        const start = textarea.selectionStart;
                                        const end = textarea.selectionEnd;
                                        const selectedText = content.substring(start, end);
                                        if (selectedText) {
                                            const newContent = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
                                            setContent(newContent);
                                        }
                                    }
                                }}
                            >
                                <Bold className="w-4 h-4" />
                            </button>
                            <button
                                className="p-1.5 hover:bg-gray-100 rounded"
                                onClick={() => {
                                    const textarea = document.querySelector('textarea');
                                    if (textarea) {
                                        const start = textarea.selectionStart;
                                        const end = textarea.selectionEnd;
                                        const selectedText = content.substring(start, end);
                                        if (selectedText) {
                                            const newContent = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
                                            setContent(newContent);
                                        }
                                    }
                                }}
                            >
                                <Italic className="w-4 h-4" />
                            </button>
                                                         <button 
                                 className="p-1.5 hover:bg-gray-100 rounded"
                                 onClick={() => {
                                     const textarea = document.querySelector('textarea');
                                     if (textarea) {
                                         const start = textarea.selectionStart;
                                         const end = textarea.selectionEnd;
                                         const selectedText = content.substring(start, end);
                                         if (selectedText) {
                                             const newContent = content.substring(0, start) + `~~${selectedText}~~` + content.substring(end);
                                             setContent(newContent);
                                         }
                                     }
                                 }}
                             >
                                 <Strikethrough className="w-4 h-4" />
                            </button>

                            <div className="w-px h-5 bg-gray-300 mx-1" />

                                                         <button 
                                 className="p-1.5 hover:bg-gray-100 rounded"
                                 onClick={() => {
                                     const textarea = document.querySelector('textarea');
                                     if (textarea) {
                                         const start = textarea.selectionStart;
                                         const end = textarea.selectionEnd;
                                         const lines = content.substring(start, end).split('\n');
                                         const bulletLines = lines.map(line => `- ${line}`).join('\n');
                                         const newContent = content.substring(0, start) + bulletLines + content.substring(end);
                                         setContent(newContent);
                                     }
                                 }}
                             >
                                 <List className="w-4 h-4" />
                            </button>
                                                         <button 
                                 className="p-1.5 hover:bg-gray-100 rounded"
                                 onClick={() => {
                                     const textarea = document.querySelector('textarea');
                                     if (textarea) {
                                         const start = textarea.selectionStart;
                                         const end = textarea.selectionEnd;
                                         const lines = content.substring(start, end).split('\n');
                                         const numberedLines = lines.map((line, idx) => `${idx + 1}. ${line}`).join('\n');
                                         const newContent = content.substring(0, start) + numberedLines + content.substring(end);
                                         setContent(newContent);
                                     }
                                 }}
                             >
                                 <ListOrdered className="w-4 h-4" />
                            </button>

                            <div className="w-px h-5 bg-gray-300 mx-1" />

                                                         <button 
                                 className="p-1.5 hover:bg-gray-100 rounded"
                                 onClick={() => {
                                     const textarea = document.querySelector('textarea');
                                     if (textarea) {
                                         const start = textarea.selectionStart;
                                         const end = textarea.selectionEnd;
                                         const selectedText = content.substring(start, end);
                                         const quotedText = selectedText.split('\n').map(line => `> ${line}`).join('\n');
                                         const newContent = content.substring(0, start) + quotedText + content.substring(end);
                                         setContent(newContent);
                                     }
                                 }}
                             >
                                 <Quote className="w-4 h-4" />
                            </button>
                                                         <button 
                                 className="p-1.5 hover:bg-gray-100 rounded"
                                 onClick={() => {
                                     const textarea = document.querySelector('textarea');
                                     if (textarea) {
                                         const start = textarea.selectionStart;
                                         const end = textarea.selectionEnd;
                                         const selectedText = content.substring(start, end);
                                         if (selectedText) {
                                             const newContent = content.substring(0, start) + `\`${selectedText}\`` + content.substring(end);
                                             setContent(newContent);
                                         }
                                     }
                                 }}
                             >
                                 <Code className="w-4 h-4" />
                            </button>
                                                         <button 
                                 className="p-1.5 hover:bg-gray-100 rounded"
                                 onClick={() => {
                                     const textarea = document.querySelector('textarea');
                                     if (textarea) {
                                         const start = textarea.selectionStart;
                                         const end = textarea.selectionEnd;
                                         const selectedText = content.substring(start, end) || 'link text';
                                         const url = prompt('Enter URL:');
                                         if (url) {
                                             const newContent = content.substring(0, start) + `[${selectedText}](${url})` + content.substring(end);
                                             setContent(newContent);
                                         }
                                     }
                                 }}
                             >
                                 <Link2 className="w-4 h-4" />
                            </button>

                            <div className="w-px h-5 bg-gray-300 mx-1" />

                                                         <button 
                                 className="p-1.5 hover:bg-gray-100 rounded"
                                 onClick={() => {
                                     const url = prompt('Enter image URL:');
                                     const alt = prompt('Enter alt text:');
                                     if (url) {
                                         const imageMarkdown = `\n![${alt || 'Image'}](${url})\n`;
                                         setContent(content + imageMarkdown);
                                     }
                                 }}
                             >
                                 <Image className="w-4 h-4" />
                            </button>
                                                         <button 
                                 className="p-1.5 hover:bg-gray-100 rounded"
                                 onClick={() => {
                                     const tableTemplate = `\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n`;
                                     setContent(content + tableTemplate);
                                 }}
                             >
                                 <Table className="w-4 h-4" />
                            </button>

                            <div className="w-px h-5 bg-gray-300 mx-1" />

                                                         <button 
                                 className="p-1.5 hover:bg-gray-100 rounded"
                                 onClick={() => {
                                     // Align left is default in markdown
                                     const textarea = document.querySelector('textarea');
                                     if (textarea) {
                                         textarea.style.textAlign = 'left';
                                     }
                                 }}
                             >
                                 <AlignLeft className="w-4 h-4" />
                            </button>
                                                         <button 
                                 className="p-1.5 hover:bg-gray-100 rounded"
                                 onClick={() => {
                                     const textarea = document.querySelector('textarea');
                                     if (textarea) {
                                         textarea.style.textAlign = 'center';
                                     }
                                 }}
                             >
                                 <AlignCenter className="w-4 h-4" />
                            </button>
                                                         <button 
                                 className="p-1.5 hover:bg-gray-100 rounded"
                                 onClick={() => {
                                     const textarea = document.querySelector('textarea');
                                     if (textarea) {
                                         textarea.style.textAlign = 'right';
                                     }
                                 }}
                             >
                                 <AlignRight className="w-4 h-4" />
                            </button>
                                                         <button 
                                 className="p-1.5 hover:bg-gray-100 rounded"
                                 onClick={() => {
                                     const textarea = document.querySelector('textarea');
                                     if (textarea) {
                                         textarea.style.textAlign = 'justify';
                                     }
                                 }}
                             >
                                 <AlignJustify className="w-4 h-4" />
                            </button>

                            <div className="w-px h-5 bg-gray-300 mx-1" />

                            <button className="p-1.5 hover:bg-gray-100 rounded">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                                                 <button 
                             className="p-1.5 hover:bg-gray-100 rounded"
                             onClick={() => {
                                 navigator.clipboard.writeText(content);
                                 // Show a toast or feedback that content was copied
                                 const btn = event?.currentTarget as HTMLButtonElement;
                                 if (btn) {
                                     btn.classList.add('bg-black', 'text-white');
                                     setTimeout(() => {
                                         btn.classList.remove('bg-black', 'text-white');
                                     }, 200);
                                 }
                             }}
                         >
                             <Copy className="w-4 h-4" />
                        </button>
                                                 <button 
                             className="p-1.5 hover:bg-gray-100 rounded"
                             onClick={() => {
                                 const blob = new Blob([content], { type: 'text/markdown' });
                                 const url = URL.createObjectURL(blob);
                                 const a = document.createElement('a');
                                 a.href = url;
                                 a.download = 'draft-content.md';
                                 a.click();
                                 URL.revokeObjectURL(url);
                             }}
                         >
                             <Download className="w-4 h-4" />
                        </button>
                                                 <button 
                             className="p-1.5 hover:bg-gray-100 rounded"
                             onClick={() => {
                                 if (!document.fullscreenElement) {
                                     document.documentElement.requestFullscreen();
                                 } else {
                                     document.exitFullscreen();
                                 }
                             }}
                         >
                             <Maximize2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Editor/Preview Content */}
                <div className={`${viewMode === 'split' ? 'w-1/2' : 'flex-1'} flex flex-col`}>
                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-4xl mx-auto px-8 py-6">
                            {viewMode === 'preview' ? (
                                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-gray-800 prose-pre:bg-gray-100 prose-blockquote:text-gray-700 prose-blockquote:border-gray-300">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            h1: ({children}) => <h1 className="text-3xl font-bold mb-4 text-gray-900">{children}</h1>,
                                            h2: ({children}) => <h2 className="text-2xl font-semibold mb-3 mt-6 text-gray-900">{children}</h2>,
                                            h3: ({children}) => <h3 className="text-xl font-medium mb-2 mt-4 text-gray-800">{children}</h3>,
                                            p: ({children}) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                                            ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-700">{children}</ul>,
                                            ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-700">{children}</ol>,
                                            li: ({children}) => <li className="mb-1">{children}</li>,
                                            blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">{children}</blockquote>,
                                            code: ({node, inline, className, children, ...props}: any) => 
                                                inline ? 
                                                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-gray-800" {...props}>{children}</code> :
                                                <pre className="bg-gray-100 p-4 rounded overflow-x-auto"><code className="text-sm text-gray-800" {...props}>{children}</code></pre>,
                                            table: ({children}) => <table className="w-full border-collapse my-4">{children}</table>,
                                            thead: ({children}) => <thead className="border-b-2 border-gray-300">{children}</thead>,
                                            tbody: ({children}) => <tbody>{children}</tbody>,
                                            tr: ({children}) => <tr className="border-b border-gray-200">{children}</tr>,
                                            th: ({children}) => <th className="text-left py-2 px-3 font-semibold text-gray-900">{children}</th>,
                                            td: ({children}) => <td className="py-2 px-3 text-gray-700">{children}</td>,
                                            a: ({children, href}) => <a href={href} className="text-blue-600 hover:text-blue-800 underline">{children}</a>,
                                            hr: () => <hr className="my-6 border-gray-300" />,
                                            strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                                            em: ({children}) => <em className="italic">{children}</em>,
                                        }}
                                    >
                                        {content}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full min-h-[600px] text-gray-900 text-base leading-relaxed resize-none border-none outline-none"
                                    placeholder="Start writing your content..."
                                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 px-6 py-2">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-4">
                                <span>Auto-save enabled</span>
                                <span>Last saved: {
                                    (() => {
                                        const diff = Date.now() - lastSaved.getTime();
                                        const minutes = Math.floor(diff / 60000);
                                        if (minutes === 0) return 'Just now';
                                        if (minutes === 1) return '1 minute ago';
                                        if (minutes < 60) return `${minutes} minutes ago`;
                                        return 'Over an hour ago';
                                    })()
                                }</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span>{wordCount} words</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>{readingTime} min read</span>
                                </div>
                                <div className="flex items-center gap-2">
                                                                                             <span className="text-gray-700 font-medium">Unsaved changes</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span>Markdown enabled</span>
                                    <span>Tables supported</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Split View Preview Panel */}
                {viewMode === 'split' && (
                    <div className="w-1/2 border-l border-gray-200 flex flex-col">
                        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
                            <h3 className="text-sm font-medium text-gray-700">Preview</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto bg-white">
                            <div className="max-w-4xl mx-auto px-8 py-6">
                                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-gray-800 prose-pre:bg-gray-100 prose-blockquote:text-gray-700 prose-blockquote:border-gray-300">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            h1: ({children}) => <h1 className="text-3xl font-bold mb-4 text-gray-900">{children}</h1>,
                                            h2: ({children}) => <h2 className="text-2xl font-semibold mb-3 mt-6 text-gray-900">{children}</h2>,
                                            h3: ({children}) => <h3 className="text-xl font-medium mb-2 mt-4 text-gray-800">{children}</h3>,
                                            p: ({children}) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                                            ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-700">{children}</ul>,
                                            ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-700">{children}</ol>,
                                            li: ({children}) => <li className="mb-1">{children}</li>,
                                            blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">{children}</blockquote>,
                                            code: ({node, inline, className, children, ...props}: any) => 
                                                inline ? 
                                                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-gray-800" {...props}>{children}</code> :
                                                <pre className="bg-gray-100 p-4 rounded overflow-x-auto"><code className="text-sm text-gray-800" {...props}>{children}</code></pre>,
                                            table: ({children}) => <table className="w-full border-collapse my-4">{children}</table>,
                                            thead: ({children}) => <thead className="border-b-2 border-gray-300">{children}</thead>,
                                            tbody: ({children}) => <tbody>{children}</tbody>,
                                            tr: ({children}) => <tr className="border-b border-gray-200">{children}</tr>,
                                            th: ({children}) => <th className="text-left py-2 px-3 font-semibold text-gray-900">{children}</th>,
                                            td: ({children}) => <td className="py-2 px-3 text-gray-700">{children}</td>,
                                            a: ({children, href}) => <a href={href} className="text-blue-600 hover:text-blue-800 underline">{children}</a>,
                                            hr: () => <hr className="my-6 border-gray-300" />,
                                            strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                                            em: ({children}) => <em className="italic">{children}</em>,
                                        }}
                                    >
                                        {content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Right Sidebar - AI Assistant & SEO Panel */}
                {(aiPanelOpen || seoPanelOpen) && (
                    <div className="w-96 border-l border-gray-200 bg-gray-50 flex flex-col">
                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200 bg-white">
                            <div className="flex">
                                <button
                                    onClick={() => {
                                        setAiPanelOpen(true);
                                        setSeoPanelOpen(false);
                                    }}
                                    className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${aiPanelOpen && !seoPanelOpen
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        AI Assistant
                                    </div>
                                </button>
                                <button
                                    onClick={() => {
                                        setSeoPanelOpen(true);
                                        setAiPanelOpen(false);
                                    }}
                                    className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${seoPanelOpen && !aiPanelOpen
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <TrendingUp className="w-4 h-4" />
                                        SEO/AEO Score
                                    </div>
                                </button>
                                <button
                                    onClick={() => {
                                        setAiPanelOpen(false);
                                        setSeoPanelOpen(false);
                                    }}
                                    className="px-3 hover:bg-gray-100"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* AI Assistant Panel */}
                        {aiPanelOpen && !seoPanelOpen && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4">
                                    <div className="space-y-4">
                                        {/* Initial greeting */}
                                        {aiMessages.length === 0 && (
                                            <>
                                                <div className="bg-white rounded-lg p-3 shadow-sm">
                                                    <div className="flex items-start gap-2">
                                                        <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-700">
                                                                Ready to refine your draft content? What needs work?
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-1">14:45</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                                                                 <div className="bg-gray-100 rounded-lg p-3">
                                                    <div className="flex items-start gap-2">
                                                                                                                 <Sparkles className="w-4 h-4 text-gray-700 mt-0.5" />
                                                        <div>
                                                                                                                         <p className="text-sm font-medium text-gray-900">Quick Actions</p>
                                                            <div className="mt-2 space-y-2">
                                                                <button
                                                                    onClick={() => setAiMessage("How can I improve the SEO?")}
                                                                    className="block w-full text-left text-xs bg-white rounded px-2 py-1.5 hover:bg-gray-100 text-gray-800"
                                                                >
                                                                    🎯 Improve SEO Score
                                                                </button>
                                                                <button
                                                                    onClick={() => setAiMessage("Make the opening hook stronger")}
                                                                    className="block w-full text-left text-xs bg-white rounded px-2 py-1.5 hover:bg-gray-100 text-gray-800"
                                                                >
                                                                    🪝 Strengthen Opening Hook
                                                                </button>
                                                                <button
                                                                    onClick={() => setAiMessage("Add a compelling CTA")}
                                                                    className="block w-full text-left text-xs bg-white rounded px-2 py-1.5 hover:bg-gray-100 text-gray-800"
                                                                >
                                                                    🚀 Enhance Call-to-Action
                                                                </button>
                                                                <button
                                                                    onClick={() => setAiMessage("Improve readability")}
                                                                    className="block w-full text-left text-xs bg-white rounded px-2 py-1.5 hover:bg-gray-100 text-gray-800"
                                                                >
                                                                    📖 Improve Readability
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Chat messages */}
                                        {aiMessages.map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={`rounded-lg p-3 ${msg.role === 'user'
                                                        ? 'bg-gray-100 ml-8'
                                                        : 'bg-white shadow-sm mr-8'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-2">
                                                    {msg.role === 'assistant' && (
                                                                                                                 <Sparkles className="w-4 h-4 text-gray-700 mt-0.5 flex-shrink-0" />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="text-sm text-gray-700">{msg.content}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 bg-white p-4">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (aiMessage.trim()) {
                                                const newMessage = {
                                                    role: 'user',
                                                    content: aiMessage,
                                                    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                                };
                                                setAiMessages([...aiMessages, newMessage]);

                                                // Simulate AI response
                                                setTimeout(() => {
                                                    const aiResponse = {
                                                        role: 'assistant',
                                                        content: getAIResponse(aiMessage),
                                                        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                                    };
                                                    setAiMessages(prev => [...prev, aiResponse]);
                                                }, 1000);

                                                setAiMessage('');
                                            }
                                        }}
                                        className="flex gap-2"
                                    >
                                        <input
                                            type="text"
                                            value={aiMessage}
                                            onChange={(e) => setAiMessage(e.target.value)}
                                            placeholder="Ask me to improve your content..."
                                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                        />
                                        <Button type="submit" size="sm" className="bg-gray-900 text-white hover:bg-gray-800">
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </form>
                                    <div className="mt-2 text-xs text-gray-500">
                                        Press Enter to send
                                    </div>
                                </div>
                            </>
                        )}

                        {/* SEO/AEO Score Panel */}
                        {seoPanelOpen && !aiPanelOpen && (
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-4">
                                    {/* Overall Scores */}
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <h3 className="font-medium text-gray-900 mb-3">Content Scores</h3>

                                        {/* SEO Score */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">SEO Score</span>
                                                                                                 <span className="text-sm font-bold text-gray-900">86/100</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-gray-900" style={{ width: '86%' }} />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Excellent - Well optimized for search</p>
                                        </div>

                                        {/* AEO Score */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">AEO Score</span>
                                                <span className="text-sm font-bold text-gray-700">72/100</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-gray-600" style={{ width: '72%' }} />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Good - Could improve AI answer optimization</p>
                                        </div>

                                        {/* Readability Score */}
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">Readability</span>
                                                <span className="text-sm font-bold text-gray-900">92/100</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-gray-800" style={{ width: '92%' }} />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Excellent - Easy to read and understand</p>
                                        </div>
                                    </div>

                                    {/* SEO Checklist */}
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <h3 className="font-medium text-gray-900 mb-3">SEO Checklist</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gray-900" />
                                                <span className="text-gray-700">Title includes target keyword</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gray-900" />
                                                <span className="text-gray-700">Meta description optimized (145 chars)</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gray-900" />
                                                <span className="text-gray-700">Headers properly structured (H1-H3)</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <AlertCircle className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-700">Add internal links (0 found)</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gray-900" />
                                                <span className="text-gray-700">Keywords naturally distributed</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AEO Optimizations */}
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <h3 className="font-medium text-gray-900 mb-3">AEO Optimizations</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <AlertCircle className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-700">Add structured data markup</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <AlertCircle className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-700">Add "Questions Answered" section</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gray-900" />
                                                <span className="text-gray-700">Clear definitions provided</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <AlertCircle className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-700">Add comparison tables</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gray-900" />
                                                <span className="text-gray-700">Q&A format sections present</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Keywords */}
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <h3 className="font-medium text-gray-900 mb-3">Target Keywords</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="secondary" className="text-xs">AI automation (8)</Badge>
                                            <Badge variant="secondary" className="text-xs">workflow automation (6)</Badge>
                                            <Badge variant="secondary" className="text-xs">RevOps (12)</Badge>
                                            <Badge variant="secondary" className="text-xs">rule-based (5)</Badge>
                                            <Badge variant="secondary" className="text-xs">Zapier alternative (3)</Badge>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                                                         <div className="bg-gray-100 rounded-lg p-4">
                                        <h3 className="font-medium text-blue-900 mb-2">Quick Improvements</h3>
                                        <div className="space-y-2">
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="w-full text-xs"
                                                onClick={() => {
                                                    const comparisonTable = `\n\n## AI Automation vs Rule-Based Automation\n\n| Feature | Rule-Based | AI-Powered | Winner |\n|---------|------------|------------|--------|\n| Handles variations | ❌ Breaks on format changes | ✅ Understands intent | AI |\n| Edge cases | ❌ Needs new rule for each | ✅ Learns from context | AI |\n| Maintenance | ❌ 15+ hrs/week fixing | ✅ Self-improving | AI |\n| Accuracy | 79% routing accuracy | 94% routing accuracy | AI |\n| ROI | -$75K/month in failures | +207% ROI in 90 days | AI |\n\n`;
                                                    setContent(content + comparisonTable);
                                                }}
                                            >
                                                Add Comparison Table
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="w-full text-xs"
                                                onClick={() => {
                                                    const faqSection = `\n\n## Frequently Asked Questions\n\n### What is AI automation?\nAI automation uses machine learning models to understand intent and context, not just match patterns. It handles the messy, human variations that break traditional rules.\n\n### How is it different from rule-based automation?\nRule-based systems require exact matches. AI understands meaning. When someone types "ASAP!!!" or "urgent", AI knows they mean the same thing.\n\n### What ROI can I expect?\nMost RevOps teams see 60-80% reduction in manual fixes, recovering 15+ hours weekly. Average ROI is 207% within 90 days.\n\n### How long does implementation take?\nTypical implementation is 30-45 days, with first workflows live in week 1.\n\n`;
                                                    setContent(content + faqSection);
                                                }}
                                            >
                                                Generate FAQ Section
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="w-full text-xs"
                                                onClick={() => {
                                                    const schemaMarkup = `\n\n<!-- Schema Markup for SEO -->\n<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  "headline": "When Rules Break: How AI Handles the 40% of Workflows",\n  "author": {\n    "@type": "Organization",\n    "name": "Gumloop"\n  },\n  "datePublished": "${new Date().toISOString()}",\n  "description": "AI handles messy, contextual inputs that break standard workflows"\n}\n</script>\n`;
                                                    setContent(content + schemaMarkup);
                                                }}
                                            >
                                                Add Schema Markup
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Toggle AI Panel Button */}
                {!aiPanelOpen && !seoPanelOpen && (
                    <button
                        onClick={() => setAiPanelOpen(true)}
                        className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-l-lg shadow-lg hover:bg-gray-800"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Character count footer */}
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-2">
                <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-4">
                        <span>Characters: 6,468</span>
                        <span>Reading time: 5 min</span>
                    </div>
                    <div className="flex items-center gap-2">
                                                                 <span className="text-gray-900 font-bold">AI Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
}