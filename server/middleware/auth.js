import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  try {
    console.log("========== AUTH CHECK ==========");

    console.log("COOKIES:", req.cookies);

    const token = req.cookies?.token;

    // Check token
    if (!token) {
      console.log("TOKEN NOT FOUND");

      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("TOKEN VALID");
    console.log("USER ID:", decoded.userId);
    console.log("USER ROLE:", decoded.role);

    // Store user information in request
    req.userId = decoded.userId;

    // Existing users without role are treated as normal users
    req.userRole = decoded.role || "user";

    next();
  } catch (error) {
    console.error(
      "Authentication error:",
      error
    );

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};