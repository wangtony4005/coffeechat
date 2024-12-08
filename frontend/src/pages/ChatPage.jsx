import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import LoggedNavBar from "../components/LogggedNavbar";
import { IoArrowBackCircle } from "react-icons/io5";

import axios from "axios";

const socket = io("http://127.0.0.1:5000", { autoConnect: false });

// const chooseChat = [
//   {
//     pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
//     name: "Person 1",
//     description: "Last Mesage",
//     user: true,
//   },
//   {
//     pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
//     name: "Person 2",
//     description: "This is chat 2",
//     user: true,
//   },
//   {
//     pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
//     name: "Person 3",
//     description: "This is chat 3",
//     user: true,
//   },
//   {
//     pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
//     name: "Person 4",
//     description: "This is chat 4",
//     user: true,
//   },
//   {
//     pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
//     name: "Person 5",
//     description: "This is chat 5",
//     user: true,
//   },
//   {
//     pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
//     name: "Person 6",
//     description: "This is chat 6",
//     user: true,
//   },
//   {
//     pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
//     name: "Person 7",
//     description: "This is chat 7",
//     user: true,
//   },
//   {
//     pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
//     name: "Person 8",
//     description: "This is chat 8",
//     user: true,
//   },
//   {
//     pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
//     name: "Person 9",
//     description: "This is chat 9",
//     user: true,
//   },
//   {
//     pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
//     name: "Person 10",
//     description: "This is chat 10",
//     user: true,
//   },
// ];

const ChatApp = ({user, setUser}) => {
  console.log(user)
  const [username1, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);
  const [room, setRoom] = useState();
  const [chooseChat, setChooseChat] = useState()

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
    const getMessageRooms = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/messages/get_rooms", {email: user[5]}).then(async (res) => {
          console.log(res.data)
          setChooseChat(res.data.RoomList)
        })
      } catch (err) {
        console.log(err)
      }
    }
    getMessageRooms()
  }, [])

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
    if (user[6] == 'mentee'){
      socket.emit("join_room", { username: menteeEmail, room: roomID });
    }
    else {
      socket.emit("join_room", { username: mentorEmail, room: roomID });
    }
  };

  return (
    <main className="h-auto w-auto bg-darker-nav-color">
      <div className="flex p-4 bg-base-color ">
        <IoArrowBackCircle className="h-8 w-8" onClick={handleBackClick} />
      </div>

      <div className="w-screen min-h-screen h-auto overflow-auto flex flex-col md:flex-row items-start bg-base-color">
        <div
          className="flex-[1] flex-col relative h-full flex pt-4" // Adjusted padding to fit back button
          style={{ height: "100vh", overflowY: "scroll" }}
        >
          {chooseChat && chooseChat.map((chat, index) => (
            <div
              key={index}
              className="flex items-center border-2 p-4 w-full h-24 rounded-lg m-0 right-0 left-0 relative hover:bg-gray-200 cursor-pointer"
              onClick={(e) => handleRoomChange(e, chat[1], chat[2], chat[5])}
            >
              {/* <img
                src={chat.pfp}
                alt="pfp"
                className="w-16 h-12 rounded-full"
              /> */}
              {/* <div className="flex flex-col relative left-7 justify-center">
                <h1>{chat.name}</h1>
                <h1>{chat.description}</h1>
              </div> */}
            </div>
          ))}
        </div>

        <div className="flex-[2] h-full w-full flex flex-col items-center justify-center lg:relative lg:translate-y-24 p-2 ">
          {isChatActive && (
            <div id="chat" className="h-full w-full">
              <div
                id="chat-messages"
                className="flex flex-col w-full h-full"
                style={{
                  height: "620px",
                  backgroundColor: "white",
                  overflowY: "scroll",
                }}
              >
                {messages.map((msg, index) => (
                  <>
                    {tempUser && (
                      <div className="flex items-center" key={index}>
                        <img
                          src={tempUser.pfp}
                          alt="pfp"
                          className="w-8 h-8 rounded-full"
                        />
                        <h1>{msg.username1}</h1>
                      </div>
                    )}
                    <div
                      key={index}
                      className={`relative max-w-[75%] break-words rounded-2xl p-3 text-base mb-2 ${
                        msg.user
                          ? "animate-slideInRight ml-auto self-end bg-green-500 text-white shadow-md"
                          : "animate-slideInLeft mr-auto self-start bg-blue-500 text-white shadow-md"
                      }`}
                    >
                      {msg}
                    </div>
                  </>
                ))}
              </div>
              <form className="flex items-center border-t border-gray-300 bg-white p-3 shadow-inner">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-full p-2 rounded-lg border-2 border-gray-300"
                  placeholder="Enter a Message"
                />
                <button
                  className="rounded-2xl bg-slate-500 p-3 px-5 text-base font-medium text-white transition-colors duration-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-gray-400"
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
