"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface StrategicPlay {
  id: string;
  name: string;
  effort: number;
  opportunity: number;
  impact: 'high' | 'medium' | 'low';
  status: 'active' | 'planned' | 'completed';
  description: string;
  progress: number;
}

interface StrategicPlaysProps {
  plays: StrategicPlay[];
}

export default function StrategicPlays({ plays }: StrategicPlaysProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-black text-white';
      case 'planned': return 'bg-gray-200 text-gray-700';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Strategic Plays</h2>
          <Link href="/demo/playbook">
            <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center">
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </Link>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Content strategy plays ranked by opportunity size
        </p>
      </div>
      
      <div className="p-6 space-y-4">
        {plays.map((play) => (
          <div key={play.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{play.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{play.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(play.status)}`}>
                  {play.status}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {play.opportunity.toLocaleString()} searches/mo
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{play.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${play.progress}%` }}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {play.effort}% effort
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
