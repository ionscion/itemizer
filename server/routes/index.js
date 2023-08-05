const router = require('express').Router();
const ringRoutes = require('./ringRoutes');
const amuletRoutes = require('./amuletRoutes');

router.use('/api/rings', ringRoutes);
router.use('/api/amulets', amuletRoutes);

module.exports = router;