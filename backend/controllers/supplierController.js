import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllSuppliers = async (req, res) => {
  // Logic to get all commissions
  res.status(200).json({ message: "All commissions fetched successfully" });
};

export const insertSupplier = async (req, res) => {
  // Logic to create a new supplier
  // Assuming req.body contains the necessary data
  const {
    name,
    ivaCode,
    address,
    city,
    cap,
    province,
    phone,
    email,
    pec,
    profileImg,
  } = req.body;

  if (
    !name ||
    !ivaCode ||
    !address ||
    !city ||
    !cap ||
    !province ||
    !phone ||
    !email ||
    !pec
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const supplier = await prisma.supplier.create({
    data: {
      name,
      ivaCode,
      address,
      city,
      cap,
      province,
      phone,
      email,
      pec,
      profileImg: profileImg,
      user: {
        connect: {
          id: req.user.id,
        },
      },
    },
  });
  if (!supplier) {
    return res.status(500).json({ message: "Error creating supplier" });
  }

  return res.status(201).json({
    supplier,
  });
};
