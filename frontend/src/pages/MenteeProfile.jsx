import React, { useEffect, useState } from "react";
import LogggedNavbar from "../components/LogggedNavbar";
import Footer from "../components/Footer";

const MenteeProfile = () => {
  // State for form inputs (used for editing)
  const [nameInput, setNameInput] = useState('');
  const [jobTitleInput, setJobTitleInput] = useState('');
  const [bioInput, setBioInput] = useState('');
  const [careerInterestInput, setCareerInterestInput] = useState(''); // For dropdown


  // State for saved values (shown in profile card view)
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [bio, setBio] = useState('');
  const [careerInterest, setCareerInterest] = useState('');


  const handleSave = () => {
    // You can handle form submission or saving the data here
    setName(nameInput);
    setJobTitle(jobTitleInput);
    setBio(bioInput);
    setCareerInterest(careerInterestInput); // Save career interest

    //alert('Profile saved!');
  };

  return (
    <div className="min-h-screen p-5 bg-base-color"> 
       <LogggedNavbar />

      <hr className="border-mocha-color"/>

      <div className="flex justify-between mt-12 px-12">
        {/* Profile Card View */}
        <div className="w-1/4 p-5 bg-darker-nav-color flex flex-col items-center justify-center h-128">
          <h1 className="text-mocha-color">Profile Card View</h1>
          <img src="https://via.placeholder.com/150" alt="Profile Pic" />
          <h2 className="text-mocha-color">Name: {name || "N/A"}</h2>
          <p>Status: Mentee</p>
          <p>Job Title: {jobTitle || "N/A"}</p>
          <p>Bio: {bio || "N/A"}</p>
          <p>Career Interest: {careerInterest || "N/A"}</p>
        </div>

        {/* Edit Profile Section */}
        <div className="w-2/5 p-5 bg-darker-nav-color flex flex-col items-center">
          <h1 className="text-mocha-color">Edit Profile</h1>  
          <img src="https://via.placeholder.com/150" alt="Profile Pic" className="mb-5"/>
          
          {/* Input fields */}
          <h2 className="text-mocha-color">Name:</h2>
          <input 
            type="text" 
            value={nameInput} // Editable input
            onChange={(e) => setNameInput(e.target.value)} // Updates input state
            className="mb-3 p-2 border rounded"
          />
          <p>Status:</p>
          <h2 className="text-mocha-color">Job Title:</h2>
          <input 
            type="text" 
            value={jobTitleInput} // Editable input
            onChange={(e) => setJobTitleInput(e.target.value)} // Updates input state
            className="mb-3 p-2 border rounded"
          />
          <h2>Company:</h2>
          <h2 className="text-mocha-color">Bio:</h2>
          <textarea 
            value={bioInput} // Editable input
            onChange={(e) => setBioInput(e.target.value)} // Updates input state
            className="mb-5 p-2 border rounded"
          />

  
          {/* Dropdown for Career Interest */}
          <h2 className="text-mocha-color">Career Interest:</h2>
          <select 
            value={careerInterestInput} 
            onChange={(e) => setCareerInterestInput(e.target.value)} 
            className="mb-5 p-2 border rounded"
          >
            <option value="">Select a career interest</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Data Science">Data Science</option>
            <option value="Product Management">Product Management</option>
            <option value="UX/UI Design">UX/UI Design</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>

          <button 
            className="mt-5 px-5 py-2 bg-green-500 text-white rounded cursor-pointer"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MenteeProfile;
