// components/Layout.js
import React from "react";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col mx-auto" style={{ maxWidth: "375px", width: "100%" }}>
      {/* Fiksirani TopBar */}
      <TopBar />

      {/* Glavni sadržaj s paddingom za TopBar i BottomBar */}
      <main className="flex-1 overflow-y-auto p-4 bg-zinc-500 pt-[4rem] pb-[4rem]">
        {children}
      </main>

      {/* Fiksirani BottomBar */}
      <BottomBar />
    </div>
  );
};

export default Layout;