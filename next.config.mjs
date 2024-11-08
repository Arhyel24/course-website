/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
   experimental: {
     serverComponentsExternalPackages: ["mongoose"],
   },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "flowbite.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
