export const metadata = {
  metadataBase: new URL('https://boluadeoye.com.ng'),
  title: "ExamForge Terminal | Professional CBT Simulator",
  description: "The elite psychological preparation portal for university examinations. Practice time management, build resilience, and forge your success in a high-fidelity environment.",
  keywords: ["ExamForge", "CBT Simulator", "Bolu Adeoye", "University Mock Exams", "FUOYE"],
  authors: [{ name: "Bolu Adeoye" }],
  openGraph: {
    title: "ExamForge Terminal: Elite Mock Examination Portal",
    description: "Forge your 'A' grade in a real-time CBT environment. Engineered for speed, accuracy, and psychological readiness.",
    url: "/cbt",
    siteName: "ExamForge Ecosystem",
    images: [
      {
        url: "https://res.cloudinary.com/dwbjb3svx/image/upload/f_jpg,q_auto:good,w_1200/v1766912213/blog_assets/ogd5twhezpdtb4wd4daq.png",
        width: 1200,
        height: 630,
        alt: "ExamForge Terminal Interface",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExamForge Terminal | Elite Mock Exams",
    description: "High-fidelity CBT simulation for university students.",
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
