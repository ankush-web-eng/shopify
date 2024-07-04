import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import AuthProvider from "@/context/AuthProvider";
import { CartProvider } from "@/context/cartContext";
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Shopister",
    template: "%s | Shopister"
  },
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
          <CartProvider >
            <Toaster />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
