export const metadata = {
  metadataBase: new URL('https://boluadeoye.com.ng'),
  title: "ExamPrep Terminal | Professional CBT Simulator",
  description: "The elite psychological preparation portal for university examinations. Practice time management, build resilience, and master your courses in a high-fidelity environment.",
  keywords: ["ExamPrep", "CBT Simulator", "Bolu Adeoye", "University Mock Exams"],
  authors: [{ name: "Bolu Adeoye" }],
  openGraph: {
    title: "ExamPrep Terminal: Elite Mock Examination Portal",
    description: "Secure your 'A' grade in a real-time CBT environment. Engineered for speed, accuracy, and psychological readiness.",
    url: "/cbt",
    siteName: "ExamPrep Ecosystem",
    images: [
      {
        url: "https://res.cloudinary.com/dwbjb3svx/image/upload/f_jpg,q_auto:good,w_1200/v1766912213/blog_assets/ogd5twhezpdtb4wd4daq.png",
        width: 1200,
        height: 630,
        alt: "ExamPrep Terminal Interface",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExamPrep Terminal | Elite Mock Exams",
    description: "High-fidelity CBT simulation for university students.",
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
