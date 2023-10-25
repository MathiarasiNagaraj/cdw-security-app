import "./globals.css";
import type { Metadata } from "next";

import RecoilContextProvider from "@/state/root/RecoilRootProvider";

import { Source_Sans_3 } from "next/font/google";
const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CDW Security App",
  description: "An app to monitor employee temperature records ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={source_sans_3.className}>
        <RecoilContextProvider>{children}</RecoilContextProvider>
      </body>
    </html>
  );
}
