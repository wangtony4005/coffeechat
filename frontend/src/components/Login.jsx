import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ onClose }) {
  const [reset, setReset] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [login, setLogin] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setMessage("");
    setError("");
    setUserName("");
    setPassword("");
    setError("");
    setEmail("");
    setFirstName("");
    setLastName("");
  }, [login, reset, createAccount]);

  const signUp = async (e) => {
    setError("");
    setMessage("");
    e.preventDefault();

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      userName.trim() === "" ||
      password.trim() === ""
    ) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/users/add_user",
        {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password,
        }
      );
      console.log("here");
      setMessage("Account created successfully");
    } catch (err) {
      setError(
        "Something went wrong while trying to create your account. Please try again"
      );
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    console.log("here");
    try {
      const response = await axios.get("http://127.0.0.1:5000/users/reset", {
        email: email,
      });
      setMessage(
        "If your email exists, you will receive an email to reset your password"
      );
    } catch (err) {
      setError(
        "Something went wrong while trying to reset your password. Please try again"
      );
    }
  };

  const resetValues = () => {
    // setReset(false);
    // setLogin(true);
    // setCreateAccount(false);
    onClose();
  };

  const handleSignIn = async (e) => {
    resetValues();

    // setError("");
    // setMessage("");
    // e.preventDefault();

    console.log(userName, password);

    if (userName.trim() === "" || password.trim() === "") {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios
        .post("http://localhost:5000/users/signin", {
          username: userName,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            onClose();
          } else {
            setError("Invalid credentials");
          }
        })
        .catch((err) => {
          console.log(err);
          setError("Invalid credentials");
        });
    } catch (err) {
      console.log(err);
      setMessage("You're in");
    }
  };

  const backToLogin = (e) => {
    e.preventDefault();
    console.log("here");
    setLogin(true);
    setReset(false);
    setCreateAccount(false);
  };

  const decideRender = (e) => {
    const text = e.target.innerText;
    if (text.includes("Forgot your password?")) {
      setReset(true);
      setLogin(false);
      setCreateAccount(false);
    } else if (text.includes("Create account")) {
      setCreateAccount(true);
      setLogin(false);
      setReset(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="bg-base-color p-8 rounded-md shadow-lg w-[500px]">
        {login && (
          <>
            <h2 className="text-2xl mb-4">Login</h2>
            <input
              placeholder="Username"
              className="border border-gray-300 p-2 rounded w-full"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-2 rounded w-full mt-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={(e) => handleSignIn(e)}
              className="mt-4 bg-gray-500 w-full text-white py-2 px-4 rounded"
            >
              Login
            </button>
          </>
        )}
        {reset && (
          <>
            <h2 className="text-2xl mb-4">Reset Password</h2>
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={(e) => resetPassword(e)}
              className="mt-4 bg-gray-500 w-full text-white py-2 px-4 rounded"
            >
              Reset
            </button>
            <button
              onClick={backToLogin}
              className="mt-4  w-full text-black py-2 px-4 rounded"
            >
              Back to sign in
            </button>
          </>
        )}
        {createAccount && (
          <>
            <h2 className="text-2xl mb-4">Create Account</h2>
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-300 p-2 rounded w-full mt-4"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 p-2 rounded w-full mt-4"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              placeholder="Username"
              value={userName}
              className="border border-gray-300 p-2 rounded w-full mt-4"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="border border-gray-300 p-2 rounded w-full mt-4"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-2 rounded w-full mt-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-300 p-2 rounded w-full mt-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={(e) => signUp(e)}
              className="mt-4 bg-gray-500 w-full text-white py-2 px-4 rounded cursor-pointer"
            >
              Create Account
            </button>
            <button
              onClick={(e) => backToLogin(e)}
              className="mt-4  w-full text-black py-2 px-4 rounded cursor-pointer"
            >
              Back to sign in
            </button>
          </>
        )}
        {(login || createAccount) && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            <p onClick={decideRender} className="cursor-pointer">
              Forgot your password?
            </p>
            <p onClick={decideRender} className="cursor-pointer">
              Create account
            </p>
          </div>
        )}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {message && (
          <p className="text-green-500 mt-4 text-center">{message}</p>
        )}
        {/* <div className="flex justify-center items-center space-x-2 mt-4">
          <p onClick={decideRender} className="cursor-pointer">
            Forgot your password?
          </p>
          <p onClick={decideRender} className="cursor-pointer">
            Create account
          </p>
        </div> */}
        <button
          onClick={onClose}
          className="mt-4 text-black flex items-center justify-center w-full py-2 px-4 rounded"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default Login;
