import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const PricingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      icon: "📝",
      title: "Report Complaints",
      description:
        "Submit civic complaints with important issue details.",
    },
    {
      icon: "🔎",
      title: "Track Complaints",
      description:
        "Monitor the current status of your submitted complaints.",
    },
    {
      icon: "📋",
      title: "Complaint History",
      description:
        "View your previously submitted complaints in one place.",
    },
    {
      icon: "📍",
      title: "Location Details",
      description:
        "Provide the location of an issue for easier identification.",
    },
    {
      icon: "🔔",
      title: "Status Updates",
      description:
        "Stay informed when complaint information is updated.",
    },
    {
      icon: "👤",
      title: "Citizen Profile",
      description:
        "Manage your personal account information.",
    },
  ];

  const faqs = [
    {
      question: "Is SmartCity free for citizens?",
      answer:
        "Yes. The citizen access provided through this project is free and does not require a monthly or yearly subscription.",
    },
    {
      question: "Do I need an account to submit a complaint?",
      answer:
        "Yes. Citizens need to create an account and log in before submitting complaints.",
    },
    {
      question: "Can I track my complaint?",
      answer:
        "Yes. After submitting a complaint, citizens can view their complaints and check their available status information.",
    },
    {
      question: "Is there a separate admin system?",
      answer:
        "Yes. SmartCity includes a protected administration area where authorized administrators can review and manage complaints.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900">

        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-cyan-400/10"></div>

        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full border border-blue-400/10"></div>

        <div className="absolute top-24 right-[20%] w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-24">

          <div className="max-w-3xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20">

              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>

              <span className="text-cyan-300 text-sm font-semibold">
                Simple & Transparent
              </span>

            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mt-6">

              Simple pricing for a
              <span className="text-cyan-400">
                {" "}smarter city.
              </span>

            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-8 mt-6 max-w-2xl mx-auto">
              SmartCity provides citizens with free access to the
              complaint management platform without requiring a
              subscription plan.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN PRICING SECTION
      ====================================================== */}

      <section className="px-6 md:px-12 lg:px-20 py-20">

        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

            {/* LEFT INFO */}

            <div className="hidden lg:flex flex-col justify-center bg-white border border-slate-200 rounded-3xl p-8">

              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-2xl">
                👥
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 mt-6">
                Built for citizens
              </h2>

              <p className="text-slate-500 leading-7 mt-3">
                Access the core SmartCity complaint features without
                choosing between multiple subscription plans.
              </p>

              <div className="mt-7 space-y-4">

                <div className="flex items-center gap-3">
                  <span className="text-emerald-500">✓</span>
                  <span className="text-sm text-slate-600">
                    No monthly plan
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-emerald-500">✓</span>
                  <span className="text-sm text-slate-600">
                    No yearly subscription
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-emerald-500">✓</span>
                  <span className="text-sm text-slate-600">
                    One citizen account
                  </span>
                </div>

              </div>

            </div>

            {/* PRICING CARD */}

            <div className="lg:col-span-1">

              <div className="relative bg-white rounded-3xl border-2 border-cyan-400 shadow-xl overflow-hidden h-full">

                {/* BADGE */}

                <div className="absolute top-5 right-5">

                  <span className="px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold">
                    FREE
                  </span>

                </div>

                {/* CARD TOP */}

                <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 text-center px-7 py-9">

                  <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-3xl">
                    🏙️
                  </div>

                  <p className="text-cyan-400 text-xs uppercase tracking-widest font-bold mt-5">
                    Citizen Plan
                  </p>

                  <h2 className="text-2xl font-extrabold text-white mt-2">
                    SmartCity Citizen
                  </h2>

                  <div className="mt-6">

                    <span className="text-6xl font-extrabold text-white">
                      ₹0
                    </span>

                  </div>

                  <p className="text-cyan-300 text-sm font-semibold mt-2">
                    Free citizen access
                  </p>

                </div>

                {/* CARD CONTENT */}

                <div className="p-7">

                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                    What's included
                  </p>

                  <div className="mt-5 space-y-4">

                    {[
                      "Create citizen account",
                      "Report civic complaints",
                      "Track complaint status",
                      "View complaint history",
                      "Provide issue location",
                      "Receive available updates",
                    ].map((item, index) => (

                      <div
                        key={index}
                        className="flex items-center gap-3"
                      >

                        <span className="w-7 h-7 shrink-0 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
                          ✓
                        </span>

                        <span className="text-sm text-slate-700">
                          {item}
                        </span>

                      </div>

                    ))}

                  </div>

                  <Link
                    to="/signup"
                    className="w-full mt-7 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-cyan-600 text-white py-3.5 rounded-xl font-bold transition"
                  >
                    Get Started
                    <span>→</span>
                  </Link>

                </div>

              </div>

            </div>

            {/* RIGHT INFO */}

            <div className="hidden lg:flex flex-col justify-center bg-slate-900 rounded-3xl p-8 text-white">

              <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-2xl">
                🏛️
              </div>

              <h2 className="text-2xl font-extrabold mt-6">
                Administration
              </h2>

              <p className="text-slate-400 leading-7 mt-3">
                City administrators use a separate protected interface
                to review and manage citizen complaints.
              </p>

              <div className="mt-7">

                <div className="flex items-center gap-3">

                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>

                  <span className="text-sm text-slate-300">
                    Protected admin access
                  </span>

                </div>

              </div>

              <div className="mt-7 pt-6 border-t border-white/10">

                <p className="text-xs text-slate-500 uppercase tracking-widest">
                  Admin features
                </p>

                <p className="text-sm text-slate-400 mt-3">
                  Complaint review, filtering, status management and
                  complaint administration.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          VALUE STRIP
      ====================================================== */}

      <section className="px-6 md:px-12 lg:px-20 pb-20">

        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">

              <div className="text-3xl">
                ₹0
              </div>

              <h3 className="font-bold text-slate-900 mt-3">
                Citizen Cost
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                No subscription required
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">

              <div className="text-3xl">
                ∞
              </div>

              <h3 className="font-bold text-slate-900 mt-3">
                Access
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Available without paid plans
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">

              <div className="text-3xl">
                ✓
              </div>

              <h3 className="font-bold text-slate-900 mt-3">
                Core Features
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Complaint tools included
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}

      <section className="bg-white border-y border-slate-200 px-6 md:px-12 lg:px-20 py-20">

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-12">

            <p className="text-cyan-600 text-sm font-bold uppercase tracking-widest">
              Included
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">
              Everything you need to report
            </h2>

            <p className="text-slate-500 mt-4 leading-7">
              The citizen plan includes the core functionality required
              to use the SmartCity complaint system.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {features.map((feature, index) => (

              <div
                key={index}
                className="group bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:bg-white hover:border-cyan-200 hover:shadow-lg transition-all duration-300"
              >

                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl group-hover:bg-cyan-50 transition">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-5">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-2">
                  {feature.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="px-6 md:px-12 lg:px-20 py-20">

        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">

            <p className="text-cyan-600 text-sm font-bold uppercase tracking-widest">
              FAQ
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">
              Frequently asked questions
            </h2>

          </div>

          <div className="space-y-4">

            {faqs.map((faq, index) => (

              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
              >

                <button
                  onClick={() =>
                    setOpenFaq(
                      openFaq === index ? null : index
                    )
                  }
                  className="w-full flex items-center justify-between gap-5 px-6 py-5 text-left"
                >

                  <span className="font-bold text-slate-900">
                    {faq.question}
                  </span>

                  <span className="text-cyan-600 text-xl shrink-0">
                    {openFaq === index ? "−" : "+"}
                  </span>

                </button>

                {openFaq === index && (
                  <div className="px-6 pb-5">

                    <p className="text-sm text-slate-500 leading-7">
                      {faq.answer}
                    </p>

                  </div>
                )}

              </div>

            ))}

          </div>

        </div>

      </section>

      
      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-[#071827] text-slate-400 px-6 py-10">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            <div className="text-center md:text-left">

              <h3 className="text-xl font-bold text-white">
                Smart<span className="text-cyan-400">
                  City
                </span>
              </h3>

              <p className="text-sm mt-2">
                Smart Complaint Management System
              </p>

            </div>

            <div className="flex items-center gap-6 text-sm">

              <Link
                to="/services"
                className="hover:text-cyan-400 transition"
              >
                Services
              </Link>

              <Link
                to="/portfolio"
                className="hover:text-cyan-400 transition"
              >
                Portfolio
              </Link>

              <Link
                to="/pricing"
                className="text-cyan-400"
              >
                Pricing
              </Link>

            </div>

          </div>

          <div className="border-t border-white/10 mt-8 pt-6 text-center">

            <p className="text-xs text-slate-500">
              © 2026 SmartCity. All rights reserved.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default PricingPage;