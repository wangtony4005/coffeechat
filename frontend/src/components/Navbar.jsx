import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";
import Login from "./Login";

function Navbar() {
  const [login, setLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = login ? "hidden" : "auto";
  }, [login]);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.header
        id="navbar"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-full z-10 flex items-center justify-between bg-nav-color py-4 px-6 shadow-lg"
      >
        <Link
          to="/"
          className="lg:text-3xl text-xl font-bold text-mocha-color tracking-wide"
        >
          Mocha Mentors
        </Link>

        <nav className="hidden lg:flex flex-1 justify-center space-x-8 text-lg">
          <Link
            to="/resources"
            className="text-black hover:text-mocha-color transition"
          >
            Resources
          </Link>
          <Link
            to="/faqs"
            className="text-black hover:text-mocha-color transition"
          >
            FAQS
          </Link>
        </nav>
        <div className="hidden lg:flex">
          <button
            onClick={() => setLogin(true)}
            className="bg-mocha-color text-white py-2 px-4 rounded-lg shadow-md hover:bg-darker-nav-color transition"
          >
            Login
          </button>
        </div>
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Hamburger toggled={isMenuOpen} />
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-full z-40 bg-nav-color shadow-lg lg:hidden">
            <nav className="flex flex-col items-center py-4 space-y-4">
              <Link
                to="/resources"
                className="text-black text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                to="/faqs"
                className="text-black text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQS
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setLogin(true);
                }}
                className="bg-mocha-color text-white py-2 px-6 rounded-lg shadow-md hover:bg-darker-nav-color transition"
              >
                Login
              </button>
            </nav>
          </div>
        )}
      </motion.header>
      {login && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>
          <Login onClose={() => setLogin(false)} />
        </>
      )}
    </>
  );
}

export default Navbar;

