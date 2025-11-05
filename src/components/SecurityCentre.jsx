import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function SecurityCentre() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Security centre</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors text-left">
          <div className="flex items-center gap-3">
            <div className="text-orange-500 text-xl">🔒</div>
            <span className="text-sm">Security measures and enhancements</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        
        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors text-left">
          <div className="flex items-center gap-3">
            <div className="text-orange-500 text-xl">📋</div>
            <span className="text-sm">Latest scams and schemes</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        
        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors text-left">
          <div className="flex items-center gap-3">
            <div className="text-orange-500 text-xl">🛍️</div>
            <span className="text-sm">Shop online with ease</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}