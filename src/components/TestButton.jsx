'use client';

import React from 'react';

const TestButton = () => {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-black py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Test Button
    </button>
  );
};

export default TestButton;
