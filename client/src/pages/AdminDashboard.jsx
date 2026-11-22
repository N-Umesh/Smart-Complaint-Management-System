import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchComplaints = async (showLoader = false) => {
    try {
      if (showLoader) {
        setRefreshing(true);
      }

      const response = await axios.get(
        "http://localhost:4000/api/complaint/all",
        {
          withCredentials: true,
        }
      );

      setComplaints(response.data.complaints || []);
      setError("");
    } catch (err) {
      console.error("ADMIN COMPLAINT ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load complaints."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchComplaints(true);

    const interval = setInterval(() => {
      fetchComplaints(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      window.location.href = "/admin-login";
    } catch (error) {
      console.error("ADMIN LOGOUT ERROR:", error);
    }
  };

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const progressComplaints = complaints.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  const rejectedComplaints = complaints.filter(
    (item) => item.status === "Rejected"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071827] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>

          <p className="text-white mt-5 font-semibold">
            Loading administration dashboard...
          </p>

          <p className="text-slate-500 text-sm mt-1">
            Please wait
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fa]">

      {/* ================= SIDEBAR ================= */}

      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[250px] bg-[#071827] text-white flex-col z-40">

        {/* LOGO */}

        <div className="h-20 px-6 flex items-center border-b border-white/10">

          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            <span className="text-xl">
              🏙️
            </span>
          </div>

          <div className="ml-3">

            <h1 className="font-bold text-lg">
              Smart
              <span className="text-cyan-400">
                City
              </span>
            </h1>

            <p className="text-[10px] text-slate-500 uppercase tracking-widest">
              Admin Portal
            </p>

          </div>

        </div>

        {/* NAVIGATION */}

        <div className="px-4 py-6">

          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-3 mb-3">
            Management
          </p>

          <div className="space-y-2">

            {/* DASHBOARD */}

            <Link
              to="/admin-dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/10 text-cyan-300"
            >

              <span className="text-lg">
                ▦
              </span>

              <span className="font-semibold text-sm">
                Dashboard
              </span>

            </Link>

            {/* COMPLAINTS */}

            <Link
              to="/admin-dashboard/complaints"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition"
            >

              <span className="text-lg">
                📋
              </span>

              <span className="font-medium text-sm">
                Complaints
              </span>

              <span className="ml-auto text-xs bg-slate-800 px-2 py-1 rounded-full">
                {totalComplaints}
              </span>

            </Link>

          </div>

        </div>

        {/* SYSTEM STATUS */}

        <div className="mt-auto px-5 pb-5">

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">

            <div className="flex items-center gap-2">

              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>

              <span className="text-sm text-white font-medium">
                System Online
              </span>

            </div>

            <p className="text-xs text-slate-500 mt-2">
              Complaint service is running normally.
            </p>

          </div>

        </div>

        {/* LOGOUT */}

        <div className="px-5 pb-6">

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-400/10 text-red-300 hover:bg-red-500/20 transition"
          >

            <span>
              ↪
            </span>

            <span className="font-semibold text-sm">
              Admin Logout
            </span>

          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <div className="lg:ml-[250px]">

        {/* HEADER */}

        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">

          <div className="px-5 sm:px-8 h-20 flex items-center justify-between">

            {/* MOBILE LOGO */}

            <div className="flex items-center gap-3 lg:hidden">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                🏙️
              </div>

              <div>

                <h1 className="font-bold text-slate-900">
                  Smart
                  <span className="text-cyan-600">
                    City
                  </span>
                </h1>

                <p className="text-[9px] text-slate-400 uppercase tracking-widest">
                  Admin Portal
                </p>

              </div>

            </div>

            {/* DESKTOP TITLE */}

            <div className="hidden lg:block">

              <p className="text-xs font-bold uppercase tracking-widest text-cyan-600">
                Administration
              </p>

              <h2 className="text-xl font-bold text-slate-900">
                Dashboard Overview
              </h2>

            </div>

            {/* ADMIN */}

            <div className="flex items-center gap-4">

              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100">

                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>

                <span className="text-xs font-semibold text-emerald-700">
                  Online
                </span>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                  A
                </div>

                <div className="hidden sm:block">

                  <p className="text-sm font-semibold text-slate-800">
                    Administrator
                  </p>

                  <p className="text-xs text-slate-400">
                    System Admin
                  </p>

                </div>

              </div>

              {/* MOBILE LOGOUT */}

              <button
                onClick={handleLogout}
                className="lg:hidden w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-100"
              >
                ↪
              </button>

            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}

        <main className="px-5 sm:px-8 py-8">

          {/* PAGE TITLE */}

          <div className="mb-8">

            <p className="text-sm text-slate-500">
              Welcome back, Administrator
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Dashboard Overview
            </h1>

            <p className="text-slate-500 mt-2">
              Monitor citizen complaints and city service activity.
            </p>

          </div>

          {/* ERROR */}

          {error && (

            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  !
                </div>

                <div>

                  <p className="font-semibold text-red-700">
                    Unable to load complaints
                  </p>

                  <p className="text-sm text-red-600 mt-0.5">
                    {error}
                  </p>

                </div>

              </div>

            </div>

          )}

          {/* ================= STATISTICS ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">

            {/* TOTAL */}

            <div className="bg-[#071827] rounded-2xl p-5 text-white shadow-lg">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Total
                  </p>

                  <p className="text-3xl font-extrabold mt-3">
                    {totalComplaints}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center text-xl">
                  📊
                </div>

              </div>

              <p className="text-xs text-slate-500 mt-4">
                All submitted complaints
              </p>

            </div>

            {/* PENDING */}

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">

              <div className="flex justify-between">

                <div>

                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Pending
                  </p>

                  <p className="text-3xl font-extrabold text-slate-900 mt-3">
                    {pendingComplaints}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                  ⏳
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Awaiting administration
              </p>

            </div>

            {/* IN PROGRESS */}

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">

              <div className="flex justify-between">

                <div>

                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    In Progress
                  </p>

                  <p className="text-3xl font-extrabold text-slate-900 mt-3">
                    {progressComplaints}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                  ⚡
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Currently being handled
              </p>

            </div>

            {/* RESOLVED */}

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">

              <div className="flex justify-between">

                <div>

                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Resolved
                  </p>

                  <p className="text-3xl font-extrabold text-slate-900 mt-3">
                    {resolvedComplaints}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                  ✓
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Successfully completed
              </p>

            </div>

            {/* REJECTED */}

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">

              <div className="flex justify-between">

                <div>

                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Rejected
                  </p>

                  <p className="text-3xl font-extrabold text-slate-900 mt-3">
                    {rejectedComplaints}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl">
                  ×
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Rejected complaints
              </p>

            </div>

          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* COMPLAINT MANAGEMENT */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-2xl">
                  📋
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Complaint Management
                  </h2>

                  <p className="text-sm text-slate-500 mt-2 leading-6">
                    View all citizen complaints, search complaints,
                    filter by status and category, and update complaint
                    information.
                  </p>

                </div>

              </div>

              <Link
                to="/admin-dashboard/complaints"
                className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white text-sm font-semibold transition"
              >
                Manage Complaints
                <span>
                  →
                </span>
              </Link>

            </div>

            {/* SYSTEM STATUS */}

            <div className="bg-[#071827] rounded-2xl p-6 text-white">

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center text-2xl">
                  ⚡
                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    System Status
                  </h2>

                  <p className="text-sm text-slate-400 mt-2 leading-6">
                    The complaint management service is connected
                    and automatically refreshes complaint information.
                  </p>

                </div>

              </div>

              <div className="mt-6 flex items-center gap-3">

                <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>

                <span className="text-sm font-semibold text-emerald-400">
                  All systems operational
                </span>

              </div>

              <p className="text-xs text-slate-500 mt-3">
                Complaint data refresh interval: 5 seconds
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;