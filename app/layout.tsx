import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import Main from "@/components/Main";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import "./globals.css";

const varela = Varela_Round({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brand Management Dashboard | Hubble Money",
  description: "Brand metadata management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={varela.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Main>{children}</Main>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
