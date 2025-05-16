-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dark_theme" BOOLEAN NOT NULL DEFAULT false,
    "profile_img" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commission" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "stateId" INTEGER NOT NULL,
    "initialOfferPrice" DOUBLE PRECISION,
    "address" TEXT,
    "city" TEXT,
    "cap" TEXT,
    "province" TEXT,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "startWorkDate" TIMESTAMP(3),
    "endWorkDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateCustomer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "description" TEXT,
    "gender" TEXT NOT NULL,
    "cf" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "cap" TEXT,
    "province" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "pec" TEXT,
    "profileImg" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrivateCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JuridicalCustomer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ivaCode" TEXT NOT NULL,
    "cf" TEXT,
    "address" TEXT,
    "city" TEXT,
    "cap" TEXT,
    "province" TEXT,
    "legalAddress" TEXT,
    "legalCity" TEXT,
    "legalCap" TEXT,
    "legalProvince" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "pec" TEXT NOT NULL,
    "profileImg" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JuridicalCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ivaCode" TEXT NOT NULL,
    "cf" TEXT,
    "address" TEXT,
    "city" TEXT,
    "cap" TEXT,
    "province" TEXT,
    "legalAddress" TEXT,
    "legalCity" TEXT,
    "legalCap" TEXT,
    "legalProvince" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "pec" TEXT NOT NULL,
    "profileImg" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionPrivateCustomer" (
    "commissionId" INTEGER NOT NULL,
    "privateCustomerId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommissionPrivateCustomer_pkey" PRIMARY KEY ("commissionId","privateCustomerId")
);

-- CreateTable
CREATE TABLE "CommissionJuridicalCustomer" (
    "commissionId" INTEGER NOT NULL,
    "juridicalCustomerId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommissionJuridicalCustomer_pkey" PRIMARY KEY ("commissionId","juridicalCustomerId")
);

-- CreateTable
CREATE TABLE "CommissionDiscounts" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "commissionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommissionDiscounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseDiscounts" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "purchaseInvoiceId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseDiscounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "cf" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "cap" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profileImg" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionWorkerExpenses" (
    "id" SERIAL NOT NULL,
    "workerId" INTEGER NOT NULL,
    "workHours" INTEGER,
    "costPerHour" DOUBLE PRECISION,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "commissionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommissionWorkerExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionTravelExpenses" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "commissionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommissionTravelExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionOtherExpenses" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "commissionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommissionOtherExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCategories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSubCategories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemSubCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemTypes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subCategoryId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "brand" TEXT,
    "model" TEXT NOT NULL,
    "description" TEXT,
    "meterWeight" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseItem" (
    "id" SERIAL NOT NULL,
    "unitMeasureId" INTEGER NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "quantity" INTEGER,
    "unitPrice" DOUBLE PRECISION,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "itemId" INTEGER NOT NULL,
    "ddtId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "commissionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supplierPaymentMethodsId" INTEGER,
    "paymentTermsId" INTEGER,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethods" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionIncomes" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,
    "commissionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommissionIncomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentTerms" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentTerms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseInvoice" (
    "id" SERIAL NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,
    "taxableAmount" DOUBLE PRECISION NOT NULL,
    "vat" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paymentTermsId" INTEGER,

    CONSTRAINT "PurchaseInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitMeasures" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnitMeasures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ddt" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ddt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Commission_number_key" ON "Commission"("number");

-- CreateIndex
CREATE INDEX "Commission_userId_idx" ON "Commission"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PrivateCustomer_cf_key" ON "PrivateCustomer"("cf");

-- CreateIndex
CREATE UNIQUE INDEX "JuridicalCustomer_ivaCode_key" ON "JuridicalCustomer"("ivaCode");

-- CreateIndex
CREATE UNIQUE INDEX "JuridicalCustomer_cf_key" ON "JuridicalCustomer"("cf");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_ivaCode_key" ON "Supplier"("ivaCode");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_cf_key" ON "Supplier"("cf");

-- CreateIndex
CREATE INDEX "CommissionPrivateCustomer_commissionId_privateCustomerId_idx" ON "CommissionPrivateCustomer"("commissionId", "privateCustomerId");

-- CreateIndex
CREATE INDEX "CommissionJuridicalCustomer_commissionId_juridicalCustomerI_idx" ON "CommissionJuridicalCustomer"("commissionId", "juridicalCustomerId");

-- CreateIndex
CREATE INDEX "CommissionDiscounts_commissionId_userId_idx" ON "CommissionDiscounts"("commissionId", "userId");

