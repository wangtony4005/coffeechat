import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import LoggedNavBar from "../components/LogggedNavbar";
import { IoArrowBackCircle } from "react-icons/io5";
import profile_icon from "../assets/anonprofile.jpg";

import axios from "axios";

const socket = io("http://127.0.0.1:5000", { autoConnect: false });

const ChatApp = ({ user, setUser }) => {
  console.log(user);
  const [username1, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);
  const [room, setRoom] = useState();
  const [chooseChat, setChooseChat] = useState();
  const [userMessage, setUserMessage] = useState("");

  const navigate = useNavigate(); // Use useNavigate for programmatic navigation
  const location = useLocation();
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };
  const tempUser = {
    username1: "Crosve",
    pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    const getMessageRooms = async () => {
      try {
        const response = await axios
          .post("http://127.0.0.1:5000/messages/get_rooms", { email: user[5] })
          .then(async (res) => {
            console.log(res.data);
            if (res.data.Response == "No rooms found") {
              console.log(res.data.error);
              alert("No rooms found");
              setUserMessage(
                "No rooms found, Connect with a mentor to get started!"
              );
              setChooseChat([]);
              return;
            } else {
              setChooseChat(res.data.RoomList);
            }
          });
      } catch (err) {
        console.log(err.message);
        if (err.message.response == "No rooms found") {
          console.log("No rooms found");
          setChooseChat([]);
        }
      }
    };
    getMessageRooms();
  }, []);

  useEffect(() => {
    if (isChatActive) {
      socket.connect();

      // Listen for chat messages
      socket.on("chat", (data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          `${data.username}: ${data.message}`,
        ]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [isChatActive]);

  const handleJoin = () => {
    setIsChatActive(true);
    socket.emit("join_room", { username1, room });
  };

  const handleLeave = () => {
    setIsChatActive(false);
    socket.emit("leave_room", { username1, room });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    socket.emit("new_message", { username1, message, room });
    setMessage("");
  };

  const handleRoomChange = (e, mentorEmail, menteeEmail, roomID) => {
    e.preventDefault();
    setMessages([]);
    setRoom(roomID);
    setIsChatActive(true);
    if (user[6] == "mentee") {
      socket.emit("join_room", { username: menteeEmail, room: roomID });
      setUsername(menteeEmail);
    } else {
      socket.emit("join_room", { username: mentorEmail, room: roomID });
      setUsername(mentorEmail);
    }
  };

  const theme = {
    base: "#F6F3EC",
    mocha: "#574C3F",
    footer: "#36302A",
    nav: "#F6F3EC",
    darkerNav: "#ECE4DA",
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: theme.darkerNav }}>
      <div className="flex p-4" style={{ backgroundColor: theme.base }}>
        <IoArrowBackCircle
          className="h-8 w-8 cursor-pointer"
          style={{ color: theme.mocha }}
          onClick={handleBackClick}
        />
      </div>

      <div
        className="w-full min-h-screen h-auto overflow-auto flex flex-col md:flex-row items-start"
        style={{ backgroundColor: theme.base }}
      >
        {userMessage && (
          <p className="text-lg my-2 px-4" style={{ color: theme.mocha }}>
            {userMessage}
          </p>
        )}

        <div className="flex-1 flex-col relative h-full flex pt-4 px-4">
          {chooseChat?.map((chat, index) => (
            <div
              key={index}
              className="flex items-center border-2 p-4 w-96 text-wrap h-24 rounded-lg mb-2 transition-colors duration-200 cursor-pointer"
              style={{
                borderColor: theme.mocha,
                backgroundColor: theme.darkerNav,
                color: theme.mocha,
              }}
              onClick={(e) => handleRoomChange(e, chat[1], chat[2], chat[5])}
            >
              <img
                src={profile_icon}
                alt="profile"
                className="w-16 h-12 rounded-full border-2"
                style={{ borderColor: theme.mocha }}
              />
              <div className="flex flex-col relative left-7 justify-center">
                <h1 style={{ color: theme.footer }}>Mentor: {chat[1]}</h1>
                <h1 style={{ color: theme.mocha }}>Mentee: {chat[2]}</h1>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-2 h-full w-full flex flex-col items-center justify-center lg:relative lg:translate-y-24 p-2 border-2 border-amber-900	bg-mocha-color">
          {isChatActive && (
            <div id="chat" className="h-full w-full max-w-4xl mx-auto">
              <div
                id="chat-messages"
                className="flex flex-col w-full h-full rounded-t-lg p-4"
                style={{
                  height: "620px",
                  overflowY: "scroll",
                  backgroundColor: theme.base,
                }}
              >
                {messages.map((msg, index) => (
                  <div key={index}>
                    {tempUser && (
                      <div className="flex items-center gap-2 mb-1">
                        <img
                          src={tempUser.pfp}
                          alt="profile"
                          className="w-8 h-8 rounded-full border"
                          style={{ borderColor: theme.mocha }}
                        />
                        <h1
                          className="font-medium"
                          style={{ color: theme.mocha }}
                        >
                          {msg.username1}
                        </h1>
                      </div>
                    )}
                    <div
                      className={`relative max-w-[75%] break-words rounded-2xl p-3 text-base mb-2 ${
                        msg.user
                          ? "animate-slideInRight ml-auto self-end shadow-md"
                          : "animate-slideInLeft mr-auto self-start shadow-md"
                      }`}
                      style={{
                        backgroundColor: msg.user ? theme.mocha : theme.footer,
                        color: theme.base,
                      }}
                    >
                      {msg}
                    </div>
                  </div>
                ))}
              </div>

              <form
                className="flex items-center gap-2 p-3 rounded-b-lg"
                style={{ backgroundColor: theme.darkerNav }}
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 rounded-lg border-2 focus:outline-none"
                  style={{
                    backgroundColor: theme.base,
                    borderColor: theme.mocha,
                    color: theme.mocha,
                  }}
                  placeholder="Type your message..."
                />
                <button
                  className="rounded-lg p-3 px-5 text-base font-medium transition-colors duration-200 
                         disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    backgroundColor: theme.mocha,
                    color: theme.base,
                  }}
                  onClick={(e) => handleSendMessage(e)}
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatApp;
