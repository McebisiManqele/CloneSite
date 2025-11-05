import React from 'react';
import { HelpCircle, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xs lg:text-sm text-right">
            <div>Your</div>
            <div>story</div>
            <div className="font-semibold">matters</div>
          </div>
          <img 
            src="/absa-logo.png" 
            alt="Absa Logo" 
            className="w-12 h-12 lg:w-14 lg:h-14 object-contain rounded-full"
          />
          <span className="text-base lg:text-lg font-semibold ml-2 hidden sm:inline">
            Absa Online Banking
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://www.absa.co.za/help/absa-online-banking-help/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            <HelpCircle size={18} />
            <span>Get help with Online Banking</span>
          </a>
          <a 
            href="https://www.absa.co.za/talk-to-us/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:block text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            Contact us
          </a>
          <button className="hidden lg:block text-sm text-gray-700 hover:text-gray-900">
            Afrikaans
          </button>
          <button className="lg:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}