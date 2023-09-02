const router = require("express").Router();
const {
  Amulet,
  Ring,
  Keyword,
  AmuletKeyword,
  RingKeyword,
  UserBuilds,
} = require("../models");

//Post a new build

router.post("/", async (req, res) => {
  try {
    const newBuild = await UserBuilds.create({
      user_id: req.body.user_id,
      build_name: req.body.build_name,
      build_description: req.body.build_description,
      build_rings: req.body.build_rings,
      build_amulet: req.body.build_amulet,
    });
    res.status(200).json(newBuild);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all builds for a specific user
router.get("/:id", async (req, res) => {
    try {
        const buildData = await UserBuilds.findAll({
            where: { user_id: req.params.id }});
        res.status(200).json(buildData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
