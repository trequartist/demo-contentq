"use client";

import { useState } from 'react';
import { File, Image, FileText, X, Download, MoreHorizontal } from 'lucide-react';
import { UploadedFile } from '@/lib/demo/creator/types';

interface CompactFilePreviewProps {
  files: UploadedFile[];
  onRemoveFile: (fileId: string) => void;
  onSynthesize?: () => void;
  onFileClick?: (file: UploadedFile) => void;
  className?: string;
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return <Image className="w-3 h-3" />;
  if (type.includes('pdf') || type.includes('document')) return <FileText className="w-3 h-3" />;
  return <File className="w-3 h-3" />;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
};

const truncateFileName = (name: string, maxLength: number = 20) => {
  if (name.length <= maxLength) return name;
  return name.substring(0, maxLength) + '...';
};

export function CompactFilePreview({ 
  files, 
  onRemoveFile, 
  onSynthesize, 
  onFileClick,
  className = '' 
}: CompactFilePreviewProps) {
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);

  if (files.length === 0) return null;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Files */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        {files.map((file) => (
          <div
            key={file.id}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer group
              ${hoveredFile === file.id 
                ? 'bg-blue-50 border-blue-200 shadow-sm' 
                : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }
            `}
            onMouseEnter={() => setHoveredFile(file.id)}
            onMouseLeave={() => setHoveredFile(null)}
            onClick={() => onFileClick?.(file)}
          >
            {/* File icon */}
            <div className="flex-shrink-0 text-gray-500">
              {getFileIcon(file.type)}
            </div>

            {/* File info */}
            <div className="flex-shrink-0 min-w-0">
              <p className="text-base font-medium text-gray-900 truncate max-w-[150px]">
                {truncateFileName(file.name, 20)}
              </p>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.size)}
              </p>
            </div>

            {/* File preview for images */}
            {file.preview && file.type.startsWith('image/') && (
              <div className="flex-shrink-0 w-8 h-8 rounded border border-gray-200 overflow-hidden">
                <img 
                  src={file.preview} 
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFile(file.id);
              }}
              className="flex-shrink-0 p-1.5 hover:bg-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        ))}
      </div>

      {/* Synthesis button */}
      {files.length >= 2 && onSynthesize && (
        <button
          onClick={onSynthesize}
          className="flex items-center gap-3 px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Download className="w-5 h-5" />
          Synthesize
        </button>
      )}

      {/* More files indicator */}
      {files.length > 3 && (
        <div className="flex items-center gap-2 px-4 py-3 text-base text-gray-500 bg-gray-100 rounded-xl">
          <MoreHorizontal className="w-5 h-5" />
          <span>+{files.length - 3}</span>
        </div>
      )}
    </div>
  );
}
