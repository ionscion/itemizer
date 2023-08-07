const router = require('express').Router();
const ringRoutes = require('./ringRoutes');
const amuletRoutes = require('./amuletRoutes');
const keywordRoutes = require('./keywordRoutes');

router.use('/api/rings', ringRoutes);
router.use('/api/amulets', amuletRoutes);
router.use('/api/keywords', keywordRoutes);

module.exports = router;