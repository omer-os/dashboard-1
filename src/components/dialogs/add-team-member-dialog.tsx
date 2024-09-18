import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Mail, Phone, Calendar, Briefcase, User } from "lucide-react";
import { useClickAway } from "@uidotdev/usehooks";

interface AddTeamMemberDialogProps {
  onAddTeamMember: (teamMember: any) => void;
  children: React.ReactNode;
}

const AddTeamMemberDialog: React.FC<AddTeamMemberDialogProps> = ({
  onAddTeamMember,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [skillLevel, setSkillLevel] = useState("Junior");

  const DialogRef = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTeamMember({
      name,
      role,
      email,
      phone,
      joinDate,
      skillLevel,
      projectCount: 0,
    });
    setIsOpen(false);
    // Reset form fields
    setName("");
    setRole("");
    setEmail("");
    setPhone("");
    setJoinDate("");
    setSkillLevel("Junior");
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              ref={DialogRef}
            >
              <div className="p-6 bg-gradient-to-br from-zinc-800 to-zinc-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-zinc-100">
                    Add New Team Member
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-zinc-300 mb-1"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                        required
                      />
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                        size={16}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-zinc-300 mb-1"
                    >
                      Role
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                        required
                      />
                      <Briefcase
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                        size={16}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-300 mb-1"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                        required
                      />
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                        size={16}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-zinc-300 mb-1"
                    >
                      Phone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                        required
                      />
                      <Phone
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                        size={16}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="joinDate"
                      className="block text-sm font-medium text-zinc-300 mb-1"
                    >
                      Join Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="joinDate"
                        value={joinDate}
                        onChange={(e) => setJoinDate(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                        required
                      />
                      <Calendar
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                        size={20}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="skillLevel"
                      className="block text-sm font-medium text-zinc-300 mb-1"
                    >
                      Skill Level
                    </label>
                    <select
                      id="skillLevel"
                      value={skillLevel}
                      onChange={(e) => setSkillLevel(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                    >
                      <option value="Junior">Junior</option>
                      <option value="Mid-Level">Mid-Level</option>
                      <option value="Senior">Senior</option>
                    </select>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                  >
                    <Plus size={20} className="mr-2" />
                    Add Team Member
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddTeamMemberDialog;
