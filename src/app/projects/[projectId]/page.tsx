"use client";
import React, { useState } from "react";
import {
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart2,
  FileText,
  Paperclip,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Save,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

const ProjectDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  // Mock data for the project
  const [project, setProject] = useState({
    name: "Modern Loft Renovation",
    client: "John Doe",
    status: "In Progress",
    startDate: "2024-03-15",
    endDate: "2024-08-15",
    budget: 75000,
    spent: 35000,
    teamMembers: [
      { name: "Alice Johnson", role: "Project Manager" },
      { name: "Bob Smith", role: "Interior Designer" },
      { name: "Charlie Brown", role: "3D Visualization Specialist" },
    ],
    tasks: [
      { name: "Initial Design Concept", status: "Completed" },
      { name: "Material Selection", status: "In Progress" },
      { name: "3D Rendering", status: "Pending" },
    ],
    description:
      "This project involves the complete renovation of a 2000 sq ft loft space in downtown, transforming it into a modern, open-concept living area with high-end finishes and smart home integration.",
  });

  const StatusBadge = ({
    status,
  }: {
    status: "Completed" | "In Progress" | "Pending";
  }) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    const statusClasses = {
      Completed: "bg-zinc-700 text-zinc-100",
      "In Progress": "bg-indigo-900 text-indigo-100",
      Pending: "bg-yellow-900 text-yellow-100",
    };
    return (
      <span className={`${baseClasses} ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setProject({ ...project, [field]: e.target.value });
  };

  const handleSave = () => {
    // Here you would typically send the updated project data to your backend
    console.log("Saving updated project:", project);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* go back */}
        <button
          onClick={() => router.back()}
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          Go Back
        </button>

        <header className="mb-8 mt-4 flex justify-between items-center">
          <div>
            {isEditing ? (
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="text-4xl font-bold mb-2 bg-zinc-800 border border-zinc-700 rounded px-2 py-1"
              />
            ) : (
              <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
            )}
            <p className="text-zinc-400">Client: {project.client}</p>
          </div>
          <div>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center mr-2"
              >
                <Save size={20} className="mr-2" />
                Save Changes
              </button>
            ) : (
              <button
                onClick={handleEditToggle}
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Edit size={20} className="mr-2" />
                Edit Project
              </button>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-zinc-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Status</h2>
              {isEditing ? (
                <select
                  value={project.status}
                  onChange={(e) => handleInputChange(e as any, "status")}
                  className="bg-zinc-700 border border-zinc-600 rounded px-2 py-1"
                >
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>Pending</option>
                </select>
              ) : (
                <StatusBadge
                  status={
                    project.status as "Completed" | "In Progress" | "Pending"
                  }
                />
              )}
            </div>
            <div className="flex items-center text-zinc-400">
              <Calendar className="mr-2" size={20} />
              <span>
                {isEditing ? (
                  <>
                    <input
                      type="date"
                      value={project.startDate}
                      onChange={(e) => handleInputChange(e, "startDate")}
                      className="bg-zinc-700 border border-zinc-600 rounded px-2 py-1 mr-2"
                    />
                    <input
                      type="date"
                      value={project.endDate}
                      onChange={(e) => handleInputChange(e, "endDate")}
                      className="bg-zinc-700 border border-zinc-600 rounded px-2 py-1"
                    />
                  </>
                ) : (
                  `${project.startDate} - ${project.endDate}`
                )}
              </span>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Budget</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="mr-2 text-indigo-400" size={24} />
                {isEditing ? (
                  <input
                    type="number"
                    value={project.budget}
                    onChange={(e) => handleInputChange(e, "budget")}
                    className="text-2xl font-bold bg-zinc-700 border border-zinc-600 rounded px-2 py-1 w-32"
                  />
                ) : (
                  <span className="text-2xl font-bold">
                    ${project.budget.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-400">Spent</p>
                {isEditing ? (
                  <input
                    type="number"
                    value={project.spent}
                    onChange={(e) => handleInputChange(e, "spent")}
                    className="text-lg font-semibold bg-zinc-700 border border-zinc-600 rounded px-2 py-1 w-24"
                  />
                ) : (
                  <p className="text-lg font-semibold">
                    ${project.spent.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 bg-zinc-700 rounded-full h-2">
              <div
                className="bg-indigo-500 rounded-full h-2"
                style={{ width: `${(project.spent / project.budget) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Team</h2>
            <ul className="space-y-2">
              {project.teamMembers.map((member, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-zinc-400">{member.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="flex border-b border-zinc-700">
            {["overview", "tasks", "files"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 font-medium ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Project Description
                </h3>
                {isEditing ? (
                  <textarea
                    value={project.description}
                    onChange={(e) => handleInputChange(e as any, "description")}
                    className="w-full h-32 bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-zinc-100"
                  />
                ) : (
                  <p className="text-zinc-300 mb-6">{project.description}</p>
                )}
                <h3 className="text-xl font-semibold mb-4 mt-6">
                  Project Timeline
                </h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-700"></div>
                  <ul className="space-y-6 relative">
                    {[
                      {
                        title: "Project Kickoff",
                        date: project.startDate,
                        icon: CheckCircle,
                        color: "bg-indigo-600",
                      },
                      {
                        title: "Design Phase",
                        date: "In Progress",
                        icon: Clock,
                        color: "bg-yellow-600",
                      },
                      {
                        title: "Project Completion",
                        date: project.endDate,
                        icon: AlertCircle,
                        color: "bg-zinc-600",
                      },
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <div
                          className={`absolute left-0 w-9 h-9 rounded-full ${item.color} flex items-center justify-center`}
                        >
                          <item.icon size={20} />
                        </div>
                        <div className="ml-16">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-zinc-400">{item.date}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "tasks" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Project Tasks</h3>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
                    <Plus size={20} className="mr-2" />
                    Add Task
                  </button>
                </div>
                <ul className="space-y-4">
                  {project.tasks.map((task, index) => (
                    <li
                      key={index}
                      className="bg-zinc-700 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{task.name}</p>
                        <StatusBadge status={task.status as any} />
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-zinc-400 hover:text-white">
                          <MessageSquare size={20} />
                        </button>
                        <button className="text-zinc-400 hover:text-white">
                          <Edit size={20} />
                        </button>
                        <button className="text-zinc-400 hover:text-red-500">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === "files" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Project Files</h3>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
                    <Plus size={20} className="mr-2" />
                    Upload File
                  </button>
                </div>
                <ul className="space-y-4">
                  {[
                    {
                      name: "Project Proposal",
                      type: "PDF",
                      size: "2.3 MB",
                      icon: FileText,
                      color: "text-blue-400",
                    },
                    {
                      name: "Budget Breakdown",
                      type: "XLSX",
                      size: "1.5 MB",
                      icon: BarChart2,
                      color: "text-green-400",
                    },
                  ].map((file, index) => (
                    <li
                      key={index}
                      className="bg-zinc-700 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <file.icon size={24} className={`mr-3 ${file.color}`} />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-zinc-400">
                            {file.type} - {file.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-zinc-400 hover:text-white">
                          <Paperclip size={20} />
                        </button>
                        <button className="text-zinc-400 hover:text-red-500">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
