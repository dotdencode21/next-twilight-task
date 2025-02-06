import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-dvh flex flex-col items-center justify-center gap-5">
      <span className="text-white font-semibold text-[5rem]">404</span>
      <div className="flex flex-col items-center gap-3">
        <span className="text-white text-[1.5rem]">Could not find requested resource</span>
        <Link className="text-white text-[1.125rem] transition-all duration-350 hover:text-purple-700" href="/">
          Return Home
        </Link>
      </div>
    </main>
  );
}
