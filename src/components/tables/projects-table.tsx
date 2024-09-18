import React, { useState, useEffect } from "react";
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

interface Project {
  id: number;
  name: string;
  client: string;
  status: "In Progress" | "Completed" | "On Hold";
  startDate: string;
  budget: number;
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Modern Loft Renovation",
    client: "John Doe",
    status: "In Progress",
    startDate: "2024-03-15",
    budget: 75000,
  },
  {
    id: 2,
    name: "Coastal Beach House",
    client: "Jane Smith",
    status: "Completed",
    startDate: "2023-11-01",
    budget: 150000,
  },
  {
    id: 3,
    name: "Minimalist Office Space",
    client: "Acme Corp",
    status: "On Hold",
    startDate: "2024-01-20",
    budget: 50000,
  },
  {
    id: 4,
    name: "Luxury Penthouse Suite",
    client: "Elite Properties",
    status: "In Progress",
    startDate: "2024-02-10",
    budget: 300000,
  },
  {
    id: 5,
    name: "Rustic Mountain Cabin",
    client: "Nature Retreats",
    status: "Completed",
    startDate: "2023-09-05",
    budget: 100000,
  },
  {
    id: 6,
    name: "Urban Cafe Redesign",
    client: "City Brews",
    status: "On Hold",
    startDate: "2024-04-01",
    budget: 80000,
  },
  {
    id: 7,
    name: "Eco-Friendly Family Home",
    client: "Green Living Co.",
    status: "In Progress",
    startDate: "2024-03-20",
    budget: 200000,
  },
  {
    id: 8,
    name: "Historic Building Restoration",
    client: "Heritage Society",
    status: "Completed",
    startDate: "2023-07-15",
    budget: 500000,
  },
  {
    id: 9,
    name: "Boutique Hotel Lobby",
    client: "Luxe Stays",
    status: "In Progress",
    startDate: "2024-05-01",
    budget: 250000,
  },
  {
    id: 10,
    name: "Tech Startup Office",
    client: "InnovateTech",
    status: "On Hold",
    startDate: "2024-06-10",
    budget: 120000,
  },
];

type SortKey = "name" | "client" | "status" | "startDate" | "budget";

const ProjectsTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    let filtered = initialProjects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "All" || project.status === statusFilter)
    );

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((project) => {
        const projectDate = new Date(project.startDate);
        return (
          projectDate >= new Date(dateRange.start) &&
          projectDate <= new Date(dateRange.end)
        );
      });
    }

    const sorted = [...filtered].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setProjects(sorted);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortKey, sortOrder, dateRange]);

  const pageCount = Math.ceil(projects.length / itemsPerPage);
  const currentProjects = projects.slice(
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
    <div className="p-6 bg-gradient-to-br  text-zinc-100 bg-zinc-800/50 border border-zinc-700 rounded-xl shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
        <div className="relative flex-grow max-w-md w-full">
          <input
            type="text"
            placeholder="Search projects..."
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
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-800/50 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent p-3 transition duration-300 ease-in-out"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          <div className="relative">
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

          {searchTerm ||
          statusFilter !== "All" ||
          dateRange.start ||
          dateRange.end ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                  setDateRange({ start: "", end: "" });
                }}
                className="flex items-center bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg px-4 py-3 hover:bg-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
              >
                <X size={20} className="mr-2" />
                Clear{" "}
                {
                  [
                    searchTerm && "Search",
                    statusFilter !== "All" && "Status",
                    (dateRange.start || dateRange.end) && "Date Range",
                  ].filter(Boolean).length
                }{" "}
                Filter/s
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-700 shadow-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-zinc-800 to-zinc-700 text-zinc-300">
              {["name", "client", "status", "startDate", "budget"].map(
                (key) => (
                  <th
                    key={key}
                    className="p-4 text-left cursor-pointer hover:bg-zinc-600/30 transition duration-300 ease-in-out"
                    onClick={() => handleSort(key as SortKey)}
                  >
                    <div className="flex items-center">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      {sortKey === key &&
                        (sortOrder === "asc" ? (
                          <SortAsc size={16} className="ml-2" />
                        ) : (
                          <SortDesc size={16} className="ml-2" />
                        ))}
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr
                key={project.id}
                className={`border-b border-zinc-700 hover:bg-zinc-700/30 transition-colors ${
                  index % 2 === 0 ? "bg-zinc-800/30" : "bg-zinc-800/10"
                }`}
              >
                <td className="p-4">{project.name}</td>
                <td className="p-4">{project.client}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      project.status === "In Progress"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : project.status === "Completed"
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="p-4">{project.startDate}</td>
                <td className="p-4">${project.budget.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-400">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, projects.length)} of{" "}
          {projects.length} projects
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

export default ProjectsTable;
