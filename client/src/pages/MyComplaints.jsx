import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // =========================
  // FETCH MY COMPLAINTS
  // =========================
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await axios.get(
        "http://localhost:4000/api/complaint/my",
        {
          withCredentials: true,
        }
      );

      setComplaints(response.data.complaints || []);
    } catch (error) {
      console.error("Fetch complaints error:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to load your complaints"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // =========================
  // FILTER
  // =========================
  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        complaint.complaintId
          ?.toLowerCase()
          .includes(searchText) ||
        complaint.title
          ?.toLowerCase()
          .includes(searchText) ||
        complaint.category
          ?.toLowerCase()
          .includes(searchText) ||
        complaint.location
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [complaints, search, statusFilter]);

  // =========================
  // STATISTICS
  // =========================
  const pendingCount = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgressCount = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolvedCount = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  // =========================
  // STATUS STYLE
  // =========================
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Resolved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // =========================
  // DATE FORMAT
  // =========================
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* =========================
          HEADER
      ========================= */}
      <header className="bg-slate-950 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="text-blue-300 text-sm font-semibold">
                SMART CITY
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold">
                My Complaints
              </h1>

              <p className="text-slate-400 mt-1">
                View and track all your submitted complaints
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition"
              >
                🏠 Home
              </Link>

              <Link
                to="/report-complaint"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                + New Complaint
              </Link>

            </div>

          </div>

        </div>
      </header>


      {/* =========================
          MAIN
      ========================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ERROR */}
        {message && (
          <div className="mb-6 bg-white border border-red-200 text-red-600 px-5 py-4 rounded-xl shadow-sm">
            {message}
          </div>
        )}


        {/* =========================
            STAT CARDS
        ========================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">
              Total Complaints
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {complaints.length}
            </h2>
          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">
              Pending
            </p>

            <h2 className="text-3xl font-bold text-yellow-600 mt-2">
              {pendingCount}
            </h2>
          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">
              In Progress
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {inProgressCount}
            </h2>
          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">
              Resolved
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {resolvedCount}
            </h2>
          </div>

        </div>


        {/* =========================
            SEARCH + FILTER
        ========================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">

          <div className="flex flex-col lg:flex-row gap-4">

            <div className="flex-1">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by complaint ID, title, category or location..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            <div className="w-full lg:w-56">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">
                  All
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Resolved">
                  Resolved
                </option>

                <option value="Rejected">
                  Rejected
                </option>
              </select>

            </div>

          </div>

        </div>


        {/* =========================
            RESULT COUNT
        ========================= */}
        <div className="flex items-center justify-between mb-4">

          <h2 className="text-xl font-bold text-slate-900">
            Your Complaints
          </h2>

          <p className="text-sm text-slate-500">
            Showing {filteredComplaints.length} of{" "}
            {complaints.length}
          </p>

        </div>


        {/* =========================
            LOADING
        ========================= */}
        {loading && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">

            <div className="text-4xl mb-3">
              ⏳
            </div>

            <p className="text-slate-600">
              Loading your complaints...
            </p>

          </div>
        )}


        {/* =========================
            EMPTY
        ========================= */}
        {!loading &&
          filteredComplaints.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">

              <div className="text-5xl mb-4">
                📭
              </div>

              <h3 className="text-xl font-bold text-slate-800">
                No complaints found
              </h3>

              <p className="text-slate-500 mt-2">
                You haven't submitted any complaints
                matching your search.
              </p>

              <Link
                to="/report-complaint"
                className="inline-flex items-center gap-2 mt-6 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Report a Complaint
              </Link>

            </div>
          )}


        {/* =========================
            DESKTOP TABLE
        ========================= */}
        {!loading &&
          filteredComplaints.length > 0 && (
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-900 text-white">

                    <tr>

                      <th className="text-left px-5 py-4 text-sm">
                        Complaint
                      </th>

                      <th className="text-left px-5 py-4 text-sm">
                        Category
                      </th>

                      <th className="text-left px-5 py-4 text-sm">
                        Location
                      </th>

                      <th className="text-left px-5 py-4 text-sm">
                        Date
                      </th>

                      <th className="text-left px-5 py-4 text-sm">
                        Status
                      </th>

                      <th className="text-left px-5 py-4 text-sm">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredComplaints.map(
                      (complaint) => (
                        <tr
                          key={complaint.complaintId}
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >

                          <td className="px-5 py-4">

                            <p className="font-bold text-blue-700">
                              {complaint.complaintId}
                            </p>

                            <p className="text-sm text-slate-700 mt-1">
                              {complaint.title}
                            </p>

                          </td>


                          <td className="px-5 py-4 text-slate-700">
                            {complaint.category}
                          </td>


                          <td className="px-5 py-4 text-slate-700">
                            {complaint.location}
                          </td>


                          <td className="px-5 py-4 text-slate-600">
                            {formatDate(
                              complaint.createdAt
                            )}
                          </td>


                          <td className="px-5 py-4">

                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                                complaint.status
                              )}`}
                            >
                              {complaint.status}
                            </span>

                          </td>


                          <td className="px-5 py-4">

                            <Link
                              to={`/track-complaint?id=${complaint.complaintId}`}
                              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                            >
                              Track
                            </Link>

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>
          )}


        {/* =========================
            MOBILE CARDS
        ========================= */}
        {!loading &&
          filteredComplaints.length > 0 && (
            <div className="lg:hidden space-y-4">

              {filteredComplaints.map(
                (complaint) => (
                  <div
                    key={complaint.complaintId}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-sm font-bold text-blue-700">
                          {complaint.complaintId}
                        </p>

                        <h3 className="font-bold text-slate-900 mt-1">
                          {complaint.title}
                        </h3>

                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusClass(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>

                    </div>


                    <div className="mt-4 space-y-2 text-sm text-slate-700">

                      <p>
                        <span className="font-semibold">
                          Category:
                        </span>{" "}
                        {complaint.category}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Location:
                        </span>{" "}
                        {complaint.location}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Submitted:
                        </span>{" "}
                        {formatDate(
                          complaint.createdAt
                        )}
                      </p>

                    </div>


                    <Link
                      to={`/track-complaint?id=${complaint.complaintId}`}
                      className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      📍 Track Complaint
                    </Link>

                  </div>
                )
              )}

            </div>
          )}

      </main>

    </div>
  );
};

export default MyComplaints;