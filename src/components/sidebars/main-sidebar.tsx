"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  Palette,
  FileText,
  Settings,
  HelpCircle,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { name: "Dashboard", href: "/", Icon: Home },
  { name: "Clients", href: "/clients", Icon: ShoppingBag },
  { name: "Projects", href: "/projects", Icon: Palette },
  { name: "Team", href: "/team", Icon: Users },
  { name: "Invoices", href: "/invoices", Icon: FileText },
  { name: "Settings", href: "/settings", Icon: Settings },
  { name: "Help", href: "/help", Icon: HelpCircle },
];

export default function InteriorDesignSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.div
      className="p-4 hidden md:flex flex-col h-screen"
      animate={{ width: isCollapsed ? "4.5rem" : "16rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      initial={false}
    >
      <div className="mb-8 flex items-center justify-center">
        <motion.div
          className="min-w-10 w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ID
        </motion.div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.h1
              className="ml-3 text-xl font-bold text-white truncate"
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              Interior Design
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
      <nav className="flex-1 space-y-2">
        {sidebarItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              className={`flex items-center overflow-hidden justify-start ${
                isCollapsed ? "justify-center" : ""
              } gap-3 p-2 rounded-lg transition-colors duration-200 ${
                isActive(item.href)
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              } group relative`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.Icon size={20} />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              {isCollapsed && (
                <motion.div
                  className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 rounded-md text-sm text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.div>
              )}
            </motion.div>
          </Link>
        ))}
      </nav>
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mt-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full p-2 self-end"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </motion.button>
    </motion.div>
  );
}
