import express from "express";

import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

import {
  protectRoute,
} from "../middleware/auth.js";

import {
  isAdmin,
} from "../middleware/adminAuth.js";

import upload from "../middleware/upload.js";

const complaintRouter = express.Router();


// =====================================================
// USER - CREATE COMPLAINT
// =====================================================

complaintRouter.post(
  "/",
  protectRoute,
  upload.single("image"),
  createComplaint
);


// =====================================================
// USER - MY COMPLAINTS
// =====================================================

complaintRouter.get(
  "/my",
  protectRoute,
  getMyComplaints
);


// =====================================================
// ADMIN - ALL COMPLAINTS
// IMPORTANT: /all MUST COME BEFORE /:id
// =====================================================

complaintRouter.get(
  "/all",
  protectRoute,
  isAdmin,
  getAllComplaints
);


// =====================================================
// ADMIN - UPDATE COMPLAINT STATUS
// =====================================================

complaintRouter.put(
  "/:id/status",
  protectRoute,
  isAdmin,
  updateComplaintStatus
);


// =====================================================
// USER - SINGLE COMPLAINT
// MUST COME AFTER /all
// =====================================================

complaintRouter.get(
  "/:id",
  protectRoute,
  getComplaintById
);


export default complaintRouter;