import { env } from "@/lib/env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description:
    "Project operations dashboard starter built with Next.js, Tailwind CSS, TypeScript, and Zustand.",
  url: env.NEXT_PUBLIC_APP_URL,
};
