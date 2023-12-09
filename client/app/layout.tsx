import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppContextProvider } from "@/store/useAppContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ReactQueryProvider from "@/lib/reactQueryProvider";
import Navigation from "@/components/layout/navigation";
import { cookies } from "next/headers";
import { Providers } from "./Providers";
import { UserContextProvider } from "@/store/useUserContext";
import GlobalPost from "@/components/addPost/global-button";
import { PostContextProvider } from "@/store/usePostContext";
import NavbarComp from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";

export async function get() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("attend");
  return cookie;
}

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attend-daily",
  description: "ChatX: Share your daily memories globally with your friends.",
  keywords: "social, messaging, connect, network",
  authors: [
    { name: "Reetesh Kumar", url: "https://reetesh-virous.netlify.app/" },
  ],
  generator: "Next.js",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "../public/AppImages/ios/128.png" },
    { rel: "icon", url: "../public/AppImages/ios/128.png" },
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
          content="width=device-width initial-scale=1 viewport-fit=cover maximum-scale=1 user-scalable=no"
        />
        <meta name="robots" content="index, follow" />
        {/* <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" /> */}
      </head>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <ReactQueryProvider>
              <AppContextProvider>
                <UserContextProvider>
                  <PostContextProvider>
                    <NavbarComp isLoggedIn={value?.value} />
                    {children}
                    <Toaster
                      position="top-center"
                      toastOptions={{
                        custom: {
                          duration: 3000,
                        },
                      }}
                    />
                    <GlobalPost />
                    <Navigation isLoggedIn={value?.value} />
                  </PostContextProvider>
                </UserContextProvider>
              </AppContextProvider>
            </ReactQueryProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
