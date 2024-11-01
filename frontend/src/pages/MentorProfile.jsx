import React, { useState } from "react";
import axios from "axios";
import LogggedNavbar from "../components/LogggedNavbar";
import MochaChart from "../components/mentor/MochaChart";
import MentorNavbar from "../components/mentor/MentorNavbar";
import { json } from "react-router-dom";
const MentorProfile = () => {
  // State for form inputs (used for editing)
  const [name, setName] = useState("John Doe");
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [bio, setBio] = useState(
    "As a passionate Software Engineer with a strong background in full-stack development, I thrive on solving complex problems and creating efficient, user-friendly applications. I hold a degree in Computer Science and have experience working with a variety of technologies, including React, Node.js, Python, and SQL."
  );
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("sample@gmail.com")
  const [careerInterest, setCareerInterest] = useState("Technology");
  // const [menteeRequests, setMenteeRequests] = useState([]);

  const menteeRequests = [
    {
      id: 1,
      name: "Alice Smith",
      requestDate: "2024-10-22",
    },
    {
      id: 2,
      name: "Bob Johnson",
      requestDate: "2024-10-23",
    },
    {
      id: 3,
      name: "Charlie Brown",
      requestDate: "2024-10-24",
    },
    {
      id: 4,
      name: "David Williams",
      requestDate: "2024-10-25",
    },
    { id: 5, name: "Eva Green", requestDate: "2024-10-26", status: "Pending" },
    {
      id: 6,
      name: "Frank Miller",
      requestDate: "2024-10-27",
    },
    // Add more mentee requests as needed
  ];

  const updateProfile = async () => {
    if (role == "Mentor"){
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000//users/mentor/updateprofile",
        {
          email: email,
          bio: bio,
          jobTitle: jobTitle,
          careerInterest: careerInterest,
        }
      );
      if(response.status == 200) {
        console.log("Mentor Added Successfully")
      }
    }
    catch(error){
      console.log(error)
    }
  } else {
    console.log("This is not a mentor")
  }
}

  return (
    <main className="h-auto w-auto  bg-base-color">
      <MentorNavbar />
      <div className="w-full min-h-screen h-auto  flex flex-col md:flex-row items-start bg-base-color text-black justify-center pt-20 ">
        <aside className="flex-shrink-0 w-64 h-screen bg-gray-800 text-white p-5">
          <nav className="flex flex-col space-y-2 ">
            <a href="#" className="text-gray-300 hover:text-white mt-4">
              Dashboard
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Profile
            </a>
            <a href="chatpage" className="text-gray-300 hover:text-white">
              Messages
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Settings
            </a>
          </nav>
        </aside>

        <div className="flex flex-col md:flex-row justify-center h-screen flex-grow p-5 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 h-auto p-5 rounded-lg w-96 ">
            <div className="flex items-center justify-center h-full flex-col ">
              <div className="w-auto h-auto bg-white rounded-lg drop-shadow-lg px-8 py-12">
                <div className="flex flex-col items-center justify-center text-center mb-4">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mr-4">
                    <img
                      src="https://via.placeholder.com/96"
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  <div className="text-wrap text-black">
                    <h2 className="text-xl font-bold mb-2">{name}</h2>
                    <h3 className="text-md text-gray-600 mb-4">{role}</h3>
                    <h3 className="text-md text-gray-600 mb-4">{jobTitle}</h3>
                  </div>
                </div>
                <p className="text-sm text-center text-wrap text-gray-700 mb-4">
                  <strong>Bio: </strong>
                  {bio}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Email:</strong> {email}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Career Interest:</strong> {careerInterest}
                </p>
              </div>
            </div>
            <button onClick={updateProfile()}>Update Profile</button>
          </div>

          <div className="flex-1 flex flex-col space-y-4 text-black rounded-lg drop-shadow-lg">
            <div className="flex-1 flex flex-col items-center justify-start p-4 bg-white rounded-lg drop-shadow-lg overflow-auto">
              <h2 className="text-lg font-bold mb-4">Mentee Requests</h2>
              <div className="grid grid-cols-2 gap-4 ">
                {menteeRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-2 border rounded-lg bg-gray-100 shadow"
                  >
                    <p>
                      <strong>Name:</strong> {request.name}
                    </p>
                    <p>
                      <strong>Request Date:</strong> {request.requestDate}
                    </p>
                    <p>
                      <strong>Bio: </strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex items-start justify-start p-4 bg-white rounded-lg drop-shadow-lg">
              <MochaChart />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MentorProfile;
