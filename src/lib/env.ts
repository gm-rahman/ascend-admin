import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export const env = clientEnvSchema.parse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
