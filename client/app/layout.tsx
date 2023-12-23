import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
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
import View from "@/components/mobile-only/view";

export async function get() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("attend");
  return cookie;
}

const inter = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "ChatX",
  description: "ChatX: Share your daily memories globally with your friends.",
  keywords: "social, messaging, connect, network",
  authors: [
    { name: "Reetesh Kumar", url: "https://reetesh-virous.netlify.app/" },
  ],
  generator: "Next.js",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "/public/AppImages/ios/128.png" },
    { rel: "icon", url: "/public/AppImages/ios/128.png" },
  ],
  appleWebApp: {
    title: "ChatX",
    statusBarStyle: "black",
    capable: true,
  },
  referrer: "origin",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://chatxe.vercel.app",
    title: "ChatX",
    description: "ChatX: Share your daily memories globally with your friends.",
    siteName: "ChatX",
    images: [
      {
        url: "https://res.cloudinary.com/dw6wav4jg/image/upload/v1698341564/wnqjq5vvhux84afvmpra.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@iMBitcoinB",
    creator: "@iMBitcoinB",
    images:
      "https://res.cloudinary.com/dw6wav4jg/image/upload/v1698341564/wnqjq5vvhux84afvmpra.jpg",
    title: "ChatX",
    description: "ChatX: Share your daily memories globally with your friends.",
  },
  category: "social",
  creator: "Reetesh Kumar",
  publisher: "Vercel",
  metadataBase: new URL("https://chatxe.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
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
        <meta name="theme-color" content="#000" />
        <meta name="background-color" content="#000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="twitter:url" content="chatxe.vercel.app" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <View>
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
                            style: {
                              zIndex: "100000000",
                            },
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
          </View>
        </ThemeProvider>
      </body>
    </html>
  );
}
