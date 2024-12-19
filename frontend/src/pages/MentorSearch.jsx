import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

import axios from "axios";

const Items = [
  {
    id: 1,
    name: "Coffee Lover's Shirt",
    description: "A cozy shirt for coffee enthusiasts.",
    price: 500,
    image: "https://via.placeholder.com/150?text=Shirt",
  },
  {
    id: 2,
    name: "Mocha Mug",
    description: "Start your day with a mocha-themed mug.",
    price: 300,
    image: "https://via.placeholder.com/150?text=Mug",
  },
  {
    id: 3,
    name: "Barista Apron",
    description: "For the aspiring barista in you.",
    price: 700,
    image: "https://via.placeholder.com/150?text=Apron",
  },
  {
    id: 4,
    name: "Coffee Beans Tote Bag",
    description: "Carry your essentials in style.",
    price: 450,
    image: "https://via.placeholder.com/150?text=Bag",
  },
];

function MentorSearch() {
  const [mochaPoints, setMochaPoints] = useState(0);
  const [mentorCards, setMentorCards] = useState([]);
  const [user, setUser] = useState(() => {
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

  const [user_data, setUser_data] = useState(() => {
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

  return (
    <div className="min-h-screen flex bg-base-color text-mocha-color">
      <Sidebar user_data={user_data} />
      <div className=" flex-grow bg-base-color text-mocha-color">
        <div className="container mx-auto py-10">
          <h1 className="text-4xl font-bold text-center mb-6">Mentor Search</h1>
          <div className="text-center mb-8">
            <p className="text-lg font-semibold">
              Search for a mentor based on your career interests
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentorCards.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
              >
                <img
                  src="https://picsum.photos/id/91/200/300"
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">
                  {item[1]}, {item[2]}
                </h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-lg font-semibold mb-4">
                  Username: {item[3]}
                </p>

                <p className="text-lg font-semibold mb-4">Bio: {item[7]}</p>

                <p className="text-xl font-extrabold mb-4">{item[8]}</p>
                <button
                  onClick={() => handleCreateMatch(item[5], index)}
                  className="bg-mocha-color text-white py-2 px-4 rounded-lg hover:bg-darker-nav-color transition"
                >
                  Request Mentorship
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorSearch;
