import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import "./globals.css";

const varela = Varela_Round({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brand Management Dashboard | Hubble Money",
  description: "Brand metadata management platform",
  metadataBase: new URL("https://www.myhubble.money/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${varela.className} antialiased`}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <main>{children}</main>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
