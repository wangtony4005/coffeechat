import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";
import { IoIosExit } from "react-icons/io";

function MentorNavbar() {
  const [login, setLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const openProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [login]);

  const headerVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <header className="absolute w-screen z-10 flex items-center justify-between bg-nav-color py-6 px-6 font-semibold stroke-stone-400">
        <Link to="/mentor-profile" className="lg:text-2xl sm:text-sm ">
          Mocha Mentors
        </Link>

        <div className="hidden lg:flex space-x-4">
          <button onClick={() => logout()} className="py-2">
            <IoIosExit className=" h-10 w-10" />
          </button>
        </div>
        <div className="lg:hidden flex items-center z-auto">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Hamburger />
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-full z-40 bg-nav-color flex flex-col items-center lg:hidden">
            <Link to="/mentor-profile " className="py-2">
              Profile
            </Link>

            <button onClick={() => logout()} className="py-2">
              <IoIosExit />
            </button>
          </div>
        )}
      </header>
    </>
  );
}

export default MentorNavbar;
