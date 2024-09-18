"use client";
import React from "react";
import ProjectsTable from "@/components/tables/projects-table";
import StatCards from "@/components/cards/stat-cards";
import ClientAcquisitionChart from "@/components/charts/client-acquisition-chart";
import RevenueChart from "@/components/charts/revenue-chart";
import TopDesignersTable from "@/components/tables/top-designers-table";

export default function Page() {
  return (
    <div className="p-6 bg-zinc-900 min-h-screen">
      <h1 className="text-3xl font-bold text-zinc-100 mb-2">Dashboard</h1>
      <p className="text-zinc-400 mb-6">
        Overview of your interior design business
      </p>

      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RevenueChart />
        <ClientAcquisitionChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <ProjectsTable /> */}
        <TopDesignersTable />
      </div>
    </div>
  );
}
