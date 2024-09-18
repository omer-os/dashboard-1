"use client";
import TeamMembersTable from "@/components/tables/team-table";
import React from "react";

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-zinc-100 mb-2">Team Members</h1>
      <p className="text-zinc-400 mb-6">Manage and track your team members.</p>

      <TeamMembersTable />
    </div>
  );
}
