import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Faqs from "./pages/Faqs";
import Homepage from "./pages/Homepage";
import Find from "./pages/Find";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faqs" element={<Faqs />} />

        <Route path="/homepage" element={<Homepage />} />
        <Route path="/find" element={<Find />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
