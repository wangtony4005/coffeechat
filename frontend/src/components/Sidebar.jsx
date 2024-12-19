import React, { useState } from "react";
import { IoIosExit } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ user_data }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleChatPage = () => {
    navigate("/chatpage", {
      state: { user_data: user_data },
    });
  };

  return (
    <div className="absolute md:relative h-screen flex">
      {/* Overlay for small screens - Moved before sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`flex flex-col flex-shrink-0 w-64 h-screen bg-[#574C3F] text-white p-5 transition-transform duration-300 fixed md:relative z-30 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <nav className="flex flex-col space-y-2 flex-grow">
          <h1 className="text-2xl font-bold mb-10">Mocha Mentors</h1>
          {user_data[6] === "mentor" ? (
            <a
              href="/profile"
              className="text-[#ECE4DA] hover:text-white transition-colors duration-200 mt-4 px-2 py-1.5 rounded-lg hover:bg-[#36302A]"
            >
              Dashboard - Mentor
            </a>
          ) : (
            <a
              href="/profile"
              className="text-[#ECE4DA] hover:text-white transition-colors duration-200 mt-4 px-2 py-1.5 rounded-lg hover:bg-[#36302A]"
            >
              Dashboard - Mentee
            </a>
          )}

          {user_data[6] === "mentor" ? (
            <Link
              to={{
                pathname: "/inbox",
                state: { user: user_data },
              }}
              className="text-[#ECE4DA] hover:text-white transition-colors duration-200 px-2 py-1.5 rounded-lg hover:bg-[#36302A]"
            >
              Inbox
            </Link>
          ) : (
            <Link
              to={{
                pathname: "/mentor-search",
                state: { user: user_data },
              }}
              className="text-[#ECE4DA] hover:text-white transition-colors duration-200 px-2 py-1.5 rounded-lg hover:bg-[#36302A]"
            >
              Find a Mentor
            </Link>
          )}

          <Link
            to={{
              pathname: "/chatpage",
              state: { user: user_data },
            }}
            className="text-[#ECE4DA] hover:text-white transition-colors duration-200 px-2 py-1.5 rounded-lg hover:bg-[#36302A]"
          >
            Messages
          </Link>

          <Link
            to={{
              pathname: "/shop",
              state: { user: user_data },
            }}
            className="text-[#ECE4DA] hover:text-white transition-colors duration-200 px-2 py-1.5 rounded-lg hover:bg-[#36302A]"
          >
            Mocha Shop
          </Link>
        </nav>
        <button
          onClick={() => logout()}
          className="py-2 px-2 hover:bg-[#36302A] rounded-lg transition-colors duration-200"
        >
          <IoIosExit className="h-10 w-10 text-[#ECE4DA] hover:text-white transition-colors duration-200" />
        </button>
      </aside>

      <div className="flex-grow bg-[#F6F3EC]"></div>

      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 md:hidden bg-[#574C3F] text-white p-2 rounded-lg hover:bg-[#36302A] transition-colors duration-200 z-40"
      >
        ☰
      </button>
    </div>
  );
}

export default Sidebar;
