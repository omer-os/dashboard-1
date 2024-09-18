import { Bell, Search, Settings } from "lucide-react";
import React from "react";

export default function MainNavbar() {
  return (
    <div className="flex justify-between items-center sticky top-0 start-0 bg-zinc-800/50 border-b border-zinc-700 md:hidden p-4 py-3">
      <div className="text-xl font-bold ">ID Co.</div>

      <div className="flex gap-2 items-center">
        <button className="flex items-center justify-center h-10 w-10 hover:bg-zinc-700 rounded-full active:sca95 scale-100">
          <Search size={15} />
        </button>

        <button className="flex items-center justify-center h-10 w-10 hover:bg-zinc-700 rounded-full active:sca95 scale-100">
          <Settings size={15} />
        </button>

        {/* avatar */}
        <div
          className="h-10 w-10 bg-zinc-800 rounded-full
        flex items-center justify-center text-white"
        >
          A
        </div>
      </div>
    </div>
  );
}
