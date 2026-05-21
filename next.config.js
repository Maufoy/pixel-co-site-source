/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/pagina-express-v1/',
        destination: '/pagina-express-v1/index.html',
      },
      {
        source: '/pagina-express-v1/briefing/',
        destination: '/pagina-express-v1/briefing/index.html',
      },
      {
        source: '/portfolio-sites/nutri/',
        destination: '/portfolio-sites/nutri/index.html',
      },
    ]
  },
}
module.exports = nextConfig
