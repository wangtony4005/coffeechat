import React, { useEffect, useState } from "react";
import LogggedNavbar from "../components/LogggedNavbar";
import Footer from "../components/Footer";
import ProfileCard from "../components/ProfileCard";

function MenteeDashboard() {
    const [userName, setUserName] = useState("");
    const [mentorProfiles, setMentorProfiles] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState(null);

    useEffect(() => {
        const storedName = localStorage.getItem("userName") || "Mentee";
        setUserName(storedName);

        const mockProfiles = [
            { id: 1, name: "Mentor 1", job: "Investment Banker @ Chase", location: "New York, NY", bio: "Experienced investment banker..." },
            { id: 2, name: "Mentor 2", job: "Software Engineer @ Google", location: "Mountain View, CA", bio: "Loves coding and solving problems..." },
            { id: 3, name: "Mentor 3", job: "Data Scientist @ Facebook", location: "Menlo Park, CA", bio: "Passionate about data and insights..." },
            { id: 4, name: "Mentor 4", job: "Machine Learning Engineer @ OpenAI", location: "San Francisco, CA", bio: "Specializes in AI/ML..." },
            { id: 5, name: "Mentor 5", job: "Backend Developer @ Amazon", location: "Seattle, WA", bio: "Focused on scalable backend systems..." },
            { id: 6, name: "Mentor 6", job: "Frontend Developer @ Microsoft", location: "Redmond, WA", bio: "UI/UX enthusiast..." },
            { id: 7, name: "Mentor 7", job: "Mobile Developer @ Uber", location: "San Francisco, CA", bio: "Mobile app developer with experience in iOS and Android..." },
            { id: 8, name: "Mentor 8", job: "DevOps Engineer @ Netflix", location: "Los Gatos, CA", bio: "Expert in CI/CD and infrastructure..." },
        ];
        setMentorProfiles(mockProfiles);
    }, []);

    const handleProfileClick = (mentor) => {
        setSelectedMentor(mentor);
        document.body.style.overflow = "hidden"; 
    };

    const handleCloseCard = () => {
        setSelectedMentor(null);
        document.body.style.overflow = "auto"; 
    };

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
                            className="border border-gray-300 p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleProfileClick(mentor)}
                        >
                            <h3 className="text-lg font-semibold">{mentor.name}</h3>
                            <p className="text-sm text-gray-600">{mentor.job}</p>
                        </div>
                    ))}
                </div>

                {selectedMentor && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
                        aria-modal="true"
                        role="dialog"
                    >
                        <div className="relative bg-white p-6 rounded-lg shadow-lg animate-fade-in">
                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                                onClick={handleCloseCard}
                                aria-label="Close mentor profile"
                            >
                                &times; 
                            </button>
                            <ProfileCard
                                name={selectedMentor.name}
                                jobTitle={selectedMentor.job}
                                location={selectedMentor.location}
                                bio={selectedMentor.bio}
                            />
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default MenteeDashboard;
