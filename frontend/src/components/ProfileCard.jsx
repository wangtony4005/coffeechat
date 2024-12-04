import React from "react";
import profile_icon from "../assets/anonprofile.jpg";

const ProfileCard = ({ name, jobTitle, bio, careerInterest, userRole }) => {
  return (
    <div className="max-w-sm bg-[#f7f3e9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-center mt-6">
        <img
          className="w-32 h-32 rounded-full object-cover border-4 border-[#8a7569]"
          src={image}
          alt={`${name}'s profile`}
        />
        <div className="text-[36px] font-semibold">
          {name || "Mentor Name"}
        </div>
        <div className="text-center">
          <p>Status: {userRole}</p>
          <p>Job Title: {jobTitle || "Job Title"}</p> 
          <p>Bio: {bio || "Bio"}</p> 
          <p>Career Interest: {careerInterest || "Career Interest"}</p>
        </div>
        <div className="text-[16px] bg-[#2b5dff] mx-[100px] my-[10px] py-[8px] px-[10px] rounded-[40px] text-white">
          <a href="mailto:johndoe@gmail.com" className="no-underline">
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
