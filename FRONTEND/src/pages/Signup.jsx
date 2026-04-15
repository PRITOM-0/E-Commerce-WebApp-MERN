import React from "react";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

const demoUser = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(demoUser);
  const [msg, setMsg] = useState({
    error: "",
    success: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMsg({error: "", success: ""});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const res = await api.post("/auth/signup", formData);
      setFormData(demoUser);
      setMsg({error: "", success: res.data.message});
    } catch (err) {
      setMsg({
        error: err.response?.data?.message || "An error occurred. Please try again.",
        success: "",
      });
      setFormData(demoUser);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-500">
            Create A New Account
          </h2>
          {msg.error && (
            <div className="mb-4 text-sm text-center text-red-500">{msg.error}</div>
          )}
          {msg.success && (
            <div className="mb-4 text-sm text-center text-green-500">{msg.success}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="w-full px-3 py-2 border border-green-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border border-green-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 border border-green-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
              type="submit"
            >
              Create Account
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                className="text-green-500 hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Signup;
