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

import { Coffee, Bell, Users, Calendar } from "lucide-react";

const MentorProfile = ({ user, setUser }) => {
  // State for form inputs (used for editing)
  const [name, setName] = useState("John Doe");
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const location = useLocation();
  const [userData, setUserData] = useState(() => {
    if (location.state) {
      return location.state;
    } else if (localStorage.getItem("user_data")) {
      console.log(
        "User data from local storage: ",
        localStorage.getItem("user_data")
      );
      return JSON.parse(localStorage.getItem("user_data"));
    } else {
      return null;
    }
  });
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
            console.log("response from the mentor: ", res.data);
            if (res.data.Response == "No career interest provided") {
              console.log("No career interest provided");
              setMentorCards([]);
              setMenteeRequestMessage(
                "Please update your career interest in your profile to get mentor recommendations"
              );
              alert(
                "Please update your career interest in your profile to get mentor recommendations"
              );
              return;
            }
            console.log(res.data);
            setMentorCards(res.data.MentorList);
          });
        console.log("response from the user: ", response.data);
      } catch (error) {
        if (error.response) {
          console.error("Response error: ", error.response.data);
          if (error.response.data.Response == "No career interest provided") {
            setMentorCards([]);
            setMenteeRequestMessage(error.response.data.Error);
            alert("Please update your career interest in your profile");
          }
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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F6F3EC]">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-red-600">{error}</h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F6F3EC]">
        <div className="flex items-center space-x-2">
          <Coffee className="w-6 h-6 text-[#574C3F] animate-pulse" />
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F3EC]">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar user_data={user} />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-[1.02] transition-transform">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto bg-[#F6F3EC] rounded-full flex items-center justify-center mb-4">
                    <Users className="w-12 h-12 text-[#574C3F]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#36302A]">
                    {user[1]} {user[2]}
                  </h2>
                  <p className="text-[#574C3F]">{user[8]}</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#F6F3EC] p-4 rounded-lg">
                    <h3 className="font-semibold text-[#36302A] mb-2">
                      About Me
                    </h3>
                    <p className="text-[#574C3F]">{user[7]}</p>
                  </div>
                  <div className="bg-[#F6F3EC] p-4 rounded-lg">
                    <h3 className="font-semibold text-[#36302A] mb-2">
                      Career Interests
                    </h3>
                    <p className="text-[#574C3F]">{user[9]}</p>
                  </div>
                </div>
                <button
                  onClick={updateProfile}
                  className="w-full mt-6 bg-[#574C3F] text-white py-3 px-6 rounded-lg hover:bg-[#36302A] transition-colors flex items-center justify-center space-x-2"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Update Profile</span>
                </button>
              </div>

              {/* Welcome Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Coffee className="w-8 h-8 text-[#574C3F]" />
                  <h2 className="text-2xl font-bold text-[#36302A]">
                    Welcome to Mocha Mentors!
                  </h2>
                </div>
                <div className="space-y-4 text-[#574C3F]">
                  <p>
                    Brew up success with our mentorship platform! Connect with
                    mentors or mentees and explore resources carefully curated
                    to help you reach your career goals.
                  </p>
                  <div className="bg-[#F6F3EC] p-4 rounded-lg">
                    <h3 className="font-semibold text-[#36302A] mb-2">
                      Quick Tips
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#574C3F] rounded-full"></div>
                        <span>Update your profile regularly</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#574C3F] rounded-full"></div>
                        <span>Schedule regular check-ins</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#574C3F] rounded-full"></div>
                        <span>Set clear mentorship goals</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recent Activity Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="w-8 h-8 text-[#574C3F]" />
                  <h2 className="text-2xl font-bold text-[#36302A]">
                    Recent Activity
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-[#F6F3EC] rounded-lg">
                    <Users className="w-5 h-5 text-[#574C3F]" />
                    <p className="text-[#574C3F]">
                      Connected with Jane Doe, a potential mentor
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-[#F6F3EC] rounded-lg">
                    <Coffee className="w-5 h-5 text-[#574C3F]" />
                    <p className="text-[#574C3F]">
                      Updated career interests to include Data Science
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-[#F6F3EC] rounded-lg">
                    <Calendar className="w-5 h-5 text-[#574C3F]" />
                    <p className="text-[#574C3F]">
                      Scheduled a meeting with John Smith for next week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MentorProfile;
