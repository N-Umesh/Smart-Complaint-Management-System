import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
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
          email: email.trim().toLowerCase(),
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "========== ADMIN LOGIN RESPONSE =========="
      );

      console.log("Response:", response.data);

      const user = response.data.user;

      console.log("Admin email:", user?.email);
      console.log("Admin role:", user?.role);

      // Check admin role
      if (user?.role !== "admin") {
        setError(
          "Access denied. This account is not an admin."
        );

        // Logout non-admin account
        try {
          await axios.post(
            "http://localhost:4000/api/auth/logout",
            {},
            {
              withCredentials: true,
            }
          );
        } catch (logoutError) {
          console.log(
            "Logout error:",
            logoutError
          );
        }

        return;
      }

      console.log(
        "ADMIN LOGIN SUCCESS"
      );

      navigate(
        "/admin-dashboard"
      );

    } catch (error) {
      console.error(
        "========== ADMIN LOGIN ERROR =========="
      );

      console.error(error);

      if (error.response) {
        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Server response:",
          error.response.data
        );

        setError(
          error.response.data?.message ||
            "Admin login failed"
        );

      } else if (error.request) {

        console.error(
          "No response from server:",
          error.request
        );

        setError(
          "Cannot connect to server. Make sure backend is running on port 4000."
        );

      } else {

        setError(
          error.message ||
            "Admin login failed"
        );
      }

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
                🛡️
              </span>

            </div>

            <h1 className="text-3xl md:text-4xl font-bold">
              Administrator
            </h1>

            <p className="text-gray-300 mt-2">
              Smart City Complaint Management
            </p>

          </div>


          {/* Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">


            <h2 className="text-xl font-semibold text-white mb-2">
              Admin Login
            </h2>

            <p className="text-gray-300 text-sm mb-6">
              Sign in to manage city complaints
            </p>


            {/* Error */}
            {error && (
              <div className="bg-red-500/20 border border-red-400/30 text-red-200 p-3 rounded-xl mb-5 text-sm">
                ⚠️ {error}
              </div>
            )}


            {/* Form */}
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >


              {/* Email */}
              <div>

                <label
                  htmlFor="admin-email"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Admin Email
                </label>

                <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4">

                  <span>
                    ✉️
                  </span>

                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="admin@smartcity.com"
                    required
                    className="w-full bg-transparent outline-none text-white placeholder-gray-400 px-3 py-3"
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <label
                  htmlFor="admin-password"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Password
                </label>

                <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4">

                  <span>
                    🔒
                  </span>

                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter admin password"
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
                  ? "Signing in..."
                  : "Sign In as Admin"}

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


            {/* User Login */}
            <p className="text-center text-gray-300 text-sm">

              Are you a citizen?

              <Link
                to="/login"
                className="text-blue-300 font-semibold hover:text-blue-200 ml-1"
              >
                User Login
              </Link>

            </p>


            {/* Sign Up */}
            <p className="text-center text-gray-400 text-sm mt-4">

              Don't have an account?

              <Link
                to="/signup"
                className="text-blue-300 font-semibold hover:text-blue-200 ml-1"
              >
                Sign Up
              </Link>

            </p>

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


          {/* Security */}
          <p className="text-center text-gray-400 text-xs mt-5">
            🔒 Authorized administrators only
          </p>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;