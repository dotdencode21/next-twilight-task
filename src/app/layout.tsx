import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Twilight App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-900">{children}</body>
    </html>
  );
}
