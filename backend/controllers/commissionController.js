/* import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); */

export const getAllCommissions = async (req, res) => {
  // Logic to get all commissions
  res.status(200).json({ message: "All commissions fetched successfully" });
};

export const createCommission = async (req, res) => {
  // Logic to create a new commission
  // Assuming req.body contains the necessary data

  /* const {
    title,
    stateId,
    address,
    city,
    cap,
    province,
    requestDate,
    startWorkDate,
    endWorkDate,
    userId,
  } = req.body;
  if (!title || !stateId || !requestDate || !userId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await prisma.commission.create({
    data: {
      title,
      stateId,
      address,
      city,
      cap,
      province,
      requestDate,
      startWorkDate,
      endWorkDate,
      userId,
    },
  });
  if (!user) {
    return res.status(500).json({ message: "Error creating commission" });
  }
  return res.status(201).json({
    message: "Commission created successfully",
    commission: {
      title,
      stateId,
      address,
      city,
      cap,
      province,
      requestDate,
      startWorkDate,
      endWorkDate,
      userId,
    },
  }); */
};

