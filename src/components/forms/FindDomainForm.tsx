"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { searchDomainAction } from "@/actions/searchDomain";

export default function FindDomainForm() {
  const [state, formAction, isPending] = useActionState(searchDomainAction, { email: "", errors: undefined });

  console.log(state);

  return (
    <form action={formAction} className="w-full grid grid-cols-[1fr,_7.5rem] gap-4 px-[40rem]">
      <Input type="email" name="email" placeholder="example@gmail.com" />
      <Button disabled={isPending} className="bg-purple-700 text-[1.25rem]">
        Search
      </Button>
    </form>
  );
}
