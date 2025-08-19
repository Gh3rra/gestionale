import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { env } from "../config/env.js";
const prisma = new PrismaClient();

const s3 = new S3Client({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  region: env.AWS_REGION,
});

export const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliersRaw = await prisma.supplier.findMany({
      where: {
        userId: req.user?.id,
      },
    });

    const suppliers = await Promise.all(
      suppliersRaw.map(async (supplier: any) => {
        const url = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: supplier.profileImg !== null ? supplier.profileImg : undefined,
          }),
          { expiresIn: 3600 }
        ); // URL expires in 1 hour
        return {
          ...supplier,
          profileImg: url, // Ensure profileImg is not undefined
        };
      })
    );
    res
      .status(200)
      .json({ message: "All commissions fetched successfully", suppliers });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ message: "Error fetching suppliers" });
  }
};

export const getSupplier = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Logic to fetch a private customer by user ID
    const supplierRaw = await prisma.supplier.findFirst({
      where: {
        id: Number(req.params.id), // Assuming the ID is passed as a query parameter
        userId: req.user?.id,
      },
    });

    if (!supplierRaw) {
      return res.status(404).json({ message: "Private supplier not found" });
    }
    const url = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key:
          supplierRaw.profileImg !== null ? supplierRaw.profileImg : undefined, // Replace with your actual image path
      }),
      { expiresIn: 3600 } // URL expires in 1 hour
    );
    const supplier = {
      ...supplierRaw,
      profileImg: url, // Ensure profileImg is not undefined
    };

    if (!supplier) {
      return res.status(404).json({ message: "Private supplier not found" });
    }

    return res.status(200).json({
      message: "Private supplier fetched successfully",

      supplier,
    });
  } catch (error) {
    console.error("Error fetching supplier:", error);
    return res.status(500).json({ message: "Error fetching supplier" });
  }
};

export const insertSupplier = async (
  req: Request,
  res: Response
): Promise<any> => {
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
          id: req.user?.id,
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
