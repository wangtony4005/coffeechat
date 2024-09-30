import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Login from "./Login";

function Navbar() {
  const [login, setLogin] = useState(false);

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
        <Link to="/" className="md:text-2xl sm:text-sm">
          Mocha Mentors
        </Link>
        <div className="flex space-between space-x-4">
          <Link to="/resources">Resources</Link>
          <Link to="/faqs">FAQS</Link>
        </div>
        <div className="flex space-between">
          <div className="flex space-between space-x-4">
            <button onClick={() => setLogin(true)}>Login</button>
          </div>
        </div>
      </header>
      {login && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>
          <Login onClose={() => setLogin(false)} />
        </>
      )}
      <style>
        {`
          body.blur-background {
            filter: blur(5px);
          }
        `}
      </style>
    </>
  );
}

export default Navbar;
