/** @type {import('next').NextConfig} */

const nextConfig = {
    async headers() {
        return [
          {
            source: "/(.*)",
            headers: [
              { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
              { key: "Cross-Origin-Embedder-Policy", value: "credentialless" }
            ],
          },
        ];
      },
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
