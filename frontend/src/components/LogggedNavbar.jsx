import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";

function LogggedNavbar() {
  const [login, setLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    return;
  };

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
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute w-screen z-10 flex items-center justify-between bg-nav-color py-6 px-6 font-semibold stroke-stone-400"
      >
        <Link to="/homepage" className="lg:text-2xl sm:text-sm">
          Mocha Mentors
        </Link>
        <div className="hidden lg:flex space-x-2">
          <Link to="/find">Find</Link>
          <Link to="/homepage">Chats</Link>
        </div>
        <div className="hidden lg:flex space-x-4">
          <button onClick={() => logout()}>Logout</button>
        </div>
        <div className="lg:hidden flex items-center z-auto">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Hamburger />
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-full z-40 bg-nav-color flex flex-col items-center lg:hidden">
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
              Logout
            </button>
          </div>
        )}
      </motion.header>
      {/* {login && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>
          <Login onClose={() => setLogin(false)} />
        </>
      )} */}
      {/* <style>
        {`
        body.blur-background {
          filter: blur(5px);
        }
      `}
      </style> */}
    </>
  );
}

export default LogggedNavbar;
