import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getTableStatus = async (req: Request, res: Response):Promise<any> => {
  try {
    const result = {
      commission: (await prisma.commission.count()) > 0,
      commissionDiscounts: (await prisma.commissionDiscounts.count()) > 0,
      commissionIncomes: (await prisma.commissionIncomes.count()) > 0,
      commissionJuridicalCustomer:
        (await prisma.commissionJuridicalCustomer.count()) > 0,
      commissionMaterial: (await prisma.commissionMaterial.count()) > 0,
      commissionPrivateCustomer:
        (await prisma.commissionPrivateCustomer.count()) > 0,

      ddt: (await prisma.ddt.count()) > 0,
      expense: (await prisma.expense.count()) > 0,
      expenseType: (await prisma.expenseType.count()) > 0,
      juridicalCustomer: (await prisma.juridicalCustomer.count()) > 0,
      material: (await prisma.material.count()) > 0,
      materialCategories: (await prisma.materialCategories.count()) > 0,
      materialSubCategories: (await prisma.materialSubCategories.count()) > 0,
      materialTypes: (await prisma.materialTypes.count()) > 0,
      paymentMethods: (await prisma.paymentMethods.count()) > 0,
      paymentTerms: (await prisma.paymentTerms.count()) > 0,
      privateCustomer: (await prisma.privateCustomer.count()) > 0,
      purchase: (await prisma.purchase.count()) > 0,
      purchaseDiscounts: (await prisma.purchaseDiscounts.count()) > 0,
      purchaseInvoice: (await prisma.purchaseInvoice.count()) > 0,
      purchaseMaterial: (await prisma.purchaseMaterial.count()) > 0,
      state: (await prisma.state.count()) > 0,
      supplier: (await prisma.supplier.count()) > 0,
      unitMeasures: (await prisma.unitMeasures.count()) > 0,
      user: (await prisma.user.count()) > 0,
      warehouseMaterial: (await prisma.warehouseMaterial.count()) > 0,
      worker: (await prisma.worker.count()) > 0,
      workerPresence: (await prisma.workerPresence.count()) > 0,
    };

    return res
      .status(201)
      .json({ message: "Measures imported successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
