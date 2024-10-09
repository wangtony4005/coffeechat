import React from 'react';

const MenteeProfile = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#cbae90' }}>
      <h1>MochaMentors</h1>
      <nav>
        <a href="#mentors" style={{ marginRight: '20px' }}>Mentors</a>
        <a href="#chat" style={{ marginRight: '20px' }}>Chat</a>
        <a href="#profile" style={{ marginRight: '20px' }}>Profile</a>
        <a href="#logout">Logout</a>
      </nav>
      <hr />

      <div style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '50px', 
        padding: '0 50px' 
      }}>
        <div style={{ 
            width: '25%', 
            padding: '20px', 
            backgroundColor: '#eae3d2',
            display: 'flex', // Flexbox for centering
            flexDirection: 'column', // Arrange content in a column
            alignItems: 'center', // Center items horizontally
            justifyContent: 'center', // Center items vertically
            height: '500px' // Optional: Set a fixed height for vertical centering 
        }}>
            <h1>Profile Card View</h1>
          <img src="https://via.placeholder.com/150" alt="Profile Pic" />
          <h2>Name:</h2>
          <p>Status: Mentee</p>
          <p>Job Title: </p>
          <p>Bio:</p>
        </div>

        <div 
            style={{ 
                width: '45%', 
                padding: '20px', 
                backgroundColor: '#eae3d2',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
            }}>
          <h1>Edit Profile</h1>  
          <img src="https://via.placeholder.com/150" alt="Profile Pic" style={{ marginBottom: '20px' }}/>
          <h2>Name:</h2>
          <p>Status:</p>
          <p>Job Title:</p>
          <p>Company:</p>
          <p>Bio:</p>
          <p>Career Interest:</p>

          <button style={{
            marginTop: '20px', // Add some space above the button
            padding: '10px 20px', // Button padding
            backgroundColor: '#4CAF50', // Green background color
            color: 'white', // White text color
            border: 'none', // No border
            borderRadius: '5px', // Rounded corners
            cursor: 'pointer' // Pointer cursor on hover
          }}
          onClick={() => alert('Profile saved!')} // Placeholder click handler
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenteeProfile;
