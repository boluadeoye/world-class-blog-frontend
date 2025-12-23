import { Inter } from "next/font/google";
import "../globals.css"; // Import global styles but override them

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FUOYE CBT Simulator",
  description: "Official Mock Exam Portal",
};

export default function CBTRootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* NO HEADER, NO FOOTER */}
        {children}
      </body>
    </html>
  );
}
