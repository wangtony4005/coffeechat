import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import LoggedNavBar from "../components/LogggedNavbar";

const socket = io("http://127.0.0.1:5000", { autoConnect: false });

const chooseChat = [
  {
    pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    name: "Person 1",
    description: "Last Mesage",
    user: true,
  },
  {
    pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    name: "Person 2",
    description: "This is chat 2",
    user: true,
  },
  {
    pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    name: "Person 3",
    description: "This is chat 3",
    user: true,
  },
  {
    pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    name: "Person 4",
    description: "This is chat 4",
    user: true,
  },
  {
    pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    name: "Person 5",
    description: "This is chat 5",
    user: true,
  },
];

const ChatApp = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);
  const [room, setRoom] = useState("");

  const tempUser = {
    username: "Crosve",
    pfp: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
  };

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
    socket.emit("join_room", { username, room });
  };

  const handleLeave = () => {
    setIsChatActive(false);
    socket.emit("leave_room", { username, room });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    socket.emit("new_message", { username, message, room });
    setMessage("");
  };

  const handleRoomChange = (e, name, index) => {
    e.preventDefault();
    setMessages([]); // Clear messages
    setRoom(index);
    setIsChatActive(true);
    socket.emit("join_room", { username: name, room: index });
  };

  return (
    <main className="h-auto w-auto bg-darker-nav-color">
      <LoggedNavBar />

      <div className="w-screen min-h-screen h-auto overflow-auto flex flex-col md:flex-row items-start bg-base-color">
        <div className="flex-[1] flex-col relative h-full flex pt-24 ">
          {chooseChat.map((chat, index) => (
            <div
              key={index}
              className="flex items-center border-2 p-4 w-full h-24 rounded-lg hover:   m-0 right-0 left-0 relative"
              onClick={(e) => handleRoomChange(e, chat.name, index)}
            >
              <img
                src={chat.pfp}
                alt="pfp"
                className="w-16 h-12 rounded-full"
              />
              <div className="flex flex-col relative left-7 justify-center">
                <h1>{chat.name}</h1>
                <h1>{chat.description}</h1>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-[2] h-full flex flex-col items-center justify-center lg:relative lg:translate-y-20 p-5  ">
          {isChatActive && (
            <div id="chat" className="h-full w-full">
              <div
                id="chat-messages"
                className="flex flex-col w-full h-full"
                style={{
                  height: "500px",
                  backgroundColor: "white",
                  overflowY: "scroll",
                }}
              >
                {messages.map((msg, index) => (
                  <>
                    {tempUser && (
                      <div className="flex items-center">
                        <img
                          src={tempUser.pfp}
                          alt="pfp"
                          className="w-8 h-8 rounded-full"
                        />
                        <h1>{msg.username}</h1>
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
