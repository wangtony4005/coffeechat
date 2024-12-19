import React, { useState, useEffect } from "react";

import axios from "axios";
import Sidebar from "../components/Sidebar";

function MenteeView() {
  const [menteeRequests, setmenteeRequests] = useState([]);
  const [user, setUser] = useState(() => {
    if (location.state) {
      return location.state;
    } else if (localStorage.getItem("user_data")) {
      return JSON.parse(localStorage.getItem("user_data"));
    } else {
      return null;
    }
  });

  const fetchMenteeRequests = async () => {
    try {
      const response = await axios
        .post("http://127.0.0.1:5000/matches/getmenteerequests", {
          mentorEmail: user[5],
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.MenteeRequests.length === 0) {
            return;
          }
          setmenteeRequests(res.data.MenteeRequests);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenteeRequests();
  }, []);

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
  return (
    <div className="min-h-screen flex bg-base-color text-mocha-color">
      <Sidebar user_data={user} />
      <div className=" flex-grow bg-base-color text-mocha-color">
        <div className="container mx-auto py-10">
          <h1 className="text-4xl font-bold text-center mb-6">Inbox</h1>
          <div className="text-center mb-8">
            <p className="text-lg font-semibold">
              {menteeRequests &&
                menteeRequests.length === 0 &&
                "No requests found"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menteeRequests.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
              >
                <img
                  src="https://picsum
                        .photos/id/91/200/300"
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
                  onClick={() => handleAcceptRequest(item[5], index)}
                  className="bg-mocha-color text-white py-2 px-4 rounded-lg hover:bg-darker-nav-color transition"
                >
                  Accept Request
                </button>
                <button
                  onClick={() => handleRejectRequest(item[5], index)}
                  className="bg-mocha-color text-white py-2 px-4 rounded-lg hover:bg-darker-nav-color transition"
                >
                  Reject Request
                </button>
              </div>
            ))}
            {/* {mentorCards.map((item, index) => (
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
        ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenteeView;
