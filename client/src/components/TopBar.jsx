// components/TopBar.js
import React from "react";
import logo from "/logo.png";

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex justify-center items-center h-16 bg-white shadow-md border-b border-gray-200">
      <div className=" max-w-[375px] mx-auto flex items-center justify-between px-4">
        {/* Poeni u lijevom kutu */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Points:</span>
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md">
            100
          </span>
        </div>

        {/* Logo u sredini */}
        <div className="flex-1 flex justify-center">
          <img src={logo} alt="Logo" className="h-8 object-contain" />
        </div>

        {/* Prazan prostor u desnom kutu (za balans) */}
        <div className="w-10"></div>
      </div>
    </div>
  );
};

export default TopBar;
