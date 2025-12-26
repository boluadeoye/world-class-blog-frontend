export const metadata = {
  title: "FUOYE 2026 GST Mock Exam | Professional CBT Simulator",
  description: "The official psychological preparation portal for FUOYE 2026 GST examinations. Practice time management, build resilience, and master your courses in a high-fidelity environment.",
  keywords: ["FUOYE", "GST Mock Exam", "CBT Simulator", "Bolu Adeoye", "Federal University Oye-Ekiti"],
  authors: [{ name: "Bolu Adeoye" }],
  openGraph: {
    title: "FUOYE 2026 GST Mock Examination Portal",
    description: "Practice for FUOYE GST Exams in a real-time CBT environment. Engineered for speed, accuracy, and psychological readiness.",
    url: "https://boluadeoye.com.ng/cbt",
    siteName: "Bolu Adeoye Ecosystem",
    images: [
      {
        url: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1766778755/blog_assets/iispy0ngysphetu3sfoy.png",
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
    images: ["https://res.cloudinary.com/dwbjb3svx/image/upload/v1766778755/blog_assets/iispy0ngysphetu3sfoy.png"],
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
