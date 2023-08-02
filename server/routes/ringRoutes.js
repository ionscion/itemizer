const router = require('express').Router();
const { Ring, Keyword, RingKeyword } = require('../models');

// GET all rings
router.get('/', async (req, res) => {
    try {
        const ringData = await Ring.findAll({
        include: [{ model: Keyword, through: RingKeyword, as: 'keywords' }]
        });
        res.status(200).json(ringData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

module.exports = router;