import React from "react";
import profile_icon from "../assets/anonprofile.jpg";

const ProfileCard = ({ image = profile_icon, name, jobTitle, location, bio }) => {
  return (
    <div className="max-w-sm bg-[#f7f3e9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-center mt-6">
        <img
          className="w-32 h-32 rounded-full object-cover border-4 border-[#8a7569]"
          src={image}
          alt={`${name}'s profile`}
        />
      </div>
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-[#4b3f31]">{name}</h2>
        <p className="text-lg text-[#6b5846]">{jobTitle}</p>
        <p className="text-md text-[#8a7569]">{location}</p>
        <p className="mt-4 text-[#4b3f31]">{bio}</p>
        <button
          className="mt-6 w-full bg-[#8a7569] text-white py-2 rounded-lg hover:bg-[#6b5846] transition-colors duration-300"
          onClick={() => alert("Connect feature coming soon!")}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
