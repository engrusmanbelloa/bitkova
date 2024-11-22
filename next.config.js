/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    compiler: {
        styledComponents: true,
    },
    experimental: {
        optimizeCss: true,
    },
    images: {
        unoptimized: true,
    },
    // webpack: (config, { isServer }) => {
    //     if (!isServer) {
    //         config.resolve = {
    //             ...config.resolve,
    //             fallback: {
    //                 net: false,
    //                 dns: false,
    //                 tls: false,
    //                 fs: false,
    //                 request: false,
    //             },
    //         }
    //     }
    //     return config
    // },
}

module.exports = nextConfig
