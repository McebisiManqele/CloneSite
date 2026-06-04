import React from 'react';

export default function PromoBanners() {
  return (
    <div className="grid grid-cols-2 gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-900 to-red-700 text-white p-6 rounded-lg">
        <div className="relative z-10">
          <h4 className="text-xl font-bold mb-2">#ProtectYourKeysToTheSafe</h4>
          <p className="text-sm mb-4">Keep your PINs, passwords and transaction verifications safe.</p>
          <button className="border-2 border-white px-4 py-2 rounded hover:bg-white hover:text-red-700 transition-colors text-sm">
            Learn more
          </button>
        </div>
        <img src="/holdingCell3.svg" alt="" className="absolute bottom-0 right-0 h-32 w-auto select-none" />
      </div>
      
      <div className="relative overflow-hidden bg-gradient-to-br from-red-900 to-red-700 text-white p-6 rounded-lg">
        <div className="relative z-10">
          <h4 className="text-xl font-bold mb-2">2026 benefits and pricing</h4>
          <p className="text-sm mb-4">Free Rewards, better banking and more value.</p>
          <button className="border-2 border-white px-4 py-2 rounded hover:bg-white hover:text-red-700 transition-colors text-sm">
            Learn more
          </button>
        </div>
        <img src="/suit.svg" alt="" className="absolute bottom-0 right-0 h-32 w-auto select-none" />
      </div>
    </div>
  );
}