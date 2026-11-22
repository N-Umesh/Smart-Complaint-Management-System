import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [updatingId, setUpdatingId] = useState(null);

  const [remark, setRemark] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

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

  const openComplaint = (complaint) => {
    setSelectedComplaint(complaint);

    setRemark(
      complaint.adminRemark || ""
    );

    setAssignedTo(
      complaint.assignedTo || ""
    );
  };

  const updateStatus = async (
    complaintId,
    status
  ) => {
    try {
      setUpdatingId(complaintId);

      await axios.put(
        `http://localhost:4000/api/complaint/${complaintId}/status`,
        {
          status,
          adminRemark: remark,
          assignedTo,
        },
        {
          withCredentials: true,
        }
      );

      await fetchComplaints(false);

      setSelectedComplaint(null);
    } catch (err) {
      console.error(
        "STATUS UPDATE ERROR:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Failed to update complaint."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      window.location.href =
        "/admin-login";
    } catch (error) {
      console.error(
        "ADMIN LOGOUT ERROR:",
        error
      );
    }
  };

  const filteredComplaints =
    complaints.filter((complaint) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        complaint.title
          ?.toLowerCase()
          .includes(searchText) ||
        complaint.complaintId
          ?.toLowerCase()
          .includes(searchText) ||
        complaint.location
          ?.toLowerCase()
          .includes(searchText) ||
        complaint.user?.name
          ?.toLowerCase()
          .includes(searchText) ||
        complaint.user?.email
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        complaint.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });

  const totalComplaints =
    complaints.length;

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

  const formatDateTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071827] flex items-center justify-center">

        <div className="text-center">

          <div className="w-14 h-14 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>

          <p className="text-white mt-5 font-semibold">
            Loading complaints...
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
            🏙️
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
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition"
            >

              <span className="text-lg">
                ▦
              </span>

              <span className="font-medium text-sm">
                Dashboard
              </span>

            </Link>

            {/* COMPLAINTS ACTIVE */}

            <Link
              to="/admin-dashboard/complaints"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/10 text-cyan-300"
            >

              <span className="text-lg">
                📋
              </span>

              <span className="font-semibold text-sm">
                Complaints
              </span>

              <span className="ml-auto text-xs bg-slate-800 px-2 py-1 rounded-full">
                {totalComplaints}
              </span>

            </Link>

          </div>

        </div>

        {/* SYSTEM */}

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

            ↪

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

            <div className="flex items-center gap-3">

              <div className="lg:hidden w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                🏙️
              </div>

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-cyan-600">
                  Administration
                </p>

                <h2 className="text-xl font-bold text-slate-900">
                  Complaints Management
                </h2>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100">

                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>

                <span className="text-xs font-semibold text-emerald-700">
                  Online
                </span>

              </div>

              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                A
              </div>

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

          <div className="mb-8">

            <p className="text-sm text-slate-500">
              Administration / Complaints
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Citizen Complaints
            </h1>

            <p className="text-slate-500 mt-2">
              View, manage and update all submitted complaints.
            </p>

          </div>

          {/* ERROR */}

          {error && (

            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">

              <p className="font-semibold text-red-700">
                Unable to load complaints
              </p>

              <p className="text-sm text-red-600 mt-1">
                {error}
              </p>

            </div>

          )}

          {/* ================= FILTER ================= */}

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 mb-6">

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  All Complaints
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Showing{" "}
                  {filteredComplaints.length}{" "}
                  of{" "}
                  {complaints.length}
                </p>

              </div>

              <button
                onClick={() =>
                  fetchComplaints(true)
                }
                disabled={refreshing}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white text-sm font-semibold transition disabled:opacity-50"
              >
                {refreshing
                  ? "Refreshing..."
                  : "↻ Refresh"}
              </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="🔍 Search complaint, citizen, ID..."
                className="h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:bg-white focus:border-cyan-500"
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:bg-white focus:border-cyan-500"
              >

                <option value="All">
                  All Status
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

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
                className="h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:bg-white focus:border-cyan-500"
              >

                <option value="All">
                  All Categories
                </option>

                <option value="Roads">
                  Roads
                </option>

                <option value="Garbage">
                  Garbage
                </option>

                <option value="Street Lights">
                  Street Lights
                </option>

                <option value="Water">
                  Water
                </option>

                <option value="Drainage">
                  Drainage
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

          </div>

          {/* ================= DESKTOP TABLE ================= */}

          <div className="hidden lg:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-slate-50 border-b border-slate-200">

                    <th className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Complaint
                    </th>

                    <th className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Citizen
                    </th>

                    <th className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Category
                    </th>

                    <th className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Location
                    </th>

                    <th className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Submitted
                    </th>

                    <th className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Status
                    </th>

                    <th className="text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredComplaints.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="py-20 text-center"
                      >

                        <div className="text-4xl">
                          📭
                        </div>

                        <p className="font-bold text-slate-700 mt-4">
                          No complaints found
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                          Try changing your search or filters.
                        </p>

                      </td>

                    </tr>

                  ) : (

                    filteredComplaints.map(
                      (complaint) => (

                        <tr
                          key={
                            complaint.complaintId
                          }
                          className="hover:bg-cyan-50/30 transition"
                        >

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center text-lg">
                                {getCategoryIcon(
                                  complaint.category
                                )}
                              </div>

                              <div>

                                <p className="font-bold text-slate-900 max-w-[220px] truncate">
                                  {complaint.title}
                                </p>

                                <p className="text-xs text-cyan-600 font-semibold mt-1">
                                  {complaint.complaintId}
                                </p>

                              </div>

                            </div>

                          </td>

                          <td className="px-6 py-5">

                            <p className="font-semibold text-sm text-slate-800">
                              {complaint.user?.name ||
                                "Unknown"}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              {complaint.user?.email ||
                                "-"}
                            </p>

                          </td>

                          <td className="px-6 py-5 text-sm text-slate-600">
                            {complaint.category}
                          </td>

                          <td className="px-6 py-5">

                            <p className="text-sm text-slate-700 max-w-[170px] truncate">
                              📍{" "}
                              {complaint.location}
                            </p>

                            {complaint.city && (
                              <p className="text-xs text-slate-400 mt-1">
                                {complaint.city}
                              </p>
                            )}

                          </td>

                          <td className="px-6 py-5 text-sm text-slate-600">
                            {formatDate(
                              complaint.createdAt
                            )}
                          </td>

                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex px-3 py-1.5 rounded-full border text-xs font-bold ${getStatusStyle(
                                complaint.status
                              )}`}
                            >
                              {complaint.status}
                            </span>

                          </td>

                          <td className="px-6 py-5 text-right">

                            <button
                              onClick={() =>
                                openComplaint(
                                  complaint
                                )
                              }
                              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white text-xs font-bold transition"
                            >
                              View Details
                            </button>

                          </td>

                        </tr>

                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* ================= MOBILE CARDS ================= */}

          <div className="lg:hidden space-y-4">

            {filteredComplaints.length === 0 ? (

              <div className="bg-white rounded-2xl border border-slate-200 text-center py-14">

                <div className="text-4xl">
                  📭
                </div>

                <p className="font-bold text-slate-700 mt-3">
                  No complaints found
                </p>

              </div>

            ) : (

              filteredComplaints.map(
                (complaint) => (

                  <div
                    key={
                      complaint.complaintId
                    }
                    className="bg-white border border-slate-200 rounded-2xl p-5"
                  >

                    <div className="flex justify-between gap-3">

                      <div className="flex gap-3">

                        <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center">
                          {getCategoryIcon(
                            complaint.category
                          )}
                        </div>

                        <div>

                          <h3 className="font-bold text-slate-900">
                            {complaint.title}
                          </h3>

                          <p className="text-xs text-cyan-600 font-semibold mt-1">
                            {complaint.complaintId}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`h-fit px-2.5 py-1 rounded-full border text-[10px] font-bold whitespace-nowrap ${getStatusStyle(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>

                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">

                      <div className="flex justify-between">

                        <span className="text-xs text-slate-400">
                          Citizen
                        </span>

                        <span className="text-xs font-semibold">
                          {complaint.user?.name ||
                            "Unknown"}
                        </span>

                      </div>

                      <div className="flex justify-between">

                        <span className="text-xs text-slate-400">
                          Category
                        </span>

                        <span className="text-xs font-semibold">
                          {complaint.category}
                        </span>

                      </div>

                      <div className="flex justify-between gap-4">

                        <span className="text-xs text-slate-400">
                          Location
                        </span>

                        <span className="text-xs font-semibold text-right">
                          {complaint.location}
                        </span>

                      </div>

                      <div className="flex justify-between">

                        <span className="text-xs text-slate-400">
                          Submitted
                        </span>

                        <span className="text-xs font-semibold">
                          {formatDate(
                            complaint.createdAt
                          )}
                        </span>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        openComplaint(
                          complaint
                        )
                      }
                      className="w-full mt-5 py-3 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white text-sm font-bold transition"
                    >
                      View Complaint
                    </button>

                  </div>

                )
              )

            )}

          </div>

        </main>

      </div>

      {/* ================= COMPLAINT MODAL ================= */}

      {selectedComplaint && (

        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 bg-[#071827] text-white px-6 sm:px-8 py-5 flex items-center justify-between">

              <div>

                <p className="text-xs text-cyan-400 uppercase tracking-widest font-bold">
                  Complaint Details
                </p>

                <h2 className="text-xl font-bold mt-1">
                  {
                    selectedComplaint.complaintId
                  }
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedComplaint(null)
                }
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xl"
              >
                ×
              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="p-6 sm:p-8">

              {/* TITLE */}

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">

                <div>

                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {selectedComplaint.title}
                  </h3>

                  <p className="text-sm text-slate-400 mt-2">
                    Submitted{" "}
                    {formatDateTime(
                      selectedComplaint.createdAt
                    )}
                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full border text-xs font-bold w-fit ${getStatusStyle(
                    selectedComplaint.status
                  )}`}
                >
                  {
                    selectedComplaint.status
                  }
                </span>

              </div>

              {/* INFORMATION */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">

                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    Citizen
                  </p>

                  <p className="font-bold text-slate-800 mt-2">
                    {selectedComplaint.user?.name ||
                      "Unknown"}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedComplaint.user?.email ||
                      "-"}
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">

                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    Category
                  </p>

                  <p className="font-bold text-slate-800 mt-2">
                    {getCategoryIcon(
                      selectedComplaint.category
                    )}{" "}
                    {selectedComplaint.category}
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">

                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    Location
                  </p>

                  <p className="font-bold text-slate-800 mt-2">
                    📍{" "}
                    {selectedComplaint.location}
                  </p>

                  {selectedComplaint.city && (
                    <p className="text-sm text-slate-500 mt-1">
                      {selectedComplaint.city}
                    </p>
                  )}

                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">

                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    Assigned Officer
                  </p>

                  <p className="font-bold text-slate-800 mt-2">
                    {selectedComplaint.assignedTo ||
                      "Not assigned"}
                  </p>

                </div>

              </div>

              {/* DESCRIPTION */}

              <div className="mb-7">

                <h3 className="font-bold text-slate-900 mb-3">
                  Description
                </h3>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">

                  <p className="text-slate-600 leading-7">
                    {
                      selectedComplaint.description
                    }
                  </p>

                </div>

              </div>

              {/* IMAGE */}

              {selectedComplaint.image && (

                <div className="mb-7">

                  <h3 className="font-bold text-slate-900 mb-3">
                    Uploaded Evidence
                  </h3>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex justify-center">

                    <img
                      src={`http://localhost:4000/uploads/${selectedComplaint.image}`}
                      alt="Complaint evidence"
                      className="max-w-full max-h-72 object-contain rounded-xl"
                    />

                  </div>

                </div>

              )}

              {/* ADMIN ACTION */}

              <div className="border-t border-slate-200 pt-7">

                <div className="mb-5">

                  <h3 className="font-bold text-slate-900 text-lg">
                    Administrative Action
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    Update complaint handling information.
                  </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* STATUS */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Complaint Status
                    </label>

                    <select
                      value={
                        selectedComplaint.status
                      }
                      onChange={(e) =>
                        setSelectedComplaint({
                          ...selectedComplaint,
                          status:
                            e.target.value,
                        })
                      }
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-cyan-500"
                    >

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

                  {/* ASSIGNED */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Assign Officer / Department
                    </label>

                    <input
                      type="text"
                      value={assignedTo}
                      onChange={(e) =>
                        setAssignedTo(
                          e.target.value
                        )
                      }
                      placeholder="Enter officer or department"
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-cyan-500"
                    />

                  </div>

                  {/* REMARK */}

                  <div className="md:col-span-2">

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Admin Remark
                    </label>

                    <textarea
                      rows="4"
                      value={remark}
                      onChange={(e) =>
                        setRemark(
                          e.target.value
                        )
                      }
                      placeholder="Add an official remark for the citizen..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none focus:bg-white focus:border-cyan-500"
                    />

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">

                  <button
                    onClick={() =>
                      setSelectedComplaint(null)
                    }
                    className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        selectedComplaint.complaintId,
                        selectedComplaint.status
                      )
                    }
                    disabled={
                      updatingId ===
                      selectedComplaint.complaintId
                    }
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold disabled:opacity-50"
                  >

                    {updatingId ===
                    selectedComplaint.complaintId
                      ? "Saving Changes..."
                      : "Save Changes"}

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminComplaints;