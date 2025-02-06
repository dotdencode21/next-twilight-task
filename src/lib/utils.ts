import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractRootDomain(email: string): string | null {
  const rootDomainRegex = /@[^.]+\.(?<rootDomain>[^.]+)$/;
  const match = email.match(rootDomainRegex);
  return match?.groups?.rootDomain || null;
}
