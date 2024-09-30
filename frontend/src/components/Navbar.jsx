import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";

import Login from "./Login";

function Navbar() {
  const [login, setLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (login) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [login]);
  return (
    <>
      <header className="absolute w-screen z-10 flex items-center justify-between bg-nav-color py-6 px-6 font-semibold stroke-stone-400">
        <Link to="/" className="lg:text-2xl sm:text-sm">
          Mocha Mentors
        </Link>
        <div className="hidden lg:flex space-x-2">
          <Link to="/resources">Resources</Link>
          <Link to="/faqs">FAQS</Link>
        </div>
        <div className="hidden lg:flex space-x-4">
          <button onClick={() => setLogin(true)}>Login</button>
        </div>
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-full bg-nav-color flex flex-col items-center lg:hidden">
            <Link
              to="/resources"
              className="py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              to="/faqs"
              className="py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQS
            </Link>
            <button onClick={() => setLogin(true)} className="py-2">
              Login
            </button>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
