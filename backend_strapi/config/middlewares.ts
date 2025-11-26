export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'img-src': ["'self'", "data:", "blob:", "https://res.cloudinary.com"],
          'media-src': ["'self'", "data:", "blob:", "https://res.cloudinary.com"],
          upgradeInsecureRequests: null,
        },
      },
      hsts: false, // <-- disable HSTS entirely
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
