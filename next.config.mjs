/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed invalid 'eslint' key
  typescript: {
    ignoreBuildErrors: true,
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
