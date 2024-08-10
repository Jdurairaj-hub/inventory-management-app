import React from 'react';
import '../styles/globals.css'
import Inventory from '../components/Inventory';
import CameraClassifier from '../components/CameraClassifier';

const Page: React.FC = () => {
  return (
    <div className="pt-20 space-y-10">
    {/* Render Inventory Component */}
      <Inventory />
      <CameraClassifier />
    {/* Additional sections/components can be added here if needed */}
  </div>
  );
};

export default Page;
