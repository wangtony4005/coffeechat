import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LogggedNavbar from "../components/LogggedNavbar";

function Homepage() {
  const location = useLocation();
  const {user_data} = location.state || {}
  useEffect(() => {
    console.log("Homepage");
    console.log(user_data)
  }, []);
  // const firstName = user_data[1]
  // const lastName = user_data[2]
  // const username = user_data[3]
  // const email = user_data[5]
  // const role = user_data[6]

  // console.log(firstName, lastName, username, email, role)

  return (
    <main className="h-auto w-auto bg-stone-700">
      <LogggedNavbar />
      <div className="w-screen h-screen relative bg-stone-700">Homepage</div>
    </main>
  );
}

export default Homepage;
