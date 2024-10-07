import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Faqs from "./pages/Faqs";
import ChatPage from "./pages/ChatPage"
import Homepage from "./pages/Homepage";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
