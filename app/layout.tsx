import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar/page";
import Footer from "./components/footer/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NotesDown✍️",
  description: "NotesDown✍️ - Note it down",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-full min-h-screen bg-black flex flex-col  bg-grid-white/[0.1]`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
