import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        // Match any image URL hosted on the domain
        protocol: "https",
        hostname: "video-streaming-app-492.s3.*",
        port: "",
        pathname: "/**",
        // Match any image URL with a path that starts with /images/
      },
      {
        // https://gravatar.com
        protocol: "https",
        hostname: "gravatar.com",
        port: "",
        pathname: "/avatar/**",
      },
    ],
  },
}

export default nextConfig
