import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import api from "../api/axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState({
    error: "",
    success: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMsg({error: "", success: ""});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      setFormData({
        email: "",
        password: "",
      });
      setMsg({error: "", success: res.data.message});
      //save token to local storage
      localStorage.setItem("token", res.data.token);
      //navigate to home page
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setMsg({
        error: err.response?.data?.message || "An error occurred. Please try again.",   
        success: "",
      });
      setFormData({
        email: "",
        password: "",
      });
    }
  };


  return ( <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
            Login To Your Account
          </h2>
          {msg.error && (
            <div className="mb-4 text-sm text-center text-red-500">{msg.error}</div>
          )}
          {msg.success && (
            <div className="mb-4 text-sm text-center text-green-500">{msg.success}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border border-orange-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
                className="w-full px-3 py-2 border border-orange-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                className="text-orange-500 hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>);
};

export default Login;
