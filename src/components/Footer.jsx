import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 bg-white border-t border-gray-200 py-6 px-4 text-xs text-gray-600">
      <div className="max-w-7xl mx-auto">
        <p className="mb-2">
          © Copyright. Absa Bank Limited. Registration Number: 1986/004794/06 Authorised financial services and registered credit provider NCRCP7
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/charges" className="text-red-600 hover:underline">Charges</a>
          <a href="/banking-regulations" className="text-red-600 hover:underline">Banking Regulations</a>
          <a href="/browser-requirements" className="text-red-600 hover:underline">Browser Requirements</a>
          <a href="/security-centre" className="text-red-600 hover:underline">Security Centre</a>
          <a href="/terms-of-use" className="text-red-600 hover:underline">Terms of use</a>
          <a href="/privacy-statement" className="text-red-600 hover:underline">Privacy Statement</a>
        </div>
      </div>
    </footer>
  );
}