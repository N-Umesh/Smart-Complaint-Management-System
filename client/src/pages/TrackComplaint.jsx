import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TrackComplaint = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const complaintId = searchParams.get("id");

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComplaint = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/complaint/${complaintId}`,
        {
          withCredentials: true,
        }
      );

      console.log("TRACK RESPONSE:", response.data);

      setComplaint(response.data.complaint);
      setError("");
    } catch (err) {
      console.error("TRACK ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load complaint details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!complaintId) {
      setError("Complaint ID is missing.");
      setLoading(false);
      return;
    }

    fetchComplaint();

    const interval = setInterval(() => {
      fetchComplaint();
    }, 5000);

    return () => clearInterval(interval);
  }, [complaintId]);

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateOnly = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Resolved":
        return "✓";

      case "In Progress":
        return "↻";

      case "Rejected":
        return "✕";

      default:
        return "⏳";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Roads":
        return "🛣️";

      case "Garbage":
        return "🗑️";

      case "Street Lights":
        return "💡";

      case "Water":
        return "💧";

      case "Drainage":
        return "🌊";

      default:
        return "📋";
    }
  };

  const isPending =
    complaint?.status === "Pending";

  const isProgress =
    complaint?.status === "In Progress";

  const isResolved =
    complaint?.status === "Resolved";

  const isRejected =
    complaint?.status === "Rejected";

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-slate-600 font-medium">
            Loading complaint details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-5">
            !
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Complaint Not Found
          </h2>

          <p className="text-slate-500 mb-6">
            {error || "We couldn't find this complaint."}
          </p>

          <button
            onClick={() => navigate("/my-complaints")}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition"
          >
            Back to My Complaints
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

          <div className="flex items-center justify-between gap-4">

            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold">
                  SC
                </div>

                <div>
                  <h1 className="text-lg sm:text-xl font-bold">
                    Smart City
                  </h1>

                  <p className="text-xs text-slate-400">
                    Complaint Management System
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/my-complaints")}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm font-medium"
            >
              ← My Complaints
            </button>

          </div>

        </div>
      </header>


      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* PAGE TITLE */}
        <div className="mb-8">

          <button
            onClick={() => navigate("/my-complaints")}
            className="sm:hidden text-sm text-slate-600 hover:text-blue-600 mb-5"
          >
            ← Back to My Complaints
          </button>

          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Complaint Tracking
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Track Your Complaint
              </h2>

              <p className="text-slate-500 mt-2">
                Monitor the current status and progress of your complaint.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Live status updates
            </div>

          </div>

        </div>


        {/* COMPLAINT HEADER CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6">

          <div className="p-6 sm:p-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                  {getCategoryIcon(complaint.category)}
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Complaint ID
                  </p>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {complaint.complaintId}
                  </h3>

                  <p className="text-slate-500 mt-1">
                    {complaint.title}
                  </p>
                </div>

              </div>


              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm w-fit ${getStatusStyle(
                  complaint.status
                )}`}
              >
                <span>
                  {getStatusIcon(complaint.status)}
                </span>

                {complaint.status}
              </div>

            </div>

          </div>


          <div className="border-t border-slate-100 bg-slate-50 px-6 sm:px-8 py-4">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Category
                </p>

                <p className="font-semibold text-slate-700 mt-1">
                  {complaint.category}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Submitted
                </p>

                <p className="font-semibold text-slate-700 mt-1">
                  {formatDateOnly(complaint.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Location
                </p>

                <p className="font-semibold text-slate-700 mt-1 truncate">
                  {complaint.location}
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* STATUS PROGRESS */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 mb-6">

          <div className="flex items-center justify-between mb-8">

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Complaint Progress
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Current processing stage
              </p>
            </div>

            <div className="hidden sm:block text-sm text-slate-400">
              Auto-updates every 5 seconds
            </div>

          </div>


          {/* DESKTOP PROGRESS */}
          <div className="hidden md:block">

            <div className="relative">

              <div className="absolute left-[8%] right-[8%] top-5 h-1 bg-slate-200"></div>

              <div
                className={`absolute left-[8%] top-5 h-1 transition-all duration-700 ${
                  isRejected
                    ? "bg-red-500 w-0"
                    : isPending
                    ? "bg-amber-500 w-0"
                    : isProgress
                    ? "bg-blue-600 w-[42%]"
                    : isResolved
                    ? "bg-emerald-500 w-[84%]"
                    : "w-0"
                }`}
              ></div>


              <div className="relative flex justify-between">

                {/* STEP 1 */}
                <div className="text-center w-1/4">

                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto font-bold shadow-sm">
                    ✓
                  </div>

                  <p className="font-semibold text-slate-800 mt-3">
                    Submitted
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {formatDateOnly(complaint.createdAt)}
                  </p>

                </div>


                {/* STEP 2 */}
                <div className="text-center w-1/4">

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold ${
                      isPending
                        ? "bg-amber-500 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    2
                  </div>

                  <p className="font-semibold text-slate-800 mt-3">
                    Under Review
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Processing
                  </p>

                </div>


                {/* STEP 3 */}
                <div className="text-center w-1/4">

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold ${
                      isProgress || isResolved
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    3
                  </div>

                  <p className="font-semibold text-slate-800 mt-3">
                    In Progress
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Action taken
                  </p>

                </div>


                {/* STEP 4 */}
                <div className="text-center w-1/4">

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold ${
                      isResolved
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    ✓
                  </div>

                  <p className="font-semibold text-slate-800 mt-3">
                    Resolved
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Final stage
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* MOBILE PROGRESS */}
          <div className="md:hidden space-y-5">

            <div className="flex gap-4">

              <div className="flex flex-col items-center">

                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                  ✓
                </div>

                <div className="w-0.5 h-12 bg-slate-200"></div>

              </div>

              <div className="pt-1">
                <p className="font-semibold text-slate-800">
                  Complaint Submitted
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  {formatDate(complaint.createdAt)}
                </p>
              </div>

            </div>


            <div className="flex gap-4">

              <div className="flex flex-col items-center">

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                    isPending
                      ? "bg-amber-500 text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  2
                </div>

                <div className="w-0.5 h-12 bg-slate-200"></div>

              </div>

              <div className="pt-1">
                <p className="font-semibold text-slate-800">
                  Under Review
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  Complaint is being reviewed
                </p>
              </div>

            </div>


            <div className="flex gap-4">

              <div className="flex flex-col items-center">

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                    isProgress || isResolved
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  3
                </div>

                <div className="w-0.5 h-12 bg-slate-200"></div>

              </div>

              <div className="pt-1">
                <p className="font-semibold text-slate-800">
                  In Progress
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  Work is being carried out
                </p>
              </div>

            </div>


            <div className="flex gap-4">

              <div>

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                    isResolved
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  ✓
                </div>

              </div>

              <div className="pt-1">
                <p className="font-semibold text-slate-800">
                  Resolved
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  Complaint completed
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* DESCRIPTION */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  📝
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Complaint Details
                  </h3>

                  <p className="text-xs text-slate-400">
                    Information provided during submission
                  </p>
                </div>

              </div>


              <div className="space-y-5">

                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    Title
                  </p>

                  <p className="text-slate-800 font-medium">
                    {complaint.title}
                  </p>
                </div>


                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    Description
                  </p>

                  <p className="text-slate-600 leading-7">
                    {complaint.description}
                  </p>
                </div>

              </div>

            </div>


            {/* IMAGE */}
            {complaint.image && (
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">

                <div className="flex items-center justify-between mb-5">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      📷
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Uploaded Image
                      </h3>

                      <p className="text-xs text-slate-400">
                        Evidence attached to complaint
                      </p>
                    </div>

                  </div>

                </div>


                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-center">

                  <img
                    src={`http://localhost:4000/uploads/${complaint.image}`}
                    alt="Complaint"
                    className="w-full max-w-xs max-h-52 object-contain rounded-xl"                  />

                </div>

              </div>
            )}

          </div>


          {/* RIGHT */}
          <div className="space-y-6">

            {/* LOCATION */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  📍
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Location
                  </h3>

                  <p className="text-xs text-slate-400">
                    Complaint location
                  </p>
                </div>

              </div>

              <p className="text-slate-700 font-medium leading-6">
                {complaint.location}
              </p>

              {complaint.city && (
                <p className="text-sm text-slate-500 mt-2">
                  {complaint.city}
                </p>
              )}

            </div>


            {/* ASSIGNED */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  👤
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Assigned Officer
                  </h3>

                  <p className="text-xs text-slate-400">
                    Responsible department
                  </p>
                </div>

              </div>

              <p className="text-slate-700 font-medium">
                {complaint.assignedTo ||
                  "Not assigned yet"}
              </p>

            </div>


            {/* ADMIN REMARK */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  💬
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Official Remark
                  </h3>

                  <p className="text-xs text-slate-400">
                    Latest administrative update
                  </p>
                </div>

              </div>

              {complaint.adminRemark ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

                  <p className="text-sm text-slate-600 leading-6">
                    {complaint.adminRemark}
                  </p>

                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  No official remark has been added yet.
                </p>
              )}

            </div>


            {/* STATUS INFO */}
            <div
              className={`rounded-2xl border p-6 ${getStatusStyle(
                complaint.status
              )}`}
            >

              <div className="flex items-center gap-3 mb-3">

                <div className="text-xl">
                  {getStatusIcon(complaint.status)}
                </div>

                <h3 className="font-bold">
                  Current Status
                </h3>

              </div>

              <p className="text-sm leading-6">
                {isPending &&
                  "Your complaint has been submitted and is waiting for review."}

                {isProgress &&
                  "Your complaint is currently being worked on by the responsible department."}

                {isResolved &&
                  "Your complaint has been resolved successfully."}

                {isRejected &&
                  "This complaint has been rejected. Please check the official remark for more information."}
              </p>

            </div>

          </div>

        </div>


        {/* BOTTOM ACTIONS */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <div>

              <h3 className="font-bold text-slate-900">
                Need to report another issue?
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Submit a new complaint to the Smart City system.
              </p>

            </div>


            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

              <button
                onClick={() =>
                  navigate("/my-complaints")
                }
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
              >
                My Complaints
              </button>

              <button
                onClick={() =>
                  navigate("/report-complaint")
                }
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-sm"
              >
                + Report Complaint
              </button>

            </div>

          </div>

        </div>

      </main>


      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white mt-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">

            <p>
              © 2026 Smart City Complaint Management System
            </p>

            <p>
              Making cities better, one complaint at a time.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default TrackComplaint;