const authRoutes = require('./auth.js');
const bucketListRoutes = require('./bucketlist');

function appRoutes(router) {
  router.use('/auth', authRoutes);
  router.use('/bucketlists', bucketListRoutes);
  return router;
}

module.exports = appRoutes;
