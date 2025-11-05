import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function UsefulInfo() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Useful information</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors text-left">
          <div className="flex items-center gap-3">
            <div className="text-orange-500 text-xl">🏢</div>
            <span className="text-sm">Grandmark International Pty Ltd</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        
        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors text-left">
          <div className="flex items-center gap-3">
            <div className="text-orange-500 text-xl">💳</div>
            <span className="text-sm">Explore more ways to do your banking</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        
        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors text-left">
          <div className="flex items-center gap-3">
            <div className="text-orange-500 text-xl">💰</div>
            <span className="text-sm">2025 Benefits and Pricing</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        
        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors text-left">
          <div className="flex items-center gap-3">
            <div className="text-orange-500 text-xl">📅</div>
            <span className="text-sm">Next planned maintenance</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}