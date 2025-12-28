export const metadata = {
  metadataBase: new URL('https://boluadeoye.com.ng'),
  title: "ExamForge | Professional CBT Simulator",
  description: "Forge your academic success with ExamForge. The elite psychological preparation portal for 2026 GST examinations.",
  keywords: ["ExamForge", "CBT Simulator", "Bolu Adeoye", "GST Mock Exam", "Academic Excellence"],
  openGraph: {
    title: "ExamForge: Forge Your Success",
    description: "High-fidelity CBT environment for 2026 GST Mock Exams. Engineered for speed, accuracy, and psychological readiness.",
    url: "/cbt",
    siteName: "ExamForge Terminal",
    images: [
      {
        url: "https://res.cloudinary.com/dwbjb3svx/image/upload/f_jpg,q_auto:good,w_1200/v1766912213/blog_assets/ogd5twhezpdtb4wd4daq.png",
        width: 1200,
        height: 630,
        alt: "ExamForge Professional Interface",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExamForge | Professional CBT Simulator",
    description: "Elite CBT simulation for 2026 GST candidates.",
    images: ["https://res.cloudinary.com/dwbjb3svx/image/upload/f_jpg,q_auto:good,w_1200/v1766912213/blog_assets/ogd5twhezpdtb4wd4daq.png"],
  },
};

export default function CBTLayout({ children }) {
  return (
    <section className="antialiased selection:bg-green-100">
      {children}
    </section>
  );
}
