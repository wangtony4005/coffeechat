import React, { useEffect, useState } from "react";
import "./MenteeProfileCard.css";
import profile_icon from "../assets/anonprofile.jpg";

const MenteeProfileCard = ({ name, jobTitle, bio, careerInterest }) => {
    return (
        <div className="profilecard">
            <div className="gradiant"></div>
            <div className="profile-down">
                <img src={profile_icon} alt="" />
                <div className="profile-title">{name || "Mentee Name"}</div>
                <div className="profile-des">
                    <p>Status: Mentee</p>
                    <p>{jobTitle || "Job Title"}</p> {/* Display job title */}
                    <p>{bio || "Bio"}</p> {/* Display bio */}
                    <p>{careerInterest || "Career Interest"}</p>
                </div>
                <div className="profile-button"><a href="mailto:johndoe@gmail.com">Contact Me</a></div>
            </div>

        </div>
    )
}

export default MenteeProfileCard