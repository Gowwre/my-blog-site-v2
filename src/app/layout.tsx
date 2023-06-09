import MainLayout from "@/components/MainLayout";
import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog.net",
  description: "This is my blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full`}>
      <body className="min-h-full grid">
        <NextAuthProvider>
        <MainLayout>{children}</MainLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
