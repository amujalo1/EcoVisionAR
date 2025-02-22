import React from "react";

const TopBar = () => {
  return (
    <div className="flex justify-center items-center p-2.5 bg-gray-100 border-b border-gray-300 text-black">
      <div className="flex items-center space-x-2">
        <span className="font-semibold">Points:</span>
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full">100</span>
      </div>
    </div>
  );
};

export default TopBar;