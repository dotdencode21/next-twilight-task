"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfectionsSearchResponse } from "@/types";
import { searchDomainAction } from "@/actions/searchDomain";

export default function FindDomainForm({ onResult }: { onResult: (data: InfectionsSearchResponse[]) => void }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await searchDomainAction(email);

      if (data instanceof Error) {
        setError(data.message);
      }

      setEmail("");
      setIsLoading(false);
      onResult(data);
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-[1fr,_0.25fr] gap-4 px-[40rem]">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@domain.com"
        disabled={isLoading}
      />
      <Button className="bg-purple-700 text-[1.25rem]" onClick={handleSearch} disabled={isLoading || !email.length}>
        {isLoading ? "Searching..." : "Search"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
