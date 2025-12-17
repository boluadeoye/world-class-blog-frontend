/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Fix for Web3/Wagmi build errors
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://project-blog-backend-beta.vercel.app/api/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "w5e7svgknmetlu9j.public.blob.vercel-storage.com" }
    ],
  },
};

export default nextConfig;
