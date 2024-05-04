import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar/page";
import Footer from "./components/footer/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note App",
  description: "A basic CRUD app built using NextJS 13",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full`}>
        <NavBar />
       {children}
       <Footer />
      </body>
    </html>
  );
}
