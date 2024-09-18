import React from "react";

export default function Page() {
  return (
    <div className="p-4">
      <div className="text-emphasis font-bold text-xl">Simple Analytics</div>
      <p className="text-zinc-400">Simple Analytics page for your company.</p>

      <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Clients",
            value: "150",
          },
          {
            title: "Ongoing Projects",
            value: "12",
          },
          {
            title: "Upcoming Projects",
            value: "8",
          },
          {
            title: "Total Revenue",
            value: "$50,000",
          },
        ].map((i, index) => (
          <div
            key={index}
            className="bg-zinc-800 p-6 rounded-lg shadow-md border border-zinc-700"
          >
            <h3 className="text-lg font-semibold mb-2">{i.title}</h3>
            <p className="text-3xl font-bold">{i.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
