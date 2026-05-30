import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Subtle dotted backdrop (solid dots, no gradient) */}
      <div className="absolute inset-0 dot-grid opacity-[0.3] pointer-events-none" />

      <h1 className="text-6xl font-bold poppins-bold text-theme mb-4 relative z-10">404</h1>
      <h2 className="text-2xl font-semibold text-neutral-100 mb-4 relative z-10">Page Not Found</h2>
      <p className="text-neutral-400 max-w-sm mb-8 relative z-10">The link you followed may be broken or the page may have been removed.</p>
      
      <Link
        to="/"
        className="btn-primary inline-flex items-center gap-2 font-semibold py-3.5 px-8 rounded-full text-sm relative z-10 shadow-lg"
      >
        <FaHome size={14} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;