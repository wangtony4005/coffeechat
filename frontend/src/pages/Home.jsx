import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import faqimg from "../assets/faqimg.jpeg";
import homepageimg1 from "../assets/homepageimg1.jpeg";
import homeimg2 from "../assets/homeimg2.jpg";
import homeimg3 from "../assets/homeimg3.jpg";

function Home() {
  return (
    <main className="h-auto w-auto bg-stone-700">
      <div className="w-screen h-screen relative bg-stone-700">
        <Navbar />
        <div className="flex items-center justify-center flex-col md:flex-row h-screen w-screen bg-stone-700 absolute text-white py-20">
          <img
            src={homepageimg1}
            alt="homeimg"
            className="relative md:-translate-y-10 md:-translate-x-24 translate-x-32 h-48 w-32 md:h-96 md:w-96"
          />

          <div className="flex items-center justify-center flex-col text-center mt-5 md:mt-0">
            <h1 className="text-3xl md:text-6xl mt-5 md:mt-10 z-10 font-bold">
              WHO WE ARE
            </h1>
            <h1 className="text-lg md:text-xl mt-2 md:mt-5 w-3/4 md:w-1/2 z-10 font-light">
              MochaMentors is an online platform that lets students connect with
              professionals.
            </h1>
          </div>

          <img
            src={homeimg3}
            alt="homeimg"
            className="relative h-48 w-48 md:h-96 md:w-80 mt-5 md:mt-0"
          />
        </div>
        <img
          src={homeimg2}
          alt="homeimg"
          className="relative z-10 h-32 w-64 md:h-64 md:w-96 md:translate-x-96"
          id="homeimg"
        />

        <style>
          {`
          #homeimg {
            transform: translate(0px, 150px);
          }
 
          @media (min-width: 1000px) {
            #homeimg {
              transform: translate(200px, 500px); /* For screens larger than 600px */
            }
          }
        `}
        </style>
      </div>
      <div className="w-screen min-h-screen h-auto overflow-auto flex flex-col md:flex-row items-start bg-base-color">
        <div className="flex-1 h-full flex items-start justify-start">
          <img
            src={faqimg}
            alt="homeimg"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 h-full flex flex-col items-center justify-center lg:relative lg:translate-y-48 p-5">
          <h1 className="text-xl md:text-2xl text-center">WHO WE ARE</h1>
          <h2 className="text-center text-base md:text-xl mt-2 md:mt-5 w-full md:w-1/2">
            To create an inclusive and engaging platform where students can
            connect with industry professionals over casual, meaningful
            conversations. We aim to foster mentorship, exchange knowledge, and
            build networks that empower students to explore career opportunities
            and personal growth.
          </h2>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Home;
