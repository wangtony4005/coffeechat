import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Faqs from "./pages/Faqs";
import Homepage from "./pages/Homepage";
import Find from "./pages/Find";
import MentorProfile from "./pages/MentorProfile"; 
import MenteeProfile from "./pages/MenteeProfile"; 

import "./App.css";

function App() {
  function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        navigate("/", { replace: true });
      }
    }, [token, navigate]);

    if (!token) {
      return null;
    }

    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faqs" element={<Faqs />} />

        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/find"
          element={
            <ProtectedRoute>
              <Find />
            </ProtectedRoute>
          }
        />
        <Route path="/mentor-profile" element={<MentorProfile />} />
        <Route path="/mentee-profile" element={<MenteeProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
