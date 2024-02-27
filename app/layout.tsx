import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider, signOut } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Auth v5 beta toolkit",
  description: "Built to help visualize authentication flow",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
