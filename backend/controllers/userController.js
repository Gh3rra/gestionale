import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  // Logic to get all users
  res.status(200).json({ message: "All users fetched successfully" });
};

export const createUser = async (req, res) => {
  // Logic to create a new user
  // Assuming req.body contains the necessary data

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  if (!user) {
    return res.status(500).json({ message: "Error creating user" });
  }
  return res.status(201).json({
    message: "User created successfully",
    user: {
      name,
      email,
      password,
    },
  });
};
