// components/TopBar.js
import React from "react";

const TopBar = () => {
  return (
    <div className="fixed top-0 h-2 left-1/2 rounded-xl -translate-x-1/2 w-full max-w-md z-50 flex justify-center">
      <img
        src="/logo.png"
        alt="Logo"
        className="h-24 w-24 object-contain bg-white rounded-full"
      />
    </div>
  );
};
export default TopBar;
