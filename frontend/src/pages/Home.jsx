import { useRef, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import faqimg from "../assets/faqimg.jpeg";
import homepageimg1 from "../assets/coffee-shop.jpg";
import { motion, useInView, useAnimation } from "framer-motion";
import Fade from "../components/Fade";
import { useNavigate } from "react-router-dom";

function Home({user, setUser}) {
  console.log(user, setUser)
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const Navigate = useNavigate();

  const controls = useAnimation();
  const headerVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Navigate("/homepage");
    }
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView]);

  return (
    <main className="h-auto w-auto bg-stone-700">
      <div className="w-screen h-screen relative bg-stone-700">
        <Navbar user={user} setUser={setUser}/>

        <div>
          {/* Motion div with a gradient overlay and background image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            transition={{ duration: 1.5, ease: "easeIn" }}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${homepageimg1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex items-center justify-center flex-col h-screen w-screen text-white py-20"
          >
            {/* Text content without semi-transparent background */}
            <div className="flex items-center justify-center flex-col text-center">
              <h1 className="text-5xl md:text-8xl font-bold text-white drop-shadow-lg">WHO WE ARE</h1>
              <h1 className="text-2xl md:text-3xl mt-2 w-3/4 md:w-1/2 font-light text-white drop-shadow-lg">
                MochaMentors is an online platform that lets students connect
                with professionals.
              </h1>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-screen min-h-screen h-auto overflow-auto flex flex-col md:flex-row items-start bg-base-color">
        <div className="flex-1 relative h-full flex items-start justify-start">
          <Fade>
            <img
              src={faqimg}
              alt="homeimg"
              className="h-full w-full object-cover"
            />
          </Fade>
        </div>

        <div className="flex-1 h-full flex flex-col items-center justify-center lg:relative lg:translate-y-48 p-5">
          <Fade className="flex items-center justify-center">
            <h1 className="text-xl md:text-2xl text-center">Our Mission</h1>
            <h2 className="text-center text-base md:text-xl mt-2 md:mt-5 w-full">
              To create an inclusive and engaging platform where students can
              connect with industry professionals over casual, meaningful
              conversations. We aim to foster mentorship, exchange knowledge,
              and build networks that empower students to explore career
              opportunities and personal growth.
            </h2>
          </Fade>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Home;
