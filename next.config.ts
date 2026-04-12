import { NextConfig } from "next";
const nextConfig: NextConfig = {
    images: {
        // domains: ['www.elevate-bootcamp.cloud'],
        // unoptimized: true,
        remotePatterns: [
            new URL("https://elevate-bootcamp.cloud/storage/entities/**"),
            new URL("https://elevate-bootcamp.cloud/storage/entities/diploma/**"),
            // { protocol: "https", hostname: "exam-app.elevate-bootcamp.cloud" },
            // { protocol: "https", hostname: "elevate-bootcamp.cloud" },
            // { protocol: "https", hostname: "www.elevate-bootcamp.cloud" },
            new URL('https://elevate-bootcamp.cloud/storage/entities/ ** '),
            new URL('https://www.elevate-bootcamp.cloud/storage/entities/ ** '),
            new URL('http://elevate-bootcamp.cloud/storage/entities/ ** '),
            new URL('http://www.elevate-bootcamp.cloud/storage/entities/ ** '),

            new URL('https://exam-app.elevate-bootcamp.cloud/storage/entities/ ** '),
            new URL('https://www.exam-app.elevate-bootcamp.cloud/storage/entities/ ** '),
            new URL('http://exam-app.elevate-bootcamp.cloud/storage/entities/ ** '),
            new URL('http://www.exam-app.elevate-bootcamp.cloud/storage/entities/ ** '),
        ],
    },
}

export default nextConfig;