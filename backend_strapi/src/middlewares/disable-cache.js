module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    ctx.set('Pragma', 'no-cache');
    ctx.set('Expires', '0');
  };
};
