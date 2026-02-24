/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.fwip.sk',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.8,
  exclude: [],

  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'weekly',
      priority: path === '/' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    };
  },
};