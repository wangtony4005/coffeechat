import React, { useEffect, useState } from "react";
import LogggedNavbar from "../components/LogggedNavbar";
import Footer from "../components/Footer";

function MenteeDashboard() {
    const [userName, setUserName] = useState("");
    const [mentorProfiles, setMentorProfiles] = useState([]);
    
    useEffect(() => {
        const storedName = localStorage.getItem("userName") || "Mentee";
        setUserName(storedName);
        
        const mockProfiles = [
            { id: 1, name: "Mentor 1", job: "Investment Banker @ Chase" },
            { id: 2, name: "Mentor 2", job: "Software Engineer @ Google" },
            { id: 3, name: "Mentor 3", job: "Data Scientist @ Facebook" },
            { id: 4, name: "Mentor 4", job: "Machine Learning Engineer @ OpenAI" },
            { id: 5, name: "Mentor 5", job: "Backend Developer @ Amazon" },
            { id: 6, name: "Mentor 6", job: "Frontend Developer @ Microsoft" },
            { id: 7, name: "Mentor 7", job: "Mobile Developer @ Uber" },
            { id: 8, name: "Mentor 8", job: "DevOps Engineer @ Netflix" },
        ];
        setMentorProfiles(mockProfiles);
    }, []);

    return (
        <div>
            <LogggedNavbar />
            <div className="pt-40 px-5 pb-20"> 
                <h1 className="text-2xl font-bold">Welcome, {userName}!</h1>
                <h2 className="text-xl mt-4">Start Connecting</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                    {mentorProfiles.map((mentor) => (
                        <div 
                            key={mentor.id} 
                            className="border border-gray-300 p-4 rounded-lg shadow-sm"
                        >
                            <h3 className="text-lg font-semibold">{mentor.name}</h3>
                            <p className="text-sm text-gray-600">{mentor.job}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MenteeDashboard;

