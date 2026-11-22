import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const PortfolioPage = () => {
  const modules = [
    {
      icon: "👤",
      title: "Citizen Portal",
      description:
        "A citizen-facing interface where users can register, login, manage their profile and access complaint services.",
    },
    {
      icon: "📝",
      title: "Complaint Management",
      description:
        "Citizens can create complaints by providing the title, category, description and location of an issue.",
    },
    {
      icon: "🔎",
      title: "Complaint Tracking",
      description:
        "Citizens can view submitted complaints and monitor their current status.",
    },
    {
      icon: "📊",
      title: "Admin Dashboard",
      description:
        "Administrators can monitor complaints and view complaint statistics from a centralized dashboard.",
    },
    {
      icon: "⚙️",
      title: "Status Management",
      description:
        "Administrators can update complaints as Pending, In Progress, Resolved or Rejected.",
    },
    {
      icon: "🔐",
      title: "Authentication & Security",
      description:
        "User and administrator authentication is handled through protected login and authorization.",
    },
  ];

  const technologies = [
    ["⚛️", "React", "Frontend user interface"],
    ["🟢", "Node.js", "Backend runtime"],
    ["🚂", "Express.js", "REST API server"],
    ["🍃", "MongoDB", "Database management"],
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      {/* HERO */}

      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 text-white">

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">

          <div className="max-w-4xl">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm font-semibold">
              SmartCity Project
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-6">
              A complete digital platform for
              <span className="text-cyan-400">
                {" "}civic complaints.
              </span>
            </h1>

            <p className="text-slate-300 text-lg leading-8 mt-6 max-w-3xl">
              Smart Complaint Management System of Cities is a web-based
              platform designed to connect citizens with administration
              through a structured complaint reporting and tracking system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <Link
                to="/report-complaint"
                className="px-7 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-center transition"
              >
                Try the System →
              </Link>

              <Link
                to="/services"
                className="px-7 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 text-white font-semibold text-center transition"
              >
                View Services
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* PROJECT OVERVIEW */}

      <section className="px-6 md:px-12 lg:px-20 py-20">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>

              <p className="text-cyan-600 text-sm font-bold uppercase tracking-widest">
                Project Overview
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">
                One system for the complete complaint lifecycle
              </h2>

              <p className="text-slate-500 leading-7 mt-5">
                SmartCity provides separate interfaces for citizens and
                administrators. Citizens can submit and track complaints,
                while administrators can review and manage them.
              </p>

              <p className="text-slate-500 leading-7 mt-4">
                The system stores complaint information in a centralized
                database and maintains the complaint status throughout
                its lifecycle.
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">

              <div className="space-y-4">

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                  <span className="text-2xl">👤</span>
                  <div>
                    <p className="font-bold text-slate-900">
                      Citizen
                    </p>
                    <p className="text-sm text-slate-500">
                      Reports and tracks complaints
                    </p>
                  </div>
                </div>

                <div className="text-center text-cyan-600 font-bold">
                  ↓
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-cyan-50">
                  <span className="text-2xl">🗄️</span>
                  <div>
                    <p className="font-bold text-slate-900">
                      SmartCity System
                    </p>
                    <p className="text-sm text-slate-500">
                      Stores and manages complaint information
                    </p>
                  </div>
                </div>

                <div className="text-center text-cyan-600 font-bold">
                  ↓
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                  <span className="text-2xl">👨‍💼</span>
                  <div>
                    <p className="font-bold text-slate-900">
                      Administrator
                    </p>
                    <p className="text-sm text-slate-500">
                      Reviews and updates complaints
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* MODULES */}

      <section className="bg-white border-y border-slate-200 px-6 md:px-12 lg:px-20 py-20">

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-12">

            <p className="text-cyan-600 text-sm font-bold uppercase tracking-widest">
              Project Modules
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">
              What we built
            </h2>

            <p className="text-slate-500 mt-4 leading-7">
              The major modules that make up the SmartCity complaint
              management system.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {modules.map((module, index) => (

              <div
                key={index}
                className="border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all"
              >

                <div className="flex items-center justify-between">

                  <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-2xl">
                    {module.icon}
                  </div>

                  <span className="text-xs font-bold text-cyan-600">
                    MODULE 0{index + 1}
                  </span>

                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-6">
                  {module.title}
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  {module.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* TECHNOLOGY */}

      <section className="px-6 md:px-12 lg:px-20 py-20">

        <div className="max-w-7xl mx-auto">

          <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 rounded-3xl p-8 md:p-12">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              <div>

                <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest">
                  Technology Stack
                </p>

                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">
                  Built using the MERN stack
                </h2>

                <p className="text-slate-400 mt-5 leading-7">
                  The project uses modern JavaScript technologies for
                  the frontend, backend, API layer and database.
                </p>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {technologies.map((technology, index) => (

                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5"
                  >

                    <div className="text-2xl">
                      {technology[0]}
                    </div>

                    <h3 className="text-white font-bold mt-4">
                      {technology[1]}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                      {technology[2]}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* WORKFLOW */}

      <section className="px-6 md:px-12 lg:px-20 pb-20">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">

            <p className="text-cyan-600 text-sm font-bold uppercase tracking-widest">
              System Workflow
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">
              How the project operates
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

            {[
              ["01", "Login", "Citizen authenticates"],
              ["02", "Report", "Complaint is submitted"],
              ["03", "Review", "Admin reviews complaint"],
              ["04", "Update", "Status is updated"],
              ["05", "Track", "Citizen follows progress"],
            ].map((item, index) => (

              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl p-6 text-center"
              >

                <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-extrabold">
                  {item[0]}
                </div>

                <h3 className="font-bold text-slate-900 mt-4">
                  {item[1]}
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {item[2]}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="px-6 md:px-12 lg:px-20 pb-20">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Explore the SmartCity system
          </h2>

          <p className="text-slate-500 mt-4">
            Experience the citizen complaint workflow.
          </p>

          <Link
            to="/report-complaint"
            className="inline-flex items-center gap-2 mt-7 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold transition"
          >
            Start a Complaint
            <span>→</span>
          </Link>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-[#071827] text-slate-400 py-10 px-6">

        <div className="max-w-7xl mx-auto text-center">

          <h3 className="text-xl font-bold text-white">
            Smart<span className="text-cyan-400">City</span>
          </h3>

          <p className="text-sm mt-2">
            Smart Complaint Management System
          </p>

          <p className="text-xs text-slate-500 mt-5">
            © 2026 SmartCity. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
};

export default PortfolioPage;