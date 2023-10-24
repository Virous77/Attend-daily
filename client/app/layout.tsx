import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { AppContextProvider } from "@/store/useAppContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ReactQueryProvider from "@/lib/reactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/layout/navigation";
import { cookies } from "next/headers";

export async function get() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("attend");
  return cookie;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attend-daily",
  description:
    "A complete daily attendance tracker with loads of other feature.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = await get();

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
              <Navbar isLoggedIn={value?.value} />
              {children}
              <Toaster />
              <Navigation isLoggedIn={value?.value} />
            </AppContextProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
