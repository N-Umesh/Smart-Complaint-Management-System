import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/profile");
      }, 800);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Signup failed"
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
              <span className="text-3xl">🏙️</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">
              Create Account
            </h1>

            <p className="text-gray-300 mt-2">
              Join us and help make your city better
            </p>

          </div>

          {/* Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

            <form onSubmit={handleSignup}>

              {/* Name */}
              <div className="mb-4">

                <label className="block text-white text-sm font-medium mb-2">
                  Full Name
                </label>

                <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4">

                  <span>👤</span>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-transparent outline-none text-white placeholder-gray-400 px-3 py-3"
                  />

                </div>

              </div>

              {/* Email */}
              <div className="mb-4">

                <label className="block text-white text-sm font-medium mb-2">
                  Email Address
                </label>

                <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4">

                  <span>✉️</span>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent outline-none text-white placeholder-gray-400 px-3 py-3"
                  />

                </div>

              </div>

              {/* Password */}
              <div className="mb-4">

                <label className="block text-white text-sm font-medium mb-2">
                  Password
                </label>

                <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4">

                  <span>🔒</span>

                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent outline-none text-white placeholder-gray-400 px-3 py-3"
                  />

                </div>

              </div>

              {/* Confirm Password */}
              <div className="mb-6">

                <label className="block text-white text-sm font-medium mb-2">
                  Confirm Password
                </label>

                <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4">

                  <span>🔐</span>

                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                    className="w-full bg-transparent outline-none text-white placeholder-gray-400 px-3 py-3"
                  />

                </div>

              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/30"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>

            {/* Message */}
            {message && (
              <p className="text-center text-yellow-300 text-sm mt-4">
                {message}
              </p>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">

              <div className="h-px bg-white/20 flex-1" />

              <span className="text-gray-400 text-sm">
                OR
              </span>

              <div className="h-px bg-white/20 flex-1" />

            </div>

            {/* Login */}
            <p className="text-center text-gray-300 text-sm">

              Already have an account?

              <Link
                to="/login"
                className="text-blue-300 font-semibold hover:text-blue-200 ml-1"
              >
                Login
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

        </div>

      </div>

    </div>
  );
};

export default SignupPage;