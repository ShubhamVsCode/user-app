import StoreProvider from "@/components/StoreProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/components/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard for User Mangement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={inter.className}>
          <ToasterProvider />
          <Navbar />
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
