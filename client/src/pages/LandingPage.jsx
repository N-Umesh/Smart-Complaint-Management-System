import React from "react";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">

      <Navbar />

      <div
        className="min-h-[calc(100vh-110px)] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('/bakcground----.jpg')",
        }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-20 text-white max-w-4xl">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Smart Complaint
            <br />
            Management of Cities
          </h1>

          <p className="text-lg md:text-xl mt-6 leading-relaxed">
            Empowering citizens and city officials with a seamless platform
            to report, track, and resolve civic issues — from potholes to
            public lighting — all in real-time.
          </p>

        </div>

      </div>

    </div>
  );
};

export default LandingPage;