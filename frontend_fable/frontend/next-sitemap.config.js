/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.fwip.sk",
  generateRobotsTxt: true,
  sitemapSize: 5000,

  // dôležité pre App Router / Next 13+
  generateIndexSitemap: false,

  changefreq: "weekly",
  priority: 0.7,

  exclude: [],

  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: "weekly",
      priority: path === "/" ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};