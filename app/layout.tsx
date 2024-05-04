import type { Metadata } from "next";
import { Inter, Gochi_Hand } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar/page";
import Footer from "./components/footer/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scribblore✍️",
  description: "Scibblore✍️ - Scribble your Lore"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full bg-black flex flex-col  bg-grid-white/[0.1]`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
