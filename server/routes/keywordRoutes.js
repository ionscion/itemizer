const router = require('express').Router();
const { Amulet, Ring, Keyword, AmuletKeyword, RingKeyword } = require('../models');

// GET all keywords
router.get('/', async (req, res) => {
    try {
        const keywordData = await Keyword.findAll();
        res.status(200).json(keywordData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

module.exports = router;