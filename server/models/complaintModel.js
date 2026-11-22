import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Roads",
        "Garbage",
        "Street Lights",
        "Water",
        "Drainage",
        "Other",
      ],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved",
        "Rejected",
      ],
      default: "Pending",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: String,
      default: "",
    },

    adminRemark: {
      type: String,
      default: "",
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model(
  "Complaint",
  complaintSchema
);

export default Complaint;