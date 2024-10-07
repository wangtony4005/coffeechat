import React from "react";
import Navbar from "../components/navbar";
import buildit from "../assets/buildit.jpg";
import dreamit from "../assets/dreamit.jpg";
import growit from "../assets/growit.jpg";

function Resources() {
  return (
    <main className="h-auto w-auto bg-darker-nav-color">
      <Navbar />
      <div className="w-screen h-screen overflow-auto bg-darker-nav-color ">
        <div className="flex items-center justify-center w-full h-1/2 relative ">
          <h1 className="text-4xl text-black font-bold">Our Services</h1>
        </div>
        <div className="w-full min-h-1/2 bg-nav-color  flex-grow h-auto  ">
          <div className="container mx-auto py-10 flex items-center justify-center lg:flex-row mb-4 flex-col gap-32 ">
            <div className="mb-4 h-auto w-3/5">
              <img
                src={dreamit}
                alt="dreamit"
                className="h-full w-full object-cover"
              />
              <h2 className="text-2xl font-bold">Dream it.</h2>
              <p className="text-md ">
                It all begins with an idea. Maybe you want to launch a business.
                Maybe you want to turn a hobby into something more. Or maybe you
                have a creative project to share with the world. Whatever it is,
                the way you tell your story online can make all the difference.
              </p>
            </div>
            <div className="mb-4 h-auto w-3/5">
              <img
                src={buildit}
                alt="buildit"
                className="h-full w-full object-cover"
              />
              <h2 className="text-2xl font-bold">Build it.</h2>
              <p className="text-md ">
                It all begins with an idea. Maybe you want to launch a business.
                Maybe you want to turn a hobby into something more. Or maybe you
                have a creative project to share with the world. Whatever it is,
                the way you tell your story online can make all the difference.
              </p>
            </div>
            <div className="mb-4 h-auto w-3/5">
              <img
                src={growit}
                alt="growit"
                className="h-full w-full object-cover"
              />
              <h2 className="text-2xl font-bold">Grow it.</h2>
              <p className="text-md ">
                It all begins with an idea. Maybe you want to launch a business.
                Maybe you want to turn a hobby into something more. Or maybe you
                have a creative project to share with the world. Whatever it is,
                the way you tell your story online can make all the difference.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full justify-center items-center p-4 ">
        <button className="bg-base-color text-white py-2 px-4 rounded-full absolute bottom-10 right-10">
          Get Started
        </button>
      </div> */}
    </main>
  );
}

export default Resources;
