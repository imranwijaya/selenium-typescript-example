import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  BASE_URL: z.url(),
  BROWSER_NAME: z.enum(["chrome", "firefox", "edge"]).default("chrome"),
  BROWSER_MODE: z.enum(["headless", "display"]).default("headless"),

  LOGIN_NAME: z.string().min(1),
  LOGIN_EMAIL: z.email(),
  LOGIN_PASSWORD: z.string().min(1),

  DB_HOST: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive(),
  DB_DATESTRINGS: z
    .array(z.enum(["DATE", "DATETIME", "TIMESTAMP"]))
    .default(["DATE", "DATETIME"]),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment configuration:");
  console.error(z.prettifyError(result.error));
  throw new Error("Environment configuration validation failed.");
}

const env = result.data;

export default {
  app: {
    baseUrl: env.BASE_URL,
  },

  browser: {
    name: env.BROWSER_NAME,
    mode: env.BROWSER_MODE,
  },

  login: {
    name: env.LOGIN_NAME,
    email: env.LOGIN_EMAIL,
    password: env.LOGIN_PASSWORD,
  },

  db: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: env.DB_PORT,
    dateStrings: env.DB_DATESTRINGS,
  },
};
