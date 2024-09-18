import React from "react";
import {
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  LucideIcon,
} from "lucide-react";

const statData = [
  { title: "Total Clients", value: "150", icon: Users, color: "text-blue-500" },
  {
    title: "Ongoing Projects",
    value: "12",
    icon: Briefcase,
    color: "text-green-500",
  },
  {
    title: "Upcoming Projects",
    value: "8",
    icon: Calendar,
    color: "text-yellow-500",
  },
  {
    title: "Total Revenue",
    value: "$50,000",
    icon: DollarSign,
    color: "text-purple-500",
  },
];

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}) => (
  <div className="bg-zinc-800 p-6 rounded-lg shadow-md border border-zinc-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
      <Icon className={`${color} w-6 h-6`} />
    </div>
    <p className="text-3xl font-bold text-zinc-100">{value}</p>
  </div>
);

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