-- CreateIndex
CREATE INDEX "PurchaseDiscounts_userId_idx" ON "PurchaseDiscounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Worker_cf_key" ON "Worker"("cf");

-- CreateIndex
CREATE INDEX "Worker_userId_idx" ON "Worker"("userId");

-- CreateIndex
CREATE INDEX "CommissionWorkerExpenses_commissionId_userId_idx" ON "CommissionWorkerExpenses"("commissionId", "userId");

-- CreateIndex
CREATE INDEX "CommissionTravelExpenses_commissionId_userId_idx" ON "CommissionTravelExpenses"("commissionId", "userId");

-- CreateIndex
CREATE INDEX "CommissionOtherExpenses_commissionId_userId_idx" ON "CommissionOtherExpenses"("commissionId", "userId");

-- CreateIndex
CREATE INDEX "Item_userId_idx" ON "Item"("userId");

-- CreateIndex
CREATE INDEX "CommissionIncomes_commissionId_userId_idx" ON "CommissionIncomes"("commissionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseInvoice_purchaseId_key" ON "PurchaseInvoice"("purchaseId");

-- CreateIndex
CREATE INDEX "PurchaseInvoice_userId_idx" ON "PurchaseInvoice"("userId");

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateCustomer" ADD CONSTRAINT "PrivateCustomer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JuridicalCustomer" ADD CONSTRAINT "JuridicalCustomer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionPrivateCustomer" ADD CONSTRAINT "CommissionPrivateCustomer_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionPrivateCustomer" ADD CONSTRAINT "CommissionPrivateCustomer_privateCustomerId_fkey" FOREIGN KEY ("privateCustomerId") REFERENCES "PrivateCustomer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionPrivateCustomer" ADD CONSTRAINT "CommissionPrivateCustomer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionJuridicalCustomer" ADD CONSTRAINT "CommissionJuridicalCustomer_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionJuridicalCustomer" ADD CONSTRAINT "CommissionJuridicalCustomer_juridicalCustomerId_fkey" FOREIGN KEY ("juridicalCustomerId") REFERENCES "JuridicalCustomer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionJuridicalCustomer" ADD CONSTRAINT "CommissionJuridicalCustomer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionDiscounts" ADD CONSTRAINT "CommissionDiscounts_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionDiscounts" ADD CONSTRAINT "CommissionDiscounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDiscounts" ADD CONSTRAINT "PurchaseDiscounts_purchaseInvoiceId_fkey" FOREIGN KEY ("purchaseInvoiceId") REFERENCES "PurchaseInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDiscounts" ADD CONSTRAINT "PurchaseDiscounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionWorkerExpenses" ADD CONSTRAINT "CommissionWorkerExpenses_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionWorkerExpenses" ADD CONSTRAINT "CommissionWorkerExpenses_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionWorkerExpenses" ADD CONSTRAINT "CommissionWorkerExpenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionTravelExpenses" ADD CONSTRAINT "CommissionTravelExpenses_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionTravelExpenses" ADD CONSTRAINT "CommissionTravelExpenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionOtherExpenses" ADD CONSTRAINT "CommissionOtherExpenses_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionOtherExpenses" ADD CONSTRAINT "CommissionOtherExpenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCategories" ADD CONSTRAINT "ItemCategories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSubCategories" ADD CONSTRAINT "ItemSubCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ItemCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSubCategories" ADD CONSTRAINT "ItemSubCategories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemTypes" ADD CONSTRAINT "ItemTypes_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "ItemSubCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemTypes" ADD CONSTRAINT "ItemTypes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ItemTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_unitMeasureId_fkey" FOREIGN KEY ("unitMeasureId") REFERENCES "UnitMeasures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_ddtId_fkey" FOREIGN KEY ("ddtId") REFERENCES "Ddt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_paymentTermsId_fkey" FOREIGN KEY ("paymentTermsId") REFERENCES "PaymentTerms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionIncomes" ADD CONSTRAINT "CommissionIncomes_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionIncomes" ADD CONSTRAINT "CommissionIncomes_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionIncomes" ADD CONSTRAINT "CommissionIncomes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoice" ADD CONSTRAINT "PurchaseInvoice_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoice" ADD CONSTRAINT "PurchaseInvoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoice" ADD CONSTRAINT "PurchaseInvoice_paymentTermsId_fkey" FOREIGN KEY ("paymentTermsId") REFERENCES "PaymentTerms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ddt" ADD CONSTRAINT "Ddt_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "PurchaseInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ddt" ADD CONSTRAINT "Ddt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
