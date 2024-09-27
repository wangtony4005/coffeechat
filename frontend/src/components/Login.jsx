import { useState } from "react";

function Login({ onClose }) {
  const [reset, setReset] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [login, setLogin] = useState(true);

  const backToLogin = () => {
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
      <div className="bg-base-color p-8 rounded-md shadow-lg">
        {login && (
          <>
            <h2 className="text-2xl mb-4">Login</h2>
            <input
              placeholder="Username"
              className="border border-gray-300 p-2 rounded w-full"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-2 rounded w-full mt-4"
            />
            <button className="mt-4 bg-gray-500 w-full text-white py-2 px-4 rounded">
              Login
            </button>
          </>
        )}
        {reset && (
          <>
            <h2 className="text-2xl mb-4">Reset Password</h2>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-2 rounded w-full"
            />
            <button className="mt-4 bg-gray-500 w-full text-white py-2 px-4 rounded">
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
              placeholder="Username"
              className="border border-gray-300 p-2 rounded w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-2 rounded w-full mt-4"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-2 rounded w-full mt-4"
            />
            <button className="mt-4 bg-gray-500 w-full text-white py-2 px-4 rounded">
              Create Account
            </button>
            <button
              onClick={backToLogin}
              className="mt-4  w-full text-black py-2 px-4 rounded"
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
