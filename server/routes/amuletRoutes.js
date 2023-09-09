const router = require("express").Router();
const { Amulet, Keyword, AmuletKeyword } = require("../models");

// GET all amulets
router.get("/", async (req, res) => {
  try {
    const amuletData = await Amulet.findAll({
      include: [{ model: Keyword, through: AmuletKeyword, as: "keywords" }],
    });
    res.status(200).json(amuletData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one amulet
router.get("/:id", async (req, res) => {
  try {
    const amuletData = await Amulet.findByPk(req.params.id, {
      include: [{ model: Keyword, through: AmuletKeyword, as: "keywords" }],
    });
    res.status(200).json(amuletData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one amulet by its name
router.get("/name/:name", async (req, res) => {
  try {
    const amuletData = await Amulet.findOne({
      where: { name: req.params.name },
      include: [{ model: Keyword, through: AmuletKeyword, as: "keywords" }],
    });

    if (!amuletData) {
      res.status(404).json({ message: "No amulet found with that name!" });
      return;
    }

    res.status(200).json(amuletData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const { name, description, keywords, imgUrl } = req.body;

  try {
    // Step 1: Create the ring record
    const amuletData = await Amulet.create({
      name: name,
      description: description,
      imgUrl: imgUrl,
    });

    // Step 2: Create the ring_keyword records for each keyword
    if (keywords && keywords.length > 0) {
      const keywordPromises = keywords.map(async (keywordData) => {
        const {
          keyword,
          amulet_keyword: { damageValue },
        } = keywordData;
        const keywordRecord = await Keyword.findOne({
          where: { keyword: keyword },
        });

        if (!keywordRecord) {
          // If the keyword does not exist in the database, you may choose to handle it here.
          // throw new Error(`Keyword "${keyword}" not found.`);
          const newKeywordRecord = await Keyword.create({
            keyword: keyword,
          });

          return AmuletKeyword.create({
            keywordId: newKeywordRecord.id,
            amuletId: amuletData.id,
            damageValue: damageValue,
          });
        }

        return AmuletKeyword.create({
          keywordId: keywordRecord.id,
          amuletId: amuletData.id,
          damageValue: damageValue,
        });
      });

      await Promise.all(keywordPromises);
    }

    res.status(200).json(amuletData);
  } catch (err) {
    console.log(err); // Log the error for debugging purposes
    res.status(400).json(err); // Return an appropriate error response
  }
});

module.exports = router;
