import { InfectionsSearchResponse } from "@/types";
import { z } from "zod";

const searchDomainSchema = z.object({
  email: z.string().email("Invalid email format").trim().toLowerCase(),
});

interface SearchDomainActionState {
  email?: string;
  errors?: {
    email?: string[];
  };
}

type SearchDomainActionResponse = InfectionsSearchResponse | SearchDomainActionState | Error;

function extractRootDomain(email: string): string | null {
  const rootDomainRegex = /@[^.]+\.(?<rootDomain>[^.]+)$/;
  const match = email.match(rootDomainRegex);
  return match?.groups?.rootDomain || null;
}

export async function searchDomainAction(
  prevState: SearchDomainActionResponse,
  formData: FormData
): Promise<SearchDomainActionResponse> {
  try {
    const email = formData.get("email") as string;

    if (!email) {
      return {
        ...prevState,
        errors: { email: ["Email is required"] },
      };
    }

    const validationResult = searchDomainSchema.safeParse({ email });

    if (!validationResult.success) {
      return {
        email,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const rootDomain = extractRootDomain(email);
    if (!rootDomain) {
      return {
        email,
        errors: { email: ["Failed to extract root domain"] },
      };
    }

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

    const { data } = await response.json();
    return data as InfectionsSearchResponse;
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return new Error(`Failed to process the request: ${error.message}`);
    }

    return new Error("An unexpected error occurred");
  }
}
