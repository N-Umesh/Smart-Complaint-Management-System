import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const ServicesPage = () => {
  const services = [
    {
      icon: "🛣️",
      title: "Roads & Potholes",
      description:
        "Report potholes, damaged roads, broken pavements and unsafe road conditions.",
      color: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      icon: "🗑️",
      title: "Garbage & Waste",
      description:
        "Report overflowing bins, garbage accumulation and waste collection problems.",
      color: "bg-green-50",
      text: "text-green-600",
    },
    {
      icon: "💡",
      title: "Street Lights",
      description:
        "Report damaged, broken or non-functioning street lights in your area.",
      color: "bg-yellow-50",
      text: "text-yellow-600",
    },
    {
      icon: "💧",
      title: "Water Supply",
      description:
        "Report water leakage, pipeline damage and water supply related issues.",
      color: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      icon: "🌊",
      title: "Drainage",
      description:
        "Report blocked drains, waterlogging and overflowing drainage systems.",
      color: "bg-cyan-50",
      text: "text-cyan-600",
    },
    {
      icon: "📌",
      title: "Other Civic Issues",
      description:
        "Report other public problems affecting your neighbourhood or city.",
      color: "bg-purple-50",
      text: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      {/* HERO */}

      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 text-white">

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">

          <div className="max-w-3xl">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Civic Services
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-6">
              Report problems.
              <br />
              <span className="text-cyan-400">
                Improve your city.
              </span>
            </h1>

            <p className="text-slate-300 text-lg leading-8 mt-6 max-w-2xl">
              SmartCity allows citizens to report common civic issues
              and provide the information needed to help administration
              manage them.
            </p>

            <Link
              to="/report-complaint"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition"
            >
              Report a Complaint
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section className="px-6 md:px-12 lg:px-20 py-20">

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-12">

            <p className="text-cyan-600 font-bold uppercase tracking-widest text-sm">
              Available Services
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">
              What can you report?
            </h2>

            <p className="text-slate-500 mt-4 leading-7">
              Choose a category that best describes the civic issue
              you want to report.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {services.map((service, index) => (

              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >

                <div className="flex items-center justify-between">

                  <div
                    className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center text-2xl`}
                  >
                    {service.icon}
                  </div>

                  <span className="text-xs font-bold text-slate-300">
                    0{index + 1}
                  </span>

                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-6">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  {service.description}
                </p>

                <Link
                  to="/report-complaint"
                  className={`inline-flex items-center gap-2 mt-6 ${service.text} font-bold text-sm`}
                >
                  Report Issue
                  <span>→</span>
                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* HOW SERVICE WORKS */}

      <section className="bg-white border-y border-slate-200 px-6 md:px-12 lg:px-20 py-20">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <p className="text-cyan-600 font-bold uppercase tracking-widest text-sm">
              Simple Process
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">
              How our services work
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {[
              ["01", "Select Service", "Choose the category that matches your civic issue."],
              ["02", "Submit Complaint", "Enter the problem details and location."],
              ["03", "Administration Review", "The complaint is reviewed and processed."],
              ["04", "Track Progress", "Follow the complaint until its final status."],
            ].map((item, index) => (

              <div key={index} className="text-center">

                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 text-cyan-400 flex items-center justify-center font-extrabold">
                  {item[0]}
                </div>

                <h3 className="font-bold text-slate-900 mt-5">
                  {item[1]}
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-2">
                  {item[2]}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="px-6 md:px-12 lg:px-20 py-20">

        <div className="max-w-4xl mx-auto text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-3xl">
            📢
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-6">
            Found a civic problem?
          </h2>

          <p className="text-slate-500 mt-4">
            Report it through SmartCity and help keep your
            neighbourhood better.
          </p>

          <Link
            to="/report-complaint"
            className="inline-flex items-center gap-2 mt-7 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold transition"
          >
            Report a Complaint
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

export default ServicesPage;