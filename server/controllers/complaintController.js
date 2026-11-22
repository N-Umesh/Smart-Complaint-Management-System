import Complaint from "../models/complaintModel.js";


// =====================================================
// CREATE COMPLAINT
// =====================================================

export const createComplaint = async (
  req,
  res
) => {
  try {

    console.log(
      "========== CREATE COMPLAINT =========="
    );

    console.log(
      "BODY:",
      req.body
    );

    console.log(
      "FILE:",
      req.file
    );

    console.log(
      "USER:",
      req.userId
    );


    if (!req.body) {
      return res.status(400).json({
        message:
          "Complaint data is missing",
      });
    }


    const {
      title,
      description,
      category,
      location,
      city,
    } = req.body;


    if (
      !title ||
      !description ||
      !category ||
      !location
    ) {
      return res.status(400).json({
        message:
          "Please fill all required fields",
      });
    }


    if (!req.userId) {
      return res.status(401).json({
        message:
          "User authentication information is missing",
      });
    }


    const complaintId =
      "CMP-" +
      Date.now()
        .toString()
        .slice(-6);


    const complaint =
      await Complaint.create({

        complaintId,

        title:
          title.trim(),

        description:
          description.trim(),

        category,

        location:
          location.trim(),

        city:
          city
            ? city.trim()
            : "",

        image:
          req.file
            ? req.file.filename
            : "",

        status:
          "Pending",

        user:
          req.userId,

      });


    console.log(
      "Complaint created:",
      complaint.complaintId
    );


    return res.status(201).json({

      message:
        "Complaint submitted successfully",

      complaint,

    });

  } catch (error) {

    console.error(
      "CREATE COMPLAINT ERROR:",
      error
    );

    return res.status(500).json({

      message:
        "Failed to create complaint",

      error:
        error.message,

    });
  }
};



// =====================================================
// GET MY COMPLAINTS
// =====================================================

export const getMyComplaints = async (
  req,
  res
) => {
  try {

    const complaints =
      await Complaint.find({
        user: req.userId,
      })
      .sort({
        createdAt: -1,
      });


    return res.status(200).json({
      complaints,
    });

  } catch (error) {

    console.error(
      "GET MY COMPLAINTS ERROR:",
      error
    );

    return res.status(500).json({

      message:
        "Failed to fetch complaints",

      error:
        error.message,

    });
  }
};



// =====================================================
// GET ALL COMPLAINTS
// =====================================================

export const getAllComplaints = async (
  req,
  res
) => {
  try {

    console.log(
      "========== GET ALL COMPLAINTS =========="
    );


    const complaints =
      await Complaint.find()
        .populate(
          "user",
          "name email"
        )
        .sort({
          createdAt: -1,
        });


    console.log(
      "TOTAL COMPLAINTS:",
      complaints.length
    );


    return res.status(200).json({

      complaints,

    });

  } catch (error) {

    console.error(
      "GET ALL COMPLAINTS ERROR:",
      error
    );

    return res.status(500).json({

      message:
        "Failed to fetch complaints",

      error:
        error.message,

    });
  }
};



// =====================================================
// GET SINGLE COMPLAINT
// =====================================================

export const getComplaintById = async (
  req,
  res
) => {
  try {

    const complaint =
      await Complaint.findOne({
        complaintId:
          req.params.id,
      })
      .populate(
        "user",
        "name email"
      );


    if (!complaint) {

      return res.status(404).json({
        message:
          "Complaint not found",
      });

    }


    return res.status(200).json({
      complaint,
    });

  } catch (error) {

    console.error(
      "GET COMPLAINT ERROR:",
      error
    );

    return res.status(500).json({

      message:
        "Failed to fetch complaint",

      error:
        error.message,

    });
  }
};



// =====================================================
// UPDATE COMPLAINT STATUS
// =====================================================

export const updateComplaintStatus =
  async (
    req,
    res
  ) => {

    try {

      const {
        status,
        adminRemark,
        assignedTo,
      } = req.body;


      const allowedStatuses = [
        "Pending",
        "In Progress",
        "Resolved",
        "Rejected",
      ];


      if (
        !allowedStatuses.includes(
          status
        )
      ) {

        return res.status(400).json({
          message:
            "Invalid complaint status",
        });

      }


      const complaint =
        await Complaint.findOne({
          complaintId:
            req.params.id,
        });


      if (!complaint) {

        return res.status(404).json({
          message:
            "Complaint not found",
        });

      }


      complaint.status =
        status;


      if (
        adminRemark !== undefined
      ) {

        complaint.adminRemark =
          adminRemark;

      }


      if (
        assignedTo !== undefined
      ) {

        complaint.assignedTo =
          assignedTo;

      }


      if (
        status === "Resolved"
      ) {

        complaint.resolvedAt =
          new Date();

      } else {

        complaint.resolvedAt =
          null;

      }


      await complaint.save();


      return res.status(200).json({

        message:
          "Complaint status updated successfully",

        complaint,

      });

    } catch (error) {

      console.error(
        "UPDATE STATUS ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to update complaint",

        error:
          error.message,

      });
    }
  };