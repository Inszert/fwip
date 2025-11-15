module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('SERVER_URL', 'https://tvoj-backend.onrender.com'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'replace_with_random_string'),
    },
  },
  app: {
    keys: env.array('APP_KEYS', ['key1', 'key2', 'key3', 'key4']),
  },
});
