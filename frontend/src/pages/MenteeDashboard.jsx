import React, { useEffect, useState } from "react";
import LogggedNavbar from "../components/LogggedNavbar";
import Footer from "../components/Footer";
import MentorProfileCard from "../components/MentorProfileCard";

function MenteeDashboard() {
    const [userName, setUserName] = useState("");
    const [mentorProfiles, setMentorProfiles] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState(null);

    useEffect(() => {
        const storedName = localStorage.getItem("userName") || "Mentee";
        setUserName(storedName);

        const mockProfiles = [
            { id: 1, name: "Mentor 1", job: "Investment Banker @ Chase", bio: "Experienced investment banker...", careerInterest: "Finance" },
            { id: 2, name: "Mentor 2", job: "Software Engineer @ Google", bio: "Loves coding and solving problems...", careerInterest: "Software Engineering" },
            { id: 3, name: "Mentor 3", job: "Data Scientist @ Facebook", bio: "Passionate about data and insights...", careerInterest: "Data Science" },
            { id: 4, name: "Mentor 4", job: "Machine Learning Engineer @ OpenAI", bio: "Specializes in AI/ML...", careerInterest: "Machine Learning" },
            { id: 5, name: "Mentor 5", job: "Backend Developer @ Amazon", bio: "Focused on scalable backend systems...", careerInterest: "Backend Development" },
            { id: 6, name: "Mentor 6", job: "Frontend Developer @ Microsoft", bio: "UI/UX enthusiast...", careerInterest: "Frontend Development" },
            { id: 7, name: "Mentor 7", job: "Mobile Developer @ Uber", bio: "Mobile app developer with experience in iOS and Android...", careerInterest: "Mobile Development" },
            { id: 8, name: "Mentor 8", job: "DevOps Engineer @ Netflix", bio: "Expert in CI/CD and infrastructure...", careerInterest: "DevOps" },
        ];
        setMentorProfiles(mockProfiles);
    }, []);

    const handleProfileClick = (mentor) => {
        setSelectedMentor(mentor);
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    };

    const handleCloseCard = () => {
        setSelectedMentor(null);
        document.body.style.overflow = "auto"; // Re-enable background scrolling
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
                        className="fixed inset-0 z-50 flex items-center justify-center" // Added z-50 to ensure the modal is on top
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }} // Solid background color for the overlay
                        aria-modal="true"
                        role="dialog"
                    >
                        <div className="relative bg-white p-6 rounded-lg shadow-lg animate-fade-in">
                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                onClick={handleCloseCard}
                                aria-label="Close mentor profile"
                            >
                                Close
                            </button>
                            <MentorProfileCard
                                name={selectedMentor.name}
                                jobTitle={selectedMentor.job}
                                bio={selectedMentor.bio}
                                careerInterest={selectedMentor.careerInterest}
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
