import { NextConfig } from "next";
const nextConfig: NextConfig = {
    images: {
        unoptimized: true, // ✅ على كل المشروع
        remotePatterns: [
            { protocol: "https", hostname: "exam-app.elevate-bootcamp.cloud" },
            { protocol: "https", hostname: "elevate-bootcamp.cloud" },
            { protocol: "https", hostname: "www.elevate-bootcamp.cloud" },
        ],
    },
}

export default nextConfig;