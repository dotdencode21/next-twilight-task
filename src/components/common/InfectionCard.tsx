import { InfectionsSearchResponse } from "@/types";
import { Card, CardContent, CardHeader } from "../ui/card";

interface InfectionCardProps {
  infection: InfectionsSearchResponse;
}

export default function InfectionCard({ infection }: InfectionCardProps) {
  const {
    id,
    stealer_type,
    date,
    computer_information: { ip, build_id, os, username, hwid },
  } = infection;

  return (
    <Card className="bg-slate-50">
      <CardHeader>
        <span className="text-[1.25rem] font-semibold">
          ID: <span className="text-base font-normal">{id}</span>
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <span className="font-semibold">
          Stealer type: <span className="font-normal">{stealer_type}</span>
        </span>
        <span className="font-semibold">
          Date: <span className="font-normal">{new Date(date).toLocaleDateString()}</span>
        </span>
        <span className="font-semibold">
          IP: <span className="font-normal">{ip}</span>
        </span>
        <span className="font-semibold">
          Build ID: <span className="font-normal">{build_id || "none"}</span>
        </span>
        <span className="font-semibold">
          OS: <span className="font-normal">{os}</span>
        </span>
        <span className="font-semibold">
          Username: <span className="font-normal">{username}</span>
        </span>
        <span className="font-semibold">
          HWID: <span className="font-normal">{hwid}</span>
        </span>
      </CardContent>
    </Card>
  );
}
