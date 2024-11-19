import { useEffect, useState } from "react";
import axios from "axios";

function MentorFInd() {
  const [mentorList, setMentorList] = useState([]);
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/users/fetchMentors", // URL
          {}, // Request body (you can send data here if necessary, or keep it empty)
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the token in the Authorization header
            },
          }
        );
        console.log(response.data); // Handle the response
      } catch (error) {
        console.error("There was an error!", error); // Handle errors
      }
    };

    fetchMentors();
  }, []);
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
  ];
  return (
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
  );
}

export default MentorFInd;
