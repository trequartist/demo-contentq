"use client";

import React, { useState } from 'react';
import { ExternalLink, Plus, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface Asset {
  id: string;
  type: string;
  name: string;
  status: 'active' | 'not_configured';
  health?: number;
  posts?: number;
  nextAction?: string;
  icon: string;
  url?: string;
  metrics?: {
    monthlyViews: string;
    avgEngagement: string;
    conversionRate: string;
  };
  preview?: {
    title: string;
    description: string;
    benefits: string[];
    setupTime: string;
    stats: {
      avgReach: string;
      engagement: string;
      leadGen: string;
    };
  };
}

interface AssetCardsProps {
  assets: Asset[];
}

const AssetCards: React.FC<AssetCardsProps> = ({ assets }) => {
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);

  const handleLinkedInClick = (asset: Asset) => {
    if (asset.status === 'not_configured') {
      setShowLinkedInModal(true);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className={`
              relative rounded-xl border transition-all duration-300 hover:shadow-xl cursor-pointer
              ${asset.status === 'active' 
                ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-dashed border-gray-300 dark:border-gray-600'
              }
            `}
            onClick={() => handleLinkedInClick(asset)}
          >
            {asset.status === 'active' ? (
              // Active Asset Card
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{asset.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {asset.name}
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </span>
                    </div>
                  </div>
                  {asset.url && (
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Health Score</p>
                    <div className="flex items-center mt-1">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${asset.health}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {asset.health}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Posts</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{asset.posts}</p>
                  </div>
                </div>

                {asset.metrics && (
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Views</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{asset.metrics.monthlyViews}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Engagement</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{asset.metrics.avgEngagement}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Conversion</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{asset.metrics.conversionRate}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Next Action</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{asset.nextAction}</p>
                  </div>
                  <button className="px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
                    Open Studio
                  </button>
                </div>
              </div>
            ) : (
              // Not Configured Asset Card
              <div className="p-6 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Coming Soon
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3 grayscale opacity-50">{asset.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                    {asset.name}
                  </h3>
                </div>

                {asset.preview && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {asset.preview.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {asset.preview.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {asset.preview.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Avg Reach</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{asset.preview.stats.avgReach}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Engagement</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{asset.preview.stats.engagement}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Lead Gen</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{asset.preview.stats.leadGen}</p>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-not-allowed flex items-center justify-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Add LinkedIn Asset
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* LinkedIn Modal */}
      {showLinkedInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                LinkedIn Features Coming Soon
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              LinkedIn content creation and optimization features are coming to ContentQ soon. 
              Want to be notified when they launch?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLinkedInModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  alert("You'll be notified when LinkedIn features launch!");
                  setShowLinkedInModal(false);
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                Notify Me
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssetCards;
