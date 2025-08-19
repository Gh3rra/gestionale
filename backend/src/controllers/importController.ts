import { Prisma, PrismaClient } from "@prisma/client";
import { getDateFromExcel } from "../utils/utils.js";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const importMeasures = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { measures } = req.body;
    if (!measures || !Array.isArray(measures)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const createdMeasures = await prisma.unitMeasures.createMany({
      data: measures,
    });

    return res
      .status(201)
      .json({ message: "Measures imported successfully", createdMeasures });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const importPaymentMode = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { paymentMethods } = req.body;
    if (!paymentMethods || !Array.isArray(paymentMethods)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const createdPaymentModes = await prisma.paymentMethods.createMany({
      data: paymentMethods,
    });

    return res.status(201).json({
      message: "Payment modes imported successfully",
      createdPaymentModes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const importPaymentTerms = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { paymentTerms } = req.body;
    if (!paymentTerms || !Array.isArray(paymentTerms)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const createdPaymentTerms = await prisma.paymentTerms.createMany({
      data: paymentTerms,
    });

    return res.status(201).json({
      message: "Payment terms imported successfully",
      createdPaymentTerms,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const importWorker = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { workers } = req.body;
    if (!workers || !Array.isArray(workers)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const createdWorkers = await prisma.worker.createMany({
      data: workers.map((e) => ({
        name: e.name,
        surname: e.surname,
        cf: e.cf,
        address: e.address,
        city: e.city,
        cap: e.cap !== null ? e.cap.toString() : null,
        province: e.province,
        email: e.email,
        phone: e.phone,
        userId: req.user?.id,
      })),
    });

    return res
      .status(201)
      .json({ message: "Workers imported successfully", createdWorkers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const importStates = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { states } = req.body;
    if (!states || !Array.isArray(states)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const createdStates = await prisma.state.createMany({
      data: states,
    });

    return res
      .status(201)
      .json({ message: "States imported successfully", createdStates });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const importSupplier = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { suppliers } = req.body;
    if (!suppliers || !Array.isArray(suppliers)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const createdSuppliers = await prisma.supplier.createMany({
      data: suppliers.map((e) => ({
        name: e.name,
        ivaCode: e.ivaCode,
        cf: e.cf,
        address: e.address,
        city: e.city,
        cap: e.cap?.toString(),
        province: e.province,
        legalAddress: e.legalAddress,
        legalCity: e.legalCity,
        legalCap: e.legalCap?.toString(),
        legalProvince: e.legalProvince,
        phone: e.phone,
        email: e.email,
        profileImg: "profile-imgs/default-juridical.png",
        pec: e.pec,
        userId: req.user?.id,
      })),
    });

    return res
      .status(201)
      .json({ message: "Suppliers imported successfully", createdSuppliers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const importCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { customers } = req.body;
    if (!customers || !Array.isArray(customers)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    await prisma.$transaction(async (tx:Prisma.TransactionClient) => {
      for (const e of customers) {
        const {
          name,
          surname,
          description,
          gender,
          ivaCode,
          cf,
          address,
          city,
          cap,
          province,
          legalAddress,
          legalCity,
          legalCap,
          legalProvince,
          phone,
          email,
          pec,
        } = e;
        if (!ivaCode) {
          await tx.privateCustomer.create({
            data: {
              name,
              surname,
              description,
              gender,
              cf,
              address,
              city,
              cap: cap?.toString(),
              province,
              phone: phone?.toString(),
              email,
              pec,
              profileImg:
                gender === "M"
                  ? "profile-imgs/default-male-user.png"
                  : "profile-imgs/default-female-user.png",
              userId: req.user?.id,
            },
          });
        } else {
          await tx.juridicalCustomer.create({
            data: {
              name,
              description,
              ivaCode,
              cf: cf?.toString(),
              address,
              city,
              cap: cap?.toString(),
              province,
              legalAddress,
              legalCity,
              legalCap: legalCap?.toString(),
              legalProvince,
              phone: phone?.toString(),
              email,
              pec,
              profileImg: "profile-imgs/default-juridical.png",
              userId: req.user?.id,
            },
          });
        }
      }
    });

    return res.status(201).json({ message: "Customers imported successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const importMaterials = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      materialCategories,
      materialSubCategories,
      materialTypes,
      material,
    } = req.body;
    if (
      !materialCategories ||
      !Array.isArray(materialCategories) ||
      !materialSubCategories ||
      !Array.isArray(materialSubCategories) ||
      !materialTypes ||
      !Array.isArray(materialTypes) ||
      !material ||
      !Array.isArray(material)
    ) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    await prisma.$transaction(async (tx:Prisma.TransactionClient) => {
      // Clear existing data for the user

      const createdMaterialCategories = await tx.materialCategories
        .createMany({
          data: materialCategories.map((e) => ({
            title: e.title,
            userId: req.user?.id,
          })),
        })
        .then(() => {
          return tx.materialCategories.findMany({
            where: { userId: req.user?.id },
          });
        });

      if (
        createdMaterialCategories.length === 0 ||
        createdMaterialCategories === undefined
      ) {
        throw new Error("No material categories created");
      }

      const createdMaterialSubCategories = await tx.materialSubCategories
        .createMany({
          data: materialSubCategories.map((e) => ({
            title: e.title,
            categoryId: createdMaterialCategories.find(
              (category:any) => category.title === e.categoryTitle
            ).id,
            userId: req.user?.id,
          })),
        })
        .then(() => {
          return tx.materialSubCategories.findMany({
            where: { userId: req.user?.id },
          });
        });

      if (
        createdMaterialSubCategories.length === 0 ||
        createdMaterialSubCategories === undefined
      ) {
        throw new Error("No material subcategories created");
      }

      const createdMaterialTypes = await tx.materialTypes
        .createMany({
          data: materialTypes.map((e) => ({
            title: e.title,
            subCategoryId: createdMaterialSubCategories.find((subCategory:any) => {
              const category = createdMaterialCategories.find(
                (category:any) => category.id === subCategory.categoryId
              );
              return (
                subCategory.title === e.subCategoryTitle &&
                category.title === e.categoryTitle
              );
            }).id,
            userId: req.user?.id,
          })),
        })
        .then(() => {
          return tx.materialTypes.findMany({
            where: { userId: req.user?.id },
          });
        });

      const createdMaterial = await tx.material.createMany({
        data: material.map((e, index) => {
          return {
            brand: e.brand,
            model: e.model?.toString(),
            description: e.description,
            meterWeight: e.meterWeight,
            typeId: createdMaterialTypes.find((materialType:any) => {
              const subCategory = createdMaterialSubCategories.find(
                (subCategory:any) => subCategory.id === materialType.subCategoryId
              );
              const category = createdMaterialCategories.find(
                (category:any) => category.id === subCategory.categoryId
              );

              return (
                materialType.title === e.typeTitle &&
                subCategory.title === e.subCategoryTitle &&
                category.title === e.categoryTitle
              );
            }).id,
            userId: req.user?.id,
          };
        }),
      });
    });

    return res.status(201).json({
      message: "Materials imported successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const importCommissions = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { commissions } = req.body;
    if (!commissions || !Array.isArray(commissions)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const createdCommissions = await prisma.commission.createMany({
      data: commissions.map((e) => ({
        number: e.number,
        title: e.title,
        description: e.description,
        stateId: e.stateId,
        initialOfferPrice: e.initialOfferPrice,
        requestDate: getDateFromExcel(e.requestDate),
        startWorkDate: e.startWorkDate
          ? getDateFromExcel(e.startWorkDate)
          : undefined,
        endWorkDate: e.startWorkDate
          ? getDateFromExcel(e.endWorkDate)
          : undefined,
        userId: req.user?.id,
      })),
    });

    return res.status(201).json({
      message: "Commissions imported successfully",
      createdCommissions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const importCommissionCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    await prisma.$transaction(async (tx:Prisma.TransactionClient) => {
      for (const e of data) {
        const { customerName, customerSurname, commissionNumber } = e;
        const commission = await tx.commission.findFirst({
          where: { number: commissionNumber },
        });
        if (customerSurname !== undefined) {
          const customer = await tx.privateCustomer.findFirst({
            where: {
              name: customerName,
              surname: customerSurname,
            },
          });

          if (!customer) {
            throw new Error(
              `Private customer with name ${customerName} and surname ${customerSurname} not found`
            );
          }
          if (!commission) {
            throw new Error(
              `Commission with number ${commissionNumber} not found`
            );
          }
          await tx.commissionPrivateCustomer.create({
            data: {
              commissionId: commission.id,
              privateCustomerId: customer.id,
              userId: req.user?.id,
            },
          });
        } else {
          const customer = await tx.juridicalCustomer.findFirst({
            where: {
              name: customerName,
            },
          });
          if (!customer) {
            throw new Error(
              `Juridical customer with name ${customerName} not found`
            );
          }
          if (!commission) {
            throw new Error(
              `Commission with number ${commissionNumber} not found`
            );
          }
          await tx.commissionJuridicalCustomer.create({
            data: {
              commissionId: commission.id,
              juridicalCustomerId: customer.id,
              userId: req.user?.id,
            },
          });
        }
      }
    });

    return res.status(201).json({
      message: "Commissions imported successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const importCommissionDiscount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { discounts } = req.body;
    if (!discounts || !Array.isArray(discounts)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    await prisma.$transaction(async (tx:Prisma.TransactionClient) => {
      for (const e of discounts) {
        console.log(e);

        const { commissionNumber, date, amount } = e;
        const commission = await tx.commission.findFirst({
          where: { number: commissionNumber },
        });
        if (!commission) {
          throw new Error(
            `Commission with number ${commissionNumber} not found`
          );
        }

        await tx.commissionDiscounts.create({
          data: {
            commissionId: commission.id,
            date: getDateFromExcel(date),
            amount,
            userId: req.user?.id,
          },
        });
      }
    });

    return res.status(201).json({
      message: "Discounts imported successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const importCommissionIncome = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { incomes } = req.body;
    if (!incomes || !Array.isArray(incomes)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    await prisma.$transaction(async (tx:Prisma.TransactionClient) => {
      for (const e of incomes) {
        const {
          commissionNumber,
          paymentDate,
          paymentMethodId,
          amount,
          description,
        } = e;
        const commission = await tx.commission.findFirst({
          where: { number: commissionNumber },
        });
        if (!commission) {
          throw new Error(
            `Commission with number ${commissionNumber} not found`
          );
        }
        await tx.commissionIncomes.create({
          data: {
            commissionId: commission.id,
            paymentDate: getDateFromExcel(paymentDate),
            paymentMethodId,
            amount,
            description,

            userId: req.user?.id,
          },
        });
      }
    });

    return res.status(201).json({
      message: "Incomes imported successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
