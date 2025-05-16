import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const unitMeasures = [
  {
    id: 1,
    title: "KG",
    description: "Kilogrammo",
  },
  {
    id: 2,
    title: "ML",
    description: "Metro lineare",
  },

  {
    id: 3,
    title: "MQ",
    description: "Metro quadrato",
  },
  {
    id: 4,
    title: "PZ",
    description: "Pezzo",
  },
  {
    id: 5,
    title: "BA",
    description: "Barra",
  },
  {
    id: 6,
    title: "LT",
    description: "Litro",
  },
];

const paymentTerms = [
  {
    id: 1,
    title: "Altro",
  },
  {
    id: 2,
    title: "Rimessa Diretta",
  },

  {
    id: 3,
    title: "60GG Fine Mese",
  },
  {
    id: 4,
    title: "60GG Data Fattura",
  },
  {
    id: 5,
    title: "30GG Fine Mese",
  },
  {
    id: 6,
    title: "30GG Data Fattura",
  },
];

const paymentMethods = [
  {
    id: 1,
    title: "Altro",
  },
  {
    id: 2,
    title: "Bonifico",
  },

  {
    id: 3,
    title: "Assegno",
  },
  {
    id: 4,
    title: "Contanti",
  },
  {
    id: 5,
    title: "Riba",
  },
];

const commissionStates = [
  {
    id: 1,
    description: "Richiesta",
  },
  {
    id: 2,
    description: "Offerta presentata",
  },

  {
    id: 3,
    description: "Accettata",
  },
  {
    id: 4,
    description: "In lavorazione",
  },
  {
    id: 5,
    description: "Lavoro completato (da saldare)",
  },
  {
    id: 6,
    description: "Importo saldato",
  },
  {
    id: 7,
    description: "Annullata",
  },
];

async function main() {
  await prisma.$transaction([
    prisma.unitMeasures.createMany({
      data: unitMeasures,
      skipDuplicates: true, // evita errori se già presenti
    }),
    prisma.paymentMethods.createMany({
      data: paymentMethods,
      skipDuplicates: true, // evita errori se già presenti
    }),
    prisma.paymentTerms.createMany({
      data: paymentTerms,
      skipDuplicates: true, // evita errori se già presenti
    }),
    prisma.state.createMany({
      data: commissionStates,
      skipDuplicates: true, // evita errori se già presenti
    }),
  ]);
}

main()
  .then(() => {
    console.log("Seed eseguito con successo!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
