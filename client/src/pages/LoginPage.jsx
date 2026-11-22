import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "LOGIN RESPONSE:",
        response.data
      );

      // Citizen login → Home
      navigate("/");

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/bakcground----.jpg')] bg-cover bg-center" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center mb-7 text-white">

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-lg mb-4">
              <span className="text-3xl">
                🏙️
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome Back
            </h1>

            <p className="text-gray-300 mt-2">
              Login to your Smart City account
            </p>

          </div>


          {/* Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-xl font-semibold text-white mb-6">
              Login
            </h2>


            {/* Error */}
            {error && (
              <div className="bg-red-500/20 border border-red-400/30 text-red-200 p-3 rounded-xl mb-5 text-sm">
                {error}
              </div>
            )}


            {/* Form */}
            <form onSubmit={handleLogin}>

              {/* Email */}
              <div className="mb-5">

                <label className="block text-white text-sm font-medium mb-2">
                  Email Address
                </label>

                <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4">

                  <span>
                    ✉️
                  </span>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="w-full bg-transparent outline-none text-white placeholder-gray-400 px-3 py-3"
                  />

                </div>

              </div>


              {/* Password */}
              <div className="mb-6">

                <label className="block text-white text-sm font-medium mb-2">
                  Password
                </label>

                <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4">

                  <span>
                    🔒
                  </span>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    className="w-full bg-transparent outline-none text-white placeholder-gray-400 px-3 py-3"
                  />

                </div>

              </div>


              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/30"
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </form>


            {/* Divider */}
            <div className="flex items-center gap-3 my-6">

              <div className="h-px bg-white/20 flex-1" />

              <span className="text-gray-400 text-sm">
                OR
              </span>

              <div className="h-px bg-white/20 flex-1" />

            </div>


            {/* Sign Up */}
            <p className="text-center text-gray-300 text-sm">

              Don't have an account?

              <Link
                to="/signup"
                className="text-blue-300 font-semibold hover:text-blue-200 ml-1"
              >
                Sign Up
              </Link>

            </p>


            {/* Admin Login */}
            <div className="mt-5 text-center">

              <Link
                to="/admin-login"
                className="text-gray-300 hover:text-white text-sm font-medium"
              >
                🛡️ Admin Login
              </Link>

            </div>

          </div>


          {/* Back */}
          <div className="text-center mt-6">

            <Link
              to="/"
              className="text-gray-300 hover:text-white text-sm"
            >
              ← Back to Home
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;