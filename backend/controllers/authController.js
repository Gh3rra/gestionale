import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("LOGINNIAMO");

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  console.log("LOGINNIAMO PT2");

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("LOGINNIAMO PT3");

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("LOGINNIAMO PT4");

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });
    // Optionally, you can also send the token in the response body
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profileImg: user.profile_img,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const register = async (req, res) => {
  const { name, email, password, profileImg } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profile_img: profileImg,
      },
    });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });
    return res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  // Clear the cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logout successful" });
};

export const getUser = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        profile_img: true,
      },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User retrieved successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profileImg: user.profile_img,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
