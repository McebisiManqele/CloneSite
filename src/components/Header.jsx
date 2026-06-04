import React from 'react';
import { HelpCircle, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-1.5 lg:px-8">
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
            className="w-9 h-9 lg:w-10 lg:h-10 object-contain rounded-full"
          />
          <span className="text-sm lg:text-base font-semibold ml-1 hidden sm:inline">
            Absa Online Banking
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://www.absa.co.za/help/absa-online-banking-help/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            <HelpCircle size={15} />
            <span>Get help with Online Banking</span>
          </a>
          <a 
            href="https://www.absa.co.za/talk-to-us/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:block text-xs text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            Contact us
          </a>
          <a
            href="/"
            className="hidden lg:block text-xs font-semibold text-gray-900 border-b-2 border-red-600 pb-0.5 cursor-pointer"
          >
            Login
          </a>
          <button className="hidden lg:block text-xs text-gray-700 hover:text-gray-900">
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