import React from "react";
import MainSidebar from "../sidebars/main-sidebar";
import MainNavbar from "../navbars/main-navbar";
import BottomAppBar from "../navbars/bottom-appbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-lvh flex md:flex-row flex-col">
      <MainNavbar />
      <MainSidebar />
      <div className="flex-1 pb-20 md:pb-0 overflow-auto bg-zinc-900 md:mt-2 md:me-2 md:rounded-t-xl md:border border-b-0 border-zinc-700">
        {children}
      </div>

      <BottomAppBar />
    </div>
  );
}
