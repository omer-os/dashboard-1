"use client";
import {
  Home,
  Users,
  Palette,
  Calendar,
  FileText,
  Settings,
  HelpCircle,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/",
    Icon: Home,
  },
  {
    name: "Clients",
    href: "/clients",
    Icon: ShoppingBag,
  },
  {
    name: "Projects",
    href: "/projects",
    Icon: Palette,
  },
  {
    name: "Team",
    href: "/team",
    Icon: Users,
  },
  {
    name: "Invoices",
    href: "/invoices",
    Icon: FileText,
  },
  {
    name: "Settings",
    href: "/settings",
    Icon: Settings,
  },
  {
    name: "Help",
    href: "/help",
    Icon: HelpCircle,
  },
];

export default function InteriorDesignSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-64 border-r border-zinc-700/50 bg-gradient-to-b from-zinc-800 to-zinc-900 p-6 hidden md:flex flex-col h-screen">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Interior Design Co.</h1>
      </div>
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex gap-2 text-sm items-center text-white p-2 rounded hover:bg-[#333] mb-2
          ${isActive(item.href) ? "bg-[#333]" : ""}`}
        >
          <item.Icon size={16} />
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
}
