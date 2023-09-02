const router = require('express').Router();
const ringRoutes = require('./ringRoutes');
const amuletRoutes = require('./amuletRoutes');
const keywordRoutes = require('./keywordRoutes');
const userBuildsRoutes = require('./userBuildsRoutes');

router.use('/api/rings', ringRoutes);
router.use('/api/amulets', amuletRoutes);
router.use('/api/keywords', keywordRoutes);
router.use('/api/userBuilds', userBuildsRoutes);

module.exports = router;