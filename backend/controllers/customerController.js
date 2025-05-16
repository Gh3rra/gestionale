import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCustomers = async (req, res) => {
  // Logic to get all commissions
  res.status(200).json({ message: "All commissions fetched successfully" });
};

export const insertPrivateCustomer = async (req, res) => {
  // Logic to create a new private customer
  // Assuming req.body contains the necessary data
  const {
    name,
    surname,
    gender,
    cf,
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
    !surname ||
    !gender ||
    !cf ||
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

  const privateCustomer = await prisma.privateCustomer.create({
    data: {
      name,
      surname,
      gender,
      cf,
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
  if (!privateCustomer) {
    return res.status(500).json({ message: "Error creating private customer" });
  }

  return res.status(201).json({
    privateCustomer,
  });
};

export const insertJuridicalCustomer = async (req, res) => {
  // Logic to create a new private customer
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

  const juridicalCustomer = await prisma.juridicalCustomer.create({
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
  if (!juridicalCustomer) {
    return res
      .status(500)
      .json({ message: "Error creating juridical customer" });
  }

  return res.status(201).json({
    juridicalCustomer,
  });
};
