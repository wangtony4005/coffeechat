import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const MentorUpdateProfile = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user_data } = location.state || {};
  console.log(setUser);
  const email = user[5];
  const role = user[6];

  const [formData, setFormData] = useState({
    jobTitle: "",
    bio: "",
    careerInterest: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Information:", formData);
    try {
      const response = await axios
        .post("http://127.0.0.1:5000/users/updateprofile", {
          email: email,
          bio: formData.bio,
          jobTitle: formData.jobTitle,
          careerInterest: formData.careerInterest,
        })
        .then(async (res) => {
          console.log(res.data.Response);
          const updated_info = res.data.UserPreferences;
          console.log("THIS IS THE UPDATED INFO", updated_info);
          await setUser(updated_info);
        });
    } catch (error) {
      console.log(error);
    }
    alert("Your profile has been updated!");
    navigate("/profile");
    setFormData({
      jobTitle: "",
      bio: "",
      careerInterest: "",
    });
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Update Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            rows="4"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="careerInterest">Career Interest:</label>
          <input
            type="text"
            id="careerInterest"
            name="careerInterest"
            value={formData.careerInterest}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default MentorUpdateProfile;
