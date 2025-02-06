import FindDomainForm from "@/components/forms/FindDomainForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-dvh gap-20 pt-[10rem]">
      <span className="px-[42rem] text-[3rem] text-white font-bold text-center">
        Find domain information by Twilight Cyber API
      </span>
      <FindDomainForm />
    </main>
  );
}
