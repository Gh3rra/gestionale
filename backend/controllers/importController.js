import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { create } from "domain";
import jwt from "jsonwebtoken";
import { title } from "process";
import { getDateFromExcel } from "../utils/utils.js";
const prisma = new PrismaClient();

export const importMeasures = async (req, res) => {
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

export const importPaymentMode = async (req, res) => {
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

export const importPaymentTerms = async (req, res) => {
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
export const importWorker = async (req, res) => {
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
        cap: e.cap.toString(),
        province: e.province,
        email: e.email,
        phone: e.phone,
        userId: req.user.id,
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

export const importStates = async (req, res) => {
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

export const importSupplier = async (req, res) => {
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
        pec: e.pec,
        userId: req.user.id,
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

export const importCustomer = async (req, res) => {
  console.log("SIAMO NELLA IMPORT CUSTOMER FUNCTION");

  try {
    const { customers } = req.body;
    if (!customers || !Array.isArray(customers)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    await prisma.$transaction(async (tx) => {
      for (const e of customers) {
        console.log("PRIMO FOR");

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
              legalAddress,
              legalCity,
              legalCap: legalCap?.toString(),
              legalProvince,
              phone: phone?.toString(),
              email,
              pec,
              userId: req.user.id,
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
              userId: req.user.id,
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
export const importItems = async (req, res) => {
  try {
    const { itemCategories, itemSubCategories, itemTypes, item } = req.body;
    if (
      !itemCategories ||
      !Array.isArray(itemCategories) ||
      !itemSubCategories ||
      !Array.isArray(itemSubCategories) ||
      !itemTypes ||
      !Array.isArray(itemTypes) ||
      !item ||
      !Array.isArray(item)
    ) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    await prisma.$transaction(async (tx) => {
      // Clear existing data for the user

      const createdItemCategories = await tx.itemCategories
        .createMany({
          data: itemCategories.map((e) => ({
            title: e.title,
            userId: req.user.id,
          })),
        })
        .then(() => {
          return tx.itemCategories.findMany({
            where: { userId: req.user.id },
          });
        });

      const createdItemSubCategories = await tx.itemSubCategories
        .createMany({
          data: itemSubCategories.map((e) => ({
            title: e.title,
            categoryId: createdItemCategories.find(
              (category) => category.title === e.categoryTitle
            ).id,
            userId: req.user.id,
          })),
        })
        .then(() => {
          return tx.itemSubCategories.findMany({
            where: { userId: req.user.id },
          });
        });

      const createdItemTypes = await tx.itemTypes
        .createMany({
          data: itemTypes.map((e) => ({
            title: e.title,
            subCategoryId: createdItemSubCategories.find((subCategory) => {
              const category = createdItemCategories.find(
                (category) => category.id === subCategory.categoryId
              );
              return (
                subCategory.title === e.subCategoryTitle &&
                category.title === e.categoryTitle
              );
            }).id,
            userId: req.user.id,
          })),
        })
        .then(() => {
          return tx.itemTypes.findMany({
            where: { userId: req.user.id },
          });
        });

      const createdItem = await tx.item.createMany({
        data: item.map((e, index) => {
          return {
            brand: e.brand,
            model: e.model?.toString(),
            description: e.description,
            meterWeight: e.meterWeight,
            typeId: createdItemTypes.find((itemType) => {
              const subCategory = createdItemSubCategories.find(
                (subCategory) => subCategory.id === itemType.subCategoryId
              );
              const category = createdItemCategories.find(
                (category) => category.id === subCategory.categoryId
              );

              return (
                itemType.title === e.typeTitle &&
                subCategory.title === e.subCategoryTitle &&
                category.title === e.categoryTitle
              );
            }).id,
            userId: req.user.id,
          };
        }),
      });
    });

    return res.status(201).json({
      message: "Items imported successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const importCommissions = async (req, res) => {
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
        userId: req.user.id,
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

export const importCommissionCustomer = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    await prisma.$transaction(async (tx) => {
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
          await tx.commissionPrivateCustomer.create({
            data: {
              commissionId: commission.id,
              privateCustomerId: customer.id,
              userId: req.user.id,
            },
          });
        } else {
          const customer = await tx.juridicalCustomer.findFirst({
            where: {
              name: customerName,
            },
          });
          await tx.commissionJuridicalCustomer.create({
            data: {
              commissionId: commission.id,
              juridicalCustomerId: customer.id,
              userId: req.user.id,
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

export const importCommissionDiscount = async (req, res) => {
  try {
    const { discounts } = req.body;
    if (!discounts || !Array.isArray(discounts)) {
      return res.status(400).json({ message: "Invalid data format" });
    }
    console.log(discounts.length);

    await prisma.$transaction(async (tx) => {
      for (const e of discounts) {
        console.log(e);

        const { commissionNumber, date, amount } = e;
        const commission = await tx.commission.findFirst({
          where: { number: commissionNumber },
        });

        await tx.commissionDiscounts.create({
          data: {
            commissionId: commission.id,
            date: getDateFromExcel(date),
            amount,
            userId: req.user.id,
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

export const importCommissionIncome = async (req, res) => {
  try {
    const { incomes } = req.body;
    if (!incomes || !Array.isArray(incomes)) {
      return res.status(400).json({ message: "Invalid data format" });
    }
    console.log(incomes.length);

    await prisma.$transaction(async (tx) => {
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

        await tx.commissionIncomes.create({
          data: {
            commissionId: commission.id,
            paymentDate: getDateFromExcel(paymentDate),
            paymentMethodId,
            amount,
            description,

            userId: req.user.id,
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
