import React, { memo } from 'react';

const EmptyCall = () => {
  return (
    <div className="text-center p-8 max-w-md">
      <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Start a video call</h3>
      <p className="text-gray-500 dark:text-gray-400">
        Select a contact to begin your conversation
      </p>
    </div>
  );
};

export default memo(EmptyCall);
