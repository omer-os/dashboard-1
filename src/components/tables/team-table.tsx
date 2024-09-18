import React, { useState, useEffect, LegacyRef } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  Calendar,
  X,
} from "lucide-react";
import { useClickAway } from "@uidotdev/usehooks";
import AddTeamMemberDialog from "../dialogs/add-team-member-dialog";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  projectCount: number;
  joinDate: string;
  skillLevel: "Junior" | "Mid-Level" | "Senior";
}

const initialTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Interior Designer",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    projectCount: 5,
    joinDate: "2022-03-15",
    skillLevel: "Senior",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Project Manager",
    email: "bob.smith@example.com",
    phone: "+1 (555) 987-6543",
    projectCount: 8,
    joinDate: "2021-11-01",
    skillLevel: "Senior",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "3D Visualization Specialist",
    email: "charlie.brown@example.com",
    phone: "+1 (555) 246-8101",
    projectCount: 6,
    joinDate: "2023-01-20",
    skillLevel: "Mid-Level",
  },
  {
    id: 4,
    name: "Diana Ross",
    role: "Interior Designer",
    email: "diana.ross@example.com",
    phone: "+1 (555) 369-2580",
    projectCount: 4,
    joinDate: "2023-06-10",
    skillLevel: "Junior",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    role: "Architect",
    email: "ethan.hunt@example.com",
    phone: "+1 (555) 789-4561",
    projectCount: 7,
    joinDate: "2022-09-05",
    skillLevel: "Mid-Level",
  },
  // Add more team members as needed
];

type SortKey =
  | "name"
  | "role"
  | "email"
  | "phone"
  | "projectCount"
  | "joinDate"
  | "skillLevel";

const TeamMembersTable: React.FC = () => {
  const [teamMembers, setTeamMembers] =
    useState<TeamMember[]>(initialTeamMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [skillLevelFilter, setSkillLevelFilter] = useState("All");
  const DatePickerRef = useClickAway(() => {
    setShowDatePicker(false);
  }) as LegacyRef<HTMLDivElement>;
  const itemsPerPage = 5;

  useEffect(() => {
    let filtered = initialTeamMembers.filter(
      (member) =>
        (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.phone.includes(searchTerm) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (skillLevelFilter === "All" || member.skillLevel === skillLevelFilter)
    );

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((member) => {
        const joinDate = new Date(member.joinDate);
        return (
          joinDate >= new Date(dateRange.start) &&
          joinDate <= new Date(dateRange.end)
        );
      });
    }

    const sorted = [...filtered].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setTeamMembers(sorted);
    setCurrentPage(1);
  }, [searchTerm, sortKey, sortOrder, dateRange, skillLevelFilter]);

  const pageCount = Math.ceil(teamMembers.length / itemsPerPage);
  const currentTeamMembers = teamMembers.slice(
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
            placeholder="Search team members..."
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
            value={skillLevelFilter}
            onChange={(e) => setSkillLevelFilter(e.target.value)}
            className="bg-zinc-800/50 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent p-3 transition duration-300 ease-in-out"
          >
            <option value="All">All Skill Levels</option>
            <option value="Junior">Junior</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>

          <div ref={DatePickerRef} className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center bg-zinc-800/50 border border-zinc-600 rounded-lg px-4 py-3 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              <Calendar size={20} className="mr-2" />
              Join Date Filter
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

          {(searchTerm ||
            dateRange.start ||
            dateRange.end ||
            skillLevelFilter !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setDateRange({ start: "", end: "" });
                setSkillLevelFilter("All");
              }}
              className="flex items-center bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg px-4 py-3 hover:bg-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
            >
              <X size={20} className="mr-2" />
              Clear Filters
            </button>
          )}

          <AddTeamMemberDialog onAddTeamMember={(teamMember) => {}}>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out">
              Add New Team Member
            </button>
          </AddTeamMemberDialog>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-700 shadow-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-zinc-800 to-zinc-700 text-zinc-300">
              {[
                "name",
                "role",
                "email",
                "phone",
                "projectCount",
                "joinDate",
                "skillLevel",
              ].map((key) => (
                <th
                  key={key}
                  className="p-4 text-left w-max cursor-pointer hover:bg-zinc-600/30 transition duration-300 ease-in-out"
                  onClick={() => handleSort(key as SortKey)}
                >
                  <div className="flex items-center">
                    {key === "projectCount"
                      ? "Projects"
                      : key === "joinDate"
                      ? "Join Date"
                      : key === "skillLevel"
                      ? "Skill Level"
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
            {currentTeamMembers.map((member, index) => (
              <tr
                key={member.id}
                className={`border-b border-zinc-700 hover:bg-zinc-700/30 transition-colors ${
                  index % 2 === 0 ? "bg-zinc-800/30" : "bg-zinc-800/10"
                }`}
              >
                <td className="w-20 truncate p-4">{member.name}</td>
                <td className="w-20 truncate p-4">{member.role}</td>
                <td className="w-20 truncate p-4">{member.email}</td>
                <td className="w-20 truncate p-4">{member.phone}</td>
                <td className="w-20 truncate p-4">{member.projectCount}</td>
                <td className="w-20 truncate p-4">{member.joinDate}</td>
                <td className="w-20 truncate p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      member.skillLevel === "Junior"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : member.skillLevel === "Mid-Level"
                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        : "bg-green-500/20 text-green-300 border border-green-500/30"
                    }`}
                  >
                    {member.skillLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-400">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, teamMembers.length)} of{" "}
          {teamMembers.length} team members
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

export default TeamMembersTable;
