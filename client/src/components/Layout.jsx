import React from "react";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 bg-zinc-500">{children}</main>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
};

export default Layout;
