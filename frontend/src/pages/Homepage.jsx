import { useEffect } from "react";

function Homepage() {
  useEffect(() => {
    console.log("Homepage");
  }, []);
  return (
    <div className="bg-black blur-md w-screen h-screen flex justify-center items-center">
      Homepage
    </div>
  );
}

export default Homepage;
