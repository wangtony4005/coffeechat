import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Faqs from "./pages/Faqs";
import ChatPage from "./pages/ChatPage";
import Find from "./pages/Find";
import { Navigate } from "react-router-dom";
import MentorProfile from "./pages/MentorProfile";
import MenteeProfile from "./pages/MenteeProfile";
import MenteeDashboard from "./pages/MenteeDashboard";
import MentorUpdateProfile from "./pages/MentorUpdateProfile";
import Shop from "./pages/Shop";
import MentorSearch from "./pages/MentorSearch";

import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    if (location.state) {
      return location.state;
    } else if (localStorage.getItem("user_data")) {
      console.log(
        "User data from local storage: ",
        localStorage.getItem("user_data")
      );
      return JSON.parse(localStorage.getItem("user_data"));
    } else {
      return null;
    }
  });
  console.log(user);
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
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route
          path="/chatpage"
          element={<ChatPage user={user} setUser={setUser} />}
        />
        <Route path="*" element={<Navigate to="/" />} />

        <Route
          path="/find"
          element={
            <ProtectedRoute>
              <Find />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={<MentorProfile user={user} setUser={setUser} />}
        />
        <Route
          path="/mentee-profile"
          element={<MenteeProfile user={user} setUser={setUser} />}
        />
        <Route path="/mentee-dashboard" element={<MenteeDashboard />} />
        <Route
          path="/mentor-update-profile"
          element={<MentorUpdateProfile user={user} setUser={setUser} />}
        />

        <Route
          path="mentor-search"
          element={
            <ProtectedRoute>
              <MentorSearch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
