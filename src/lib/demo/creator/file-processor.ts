import { UploadedFile } from './types';

export interface FileContent {
  id: string;
  fileName: string;
  fileType: string;
  extractedText: string;
  summary: string;
  keyPoints: string[];
  metadata: {
    wordCount: number;
    pageCount?: number;
    language: string;
    topics: string[];
  };
}

export interface SynthesisResult {
  combinedSummary: string;
  keyInsights: string[];
  commonThemes: string[];
  recommendations: string[];
  fileAnalysis: {
    fileName: string;
    contribution: string;
    keyFindings: string[];
  }[];
}

// Mock file processing utilities
export const processFile = async (file: File): Promise<FileContent> => {
  // Simulate file processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  // Mock extracted text based on file type
  let extractedText = '';
  let summary = '';
  let keyPoints: string[] = [];
  let topics: string[] = [];

  if (file.type.startsWith('image/')) {
    extractedText = `[Image Analysis] Detected content in ${file.name}: Visual elements, text overlays, and composition analysis.`;
    summary = `Image analysis of ${file.name} reveals visual content with potential text elements and design patterns.`;
    keyPoints = [
      'Visual content identified',
      'Potential text elements detected',
      'Design patterns analyzed'
    ];
    topics = ['visual-content', 'design', 'image-analysis'];
  } else if (file.type.includes('pdf')) {
    extractedText = `[PDF Content] Document "${file.name}" contains structured information with sections, headings, and detailed content. This appears to be a comprehensive document with multiple topics and insights.`;
    summary = `PDF document "${file.name}" contains structured information with multiple sections covering various topics.`;
    keyPoints = [
      'Structured document format',
      'Multiple topic sections',
      'Comprehensive information coverage'
    ];
    topics = ['document', 'structured-content', 'pdf-analysis'];
  } else if (file.type.includes('text/')) {
    extractedText = `[Text Content] Text file "${file.name}" contains written content with potential insights, data points, and narrative elements.`;
    summary = `Text file "${file.name}" contains written content with potential insights and data points.`;
    keyPoints = [
      'Written content identified',
      'Potential insights detected',
      'Data points available'
    ];
    topics = ['text-content', 'insights', 'data'];
  } else {
    extractedText = `[Document Content] File "${file.name}" contains document content with various sections and information.`;
    summary = `File "${file.name}" contains document content with various sections and information.`;
    keyPoints = [
      'Document content identified',
      'Multiple sections available',
      'Information structured'
    ];
    topics = ['document', 'content', 'information'];
  }

  return {
    id: crypto.randomUUID(),
    fileName: file.name,
    fileType: file.type,
    extractedText,
    summary,
    keyPoints,
    metadata: {
      wordCount: Math.floor(Math.random() * 1000) + 100,
      pageCount: file.type.includes('pdf') ? Math.floor(Math.random() * 20) + 1 : undefined,
      language: 'en',
      topics
    }
  };
};

export const synthesizeFiles = async (files: UploadedFile[]): Promise<SynthesisResult> => {
  // Simulate synthesis processing
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

  const fileAnalysis = files.map(file => ({
    fileName: file.name,
    contribution: `File "${file.name}" provides insights into ${getRandomTopic()}.`,
    keyFindings: [
      `Key insight from ${file.name}`,
      `Important data point from ${file.name}`,
      `Strategic recommendation from ${file.name}`
    ]
  }));

  const commonThemes = [
    'Strategic planning',
    'Content optimization',
    'AI visibility enhancement',
    'Market positioning'
  ];

  const keyInsights = [
    'Cross-file analysis reveals consistent themes',
    'Multiple perspectives on similar topics',
    'Complementary insights across documents',
    'Strategic alignment opportunities identified'
  ];

  const recommendations = [
    'Integrate insights from all files into unified strategy',
    'Leverage cross-document themes for content planning',
    'Apply consistent messaging across all touchpoints',
    'Develop comprehensive approach based on combined insights'
  ];

  return {
    combinedSummary: `Synthesis of ${files.length} files reveals interconnected themes and strategic opportunities. The documents collectively provide a comprehensive view of the subject matter, with overlapping insights and complementary perspectives that can be leveraged for strategic planning and content development.`,
    keyInsights,
    commonThemes,
    recommendations,
    fileAnalysis
  };
};

const getRandomTopic = () => {
  const topics = [
    'content strategy',
    'AI optimization',
    'market positioning',
    'brand development',
    'competitive analysis',
    'audience engagement',
    'content performance',
    'strategic planning'
  ];
  return topics[Math.floor(Math.random() * topics.length)];
};

// Generate file preview for images
export const generateFilePreview = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      resolve('');
    }
  });
};

// Convert File to UploadedFile
export const convertToUploadedFile = (file: File, preview?: string): UploadedFile => {
  return {
    id: crypto.randomUUID(),
    name: file.name,
    size: file.size,
    type: file.type,
    uploadedAt: new Date().toISOString(),
    preview
  };
};
