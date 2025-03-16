import type {NextConfig} from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    cleanDistDir: true,
    productionBrowserSourceMaps: true,
    output: "standalone"
};

export default nextConfig;