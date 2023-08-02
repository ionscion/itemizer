const router = require('express').Router();
const ringRoutes = require('./ringRoutes');

router.use('/api/rings', ringRoutes);

module.exports = router;