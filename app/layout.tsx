import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import AuthProvider from "@/context/AuthProvider";
import UserInfoProvider from "@/context/userInfo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopister",
  description: "Created with ❤️ by Ankush",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <UserInfoProvider>{children}</UserInfoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
