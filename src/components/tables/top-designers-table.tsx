import React from "react";

const designersData = [
  { name: "Alice Johnson", projects: 8, revenue: "$120,000", rating: 4.8 },
  { name: "Bob Smith", projects: 6, revenue: "$95,000", rating: 4.6 },
  { name: "Carol Williams", projects: 7, revenue: "$110,000", rating: 4.9 },
  { name: "David Brown", projects: 5, revenue: "$85,000", rating: 4.7 },
];

export default function TopDesignersTable() {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md border border-zinc-700">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">
        Top Performing Designers
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-zinc-300">
          <thead className="text-zinc-400 border-b border-zinc-700">
            <tr>
              <th className="py-3 px-4">Designer</th>
              <th className="py-3 px-4">Projects</th>
              <th className="py-3 px-4">Revenue</th>
              <th className="py-3 px-4">Rating</th>
            </tr>
          </thead>
          <tbody>
            {designersData.map((designer, index) => (
              <tr key={index} className="border-b border-zinc-700">
                <td className="py-3 px-4">{designer.name}</td>
                <td className="py-3 px-4">{designer.projects}</td>
                <td className="py-3 px-4">{designer.revenue}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    {designer.rating}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
