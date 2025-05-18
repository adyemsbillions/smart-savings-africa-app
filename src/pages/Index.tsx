
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home page
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-gray">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading SmartSave Africa...</h1>
        <p className="text-xl text-app-dark-gray">Please wait</p>
      </div>
    </div>
  );
};

export default Index;
