import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})


export const metadata = {
  title: "Exhibition Analytics Web App",
  description: "Analytics for exhibition web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}> */}
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        {children}
      </body>
    </html>
  );
}
