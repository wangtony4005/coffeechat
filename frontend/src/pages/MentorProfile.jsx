import React, { useState, useEffect } from "react";
import LogggedNavbar from "../components/LogggedNavbar";
import MochaChart from "../components/mentor/MochaChart";
import MentorNavbar from "../components/mentor/MentorNavbar";
import { IoIosExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MentorUpdateProfile from "../pages/MentorUpdateProfile";
import ProfileCard from "../components/ProfileCard";

const MentorProfile = ({ user, setUser }) => {
  // State for form inputs (used for editing)
  const [name, setName] = useState("John Doe");
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [menteeRequests, setMenteeRequests] = useState([]);
  const [mentorCards, setMentorCards] = useState([]);

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

  const handleCreateMatch = async (mentoremail, indexToRemove) => {
    setMentorCards((mentorCards) => mentorCards.filter((_, index) => index !== indexToRemove));
    try {
      const response = await axios.post("http://127.0.0.1:5000/matches/addmatch", { menteeEmail: user[5], mentorEmail: mentoremail });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAcceptRequest = async (menteeEmail, indexToRemove) => {
    setMenteeRequests((menteeRequests) => menteeRequests.filter((_, index) => index !== indexToRemove));
    try {
      const response = await axios.post("http://127.0.0.1:5000/matches/updatematch/statustoaccepted", { mentorEmail: user[5], menteeEmail: menteeEmail });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectRequest = async (menteeEmail, indexToRemove) => {
    setMenteeRequests((menteeRequests) => menteeRequests.filter((_, index) => index !== indexToRemove));
    try {
      const response = await axios.post("http://127.0.0.1:5000/matches/updatematch/statustorejected", { mentorEmail: user[5], menteeEmail: menteeEmail });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        if (user[6] !== "mentor") {
          return;
        }
        const response = await axios.post("http://127.0.0.1:5000/matches/getmenteerequests", { mentorEmail: user[5] });
        setMenteeRequests(response.data.MenteeList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMentees();
  }, [user]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        if (user[6] !== "mentee") {
          return;
        }
        const response = await axios.post("http://127.0.0.1:5000/model/fetchMentors", { careerInterest: user[9] });
        setMentorCards(response.data.MentorList);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };
    fetchMentors();
  }, [user]);

  const updateProfile = () => {
    navigate("/mentor-update-profile");
  };

  return (
    <main className="h-auto w-auto bg-base-color">
      <div className="w-full min-h-screen h-auto flex flex-col md:flex-row items-start bg-base-color text-black justify-center ">
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
            <button 
              onClick={() => updateProfile()}
              className="bg-mocha-color text-white py-2 px-4 rounded-lg hover:bg-darker-nav-color transition"
            >
              Update Profile
            </button>
          </div>

          <div className="flex-1 flex flex-col space-y-4 text-black rounded-lg drop-shadow-lg">
            <div className="flex-1 flex flex-col items-center justify-start p-4 bg-white rounded-lg drop-shadow-lg overflow-auto">
              {user && user[6] === "mentor" && (
                <>
                  {userData}
                  <h2 className="text-lg font-bold mb-4">Mentee Requests</h2>
                  {menteeRequests ? (
                    <div className="grid grid-cols-2 gap-4">
                      {menteeRequests.map((request, index) => (
                        <div key={request.id} className="p-2 border rounded-lg bg-gray-100 shadow">
                          <p>{index}</p>
                          <p>
                            <strong>Name:</strong> {request[1] + " " + request[2]}
                          </p>
                          <p>
                            <strong>Request Date:</strong> {request[11]}
                          </p>
                          <p>
                            <strong>Bio:</strong> {request[8]}
                          </p>
                          <button onClick={() => handleAcceptRequest(request[5], index)}>
                            Accept
                          </button>
                          <button onClick={() => handleRejectRequest(request[5], index)}>
                            Reject
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h2 className="text-lg font-bold mb-4">Loading Mentee Requests...</h2>
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
