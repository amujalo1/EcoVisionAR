import React from "react";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <TopBar />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 bg-zinc-500 pt-[4rem] pb-[4rem]">
        {children}
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <BottomBar />
      </div>
    </div>
  );
};

export default Layout;
