/** @type {import('next').NextConfig} */

const nextConfig = {
    transpilePackages: [
    '@mui/material',
    '@mui/system',
    '@mui/icons-material', // If @mui/icons-material is being used
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
// });

module.exports = nextConfig
