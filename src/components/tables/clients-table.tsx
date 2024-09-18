import React, { useState, useEffect, LegacyRef } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  Calendar,
  X,
} from "lucide-react";
import { useClickAway } from "@uidotdev/usehooks";
import AddClientDialog from "../dialogs/add-client-dialog";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  projectCount: number;
  totalBudget: number;
  lastProjectDate: string;
}

const initialClients: Client[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    projectCount: 2,
    totalBudget: 225000,
    lastProjectDate: "2024-03-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    projectCount: 1,
    totalBudget: 150000,
    lastProjectDate: "2023-11-01",
  },
  {
    id: 3,
    name: "Acme Corp",
    email: "contact@acmecorp.com",
    phone: "+1 (555) 246-8101",
    projectCount: 1,
    totalBudget: 50000,
    lastProjectDate: "2024-01-20",
  },
  {
    id: 4,
    name: "Elite Properties",
    email: "info@eliteproperties.com",
    phone: "+1 (555) 369-2580",
    projectCount: 1,
    totalBudget: 300000,
    lastProjectDate: "2024-02-10",
  },
  {
    id: 5,
    name: "Nature Retreats",
    email: "bookings@natureetreats.com",
    phone: "+1 (555) 789-4561",
    projectCount: 1,
    totalBudget: 100000,
    lastProjectDate: "2023-09-05",
  },
  {
    id: 6,
    name: "City Brews",
    email: "hello@citybrews.com",
    phone: "+1 (555) 159-7531",
    projectCount: 1,
    totalBudget: 80000,
    lastProjectDate: "2024-04-01",
  },
  {
    id: 7,
    name: "Green Living Co.",
    email: "support@greenliving.com",
    phone: "+1 (555) 753-9514",
    projectCount: 1,
    totalBudget: 200000,
    lastProjectDate: "2024-03-20",
  },
  {
    id: 8,
    name: "Heritage Society",
    email: "info@heritagesociety.org",
    phone: "+1 (555) 951-7532",
    projectCount: 1,
    totalBudget: 500000,
    lastProjectDate: "2023-07-15",
  },
  {
    id: 9,
    name: "Luxe Stays",
    email: "concierge@luxestays.com",
    phone: "+1 (555) 852-9630",
    projectCount: 1,
    totalBudget: 250000,
    lastProjectDate: "2024-05-01",
  },
  {
    id: 10,
    name: "InnovateTech",
    email: "hello@innovatetech.com",
    phone: "+1 (555) 741-8520",
    projectCount: 1,
    totalBudget: 120000,
    lastProjectDate: "2024-06-10",
  },
];

type SortKey =
  | "name"
  | "email"
  | "phone"
  | "projectCount"
  | "totalBudget"
  | "lastProjectDate";

const ClientsTable: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const DatePickerRef = useClickAway(() => {
    setShowDatePicker(false);
  }) as LegacyRef<HTMLDivElement>;
  const itemsPerPage = 5;

  useEffect(() => {
    let filtered = initialClients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    );

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((client) => {
        const clientDate = new Date(client.lastProjectDate);
        return (
          clientDate >= new Date(dateRange.start) &&
          clientDate <= new Date(dateRange.end)
        );
      });
    }

    const sorted = [...filtered].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setClients(sorted);
    setCurrentPage(1);
  }, [searchTerm, sortKey, sortOrder, dateRange]);

  const pageCount = Math.ceil(clients.length / itemsPerPage);
  const currentClients = clients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br text-zinc-100 bg-zinc-800/50 border border-zinc-700 rounded-xl shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
        <div className="relative flex-grow max-w-md w-full">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400"
            size={20}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div ref={DatePickerRef} className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center bg-zinc-800/50 border border-zinc-600 rounded-lg px-4 py-3 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              <Calendar size={20} className="mr-2" />
              Date Filter
            </button>
            {showDatePicker && (
              <div className="absolute end-0 top-full mt-2 p-4 bg-zinc-800 border border-zinc-600 rounded-lg shadow-xl z-10">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                  className="block w-full mb-2 p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                  className="block w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                />
              </div>
            )}
          </div>

          {(searchTerm || dateRange.start || dateRange.end) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setDateRange({ start: "", end: "" });
              }}
              className="flex items-center bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg px-4 py-3 hover:bg-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
            >
              <X size={20} className="mr-2" />
              Clear Filters
            </button>
          )}

          <AddClientDialog onAddClient={(client) => {}}>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out">
              Add New Client
            </button>
          </AddClientDialog>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-700 shadow-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-zinc-800 to-zinc-700 text-zinc-300">
              {[
                "name",
                "email",
                "phone",
                "projectCount",
                "totalBudget",
                "lastProjectDate",
              ].map((key) => (
                <th
                  key={key}
                  className="p-4 text-left w-max cursor-pointer hover:bg-zinc-600/30 transition duration-300 ease-in-out"
                  onClick={() => handleSort(key as SortKey)}
                >
                  <div className="flex items-center">
                    {key === "projectCount"
                      ? "Projects"
                      : key === "totalBudget"
                      ? "Total Budget"
                      : key === "lastProjectDate"
                      ? "Last Project"
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortKey === key &&
                      (sortOrder === "asc" ? (
                        <SortAsc size={16} className="ml-2" />
                      ) : (
                        <SortDesc size={16} className="ml-2" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client, index) => (
              <tr
                key={client.id}
                className={`border-b border-zinc-700 hover:bg-zinc-700/30 transition-colors ${
                  index % 2 === 0 ? "bg-zinc-800/30" : "bg-zinc-800/10"
                }`}
              >
                <td className="w-20 truncate p-4">{client.name}</td>
                <td className="w-20 truncate p-4">{client.email}</td>
                <td className="w-20 truncate p-4">{client.phone}</td>
                <td className="w-20 truncate p-4">{client.projectCount}</td>
                <td className="w-20 truncate p-4">
                  ${client.totalBudget.toLocaleString()}
                </td>
                <td className="w-20 truncate p-4">{client.lastProjectDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-400">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, clients.length)} of{" "}
          {clients.length} clients
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
          >
            <ChevronLeft size={20} />
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageCount))
            }
            disabled={currentPage === pageCount}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientsTable;
