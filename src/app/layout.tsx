import type { Metadata } from "next";
import { SolanaProvider } from "./components/SolanaProvider";
import './globals.css';
import Navbar from "./components/Navbar";
export const metadata: Metadata = {
  title: "3GWish",
  description: "Digital NFT greeting cards for holidays, birthdays, or special occasions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>

        <SolanaProvider>
          <Navbar />
          {children}
          </SolanaProvider>
      </body>
    </html>
  );
}
