import React, { useState } from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: "🔧",
      title: "Complaint status updated",
      message:
        "Your complaint CMP-1001 has been moved to In Progress.",
      time: "10 minutes ago",
      type: "Complaint Update",
      unread: true,
    },
    {
      id: 2,
      icon: "✅",
      title: "Complaint resolved",
      message:
        "Your complaint CMP-1003 regarding garbage collection has been resolved.",
      time: "Yesterday",
      type: "Resolved",
      unread: true,
    },
    {
      id: 3,
      icon: "📢",
      title: "Important city announcement",
      message:
        "Scheduled road maintenance will be carried out in your area.",
      time: "2 days ago",
      type: "Announcement",
      unread: false,
    },
    {
      id: 4,
      icon: "📋",
      title: "Complaint received",
      message:
        "Your complaint CMP-1001 has been successfully received.",
      time: "6 days ago",
      type: "Complaint Update",
      unread: false,
    },
    {
      id: 5,
      icon: "🏙️",
      title: "SmartCity update",
      message:
        "New services and improvements are now available in the SmartCity portal.",
      time: "1 week ago",
      type: "System",
      unread: false,
    },
  ]);

  const [filter, setFilter] = useState("All");

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "Unread") {
      return notification.unread;
    }

    if (filter === "Read") {
      return !notification.unread;
    }

    return true;
  });

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white">

        <div className="max-w-7xl mx-auto px-6 py-14">

          {/* Navigation Buttons */}
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
            SMARTCITY UPDATES
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Notifications
              </h1>

              <p className="text-slate-300 mt-4">
                Stay updated about your complaints and city services.
              </p>
            </div>

            {unreadCount > 0 && (
              <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3">
                <span className="text-2xl font-bold">
                  {unreadCount}
                </span>

                <span className="text-slate-300 ml-2">
                  unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </span>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Controls */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* Filter */}
            <div className="flex flex-wrap gap-2">

              {["All", "Unread", "Read"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition ${
                    filter === item
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">

              <button
                onClick={markAllAsRead}
                className="px-4 py-2.5 rounded-xl border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition"
              >
                ✓ Mark All Read
              </button>

              <button
                onClick={clearAll}
                className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition"
              >
                Clear All
              </button>

            </div>

          </div>

        </div>

        {/* Notifications */}
        <div className="space-y-4">

          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`bg-white border rounded-2xl p-5 cursor-pointer transition hover:shadow-md ${
                  notification.unread
                    ? "border-blue-200 bg-blue-50/30"
                    : "border-slate-200"
                }`}
              >

                <div className="flex gap-4">

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                      notification.unread
                        ? "bg-blue-100"
                        : "bg-slate-100"
                    }`}
                  >
                    {notification.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">

                      <div>
                        <div className="flex items-center gap-2">

                          <h2 className="font-bold text-slate-900">
                            {notification.title}
                          </h2>

                          {notification.unread && (
                            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                          )}

                        </div>

                        <span className="inline-block mt-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                          {notification.type}
                        </span>
                      </div>

                      <span className="text-xs text-slate-400 whitespace-nowrap">
                        {notification.time}
                      </span>

                    </div>

                    <p className="text-slate-600 mt-3 leading-6">
                      {notification.message}
                    </p>

                    {notification.unread && (
                      <p className="text-xs text-blue-600 font-semibold mt-3">
                        Click to mark as read
                      </p>
                    )}

                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-14 text-center">

              <div className="text-6xl mb-5">
                🔔
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                No notifications
              </h2>

              <p className="text-slate-500 mt-2">
                You're all caught up!
              </p>

            </div>
          )}

        </div>

        {/* Bottom Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h2 className="text-2xl font-bold">
                Want to report an issue?
              </h2>

              <p className="text-blue-100 mt-2">
                Help improve your city by reporting civic problems.
              </p>
            </div>

            <Link
              to="/report-complaint"
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition text-center"
            >
              Report Complaint
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Notifications;