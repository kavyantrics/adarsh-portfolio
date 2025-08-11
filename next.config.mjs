/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains: [
      'github.com',
      'raw.githubusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
  experimental: {
    serverActions: {
    },
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Add output configuration for static export
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
};

export default nextConfig; 