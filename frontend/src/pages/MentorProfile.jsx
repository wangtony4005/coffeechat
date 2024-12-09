import React, { useState, useEffect } from "react";
import LogggedNavbar from "../components/LogggedNavbar";
import MochaChart from "../components/mentor/MochaChart";
import MentorNavbar from "../components/mentor/MentorNavbar";
import { IoIosExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { json } from "react-router-dom";
import MentorUpdateProfile from "../pages/MentorUpdateProfile";
import ProfileCard from "../components/ProfileCard";

import {
  User,
  Calendar,
  FileText,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";

const MentorCard = ({ mentor, index, handleCreateMatch }) => {
  return (
    <div
      className="group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl 
             bg-white border-2 border-transparent hover:border-blue-500 
             rounded-2xl overflow-hidden 
             hover:ring-4 hover:ring-blue-500 hover:ring-opacity-20 
             max-w-sm mx-auto"
      style={{ width: "300px", height: "400px" }} // Adjust width and height as needed
    >
      {/* Subtle gradient background overlay */}
      <div
        className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-200 to-purple-200 
               transition-opacity group-hover:opacity-30 pointer-events-none h-"
      />

      {/* Content Container */}
      <div className="relative z-10 p-6 space-y-4">
        {/* Header with Name */}
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="text-blue-600" size={24} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
            {mentor[1]} {mentor[2]}
          </h2>
        </div>

        {/* Metadata Section */}
        <div className="space-y-3 text-gray-600">
          {/* Request Date */}
          <div className="flex items-center space-x-3">
            <Calendar className="text-gray-400" size={20} />
            <p className="text-sm">
              <span className="font-medium text-gray-500">Request Date:</span>{" "}
              {mentor[10]}
            </p>
          </div>

          {/* Bio */}
          <div className="flex items-start space-x-3">
            <FileText className="text-gray-400 mt-1" size={20} />
            <p className="text-sm leading-relaxed text-gray-700 italic">
              {mentor[7]}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => handleCreateMatch(mentor[5], index)}
          className="w-full flex items-center justify-center 
                 bg-blue-500 text-white py-3 rounded-lg 
                 hover:bg-blue-600 transition-colors 
                 group/button"
        >
          <Send size={18} className="mr-2 group-hover/button:animate-pulse" />
          Send Match Request
        </button>
      </div>

      {/* Subtle Animated Border */}
      <div
        className="absolute inset-0 border-2 border-transparent 
               group-hover:border-blue-500 
               group-hover:animate-pulse-border 
               pointer-events-none"
      />
    </div>
  );
};

// Custom CSS for additional animations
const styles = `
@keyframes pulse-border {
  0% {
    border-color: transparent;
  }
  50% {
    border-color: rgba(59, 130, 246, 0.5);
  }
  100% {
    border-color: transparent;
  }
}

.animate-pulse-border {
  animation: pulse-border 2s infinite;
}
`;

const MentorProfile = ({ user, setUser }) => {
  // State for form inputs (used for editing)
  const [name, setName] = useState("John Doe");
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [menteeRequests, setmenteeRequests] = useState([]);
  const [mentorCards, setMentorCards] = useState();
  const [loading, setLoading] = useState(false);
  const [menteeRequestMessage, setMenteeRequestMessage] =
    useState("Loading...");

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      setUserData(location.state);
    }
  }, [location.state]);

  useEffect(() => {
    if (user) {
      console.log("User data: ", user);
      localStorage.setItem("user_data", JSON.stringify(user));
    } else if (user === null && localStorage.getItem("user_data")) {
      setUser(JSON.parse(localStorage.getItem("user_data")));
    } else if (localStorage.getItem("user_data")) {
      setUser(JSON.parse(localStorage.getItem("user_data")));
    } else {
      setError("Neither user or local storage available");
    }
  }, []);

  const [bio, setBio] = useState(
    "As a passionate Software Engineer with a strong background in full-stack development, I thrive on solving complex problems and creating efficient, user-friendly applications. I hold a degree in Computer Science and have experience working with a variety of technologies, including React, Node.js, Python, and SQL."
  );

  console.log(user);
  // const [menteeRequests, setMenteeRequests] = useState([]);
  const navigate = useNavigate();
  const { user_data, form_data } = location.state || {};
  // console.log(setUser);
  // let firstName = user[1];
  // let lastName = user[2];
  // let username = user[3];
  // let user_email = user[5];
  // let user_role = user[6];
  // let job_Title = user[8];
  // let bio_info = user[7];
  // let career_Interest = user[9];
  // let fullname = firstName + " " + lastName;
  const handleCreateMatch = async (mentoremail, indexToRemove) => {
    setMentorCards((mentorCards) =>
      mentorCards.filter((_, index) => index !== indexToRemove)
    );
    try {
      const response = await axios
        .post("http://127.0.0.1:5000/matches/addmatch", {
          menteeEmail: user[5],
          mentorEmail: mentoremail,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAcceptRequest = async (menteeEmail, indexToRemove) => {
    setmenteeRequests((menteeRequests) =>
      menteeRequests.filter((_, index) => index !== indexToRemove)
    );
    try {
      const response = await axios
        .post("http://127.0.0.1:5000/matches/updatematch/statustoaccepted", {
          mentorEmail: user[5],
          menteeEmail: menteeEmail,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectRequest = async (menteeEmail, indexToRemove) => {
    setmenteeRequests((menteeRequests) =>
      menteeRequests.filter((_, index) => index !== indexToRemove)
    );
    try {
      const response = await axios
        .post("http://127.0.0.1:5000/matches/updatematch/statustorejected", {
          mentorEmail: user[5],
          menteeEmail: menteeEmail,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Function to fetch data from the API
    const fetchMentees = async () => {
      try {
        if (user[6] != "mentor") {
          return;
        }
        setLoading(true);
        const response = await axios
          .post("http://127.0.0.1:5000/matches/getmenteerequests", {
            mentorEmail: user[5],
          })
          .then((res) => {
            console.log("mentee request data: ", res.data);
            if (res.data.Success == false) {
              setmenteeRequests([]);
              console.log("No mentee requests found");
              setMenteeRequestMessage("No mentee requests found");
              setLoading(false);
              return;
            } else {
              setmenteeRequests(res.data.MenteeList);
            }
            setLoading(false);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMentees();
  }, []);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        if (user[6] != "mentee") {
          return;
        }
        const response = await axios
          .post("http://127.0.0.1:5000/model/fetchMentors", {
            careerInterest: user[9],
          })
          .then(async (res) => {
            console.log(res.data);
            setMentorCards(res.data.MentorList);
          });
        console.log("response from the user: ", response.data);
      } catch (error) {
        if (error.response) {
          console.error("Response error: ", error.response.data);
        } else if (error.request) {
          console.error("Request error: ", error.request);
        } else {
          console.error("General error: ", error);
        }
        console.error(error.config);
      }
    };

    fetchMentors();
  }, []);

  const updateProfile = () => {
    navigate("/mentor-update-profile");
  };

  return (
    <main className="h-auto w-auto  bg-base-color">
      <div className="w-full min-h-screen h-auto  flex flex-col md:flex-row items-start bg-base-color text-black justify-center ">
        {error && <h1>{error}</h1>}
        {!user ? <h1>Loading</h1> : <Sidebar user_data={user} />}

        <div className="flex flex-col md:flex-row justify-center h-screen flex-grow p-5 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 h-auto p-5 rounded-lg w-96 ">
            {user && (
              <ProfileCard
                name={user[1] + " " + user[2]}
                jobTitle={user[8]}
                bio={user[7]}
                careerInterest={user[9]}
                userRole={user[6]}
              />
            )}

            {/* <div className="flex items-center justify-center h-full flex-col ">
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
                    <h2 className="text-xl font-bold mb-2">{firstName + " " + lastName}</h2>
                    <h3 className="text-md text-gray-600 mb-4">{user_role}</h3>
                    <h3 className="text-md text-gray-600 mb-4">{job_Title}</h3>
                  </div>
                </div>
                <p className="text-sm text-center text-wrap text-gray-700 mb-4">
                  <strong>Bio: </strong>
                  {bio_info}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Email:</strong> {user_email}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Career Interest:</strong> {career_Interest}
                </p>
              </div>
            </div> */}
            <button
              onClick={() => updateProfile()}
              className="bg-mocha-color text-white py-2 px-4 rounded-lg hover:bg-darker-nav-color transition"
            >
              Update Profile
            </button>
          </div>

          <div className="flex-1 flex flex-col space-y-4 text-black rounded-lg drop-shadow-lg">
            <div className="flex-1 flex flex-col items-center justify-start p-4 bg-white rounded-lg drop-shadow-lg overflow-auto">
              {user[6] == "mentor" ? (
                <>
                  <h2 className="text-lg font-bold mb-4">Mentee Requests</h2>
                  {menteeRequests && !loading ? (
                    <div className="grid grid-cols-2 gap-4 ">
                      {menteeRequests.map((request, index) => (
                        <div
                          key={request.id}
                          className="p-2 border rounded-lg bg-gray-100 shadow"
                        >
                          <p>
                            <strong>Name:</strong>{" "}
                            {request[1] + " " + request[2]}
                          </p>
                          <p>
                            <strong>Request Date:</strong> {request[11]}
                          </p>
                          <p>
                            <strong>Bio: </strong> {request[8]}
                          </p>
                          <button
                            onClick={() =>
                              handleAcceptRequest(request[5], index)
                            }
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleRejectRequest(request[5], index)
                            }
                          >
                            Reject
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h2 className="text-lg font-bold mb-4">
                      {menteeRequestMessage}
                    </h2>
                  )}{" "}
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold mb-4">
                    Mentor Recommendations
                  </h2>
                  {mentorCards && !loading ? (
                    mentorCards.map((mentor, index) => (
                      // <MentorCard
                      //   mentor={mentor}
                      //   index={index}
                      //   handleCreateMatch={handleCreateMatch}
                      // />
                      <div
                        key={mentor[0]}
                        className="p-4 border border-gray-300 rounded-lg bg-white shadow-md 
             hover:shadow-lg transition-shadow duration-300 
             w-72 h-80" // Set fixed width and height for uniformity
                      >
                        <div className="flex flex-col justify-between h-full">
                          <div className="mb-4 flex-1">
                            <p className="text-lg font-semibold text-gray-800">
                              <strong>Name:</strong> {mentor[1]} {mentor[2]}
                            </p>
                          </div>
                          <div className="mb-4 flex-1">
                            <p className="text-sm text-gray-600">
                              <strong>Request Date:</strong> {mentor[10]}
                            </p>
                          </div>
                          <div className="mb-4 flex-1">
                            <p className="text-sm text-gray-600">
                              <strong>Bio:</strong> {mentor[7]}
                            </p>
                          </div>
                          <button
                            onClick={() => handleCreateMatch(mentor[5], index)}
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md 
                 hover:bg-blue-600 transition-colors duration-300 mt-4"
                          >
                            Send Match Request
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h2>{menteeRequestMessage}</h2>
                  )}
                </>
              )}
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
