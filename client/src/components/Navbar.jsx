import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [getStartedOpen, setGetStartedOpen] =
    useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // ==============================
  // CHECK LOGGED-IN USER
  // ==============================
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/check-auth",
          {
            withCredentials: true,
          }
        );

        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    checkUser();
  }, [location.pathname]);

  // ==============================
  // LOGOUT
  // ==============================
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    }

    setUser(null);
    closeMenus();

    navigate("/");
  };

  // ==============================
  // CLOSE ALL MENUS
  // ==============================
  const closeMenus = () => {
    setProfileOpen(false);
    setMenuOpen(false);
    setGetStartedOpen(false);
  };

  // ==============================
  // ACTIVE LINK
  // ==============================
  const isActive = (path) => {
    return location.pathname === path;
  };

  // ==============================
  // USER INITIAL
  // ==============================
  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="relative z-[9999] w-full">

      {/* =====================================
          TOP BAR
      ====================================== */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white">

        <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-center gap-2 text-xs md:text-sm">

          <span className="text-base">
            🏙️
          </span>

          <span className="font-semibold">
            SmartCity Complaint Management System
          </span>

          <span className="hidden sm:inline text-blue-300">
            •
          </span>

          <span className="hidden sm:inline text-blue-200">
            Better cities, better living
          </span>

        </div>

      </div>


      {/* =====================================
          MAIN NAVBAR
      ====================================== */}
      <nav className="relative z-[9999] bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 border-b border-blue-400/20 shadow-xl">

        <div className="max-w-7xl mx-auto px-5 md:px-8 h-[76px] flex items-center justify-between">


          {/* =================================
              LOGO
          ================================== */}
          <Link
            to="/"
            onClick={closeMenus}
            className="relative z-[10000] flex items-center gap-3 group"
          >

            <div className="relative">

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition duration-200">

                <span className="text-white text-2xl">
                  🏙️
                </span>

              </div>

              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-slate-900 rounded-full"></div>

            </div>


            <div className="leading-tight">

              <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">

                Smart
                <span className="text-blue-400">
                  City
                </span>

              </h1>

              <p className="text-[9px] md:text-[10px] text-blue-200 tracking-widest">

                SMART COMPLAINT MANAGEMENT

              </p>

            </div>

          </Link>


          {/* =================================
              DESKTOP NAVIGATION
          ================================== */}
          <div className="hidden lg:flex items-center gap-1">

            {[
              {
                name: "Home",
                path: "/",
                icon: "🏠",
              },
              {
                name: "Services",
                path: "/services",
                icon: "🏙️",
              },
              {
                name: "Portfolio",
                path: "/portfolio",
                icon: "💼",
              },
              {
                name: "Pricing",
                path: "/pricing",
                icon: "💳",
              },
            ].map((item) => (

              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenus}
                className={`relative px-4 py-2.5 rounded-xl font-medium transition duration-200 ${
                  isActive(item.path)
                    ? "bg-white/15 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >

                {item.name}

                {isActive(item.path) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-blue-400 rounded-full"></span>
                )}

              </Link>

            ))}

          </div>


          {/* =================================
              RIGHT SIDE
          ================================== */}
          <div className="hidden md:flex items-center gap-3 relative z-[10000]">

            {user ? (

              <>

                {/* ===========================
                    REPORT COMPLAINT
                ============================ */}
                <Link
                  to="/report-complaint"
                  onClick={closeMenus}
                  className="hidden lg:flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-900/30 transition duration-200"
                >

                  <span className="text-xl">
                    +
                  </span>

                  Report Issue

                </Link>


                {/* ===========================
                    NOTIFICATIONS
                ============================ */}
                <Link
                  to="/notifications"
                  onClick={closeMenus}
                  className="relative w-11 h-11 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition duration-200"
                >

                  <span className="text-lg">
                    🔔
                  </span>

                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-slate-900">
                    2
                  </span>

                </Link>


                {/* ===========================
                    PROFILE
                ============================ */}
                <div className="relative">

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(
                        !profileOpen
                      );
                      setGetStartedOpen(false);
                    }}
                    className={`flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl border transition duration-200 ${
                      profileOpen
                        ? "bg-white/20 border-blue-300"
                        : "bg-white/10 border-white/10 hover:bg-white/15"
                    }`}
                  >

                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center font-bold">
                      {userInitial}
                    </div>

                    <div className="hidden xl:block text-left">

                      <p className="text-sm font-semibold text-white max-w-[110px] truncate">
                        {user?.name}
                      </p>

                      <p className="text-[11px] text-blue-200">
                        Citizen
                      </p>

                    </div>

                    <span className="text-xs text-blue-200">
                      {profileOpen
                        ? "▲"
                        : "▼"}
                    </span>

                  </button>


                  {/* PROFILE DROPDOWN */}
                  {profileOpen && (

                    <div
                      className="absolute right-0 top-[58px] w-80 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden"
                      style={{
                        zIndex: 99999,
                      }}
                    >

                      {/* HEADER */}
                      <div className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">

                        <div className="flex items-center gap-4">

                          <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl font-bold">
                            {userInitial}
                          </div>

                          <div className="min-w-0">

                            <h3 className="font-bold text-lg truncate">
                              {user?.name}
                            </h3>

                            <p className="text-blue-100 text-sm truncate">
                              {user?.email}
                            </p>

                            <span className="inline-block mt-2 bg-white/15 px-2.5 py-1 rounded-full text-[11px]">
                              Citizen Account
                            </span>

                          </div>

                        </div>

                      </div>


                      {/* ACCOUNT */}
                      <div className="p-2">

                        <p className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                          Account
                        </p>


                        <Link
                          to="/profile"
                          onClick={closeMenus}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-blue-50 transition"
                        >

                          <span className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                            👤
                          </span>

                          <div>

                            <p className="font-semibold text-gray-800 text-sm">
                              My Profile
                            </p>

                            <p className="text-xs text-gray-400">
                              View and edit your profile
                            </p>

                          </div>

                        </Link>


                        <Link
                          to="/report-complaint"
                          onClick={closeMenus}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-green-50 transition"
                        >

                          <span className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                            📝
                          </span>

                          <div>

                            <p className="font-semibold text-gray-800 text-sm">
                              Report Complaint
                            </p>

                            <p className="text-xs text-gray-400">
                              Report a civic issue
                            </p>

                          </div>

                        </Link>


                        <Link
                          to="/my-complaints"
                          onClick={closeMenus}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-50 transition"
                        >

                          <span className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                            📋
                          </span>

                          <div>

                            <p className="font-semibold text-gray-800 text-sm">
                              My Complaints
                            </p>

                            <p className="text-xs text-gray-400">
                              View submitted complaints
                            </p>

                          </div>

                        </Link>


                        <Link
                          to="/track-complaint"
                          onClick={closeMenus}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-yellow-50 transition"
                        >

                          <span className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center">
                            🔍
                          </span>

                          <div>

                            <p className="font-semibold text-gray-800 text-sm">
                              Track Complaint
                            </p>

                            <p className="text-xs text-gray-400">
                              Check complaint status
                            </p>

                          </div>

                        </Link>

                      </div>


                      {/* OTHER */}
                      <div className="border-t border-gray-100 p-2">

                        <Link
                          to="/notifications"
                          onClick={closeMenus}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition"
                        >

                          <span className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                            🔔
                          </span>

                          <span className="text-sm font-medium text-gray-700">
                            Notifications
                          </span>

                        </Link>


                        <Link
                          to="/settings"
                          onClick={closeMenus}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition"
                        >

                          <span className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                            ⚙️
                          </span>

                          <span className="text-sm font-medium text-gray-700">
                            Settings
                          </span>

                        </Link>


                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 transition"
                        >

                          <span className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                            🚪
                          </span>

                          <div className="text-left">

                            <p className="text-sm font-semibold text-red-600">
                              Logout
                            </p>

                            <p className="text-xs text-red-400">
                              Sign out of your account
                            </p>

                          </div>

                        </button>

                      </div>

                    </div>

                  )}

                </div>

              </>

            ) : (

              /* ============================
                 GET STARTED
              ============================= */
              <div className="relative">

                <button
                  type="button"
                  onClick={() => {
                    setGetStartedOpen(
                      !getStartedOpen
                    );
                    setProfileOpen(false);
                  }}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-900/30 transition duration-200"
                >

                  Get Started

                  <span className="text-xs">
                    {getStartedOpen
                      ? "▲"
                      : "▼"}
                  </span>

                </button>


                {getStartedOpen && (

                  <div className="absolute right-0 top-[58px] w-60 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">

                    <div className="px-5 py-3 bg-slate-50 border-b border-gray-100">

                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Get Started
                      </p>

                    </div>


                    <button
                      type="button"
                      onClick={() => {
                        closeMenus();
                        navigate("/login");
                      }}
                      className="w-full text-left px-5 py-4 hover:bg-blue-50 transition"
                    >

                      <div className="font-semibold text-gray-800">
                        🔐 Login
                      </div>

                      <div className="text-xs text-gray-400 mt-1">
                        Login to your citizen account
                      </div>

                    </button>


                    <button
                      type="button"
                      onClick={() => {
                        closeMenus();
                        navigate("/signup");
                      }}
                      className="w-full text-left px-5 py-4 hover:bg-green-50 transition"
                    >

                      <div className="font-semibold text-gray-800">
                        📝 Sign Up
                      </div>

                      <div className="text-xs text-gray-400 mt-1">
                        Create a new citizen account
                      </div>

                    </button>


                    <button
                      type="button"
                      onClick={() => {
                        closeMenus();
                        navigate("/admin-login");
                      }}
                      className="w-full text-left px-5 py-4 hover:bg-purple-50 transition"
                    >

                      <div className="font-semibold text-gray-800">
                        🛡️ Admin Login
                      </div>

                      <div className="text-xs text-gray-400 mt-1">
                        Administrator access
                      </div>

                    </button>

                  </div>

                )}

              </div>

            )}

          </div>


          {/* =================================
              MOBILE BUTTON
          ================================== */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setProfileOpen(false);
              setGetStartedOpen(false);
            }}
            className="md:hidden relative z-[10000] w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center text-xl hover:bg-white/20 transition"
          >

            {menuOpen ? "✕" : "☰"}

          </button>

        </div>


        {/* =====================================
            MOBILE MENU
        ====================================== */}
        {menuOpen && (

          <div className="relative z-[99999] md:hidden bg-slate-950 border-t border-white/10 shadow-2xl">

            <div className="px-5 py-5 space-y-2">


              {/* NAVIGATION */}

              <Link
                to="/"
                onClick={closeMenus}
                className={`block px-4 py-3 rounded-xl transition ${
                  isActive("/")
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-white hover:bg-white/10"
                }`}
              >
                🏠 Home
              </Link>


              <Link
                to="/services"
                onClick={closeMenus}
                className={`block px-4 py-3 rounded-xl transition ${
                  isActive("/services")
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-white hover:bg-white/10"
                }`}
              >
                🏙️ Services
              </Link>


              <Link
                to="/portfolio"
                onClick={closeMenus}
                className={`block px-4 py-3 rounded-xl transition ${
                  isActive("/portfolio")
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-white hover:bg-white/10"
                }`}
              >
                💼 Portfolio
              </Link>


              <Link
                to="/pricing"
                onClick={closeMenus}
                className={`block px-4 py-3 rounded-xl transition ${
                  isActive("/pricing")
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-white hover:bg-white/10"
                }`}
              >
                💳 Pricing
              </Link>


              <div className="border-t border-white/10 my-3"></div>


              {user ? (

                <>

                  <div className="px-4 py-3 rounded-xl bg-white/5">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center font-bold text-white">
                        {userInitial}
                      </div>

                      <div className="min-w-0">

                        <p className="text-white font-semibold truncate">
                          {user?.name}
                        </p>

                        <p className="text-blue-200 text-xs truncate">
                          Citizen
                        </p>

                      </div>

                    </div>

                  </div>


                  <Link
                    to="/profile"
                    onClick={closeMenus}
                    className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
                  >
                    👤 My Profile
                  </Link>


                  <Link
                    to="/report-complaint"
                    onClick={closeMenus}
                    className="block px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
                  >
                    📝 Report Complaint
                  </Link>


                  <Link
                    to="/my-complaints"
                    onClick={closeMenus}
                    className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
                  >
                    📋 My Complaints
                  </Link>


                  <Link
                    to="/track-complaint"
                    onClick={closeMenus}
                    className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
                  >
                    🔍 Track Complaint
                  </Link>


                  <Link
                    to="/notifications"
                    onClick={closeMenus}
                    className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
                  >
                    🔔 Notifications
                  </Link>


                  <Link
                    to="/settings"
                    onClick={closeMenus}
                    className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
                  >
                    ⚙️ Settings
                  </Link>


                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
                  >
                    🚪 Logout
                  </button>

                </>

              ) : (

                <>

                  {/* MOBILE GET STARTED */}

                  <button
                    type="button"
                    onClick={() =>
                      setGetStartedOpen(
                        !getStartedOpen
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
                  >

                    <span>
                      Get Started
                    </span>

                    <span className="text-xs">
                      {getStartedOpen
                        ? "▲"
                        : "▼"}
                    </span>

                  </button>


                  {getStartedOpen && (

                    <div className="ml-3 mt-2 space-y-2">

                      <Link
                        to="/login"
                        onClick={closeMenus}
                        className="block px-4 py-3 rounded-xl text-white bg-white/10 hover:bg-white/20 transition"
                      >
                        🔐 Login
                      </Link>


                      <Link
                        to="/signup"
                        onClick={closeMenus}
                        className="block px-4 py-3 rounded-xl text-white bg-white/10 hover:bg-white/20 transition"
                      >
                        📝 Sign Up
                      </Link>


                      <Link
                        to="/admin-login"
                        onClick={closeMenus}
                        className="block px-4 py-3 rounded-xl text-white bg-white/10 hover:bg-white/20 transition"
                      >
                        🛡️ Admin Login
                      </Link>

                    </div>

                  )}

                </>

              )}

            </div>

          </div>

        )}

      </nav>

    </header>
  );
};

export default Navbar;