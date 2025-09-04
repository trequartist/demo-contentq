"use client";

import React, { useState } from 'react';
import { 
  Share2,
  Link as LinkIcon,
  Copy,
  Check,
  Mail,
  Users,
  Globe,
  Lock,
  X,
  User,
  ChevronDown
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  documentId: string;
}

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'viewer' | 'editor' | 'owner';
}

export default function ShareModal({ isOpen, onClose, documentTitle, documentId }: ShareModalProps) {
  const [accessLevel, setAccessLevel] = useState<'private' | 'restricted' | 'public'>('private');
  const [copied, setCopied] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'viewer' | 'editor'>('viewer');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'editor'
    },
    {
      id: '2',
      name: 'Alex Chen',
      email: 'alex@company.com',
      role: 'viewer'
    }
  ]);

  if (!isOpen) return null;

  const shareLink = `https://demo.kiwiq.ai/share/${documentId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddCollaborator = () => {
    if (newEmail && newEmail.includes('@')) {
      const collaborator: Collaborator = {
        id: Date.now().toString(),
        name: newEmail.split('@')[0],
        email: newEmail,
        role: newRole
      };
      setCollaborators([...collaborators, collaborator]);
      setNewEmail('');
      setNewRole('viewer');
    }
  };

  const handleRemoveCollaborator = (id: string) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
  };

  const handleRoleChange = (id: string, role: 'viewer' | 'editor' | 'owner') => {
    setCollaborators(collaborators.map(c => 
      c.id === id ? { ...c, role } : c
    ));
  };

  const getAccessIcon = () => {
    switch(accessLevel) {
      case 'public':
        return <Globe className="w-4 h-4" />;
      case 'restricted':
        return <Users className="w-4 h-4" />;
      case 'private':
        return <Lock className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'owner':
        return 'bg-black text-white';
      case 'editor':
        return 'bg-gray-600 text-white';
      case 'viewer':
        return 'bg-gray-200 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Share2 className="w-5 h-5 text-gray-600" />
              <div>
                <h2 className="text-xl font-semibold text-black">Share "{documentTitle}"</h2>
                <p className="text-sm text-gray-600 mt-0.5">Collaborate with your team</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {/* Access Level */}
          <div className="px-6 py-4 border-b border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Access Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'private', label: 'Private', description: 'Only you can access', icon: Lock },
                { value: 'restricted', label: 'Restricted', description: 'Specific people', icon: Users },
                { value: 'public', label: 'Public', description: 'Anyone with link', icon: Globe }
              ].map((level) => {
                const Icon = level.icon;
                return (
                  <button
                    key={level.value}
                    onClick={() => setAccessLevel(level.value as any)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      accessLevel === level.value
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-2" />
                    <p className="text-sm font-medium">{level.label}</p>
                    <p className={`text-xs mt-0.5 ${
                      accessLevel === level.value ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {level.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Share Link */}
          <div className="px-6 py-4 border-b border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share Link
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                <LinkIcon className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                />
              </div>
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center space-x-2 ${
                  copied
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Add Collaborators */}
          {accessLevel === 'restricted' && (
            <div className="px-6 py-4 border-b border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Collaborators
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                </select>
                <button
                  onClick={handleAddCollaborator}
                  disabled={!newEmail || !newEmail.includes('@')}
                  className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* Collaborators List */}
          {accessLevel === 'restricted' && (
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  People with Access
                </label>
                <span className="text-xs text-gray-500">
                  {collaborators.length + 1} people
                </span>
              </div>

              <div className="space-y-2">
                {/* Owner */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">You</p>
                      <p className="text-xs text-gray-500">owner@company.com</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-medium bg-black text-white rounded-full">
                    Owner
                  </span>
                </div>

                {/* Collaborators */}
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{collaborator.name}</p>
                        <p className="text-xs text-gray-500">{collaborator.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <button
                          onClick={() => {
                            // Toggle role dropdown
                          }}
                          className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${getRoleBadgeColor(collaborator.role)}`}
                        >
                          <span className="capitalize">{collaborator.role}</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveCollaborator(collaborator.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {getAccessIcon()} 
              <span className="ml-2">
                {accessLevel === 'private' && 'Only you can access this document'}
                {accessLevel === 'restricted' && `${collaborators.length + 1} people have access`}
                {accessLevel === 'public' && 'Anyone with the link can view'}
              </span>
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

