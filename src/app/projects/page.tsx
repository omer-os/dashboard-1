"use client";
import React, { useState } from "react";
import ProjectsTable from "@/components/tables/projects-table";

export default function ProjectsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-zinc-100 mb-2">Projects</h1>
      <p className="text-zinc-400 mb-6">
        Manage and track your interior design projects
      </p>

      <ProjectsTable />
    </div>
  );
}
