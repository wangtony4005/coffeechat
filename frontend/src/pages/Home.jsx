import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import homeimg2 from "../assets/homeimg2.jpg";
import faqimg from "../assets/faqimg.jpeg";

function Home() {
  return (
    <main className="h-auto w-auto bg-stone-700">
      <div className="w-screen h-screen relative bg-stone-700">
        <Navbar />
        {/* <div className="py-20 z-50">
          <img
            src={homeimg2}
            alt="homeimg"
            className="h-96 w-96 z-30 absolute"
          />
        </div> */}
        <div className="flex items-center justify-center flex-col h-screen w-screen bg-stone-700 absolute text-white py-20">
          <h1 className="text-4xl text-center mt-10 z-10">WHO WE ARE</h1>
          <h1 className="text-center text-2xl mt-5 w-1/2 z-10">
            MochaMentors is an online platform that lets students connect with
            professionals.
          </h1>
        </div>
      </div>
      <div className="w-screen min-h-screen h-auto overflow-auto flex md:flex-row flex-col  items-center bg-base-color">
        <div className="flex-1 h-full flex items-center justify-center">
          <img
            src={faqimg}
            alt="homeimg"
            className=" h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 h-full flex flex-col  items-center justify-center">
          <h1 className="text-2xl text-center">WHO WE ARE</h1>
          <h2 className="text-center text-xl mt-5 w-1/2">
            To create an inclusive and engaging platform where students can
            connect with industry professionals over causal meaningful
            conversations. We aim to foster mentorship, exchange knowledge and
            build networks that empower students to explore career oppurtunuties
            and personal growth
          </h2>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Home;
