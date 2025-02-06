import { extractRootDomain } from "@/lib/utils";
import { InfectionsSearchResponse } from "@/types";
import { z } from "zod";

const searchDomainSchema = z.object({
  email: z.string().email("Invalid email format").trim().toLowerCase(),
});

export async function searchDomainAction(email: string): Promise<InfectionsSearchResponse[]> {
  const validationResult = searchDomainSchema.safeParse({ email });
  if (!validationResult.success) {
    throw new Error(`Validation error: ${validationResult.error.flatten().fieldErrors.email?.join(", ")}`);
  }

  const rootDomain = extractRootDomain(email);
  if (!rootDomain) {
    throw new Error("Failed to extract root domain");
  }

  try {
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emails: [email],
        root_domains: [rootDomain],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const jsonResponse = await response.json();

    if (!Array.isArray(jsonResponse.data)) {
      throw new Error("Unexpected API response structure");
    }

    return jsonResponse.data as InfectionsSearchResponse[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to process the request: ${error.message}`);
    }

    throw new Error("An unexpected error occurred");
  }
}
