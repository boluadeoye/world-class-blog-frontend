import "./globals.css";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://boluadeoye.com.ng'),
  title: {
    default: "Boluwatife Adeoye",
    template: "%s | Bolu Adeoye"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
