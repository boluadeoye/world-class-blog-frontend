export const metadata = {
  metadataBase: new URL('https://boluadeoye.com.ng'),
  title: "FUOYE 2026 GST Mock Exam | Professional CBT Simulator",
  description: "The official psychological preparation portal for FUOYE 2026 GST examinations. Practice time management, build resilience, and master your courses.",
  keywords: ["FUOYE", "GST Mock Exam", "CBT Simulator", "Bolu Adeoye", "Federal University Oye-Ekiti"],
  authors: [{ name: "Bolu Adeoye" }],
  openGraph: {
    title: "FUOYE 2026 GST Mock Examination Portal",
    description: "Practice for FUOYE GST Exams in a real-time CBT environment. Engineered for speed, accuracy, and psychological readiness.",
    url: "/cbt",
    siteName: "Bolu Adeoye Ecosystem",
    images: [
      {
        url: "https://res.cloudinary.com/dwbjb3svx/image/upload/f_jpg,q_auto:good,w_1200/v1766912213/blog_assets/ogd5twhezpdtb4wd4daq.png",
        width: 1200,
        height: 630,
        alt: "FUOYE CBT Mock Exam Interface",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FUOYE 2026 GST Mock Exam Portal",
    description: "High-fidelity CBT simulation for FUOYE 2026 GSTs.",
    images: ["https://res.cloudinary.com/dwbjb3svx/image/upload/f_jpg,q_auto:good,w_1200/v1766912213/blog_assets/ogd5twhezpdtb4wd4daq.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function CBTLayout({ children }) {
  return (
    <section className="antialiased selection:bg-green-100">
      {children}
    </section>
  );
}
