"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Box,
  Users,
  Grid,
  MoreHorizontal,
  Users2,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const appBarItems = [
  { name: "Dashboard", href: "/", Icon: Home },
  { name: "Projects", href: "/projects", Icon: Box },
  { name: "Clients", href: "/clients", Icon: ShoppingBag },
  { name: "Team", href: "/team", Icon: Users2 },
  { name: "More", href: "/more", Icon: MoreHorizontal },
];

const BottomAppBar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800 md:hidden block z-50">
      <div className="flex justify-between items-center px-2 py-1">
        {appBarItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link key={index} href={item.href} passHref>
              <motion.div
                className={`flex relative flex-col items-center justify-center p-2 rounded-md ${
                  isActive ? "text-indigo-400" : "text-zinc-500"
                } hover:text-zinc-200`}
                whileHover={{ backgroundColor: "rgba(39, 39, 42, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <item.Icon size={20} />
                </motion.div>
                <motion.div
                  className={`text-[10px] mt-1 ${
                    isActive ? "font-semibold" : "font-normal"
                  }`}
                  variants={{
                    hover: { opacity: 1 },
                    initial: { opacity: 0.7 },
                  }}
                  initial="initial"
                  whileHover="hover"
                >
                  {item.name}
                </motion.div>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 start-0 end-0 h-1 bg-indigo-400 rounded-full"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomAppBar;
