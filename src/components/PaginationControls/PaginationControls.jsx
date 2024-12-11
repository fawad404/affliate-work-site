import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaginationControls = ({ totalPages, currentPage, perPage, onNext, onPrevious, onPageChange, onLimitChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get current query params
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  // Generate pages to display (e.g., 1, 2, ..., 162, 163)
  const renderPages = () => {
    const pages = [];
    if (currentPage > 3) pages.push(1, 2, '...');
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(currentPage + 1, totalPages); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...', totalPages - 1, totalPages);
    return pages;
  };

  // Handle page navigation
  const goToPage = (pageNumber) => {
    query.set('page', pageNumber);
    query.set('per_page', perPage);
    navigate(`?${query.toString()}`);
    onPageChange(pageNumber);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* Previous Button */}
      <button
        className={`px-3 py-2 rounded-full ${
          currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
        }`}
        disabled={currentPage === 1}
        onClick={() => {
          if (currentPage > 1) {
            onPrevious();
          }
        }}
      >
        &larr;
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {renderPages().map((p, index) =>
          p === '...' ? (
            <span key={index} className="text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={index}
              className={`px-3 py-2 rounded-md ${
                p === currentPage
                  ? 'bg-indigo-500 text-gray-50'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => goToPage(p)}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        className={`px-3 py-2 rounded-full ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        disabled={currentPage === totalPages}
        onClick={() => {
          if (currentPage < totalPages) {
            onNext();
          }
        }}
      >
        &rarr;
      </button>

      {/* Per Page Dropdown */}
      <div className="relative">
        <label htmlFor="perPageSelect" className="hidden">Items Per Page</label>
        <select
          id="perPageSelect"
          value={perPage}
          onChange={(e) => {
            const newLimit = parseInt(e.target.value, 10);
            onLimitChange(newLimit);
          }}
          className="block px-2 py-1 border rounded-md bg-gray-50 border-gray-300 shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-400 text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationControls;
