import React from "react";
import { IoIosExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Sidebar({ user_data }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <aside className="flex flex-col flex-shrink-0 w-64 h-screen bg-gray-800 text-white p-5">
      <nav className="flex flex-col space-y-2 flex-grow">
        <h1 className="text-2xl mb-10">Mocha Mentors</h1>
        {user_data[6] === "mentor" ? (
          <a
            href="/mentor-profile"
            className="text-gray-300 hover:text-white mt-4"
          >
            Dashboard - Mentor
          </a>
        ) : (
          <a
            href="/mentee-profile"
            className="text-gray-300 hover:text-white mt-4"
          >
            Dashboard - Mentee
          </a>
        )}

        <a href="" className="text-gray-300 hover:text-white">
          Profile
        </a>
        <a href="chatpage" className="text-gray-300 hover:text-white">
          Messages
        </a>
        <a href="" className="text-gray-300 hover:text-white">
          Settings
        </a>
      </nav>
      <button onClick={() => logout()} className="py-2">
        <IoIosExit className="h-10 w-10" />
      </button>
    </aside>
  );
}

export default Sidebar;
