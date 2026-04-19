import { NextConfig } from "next";
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "exam-app.elevate-bootcamp.cloud",
            },
        ]
    },
}

export default nextConfig;