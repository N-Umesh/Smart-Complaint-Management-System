import React, { useState } from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [complaintUpdates, setComplaintUpdates] = useState(true);
  const [cityAnnouncements, setCityAnnouncements] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  const [language, setLanguage] = useState("English");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const Toggle = ({ enabled, setEnabled }) => {
    return (
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`relative w-12 h-6 rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition ${
            enabled ? "left-7" : "left-1"
          }`}
        ></span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white">

        <div className="max-w-7xl mx-auto px-6 py-14">

          {/* Navigation */}
          <div className="flex flex-wrap gap-3 mb-7">

            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              🏠 Home
            </Link>

            <Link
              to="/profile"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"
            >
              ← Profile
            </Link>

          </div>

          <p className="text-blue-300 font-semibold mb-2">
            ACCOUNT PREFERENCES
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Settings
          </h1>

          <p className="text-slate-300 mt-4 max-w-2xl">
            Manage your account preferences, notifications and privacy.
          </p>

        </div>

      </section>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Success Message */}
        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl font-semibold">
            ✓ Settings saved successfully.
          </div>
        )}

        <div className="space-y-6">

          {/* General Settings */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                ⚙️ General
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Manage your basic application preferences.
              </p>
            </div>

            <div className="p-6 space-y-6">

              {/* Language */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Language
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Select your preferred language.
                  </p>
                </div>

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="sm:w-48 px-4 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option>English</option>
                  <option>Kannada</option>
                  <option>Hindi</option>
                </select>

              </div>

            </div>

          </section>

          {/* Notification Settings */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                🔔 Notifications
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Choose which notifications you want to receive.
              </p>
            </div>

            <div className="divide-y divide-slate-100">

              {/* Email */}
              <div className="p-6 flex items-center justify-between gap-5">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Email Notifications
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Receive important updates through email.
                  </p>
                </div>

                <Toggle
                  enabled={emailNotifications}
                  setEnabled={setEmailNotifications}
                />

              </div>

              {/* Complaint Updates */}
              <div className="p-6 flex items-center justify-between gap-5">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Complaint Updates
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Get notified when your complaint status changes.
                  </p>
                </div>

                <Toggle
                  enabled={complaintUpdates}
                  setEnabled={setComplaintUpdates}
                />

              </div>

              {/* City Announcements */}
              <div className="p-6 flex items-center justify-between gap-5">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    City Announcements
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Receive important announcements from the city.
                  </p>
                </div>

                <Toggle
                  enabled={cityAnnouncements}
                  setEnabled={setCityAnnouncements}
                />

              </div>

            </div>

          </section>

          {/* Privacy */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="p-6 border-b border-slate-200">

              <h2 className="text-xl font-bold text-slate-900">
                🔒 Privacy
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Control how your profile information is displayed.
              </p>

            </div>

            <div className="p-6">

              <div className="flex items-center justify-between gap-5">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Public Profile
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Allow your basic profile information to be visible to authorized users.
                  </p>
                </div>

                <Toggle
                  enabled={showProfile}
                  setEnabled={setShowProfile}
                />

              </div>

            </div>

          </section>

          {/* Security */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="p-6 border-b border-slate-200">

              <h2 className="text-xl font-bold text-slate-900">
                🛡️ Security
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Manage your account security.
              </p>

            </div>

            <div className="p-6">

              <Link
                to="/profile"
                className="inline-flex items-center gap-2 px-5 py-3 border border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition"
              >
                🔑 Change Password
              </Link>

            </div>

          </section>

          {/* Account */}
          <section className="bg-white border border-red-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="p-6 border-b border-red-100">

              <h2 className="text-xl font-bold text-red-700">
                ⚠️ Account
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Account-related actions.
              </p>

            </div>

            <div className="p-6 flex flex-col sm:flex-row gap-3">

              <button
                onClick={() => alert("Logout functionality will be connected next.")}
                className="px-5 py-3 border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition"
              >
                🚪 Logout
              </button>

              <button
                onClick={() =>
                  alert("Account deletion will be connected to the backend.")
                }
                className="px-5 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
              >
                Delete Account
              </button>

            </div>

          </section>

        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">

          <button
            onClick={handleSave}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
          >
            Save Changes
          </button>

        </div>

      </main>

    </div>
  );
};

export default Settings;