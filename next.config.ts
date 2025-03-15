import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: false,
    staticPageGenerationTimeout: 300,
    trailingSlash: false,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allow all external images (adjust for production)
            },
        ],
        minimumCacheTTL: 86400,
    },

    experimental: {
        serverActions: {
            allowedOrigins: [
                'localhost:3000',
                'your-production-domain.com',
                process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`
            ].filter(Boolean) as string[],
            bodySizeLimit: '2mb' // Optional but recommended
        },
        optimizePackageImports: [
            '@radix-ui/react-dropdown-menu',
            'react-tweet',
            'react-email'
        ],
    },

    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            };
        }

        config.experiments = {
            ...config.experiments,
            asyncWebAssembly: true,
        };

        return config;
    },

    typescript: {
        ignoreBuildErrors: process.env.IGNORE_TSC_ERRORS === 'true',
    },

    headers: async () => [
        {
            source: '/api/:path*',
            headers: [
                {key: 'Access-Control-Allow-Credentials', value: 'true'},
                {key: 'Access-Control-Allow-Origin', value: '*'},
                {key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS'},
            ],
        },
    ],

    env: {
        NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    },

    // For MongoDB/Prisma compatibility
    serverComponentsExternalPackages: ['mongoose', '@prisma/client'],
};

export default nextConfig;