import React from 'react';

const SummaryCard = ({ title, count }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl">{count}</p>
    </div>
  );
};

export default SummaryCard; 