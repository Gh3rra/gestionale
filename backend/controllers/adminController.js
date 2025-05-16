import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const getTableStatus = async (req, res) => {
  try {
    const result = {
      commission: (await prisma.commission.count()) > 0,
      commissionDiscounts: (await prisma.commissionDiscounts.count()) > 0,
      commissionIncomes: (await prisma.commissionIncomes.count()) > 0,
      commissionJuridicalCustomer:
        (await prisma.commissionJuridicalCustomer.count()) > 0,
      commissionOtherExpenses:
        (await prisma.commissionOtherExpenses.count()) > 0,
      commissionPrivateCustomer:
        (await prisma.commissionPrivateCustomer.count()) > 0,
      commissionTravelExpenses:
        (await prisma.commissionTravelExpenses.count()) > 0,
      commissionWorkerExpenses:
        (await prisma.commissionWorkerExpenses.count()) > 0,
      ddt: (await prisma.ddt.count()) > 0,
      item: (await prisma.item.count()) > 0,
      itemCategories: (await prisma.itemCategories.count()) > 0,
      itemSubCategories: (await prisma.itemSubCategories.count()) > 0,
      itemTypes: (await prisma.itemTypes.count()) > 0,
      juridicalCustomer: (await prisma.juridicalCustomer.count()) > 0,
      paymentMethods: (await prisma.paymentMethods.count()) > 0,
      paymentTerms: (await prisma.paymentTerms.count()) > 0,
      privateCustomer: (await prisma.privateCustomer.count()) > 0,
      purchase: (await prisma.purchase.count()) > 0,
      purchaseDiscounts: (await prisma.purchaseDiscounts.count()) > 0,
      purchaseInvoice: (await prisma.purchaseItem.count()) > 0,
      purchaseItem: (await prisma.purchaseItem.count()) > 0,
      state: (await prisma.state.count()) > 0,
      supplier: (await prisma.supplier.count()) > 0,
      unitMeasures: (await prisma.unitMeasures.count()) > 0,
      user: (await prisma.user.count()) > 0,
      worker: (await prisma.worker.count()) > 0,
    };

    return res
      .status(201)
      .json({ message: "Measures imported successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
