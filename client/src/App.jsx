import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";

import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import PricingPage from "./pages/PricingPage";

import TrackComplaint from "./pages/TrackComplaint";
import ReportComplaint from "./pages/ReportComplaint";
import MyComplaints from "./pages/MyComplaints";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import AdminLogin from "./pages/AdminLogin";

import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Routes>

      {/* ================= USER ================= */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/services"
        element={<ServicesPage />}
      />

      <Route
        path="/portfolio"
        element={<PortfolioPage />}
      />

      <Route
        path="/pricing"
        element={<PricingPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/signup"
        element={<SignupPage />}
      />

      <Route
        path="/profile"
        element={<ProfilePage />}
      />

      <Route
        path="/report-complaint"
        element={<ReportComplaint />}
      />

      <Route
        path="/my-complaints"
        element={<MyComplaints />}
      />

      <Route
        path="/track-complaint"
        element={<TrackComplaint />}
      />

      <Route
        path="/notifications"
        element={<Notifications />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin-dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin-dashboard/complaints"
        element={
          <AdminRoute>
            <AdminComplaints />
          </AdminRoute>
        }
      />

    </Routes>
  );
}

export default App;