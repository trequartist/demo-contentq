"use client";

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Input({
  label,
  error,
  helpText,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: InputProps) {
  const baseStyles = "w-full px-3 py-2 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0";
  const normalStyles = "border-gray-300 focus:border-black focus:ring-black/5";
  const errorStyles = "border-red-500 focus:border-red-500 focus:ring-red-500/20";

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`${baseStyles} ${error ? errorStyles : normalStyles} ${
            icon && iconPosition === 'left' ? 'pl-10' : ''
          } ${
            icon && iconPosition === 'right' ? 'pr-10' : ''
          } ${className}`}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}

export function Textarea({
  label,
  error,
  helpText,
  className = '',
  ...props
}: {
  label?: string;
  error?: string;
  helpText?: string;
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const baseStyles = "w-full px-3 py-2 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none";
  const normalStyles = "border-gray-300 focus:border-black focus:ring-black/5";
  const errorStyles = "border-red-500 focus:border-red-500 focus:ring-red-500/20";

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <textarea
        className={`${baseStyles} ${error ? errorStyles : normalStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}
