import React from 'react';

const PurpleCenteredCard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white min-h-screen flex items-start justify-center pt-[10vh]">
      <div className="bg-purple-800 text-white w-[95vw] min-h-[60vh] p-10 md:p-14 lg:p-16 shadow-2xl rounded-3xl">
        {children}
      </div>
    </div>
  );
};

export default PurpleCenteredCard;
    