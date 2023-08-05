const router = require('express').Router();
const { Amulet, Keyword, AmuletKeyword } = require('../models');

// GET all amulets
router.get('/', async (req, res) => {
    try {
        const amuletData = await Amulet.findAll({
        include: [{ model: Keyword, through: AmuletKeyword, as: 'keywords' }]
        });
        res.status(200).json(amuletData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

module.exports = router;