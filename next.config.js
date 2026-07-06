/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/pagina-express-v3/',
        destination: '/pagina-express-v3/index.html',
      },
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
      {
        source: '/pagina-express-v2/',
        destination: '/pagina-express-v2/index.html',
      },
      {
        source: '/portfolio-sites/christiane-reis/',
        destination: '/portfolio-sites/christiane-reis/index.html',
      },
      {
        source: '/portfolio-sites/escrita-viva/',
        destination: '/portfolio-sites/escrita-viva/index.html',
      },
      {
        source: '/pagina-express-v4/',
        destination: '/pagina-express-v4/index.html',
      },
      {
        source: '/leads/',
        destination: '/leads.html',
      },
    ]
  },
}
module.exports = nextConfig
