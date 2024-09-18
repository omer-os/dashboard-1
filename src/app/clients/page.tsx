"use client";
import React from "react";
import ClientsTable from "@/components/tables/clients-table";

export default function ClientsPage() {
  return (
    <div className="p-6 bg-zinc-900 min-h-screen">
      <h1 className="text-3xl font-bold text-zinc-100 mb-2">Clients</h1>
      <p className="text-zinc-400 mb-6">
        Manage and track your interior design clients.
      </p>

      <ClientsTable />
    </div>
  );
}
