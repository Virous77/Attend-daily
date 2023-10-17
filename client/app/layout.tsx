import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { AppContextProvider } from "@/store/useAppContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ReactQueryProvider from "@/lib/reactQueryProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attend-daily",
  description:
    "A complete daily attendance tracker with loads of other feature.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <AppContextProvider>
              <Navbar />
              {children}
              <Toaster />
            </AppContextProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
