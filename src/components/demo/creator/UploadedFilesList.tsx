"use client";

import { File, Image, FileText, X, Download } from 'lucide-react';
import { UploadedFile } from '@/lib/demo/creator/types';

interface UploadedFilesListProps {
  files: UploadedFile[];
  onRemoveFile: (fileId: string) => void;
  onSynthesize?: () => void;
  showSynthesize?: boolean;
  className?: string;
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
  if (type.includes('pdf') || type.includes('document')) return <FileText className="w-4 h-4" />;
  return <File className="w-4 h-4" />;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export function UploadedFilesList({ 
  files, 
  onRemoveFile, 
  onSynthesize, 
  showSynthesize = false,
  className = '' 
}: UploadedFilesListProps) {
  if (files.length === 0) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header with file count and synthesize button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            {files.length} file{files.length !== 1 ? 's' : ''} uploaded
          </span>
        </div>
        
        {showSynthesize && files.length >= 2 && onSynthesize && (
          <button
            onClick={onSynthesize}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors animate-pulse"
          >
            <Download className="w-3 h-3" />
            Synthesize
          </button>
        )}
      </div>

      {/* Files list */}
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {files.map((file) => (
          <div 
            key={file.id} 
            className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {/* File icon */}
            <div className="flex-shrink-0 text-gray-500">
              {getFileIcon(file.type)}
            </div>

            {/* File info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{formatFileSize(file.size)}</span>
                <span>•</span>
                <span>{formatDate(file.uploadedAt)}</span>
              </div>
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
              onClick={() => onRemoveFile(file.id)}
              className="flex-shrink-0 p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      {files.length > 0 && (
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
          <button
            onClick={() => {
              // Clear all files
              files.forEach(file => onRemoveFile(file.id));
            }}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
