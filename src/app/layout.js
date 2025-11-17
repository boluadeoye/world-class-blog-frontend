import "./globals.css";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import LayoutShell from "../components/LayoutShell";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "World-Class Blog",
  description:
    "Essays by Adeoye Boluwatife — health, finance, technology, education, and the systems that connect them.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${grotesk.variable}`}>
      <body className="font-sans">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}