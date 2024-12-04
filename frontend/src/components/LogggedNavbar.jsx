import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";

function LogggedNavbar(props) {
  const [login, setLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    document.body.style.overflow = login ? "hidden" : "auto";
  }, [login]);

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  console.log(props.firstName, props.lastName, props.username, props.email, props.role)
  const firstName = props.firstName
  const lastName = props.lastName
  const username = props.username
  const email = props.email
  const role = props.role
  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-full z-10 flex items-center justify-between bg-nav-color py-4 px-8 shadow-md"
      >
        <Link to="/homepage" className="text-2xl font-bold text-mocha-color tracking-wide">
          Mocha Mentors
        </Link>
        <nav className="hidden lg:flex space-x-8 text-lg">
          <Link to="/find" className="hover:text-mocha-color transition">Find</Link>
          <Link to="/chatpage" className="hover:text-mocha-color transition" state={{firstName, lastName, username, email, role}}>Chats</Link>
        </nav>
        <div className="hidden lg:flex items-center space-x-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Pic"
            className="rounded-full h-10 w-10 cursor-pointer hover:ring-2 hover:ring-mocha-color"
            onClick={toggleProfileMenu}
          />
          {isProfileOpen && (
            <div className="absolute top-16 right-8 w-40 bg-nav-color shadow-md rounded-md flex flex-col items-center">
              <Link to="/mentor-profile" className="py-2 hover:text-mocha-color transition">
                Profile
              </Link>
              <button
                onClick={logout}
                className="py-2 hover:text-mocha-color transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Hamburger toggled={isMenuOpen} />
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-full bg-nav-color shadow-lg lg:hidden flex flex-col items-center py-4 space-y-4">
            <Link to="/find" className="text-lg hover:text-mocha-color transition" onClick={() => setIsMenuOpen(false)}>
              Find
            </Link>
            <Link to="/chatpage" className="text-lg hover:text-mocha-color transition" onClick={() => setIsMenuOpen(false)}>
              Chats
            </Link>
            <Link to="/mentor-profile" className="text-lg hover:text-mocha-color transition" onClick={() => setIsMenuOpen(false)}>
              Profile
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                logout();
              }}
              className="text-lg text-white bg-mocha-color py-2 px-4 rounded-md hover:bg-darker-nav-color transition"
            >
              Logout
            </button>
          </div>
        )}
      </motion.header>
    </>
  );
}

export default LogggedNavbar;

