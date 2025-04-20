import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/app/interview/_components/Header";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "prept.",
  description: "innov8rs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main > 
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
