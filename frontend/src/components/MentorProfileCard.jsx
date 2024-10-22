import React from "react";
import profile_icon from "../assets/anonprofile.jpg";

const MentorProfileCard = ({ name, jobTitle, bio, careerInterest }) => {
  return (
    <div className="w-[350px] m-[20px] rounded-[4px] pb-[20px] bg-white shadow-lg">
      <div className="bg-gradient-to-b from-[#F6F3EC] to-[#36302A] h-[125px] rounded-t-[4px]"></div>
      <div className="flex flex-col items-center">
        <img
          src={profile_icon}
          alt="Profile"
          className="h-[150px] rounded-full mt-[-75px] p-[5px] bg-white"
        />
        <div className="text-[36px] font-semibold">
          {name || "Mentor Name"}
        </div>
        <div className="text-center">
          <p>Status: Mentor</p>
          <p>{jobTitle || "Job Title"}</p> 
          <p>{bio || "Bio"}</p> 
          <p>{careerInterest || "Career Interest"}</p>
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

export default MentorProfileCard;
