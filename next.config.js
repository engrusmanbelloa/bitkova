/** @type {import('next').NextConfig} */

const nextConfig = {
    transpilePackages: [
        '@mui/material',
        '@mui/system',
        '@mui/icons-material',
    ],
    reactStrictMode: true,

    compiler: {
        styledComponents: true,
    },
    experimental: {
        // optimizeCss: true,
    },
    images: {
        unoptimized: true,
    },
    
    // Turbopack configuration (migrated from webpack)
    turbopack: {
        resolveAlias: {
            '@mui/styled-engine': '@mui/styled-engine-sc',
        },
    },
    
    // Keep webpack config for webpack builds (if you ever use --webpack flag)
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '@mui/styled-engine': '@mui/styled-engine-sc',
            }
        }
        return config
    },
}

module.exports = nextConfig