/** @type {import('next').NextConfig} */

const nextConfig = {

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
    transpilePackages: [
        '@mui/material',
        '@mui/system',
        '@mui/icons-material',
    ],
    
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
     allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '10.0.2.2',
    '10.122.95.179',
  ],
}

module.exports = nextConfig