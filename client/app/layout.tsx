import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { AppContextProvider } from "@/store/useAppContext";

const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@/components/ui/theme-provider";

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
          <AppContextProvider>
            <Navbar />
            {children}
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
