import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "Referrals", value: 40 },
  { name: "Social Media", value: 30 },
  { name: "Website", value: 20 },
  { name: "Other", value: 10 },
];

const COLORS = ["#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

export default function ClientAcquisitionChart() {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md border border-zinc-700">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">
        Client Acquisition Channels
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
