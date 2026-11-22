import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ==============================
// SIGNUP
// ==============================
export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      branch,
      year,
      skills,
      interests,
      bio,
      github,
      linkedin,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Never accept role from signup
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      branch: branch || "",
      year: year || "",
      skills: skills || [],
      interests: interests || [],
      bio: bio || "",
      github: github || "",
      linkedin: linkedin || "",
      role: "user",
    });

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: "user",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: "user",
      },
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    return res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
};

// ==============================
// LOGIN
// ==============================
export const login = async (req, res) => {
  try {
    console.log("========== LOGIN ==========");

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Existing users without role are normal users
    const userRole = user.role || "user";

    console.log("LOGIN USER:", user.email);
    console.log("LOGIN ROLE:", userRole);

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: userRole,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: userRole,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

// ==============================
// CHECK AUTH
// ==============================
export const checkAuth = async (req, res) => {
  try {
    console.log("========== CHECK AUTH ==========");
    console.log("USER ID:", req.userId);

    const user = await User.findById(
      req.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userRole = user.role || "user";

    console.log("CHECK AUTH USER:", user.email);
    console.log("CHECK AUTH ROLE:", userRole);

    return res.status(200).json({
      user: {
        ...user.toObject(),
        role: userRole,
      },
    });
  } catch (error) {
    console.error(
      "CHECK AUTH ERROR:",
      error
    );

    return res.status(500).json({
      message: "Failed to check authentication",
      error: error.message,
    });
  }
};

// ==============================
// UPDATE PROFILE
// ==============================
export const updateProfile = async (
  req,
  res
) => {
  try {
    const {
      name,
      branch,
      year,
      skills,
      interests,
      bio,
      github,
      linkedin,
    } = req.body;

    const user = await User.findById(
      req.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (branch !== undefined) {
      user.branch = branch;
    }

    if (year !== undefined) {
      user.year = year;
    }

    if (skills !== undefined) {
      user.skills = skills;
    }

    if (interests !== undefined) {
      user.interests = interests;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    if (github !== undefined) {
      user.github = github;
    }

    if (linkedin !== undefined) {
      user.linkedin = linkedin;
    }

    // Never update role here
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        ...user.toObject(),
        password: undefined,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// ==============================
// LOGOUT
// ==============================
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
};