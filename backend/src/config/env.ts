// src/config/env.ts

interface EnvironmentVariables {
  NODE_ENV: string;
  PORT: string;
  DATABASE_URL: string;
  AWS_ACCESS_KEY_ID: string; // ← Obbligatorio, non optional
  AWS_SECRET_ACCESS_KEY: string; // ← Obbligatorio, non optional
  AWS_REGION: string; // ← Obbligatorio, non optional
  S3_BUCKET_NAME: string; // ← Obbligatorio, non optional
  JWT_SECRET: string;
}

function validateEnv(): EnvironmentVariables {
  // Lista delle variabili obbligatorie
  const requiredVars = [
    "DATABASE_URL",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_REGION",
    "S3_BUCKET_NAME",
    "JWT_SECRET",
  ] as const;

  // Controllo che tutte le variabili esistano
  const missingVars: string[] = [];

  for (const envVar of requiredVars) {
    if (!process.env[envVar] || process.env[envVar]!.trim() === "") {
      missingVars.push(envVar);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `❌ Missing required environment variables: ${missingVars.join(", ")}`
    );
  }

  // Validation aggiuntiva per AWS_REGION
  const awsRegion = process.env.AWS_REGION!;
  const validRegionPattern = /^[a-z0-9-]+$/;
  if (!validRegionPattern.test(awsRegion)) {
    throw new Error(`❌ Invalid AWS_REGION format: ${awsRegion}`);
  }

  console.log("✅ Environment variables validated successfully");

  return {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || "3000",
    DATABASE_URL: process.env.DATABASE_URL!,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
    AWS_REGION: process.env.AWS_REGION!,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME!,
    JWT_SECRET: process.env.JWT_SECRET!,
  };
}

// Esporta la configurazione validata
export const env = validateEnv();
