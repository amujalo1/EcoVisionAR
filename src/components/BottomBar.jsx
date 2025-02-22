import React from "react";
import { Link } from "react-router-dom";

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center p-2.5 bg-gray-100 border-t border-gray-300">
      <Link
        to="/calculate"
        className="w-1/5 px-5 py-2.5 text-base cursor-pointer border-none bg-green-500 text-white rounded-md transition-colors duration-300 hover:bg-green-600 text-center"
      >
        Calculate
      </Link>
      <Link
        to="/activity"
        className="w-1/5 px-5 py-2.5 text-base cursor-pointer border-none bg-green-500 text-white rounded-md transition-colors duration-300 hover:bg-green-600 text-center"
      >
        Activity
      </Link>
      <Link
        to="/stats"
        className="w-1/5 px-5 py-2.5 text-base cursor-pointer border-none bg-green-500 text-white rounded-md transition-colors duration-300 hover:bg-green-600 text-center"
      >
        Stats
      </Link>
      <Link
        to="/more"
        className="w-1/5 px-5 py-2.5 text-base cursor-pointer border-none bg-green-500 text-white rounded-md transition-colors duration-300 hover:bg-green-600 text-center"
      >
        More
      </Link>
    </div>
  );
};

export default BottomBar;
