export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'http:'],
          'img-src': ["'self'", "data:", "blob:", "https://pub-7d6fe2e7774e4986929a98b942945494.r2.dev", "https://ae0e5ad00759ea5f03237821fe4e6ca9.r2.cloudflarestorage.com"],
          'media-src': ["'self'", "data:", "blob:", "https://pub-7d6fe2e7774e4986929a98b942945494.r2.dev", "https://ae0e5ad00759ea5f03237821fe4e6ca9.r2.cloudflarestorage.com"],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '150mb',
      jsonLimit: '150mb',
      textLimit: '150mb',
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];