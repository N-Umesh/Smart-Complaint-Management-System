import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/check",
          {
            withCredentials: true,
          }
        );

        const userData = response.data.user;

        setUser(userData);

        setFormData({
          name: userData?.name || "",
          email: userData?.email || "",
          bio: userData?.bio || "",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.put(
        "http://localhost:4000/api/auth/update-profile",
        {
          name: formData.name,
          email: formData.email,
          bio: formData.bio,
        },
        {
          withCredentials: true,
        }
      );

      setUser(response.data.user || formData);
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to update profile."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Account Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your profile and account preferences
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[600px]">

          {/* LEFT SIDEBAR */}
          <aside className="w-full md:w-72 bg-gray-50 border-r border-gray-200">

            {/* User mini profile */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="min-w-0">
                  <h2 className="font-bold text-gray-800 truncate">
                    {user?.name || "User"}
                  </h2>

                  <p className="text-sm text-gray-500 truncate">
                    {user?.email || ""}
                  </p>
                </div>

              </div>
            </div>

            {/* Sidebar Menu */}
            <div className="p-4 space-y-2">

              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition ${
                  activeTab === "profile"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                <span className="text-xl">👤</span>

                <div>
                  <p className="font-semibold">My Profile</p>
                  <p
                    className={`text-xs ${
                      activeTab === "profile"
                        ? "text-blue-100"
                        : "text-gray-400"
                    }`}
                  >
                    View your information
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("edit")}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition ${
                  activeTab === "edit"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                <span className="text-xl">✏️</span>

                <div>
                  <p className="font-semibold">Edit Profile</p>
                  <p
                    className={`text-xs ${
                      activeTab === "edit"
                        ? "text-blue-100"
                        : "text-gray-400"
                    }`}
                  >
                    Update your details
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition ${
                  activeTab === "security"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                <span className="text-xl">🔒</span>

                <div>
                  <p className="font-semibold">Security</p>
                  <p
                    className={`text-xs ${
                      activeTab === "security"
                        ? "text-blue-100"
                        : "text-gray-400"
                    }`}
                  >
                    Manage account security
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition ${
                  activeTab === "notifications"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                <span className="text-xl">🔔</span>

                <div>
                  <p className="font-semibold">Notifications</p>
                  <p
                    className={`text-xs ${
                      activeTab === "notifications"
                        ? "text-blue-100"
                        : "text-gray-400"
                    }`}
                  >
                    Notification preferences
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition ${
                  activeTab === "settings"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                <span className="text-xl">⚙️</span>

                <div>
                  <p className="font-semibold">Settings</p>
                  <p
                    className={`text-xs ${
                      activeTab === "settings"
                        ? "text-blue-100"
                        : "text-gray-400"
                    }`}
                  >
                    Account preferences
                  </p>
                </div>
              </button>

            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <main className="flex-1 p-6 md:p-10">

            {/* MY PROFILE */}
            {activeTab === "profile" && (
              <div>
                <div className="border-b pb-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    My Profile
                  </h2>

                  <p className="text-gray-500 mt-1">
                    View your personal account information.
                  </p>
                </div>

                <div className="flex items-center gap-6 mb-8">

                  <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {user?.name || "User"}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Citizen
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-sm text-gray-400">
                      Full Name
                    </p>

                    <p className="text-lg font-semibold text-gray-800 mt-1">
                      {user?.name || "Not available"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-sm text-gray-400">
                      Email Address
                    </p>

                    <p className="text-lg font-semibold text-gray-800 mt-1 break-all">
                      {user?.email || "Not available"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 md:col-span-2">
                    <p className="text-sm text-gray-400">
                      About
                    </p>

                    <p className="text-gray-700 mt-2">
                      {user?.bio || "No bio added yet."}
                    </p>
                  </div>

                </div>
              </div>
            )}

            {/* EDIT PROFILE */}
            {activeTab === "edit" && (
              <div>
                <div className="border-b pb-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Edit Profile
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Update your personal information.
                  </p>
                </div>

                <form
                  onSubmit={handleUpdateProfile}
                  className="max-w-2xl space-y-6"
                >

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio
                    </label>

                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="5"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  {message && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold transition"
                  >
                    Save Changes
                  </button>

                </form>
              </div>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
              <div>
                <div className="border-b pb-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Security
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Manage your account security.
                  </p>
                </div>

                <div className="max-w-2xl space-y-4">

                  <div className="border rounded-xl p-5">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">🔑</span>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Password
                        </h3>

                        <p className="text-sm text-gray-500">
                          Change your account password.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-xl p-5">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">🛡️</span>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Account Protection
                        </h3>

                        <p className="text-sm text-gray-500">
                          Your account is protected using secure authentication.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div>
                <div className="border-b pb-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Notifications
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Manage how you receive complaint updates.
                  </p>
                </div>

                <div className="max-w-2xl space-y-4">

                  <div className="flex items-center justify-between border rounded-xl p-5">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Complaint Updates
                      </h3>

                      <p className="text-sm text-gray-500">
                        Receive updates when your complaint status changes.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5"
                    />
                  </div>

                  <div className="flex items-center justify-between border rounded-xl p-5">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        System Notifications
                      </h3>

                      <p className="text-sm text-gray-500">
                        Receive important SmartCity notifications.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5"
                    />
                  </div>

                </div>
              </div>
            )}

            {/* SETTINGS */}
            {activeTab === "settings" && (
              <div>
                <div className="border-b pb-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Settings
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Manage your account preferences.
                  </p>
                </div>

                <div className="max-w-2xl space-y-4">

                  <div className="border rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800">
                      Account Type
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Citizen account
                    </p>
                  </div>

                  <div className="border rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800">
                      SmartCity Account
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Your account allows you to report and track city complaints.
                    </p>
                  </div>

                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;