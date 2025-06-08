import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="nt-page nt-not-found min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600 mt-2">Page Not Found</p>
        <Link
          href="/dashboard"
          className="mt-4 inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
