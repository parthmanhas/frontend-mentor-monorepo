/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config) => {
        config.externals = [...config.externals, "bcrypt"];
        return config;
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            }
        ]
    },
};

export default nextConfig;
