/** @type {import('next').NextConfig} */
const nextConfig = {
  // output : 'export', 해당 속성이 있으면 StaticMode, 없으면 Dynamic Mode
  async rewrites() {
    return [
      {
        source: "/upload/:slug",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`, // Matched parameters can be used in the destination
      },
    ];
  },
};

export default nextConfig;
