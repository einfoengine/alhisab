import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/globals.scss";
import FontProvider from "../components/elements/FontProvider";
import TopMenu from "../components/TopMenu";

export const metadata: Metadata = {
  title: "Alhisab - Business Management Platform",
  description: "Comprehensive business management platform for services, projects, and financial management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <FontProvider />
      </head>
      <body suppressHydrationWarning>
        <TopMenu />
        <div className="pt-12">
        {children}
        </div>
      </body>
    </html>
  );
}
