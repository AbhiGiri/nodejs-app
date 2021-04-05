const router  = require('express').Router();

router.use('/api', require('./user.route'));

module.exports = router;