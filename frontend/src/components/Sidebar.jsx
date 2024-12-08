import React, { useEffect } from "react";
import { IoIosExit } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ user_data }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("side bar user data: ", user_data);
  }, []);

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
    <aside className="flex flex-col flex-shrink-0 w-64 h-screen bg-gray-800 text-white p-5">
      <nav className="flex flex-col space-y-2 flex-grow">
        <h1 className="text-2xl mb-10">Mocha Mentors</h1>
        {user_data[6] === "mentor" ? (
          <a href="/profile" className="text-gray-300 hover:text-white mt-4">
            Dashboard - Mentor
          </a>
        ) : (
          <a href="/profile" className="text-gray-300 hover:text-white mt-4">
            Dashboard - Mentee
          </a>
        )}

        <a href="" className="text-gray-300 hover:text-white">
          Profile
        </a>
        <Link
          to={{
            pathname: "/chatpage",
            state: { user: user_data },
          }}
          className="text-gray-300 hover:text-white"
        >
          Messages
        </Link>
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
