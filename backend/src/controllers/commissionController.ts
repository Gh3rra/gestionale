import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getAllCommissions = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const commissionsRaw = await prisma.commission.findMany({
      where: {
        userId: req.user?.id, // Assuming user ID is stored in req.user
      },
      include: {
        CommissionPrivateCustomer: {
          include: {
            privateCustomer: true,
          },
        },
        CommissionJuridicalCustomer: {
          include: {
            juridicalCustomer: true,
          },
        },
        state: true,
      },
      orderBy: { requestDate: "desc" },
    });

    const commissions = commissionsRaw.map((commission) => {
      const privateCustomer = commission.CommissionPrivateCustomer
        ?.privateCustomer
        ? {
            ...commission.CommissionPrivateCustomer?.privateCustomer,
            type: "private" as const,
          }
        : undefined;
      const juridicalCustomer = commission.CommissionJuridicalCustomer
        ?.juridicalCustomer
        ? {
            ...commission.CommissionJuridicalCustomer?.juridicalCustomer,
            type: "juridical" as const,
          }
        : undefined;
      if (privateCustomer) console.log("Private Customer: ", privateCustomer);

      return {
        id: commission.id,
        number: commission.number,
        title: commission.title,
        description: commission.description,
        stateId: commission.stateId,
        initialOfferPrice: commission.initialOfferPrice,
        requestDate: commission.requestDate
          ? new Date(commission.requestDate)
          : null,
        startWorkDate: commission.startWorkDate
          ? new Date(commission.startWorkDate)
          : null,
        endWorkDate: commission.endWorkDate
          ? new Date(commission.endWorkDate)
          : null,
        address: commission.address,
        cap: commission.cap,
        city: commission.city,
        province: commission.province,
        createdAt: new Date(commission.createdAt),
        updatedAt: new Date(commission.updatedAt),
        customer: privateCustomer || juridicalCustomer,
      };
    });

    return res.status(200).json({
      message: "Commissions fetched ",
      commissions,
    });
  } catch (error) {
    console.error("Error fetching commissions: ", error);
    return res.status(500).json({ message: "Error fetching commissions" });
  }
};

export const getCommission = async (
  req: Request,
  res: Response
): Promise<any> => {

  try {
    const commissionRaw = await prisma.commission.findFirst({
      where: {
        id: Number(req.params.id), // Assuming user ID is stored in req.user
        userId: req.user?.id, // Filter by user ID
      },
      include: {
        CommissionPrivateCustomer: {
          include: {
            privateCustomer: true,
          },
        },
        CommissionJuridicalCustomer: {
          include: {
            juridicalCustomer: true,
          },
        },
        state: true,
      },
      orderBy: { requestDate: "desc" },
    });

    const privateCustomer = commissionRaw.CommissionPrivateCustomer
      ?.privateCustomer
      ? {
          ...commissionRaw.CommissionPrivateCustomer?.privateCustomer,
          type: "private" ,
        }
      : undefined;
    const juridicalCustomer = commissionRaw.CommissionJuridicalCustomer
      ?.juridicalCustomer
      ? {
          ...commissionRaw.CommissionJuridicalCustomer?.juridicalCustomer,
          type: "juridical" ,
        }
      : undefined;
    if (privateCustomer) console.log("Private Customer: ", privateCustomer);

    const commission = {
      id: commissionRaw.id,
      number: commissionRaw.number,
      title: commissionRaw.title,
      description: commissionRaw.description,
      stateId: commissionRaw.stateId,
      initialOfferPrice: commissionRaw.initialOfferPrice,
      requestDate: commissionRaw.requestDate
        ? new Date(commissionRaw.requestDate)
        : null,
      startWorkDate: commissionRaw.startWorkDate
        ? new Date(commissionRaw.startWorkDate)
        : null,
      endWorkDate: commissionRaw.endWorkDate
        ? new Date(commissionRaw.endWorkDate)
        : null,
      address: commissionRaw.address,
      cap: commissionRaw.cap,
      city: commissionRaw.city,
      province: commissionRaw.province,
      createdAt: new Date(commissionRaw.createdAt),
      updatedAt: new Date(commissionRaw.updatedAt),
      customer: privateCustomer || juridicalCustomer,
    };

    return res.status(200).json({
      message: "Commissions fetched ",
      commission,
    });
  } catch (error) {
    console.error("Error fetching commissions: ", error);
    return res.status(500).json({ message: "Error fetching commissions" });
  }
};

export const createCommission = async (
  req: Request,
  res: Response
): Promise<any> => {
  // Logic to create a new commission
  // Assuming req.body contains the necessary data

  const { title, address, city, cap, province, requestDate, customer, number } =
    req.body;
  if (!title || !requestDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await prisma
    .$transaction(async (tx: Prisma.TransactionClient) => {
      const commission = await tx.commission.create({
        data: {
          title,
          stateId: 1, // Assuming a default state ID
          address,
          city,
          cap,
          province,
          requestDate,
          number,
          userId: req.user?.id,
        },
      });
      if (customer.type === "private") {
        await tx.commissionPrivateCustomer.create({
          data: {
            commissionId: commission.id,
            privateCustomerId: customer.id,
            userId: req.user?.id,
          },
        });
      } else {
        await tx.commissionJuridicalCustomer.create({
          data: {
            commissionId: commission.id,
            juridicalCustomerId: customer.id,
            userId: req.user?.id,
          },
        });
      }
    })
    .catch((error: Error) => {
      console.error("Transaction failed: ", error);
      return res.status(500).json({ message: "Transaction failed" });
    });

  return res.status(201).json({
    message: "Commission created successfully",
  });
};

export const getNextCommissionNumber = async (
  req: Request,
  res: Response
): Promise<any> => {
  // Logic to get the next commission number
console.log("HOLLAAA");

  try {
    const lastCommission = await prisma.commission.findFirst({
      orderBy: { number: "desc" },
    });
    const commissionNumber = lastCommission ? lastCommission.number + 1 : 1;
    return res.status(200).json({
      message: "Next commission number fetched successfully",
      commissionNumber,
    });
  } catch (error) {
    console.error("Error fetching next commission number: ", error);
    return res
      .status(500)
      .json({ message: "Error fetching next commission number" });
  }
};
