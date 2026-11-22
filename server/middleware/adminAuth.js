export const isAdmin = (req, res, next) => {
  try {
    console.log("========== ADMIN CHECK ==========");

    console.log("USER ID:", req.userId);
    console.log("USER ROLE:", req.userRole);

    // Check admin role
    if (req.userRole !== "admin") {
      console.log("ACCESS DENIED - NOT ADMIN");

      return res.status(403).json({
        message: "Admin access required",
      });
    }

    console.log("ADMIN ACCESS GRANTED");

    next();
  } catch (error) {
    console.error(
      "ADMIN AUTH ERROR:",
      error
    );

    return res.status(403).json({
      message: "Admin access denied",
    });
  }
};