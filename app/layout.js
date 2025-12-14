import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Splitr",
  description: "The smartest way to split expenses with friends",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en">
          <head>
            <link rel="icon" href="/logos/logo-s.png" sizes="any" />
          </head>

          <body className={inter.className}>
            <Header />
            <main className="min-h-screen">{children}</main>
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
