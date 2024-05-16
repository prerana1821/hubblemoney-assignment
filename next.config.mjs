/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "qctjdamgmfgmidwwhmqf.supabase.co",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
