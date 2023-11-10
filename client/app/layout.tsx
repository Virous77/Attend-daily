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
import { Providers } from "./Providers";
import { UserContextProvider } from "@/store/useUserContext";
import GlobalPost from "@/components/addPost/global-button";

export async function get() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("attend");
  return cookie;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attend-daily",
  description: "ChatX: Share your daily memories globally with your friends.",
  keywords: "social, messaging, connect, network",
  authors: [
    { name: "Reetesh Kumar", url: "https://reetesh-virous.netlify.app/" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = await get();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width; initial-scale=1; viewport-fit=cover; maximum-scale=1; user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <ReactQueryProvider>
              <AppContextProvider>
                <UserContextProvider>
                  <Navbar isLoggedIn={value?.value} />
                  {children}
                  <Toaster />
                  <GlobalPost />
                  <Navigation isLoggedIn={value?.value} />
                </UserContextProvider>
              </AppContextProvider>
            </ReactQueryProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
