import React from 'react';

const MentorProfile = () => {
  return (
    <div className="p-5 bg-base-color"> {/* Using your custom color */}
      <h1>MochaMentors</h1>
      <nav className="mb-5 bg-nav-color p-3">
        <a href="#chat" className="mr-5 text-mocha-color">Chat</a>
        <a href="#profile" className="mr-5 text-mocha-color">Profile</a>
        <a href="#logout" className="text-mocha-color">Logout</a>
      </nav>
      <hr className="border-mocha-color"/>

      <div className="flex justify-between mt-12 px-12">
        <div className="w-1/4 p-5 bg-darker-nav-color flex flex-col items-center justify-center h-128">
          <h1 className="text-mocha-color">Profile Card View</h1>
          <img src="https://via.placeholder.com/150" alt="Profile Pic" />
          <h2 className="text-mocha-color">Name:</h2>
          <p>Status: Mentor</p>
          <p>Job Title:</p>
          <p>Bio:</p>
        </div>

        <div className="w-2/5 p-5 bg-darker-nav-color flex flex-col items-center">
          <h1 className="text-mocha-color">Edit Profile</h1>  
          <img src="https://via.placeholder.com/150" alt="Profile Pic" className="mb-5"/>
          <h2 className="text-mocha-color">Name:</h2>
          <p>Status:</p>
          <p>Job Title:</p>
          <p>Company:</p>
          <p>Bio:</p>
          <p>Career Interest:</p>

          <button 
            className="mt-5 px-5 py-2 bg-green-500 text-white rounded cursor-pointer"
            onClick={() => alert('Profile saved!')}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default MentorProfile;
