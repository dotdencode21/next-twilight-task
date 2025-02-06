"use client";

import { useState } from "react";
import FindDomainForm from "@/components/forms/FindDomainForm";
import { InfectionsSearchResponse } from "@/types";
import InfectionCard from "@/components/common/InfectionCard";

export default function Home() {
  const [infections, setInfections] = useState<InfectionsSearchResponse[] | null>(null);

  return (
    <main className="flex flex-col items-center h-dvh gap-20 pt-[10rem]">
      <span className="px-[42rem] text-[3rem] text-white font-bold text-center">
        Domain Search with Twilight Cyber API
      </span>
      <FindDomainForm onResult={setInfections} />
      <section className="grid grid-cols-4 gap-4 pb-4 px-[10rem]">
        {infections?.map((infection: InfectionsSearchResponse) => (
          <InfectionCard key={infection.id} infection={infection} />
        ))}
      </section>
    </main>
  );
}
