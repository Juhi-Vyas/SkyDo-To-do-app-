import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/authSlice";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const Auth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }
    dispatch(login({ name, email }));
  };

  const handleLogout = () => {
    dispatch(logout());
    setName("");
    setEmail("");
  };

  return (
    <div className="p-4 text-center">
      {isAuthenticated ? (
        <div>
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-md gap-3">
          <p className="text-lg font-semibold text-center sm:text-left">Welcome, {user.name}!</p>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md transition-all sm:w-auto w-full">
            Logout
          </button>
          </div>

          <TaskInput/>
          <TaskList/>

          
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-60"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-60"
          />
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
