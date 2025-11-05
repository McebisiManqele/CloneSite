import React from 'react';

export default function PromoBanners() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-red-800 to-red-700 text-white p-6 rounded-lg">
        <h4 className="text-xl font-bold mb-2">#ProtectYourKeysToTheSafe</h4>
        <p className="text-sm mb-4">Keep your PINs, passwords and transaction verifications safe.</p>
        <button className="border-2 border-white px-4 py-2 rounded hover:bg-white hover:text-red-700 transition-colors text-sm">
          Learn more
        </button>
      </div>
      
      <div className="bg-gradient-to-br from-red-800 to-red-700 text-white p-6 rounded-lg">
        <h4 className="text-xl font-bold mb-2">2025 benefits and pricing</h4>
        <p className="text-sm mb-4">Free Rewards, better banking and more value.</p>
        <button className="border-2 border-white px-4 py-2 rounded hover:bg-white hover:text-red-700 transition-colors text-sm">
          Learn more
        </button>
      </div>
    </div>
  );
}