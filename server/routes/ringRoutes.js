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

// GET a single ring
router.get('/:id', async (req, res) => {
    try {
        const ringData = await Ring.findByPk(req.params.id, {
        include: [{ model: Keyword, through: RingKeyword, as: 'keywords' }]
        });

        if (!ringData) {
        res.status(404).json({ message: 'No ring found with that id!' });
        return;
        }

        res.status(200).json(ringData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

// ... (other routes)

router.post("/", async (req, res) => {
    const { name, description, keywords, imgUrl } = req.body;
  
    try {
      // Step 1: Create the ring record
      const ringData = await Ring.create({
        name: name,
        description: description,
        imgUrl: imgUrl,
      });
  
      // Step 2: Create the ring_keyword records for each keyword
      if (keywords && keywords.length > 0) {
        const keywordPromises = keywords.map(async (keywordData) => {
          const { keyword, ring_keyword: { damageValue } } = keywordData;
          const keywordRecord = await Keyword.findOne({
            where: { keyword: keyword },
          });
  
          if (!keywordRecord) {
            // If the keyword does not exist in the database, you may choose to handle it here.
            // throw new Error(`Keyword "${keyword}" not found.`);
            const newKeywordRecord = await Keyword.create({
              keyword: keyword,
            });
  
            return RingKeyword.create({
              keywordId: newKeywordRecord.id,
              ringId: ringData.id,
              damageValue: damageValue,
            });
          }
  
          return RingKeyword.create({
            keywordId: keywordRecord.id,
            ringId: ringData.id,
            damageValue: damageValue,
          });
        });
  
        await Promise.all(keywordPromises);
      }
  
      res.status(200).json(ringData);
    } catch (err) {
      console.log(err); // Log the error for debugging purposes
      res.status(400).json(err); // Return an appropriate error response
    }
  });
  



module.exports = router;