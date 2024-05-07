/** @type {import('next').NextConfig} */
const nextConfig = {
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
