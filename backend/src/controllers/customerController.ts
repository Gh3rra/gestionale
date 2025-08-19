import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"; // Importing S3Client for AWS S3 operations
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "../config/env.js";
import { Request, Response } from "express";

const s3 = new S3Client({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  region: env.AWS_REGION,
});

export const getAllCustomers = async (
  req: Request,
  res: Response
): Promise<any> => {
  // Logic to fetch all customers
  const privateCustomersRaw = await prisma.privateCustomer.findMany({
    where: {
      userId: req.user?.id,
    },
  });

  const privateCustomers = await Promise.all(
    privateCustomersRaw.map(async (customer:any) => {
      const url = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: customer.profileImg !== null ? customer.profileImg : undefined, // Replace with your actual image path
        }),
        { expiresIn: 3600 }
      ); // URL expires in 1 hour
      return {
        ...customer,
        profileImg: url, // Ensure profileImg is not undefined
        type: "private", // Ensure profileImg is not undefined
      };
    })
  );

  const juridicalCustomersRaw = await prisma.juridicalCustomer.findMany({
    where: {
      userId: req.user?.id,
    },
  });
  const juridicalCustomers = await Promise.all(
    juridicalCustomersRaw.map(async (customer:any) => {
      const url = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: customer.profileImg !== null ? customer.profileImg : undefined, // Replace with your actual image path
        }),
        { expiresIn: 3600 }
      );
      return {
        ...customer,
        profileImg: url,
        type: "juridical", // Ensure profileImg is not undefined
      };
    })
  );
  res.status(200).json({
    message: "All customers fetched successfully",
    privateCustomers,
    juridicalCustomers,
  });
};

export const getPrivateCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
  // Logic to fetch a private customer by user ID
  const privateCustomerRaw = await prisma.privateCustomer.findFirst({
    where: {
      id: Number(req.params.id), // Assuming the ID is passed as a query parameter
      userId: req.user?.id,
    },
  });

  if (!privateCustomerRaw) {
    return res.status(404).json({ message: "Private customer not found" });
  }

  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key:
        privateCustomerRaw.profileImg !== null
          ? privateCustomerRaw.profileImg
          : undefined, // Replace with your actual image path
    }),
    { expiresIn: 3600 } // URL expires in 1 hour
  );
  const privateCustomer = {
    ...privateCustomerRaw,
    profileImg: url, // Ensure profileImg is not undefined
    type: "private",
  };

  if (!privateCustomer) {
    return res.status(404).json({ message: "Private customer not found" });
  }

  return res.status(200).json({
    message: "Private customer fetched successfully",
    customer: privateCustomer,
  });
};
export const getJuridicalCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
  // Logic to fetch a juridical customer by user ID
  const juridicalCustomerRaw = await prisma.juridicalCustomer.findFirst({
    where: {
      id: Number(req.params.id), // Assuming the ID is passed as a query parameter
      userId: req.user?.id,
    },
  });
  if (!juridicalCustomerRaw) {
    return res.status(404).json({ message: "Juridical customer not found" });
  }
  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key:
        juridicalCustomerRaw.profileImg !== null
          ? juridicalCustomerRaw.profileImg
          : undefined, // Replace with your actual image path
    }),
    { expiresIn: 3600 } // URL expires in 1 hour
  );
  const juridicalCustomer = {
    ...juridicalCustomerRaw,
    profileImg: url, // Ensure profileImg is not undefined
    type: "juridical",
  };

  if (!juridicalCustomer) {
    return res.status(404).json({ message: "Juridical customer not found" });
  }

  return res.status(200).json({
    message: "Juridical customer fetched successfully",
    customer: juridicalCustomer,
  });
};

export const insertPrivateCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
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
          id: req.user?.id,
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

export const insertJuridicalCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
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
          id: req.user?.id,
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
