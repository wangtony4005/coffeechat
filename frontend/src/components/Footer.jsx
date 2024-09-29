import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="h-auto w-screen bg-base-color flex flex-col justify-center  lg:justify-start text-black pt-4">
      <h1 className="lg:text-left text-center text-5xl font-bold">
        Our Resources
      </h1>

      <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center mt-10 mb-44 lg:space-x-8 space-y-8 lg:space-y-0">
        <div className="flex flex-col lg:space-y-0 space-y-4">
          <h1 className="inline-block border-t-2 border-b-2 text-center lg:text-start border-gray-500 font-bold">
            Resume Templates
          </h1>
          <p className="text-center lg:text-start">
            Enhance your resume with our professionally designed templates!
          </p>
        </div>
        <div className="flex flex-col lg:space-y-0 space-y-4">
          <h1 className="inline-block border-t-2 border-b-2 text-center lg:text-start border-gray-500 font-bold">
            Conversation Starters
          </h1>
          <p className="text-center lg:text-start">
            Striking up a conversation can be intimidating, but the right
            conversation starters can break the ice and lead to meaningful
            connections.
          </p>
        </div>
        <div className="flex flex-col lg:space-y-0 space-y-4">
          <h1 className="inline-block border-t-2 border-b-2 text-center lg:text-start border-gray-500 font-bold">
            Community Resources
          </h1>
          <p className="text-center lg:text-start">
            Essential tools and services that support the well-being, growth,
            and development of individuals within a community.
          </p>
        </div>
      </div>

      <div className="relative">
        <footer className="relative bg-gray-800 text-white py-6 block">
          <div className="container mx-auto text-center">
            © 2024 MochaMentors. All rights reserved.
          </div>
          <div className="absolute inset-x-0 bottom-0 h-0 w-full overflow-hidden">
            <div className="relative h-8 bg-gray-800">
              <div className="triangle-left absolute left-0 bottom-0 h-0 w-0 border-solid border-t-transparent border-l-8 border-l-transparent border-b-8 border-b-gray-900"></div>
              <div className="triangle-right absolute right-0 bottom-0 h-0 w-0 border-solid border-t-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-900"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
