"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Search, FileText, Download, Upload, MessageSquare, BookOpen } from 'lucide-react';
import { useCreatorStore } from '@/lib/demo/creator/store';
import { convertToUploadedFile, generateFilePreview, synthesizeFiles } from '@/lib/demo/creator/file-processor';

interface ResearchModeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResearchModeOverlay({ isOpen, onClose }: ResearchModeOverlayProps) {
  const [input, setInput] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    researchSession,
    addResearchMessage,
    addResearchFile,
    removeResearchFile,
    clearResearchFiles,
    addResearchNote,
    setSynthesisResults,
  } = useCreatorStore.use;

  const { messages = [], uploadedFiles = [], researchNotes = [], synthesisResults } = researchSession || {};

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Ensure research session is properly initialized
  useEffect(() => {
    if (!researchSession) {
      // Initialize research session if it doesn't exist
      console.warn('Research session not found, initializing...');
    }
  }, [researchSession]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user' as const,
      text: input,
      timestamp: new Date().toISOString(),
    };

    addResearchMessage(userMessage);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: crypto.randomUUID(),
        role: 'assistant' as const,
        text: `I understand you're researching: "${input}". Let me help you analyze this topic and provide insights based on your uploaded files.`,
        timestamp: new Date().toISOString(),
      };
      addResearchMessage(aiMessage);
    }, 1000);
  };

  const handleFileUpload = async (files: File[]) => {
    for (const file of files) {
      const uploadedFile = await convertToUploadedFile(file);
      const preview = await generateFilePreview(file);
      addResearchFile({ ...uploadedFile, preview });
    }
  };

  const handleSynthesize = async () => {
    if (uploadedFiles.length < 2) return;

    setIsSynthesizing(true);
    addResearchMessage({
      id: crypto.randomUUID(),
      role: 'assistant',
      text: '🔄 Analyzing and synthesizing your research files...',
      timestamp: new Date().toISOString(),
    });

    try {
      const synthesisResult = await synthesizeFiles(uploadedFiles);
      setSynthesisResults(synthesisResult);

      addResearchMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        text: `## 📊 Research Synthesis Complete\n\n**Combined Analysis:**\n${synthesisResult.combinedSummary}\n\n**Key Insights:**\n${synthesisResult.keyInsights.map(insight => `• ${insight}`).join('\n')}\n\n**Common Themes:**\n${synthesisResult.commonThemes.map(theme => `• ${theme}`).join('\n')}\n\n**Research Recommendations:**\n${synthesisResult.recommendations.map(rec => `• ${rec}`).join('\n')}`,
        timestamp: new Date().toISOString(),
      });

      // Add as research note
      addResearchNote(`Synthesis completed: ${synthesisResult.combinedSummary.substring(0, 100)}...`);
    } catch (error) {
      addResearchMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        text: '❌ Error during synthesis. Please try again.',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsSynthesizing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Research Mode</h2>
                <p className="text-sm text-gray-600">Independent research context</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Research Stats */}
        <div className="flex-shrink-0 px-6 py-3 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{uploadedFiles.length} files</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{messages.length} messages</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{researchNotes.length} notes</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Start Research
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Upload files, ask questions, or explore topics in this independent research context.
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* File Preview */}
        {uploadedFiles.length > 0 && (
          <div className="flex-shrink-0 border-t border-gray-100 p-4 bg-gray-50">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm"
                >
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700 truncate max-w-[120px]">{file.name}</span>
                  <button
                    onClick={() => removeResearchFile(file.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              ))}
              {uploadedFiles.length >= 2 && (
                <button
                  onClick={handleSynthesize}
                  disabled={isSynthesizing}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {isSynthesizing ? 'Synthesizing...' : 'Synthesize'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Upload className="h-5 w-5" />
            </button>
            <div className="flex-1 relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask research questions or upload files..."
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,application/pdf,text/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              handleFileUpload(Array.from(files));
            }
          }}
          className="hidden"
        />
      </div>
    </div>
  );
}
