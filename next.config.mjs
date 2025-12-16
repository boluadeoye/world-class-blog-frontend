/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://project-blog-backend-beta.vercel.app/api/:path*',
      },
    ];
  },
  images: {
    domains: ["images.unsplash.com", "w5e7svgknmetlu9j.public.blob.vercel-storage.com"],
  },
};

export default nextConfig;
