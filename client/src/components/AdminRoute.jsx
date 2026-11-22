import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/check-auth",
          {
            withCredentials: true,
          }
        );

        const user = response.data.user;

        if (user?.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error(
          "ADMIN AUTH CHECK ERROR:",
          error
        );

        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div>

          <p className="text-white mt-4">
            Checking admin access...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <Navigate
        to="/admin-login"
        replace
      />
    );
  }

  return children;
};

export default AdminRoute;