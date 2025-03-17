import type {NextConfig} from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        minimumCacheTTL: 86400,
        formats: ['image/webp']
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    cleanDistDir: true,
    productionBrowserSourceMaps: true,
    output: "standalone",
    async headers() {
        return [
            {
                source: '/_next/image(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;