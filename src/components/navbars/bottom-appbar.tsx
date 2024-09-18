"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link, Calendar, Clock, Grid, MoreHorizontal } from "lucide-react";

const appBarItems = [
  { name: "Event Types", href: "/event-types", Icon: Link },
  { name: "Bookings", href: "/bookings", Icon: Calendar },
  { name: "Availability", href: "/availability", Icon: Clock },
  { name: "Apps", href: "/apps", Icon: Grid },
  { name: "More", href: "/more", Icon: MoreHorizontal },
];

const BottomAppBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 md:hidden block">
      <div className="flex justify-between items-center px-2 py-1">
        {appBarItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            className="flex flex-col items-center justify-center p-2 rounded-md text-zinc-500 hover:text-zinc-200"
            whileHover={{ backgroundColor: "rgba(39, 39, 42, 0.4)" }} // zinc-800 with opacity
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <item.Icon size={18} />
            </motion.div>
            <motion.div
              className="text-[10px] mt-1"
              variants={{
                hover: { opacity: 1 },
                initial: { opacity: 0.7 },
              }}
              initial="initial"
              whileHover="hover"
            >
              {item.name}
            </motion.div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default BottomAppBar;
