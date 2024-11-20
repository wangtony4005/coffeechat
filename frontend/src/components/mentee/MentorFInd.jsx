import { useEffect, useState } from "react";
import axios from "axios";

function MentorFInd() {
  const [mentorList, setMentorList] = useState([]);
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/users/fetchMentors",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.table(response.data);
        setMentorList(response.data.data);
      } catch (error) {
        console.error("There was an error!", error); // Handle errors
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 ">
      {mentorList.map((mentor, index) => (
        <div key={index} className="p-2 border rounded-lg bg-gray-100 shadow">
          <p>
            <strong>Name:</strong> {mentor.firstname} {mentor.lastname}
          </p>
          <p>
            <strong>Job Title</strong> {mentor.jobTitle}
          </p>
          <p>
            <strong>bio: </strong> {mentor.bio}
          </p>
          <p>
            <strong>Career Interest: </strong> {mentor.careerInterest}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MentorFInd;
