import { useEffect } from "react";
import LogggedNavbar from "../components/LogggedNavbar";

function Homepage() {
  useEffect(() => {
    console.log("Homepage");
  }, []);
  return (
    <main className="h-auto w-auto bg-stone-700">
      <LogggedNavbar />
      <div className="w-screen h-screen relative bg-stone-700">Homepage</div>
    </main>
  );
}

export default Homepage;
