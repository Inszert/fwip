export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'img-src': ["'self'", "data:", "blob:", "https://res.cloudinary.com"],
          'media-src': ["'self'", "data:", "blob:", "https://res.cloudinary.com"],
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

  // 👉 Add this
  'global::disable-cache',

  'strapi::public',
];
