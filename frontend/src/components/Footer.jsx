import React from "react";
import "./Footer.css";
import Fade from "./Fade";

function Footer() {
  return (
    <div className="h-auto w-screen bg-base-color flex flex-col justify-center lg:justify-start text-black pt-4 pb-0 overflow-hidden">
      <Fade>
        <h1 className="lg:text-left text-center text-3xl font-bold">
          Our Resources
        </h1>
        <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center mt-6 mb-4 lg:space-x-8 space-y-6 lg:space-y-0">
          <div className="flex flex-col space-y-2">
            <h1 className="inline-block border-t-2 border-b-2 text-center lg:text-start border-gray-500 font-bold">
              Resume Templates
            </h1>
            <p className="text-center lg:text-start">
              Enhance your resume with our professionally designed templates!
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="inline-block border-t-2 border-b-2 text-center lg:text-start border-gray-500 font-bold">
              Conversation Starters
            </h1>
            <p className="text-center lg:text-start">
              Striking up a conversation can be intimidating, but the right
              conversation starters can break the ice and lead to meaningful
              connections.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="inline-block border-t-2 border-b-2 text-center lg:text-start border-gray-500 font-bold">
              Community Resources
            </h1>
            <p className="text-center lg:text-start">
              Essential tools and services that support the well-being, growth,
              and development of individuals within a community.
            </p>
          </div>
        </div>

        <footer className="relative bg-footer-color text-white py-4 block">
          <div className="container mx-auto text-center">
            © 2024 MochaMentors. All rights reserved.
          </div>
        </footer>
      </Fade>
    </div>
  );
}

export default Footer;
