const router = require("express").Router();
const {
  Amulet,
  Ring,
  Keyword,
  AmuletKeyword,
  RingKeyword,
} = require("../models");

// GET all keywords
router.get("/", async (req, res) => {
  try {
    const keywordData = await Keyword.findAll();
    res.status(200).json(keywordData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all items with a specific keyword
router.get("/:id", async (req, res) => {
  try {
    const keywordData = await Keyword.findByPk(req.params.id, {
      include: [
        { model: Amulet, through: AmuletKeyword, as: "amulets" },
        { model: Ring, through: RingKeyword, as: "rings" },
      ],
    });
    res.status(200).json(keywordData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all items with a specific keyword by name of keyword

router.get("/name/:name", async (req, res) => {
  try {
    const keywordData = await Keyword.findOne({
      where: { keyword: req.params.name },
      include: [
        { model: Amulet, through: AmuletKeyword, as: "amulets" },
        { model: Ring, through: RingKeyword, as: "rings" },
      ],
    });

    // Get all the amulets and rings associated with the keyword
    const amulets = keywordData.amulets;
    const rings = keywordData.rings;

    res.status(200).json({ amulets, rings });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/name/:name', async (req, res) => {
//     try {
//       const keyword = req.params.name;
  
//       const amulets = await Amulet.findAll({
//         include: [
//           {
//             model: Keyword,
//             where: { keyword }
//           }
//         ]
//       });
  
//       const rings = await Ring.findAll({
//         include: [
//           {
//             model: Keyword,
//             where: { keyword }
//           }
//         ]
//       });
  
//       res.status(200).json({ amulets, rings });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  

module.exports = router;
