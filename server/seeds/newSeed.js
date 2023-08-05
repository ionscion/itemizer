const sequelize = require("../config/connection");
const {
  Keyword,
  RingKeyword,
  Ring,
  Amulet,
  AmuletKeyword,
} = require("../models");

const keywordSeedData = require("./keywordSeedData.json");
const ringSeedData = require("./ringSeedData.json");
const ringKeywordSeedData = require("./ringKeywordSeedData.json");
const AmuletSeedData = require("./amuletSeedData.json");
const AmuletKeywordSeedData = require("./amuletKeywordSeedData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const keywords = await Keyword.bulkCreate(keywordSeedData);
    const rings = await Ring.bulkCreate(ringSeedData);
    const Amulets = await Amulet.bulkCreate(AmuletSeedData);

    // Process the RingKeyword associations
    for (const ringKeywordData of ringKeywordSeedData) {
      const ring = rings.find((r) => r.name === ringKeywordData.ringName);
      if (!ring) {
        throw new Error(`Ring not found: ${ringKeywordData.ringName}`);
      }

      for (const association of ringKeywordData.associations) {
        const keyword = keywords.find((k) => k.keyword === association.keyword);
        if (!keyword) {
          throw new Error(`Keyword not found: ${association.keyword}`);
        }

        await RingKeyword.create({
          ringId: ring.id,
          keywordId: keyword.id,
          damageValue: association.damageValue,
        });
      }
    }
    // Process the AmuletKeyword associations
    for (const AmuletKeywordData of AmuletKeywordSeedData) {
      const Amulet = Amulets.find(
        (a) => a.name === AmuletKeywordData.amuletName
      );
      if (!Amulet) {
        throw new Error(`Amulet not found: ${AmuletKeywordData.AmuletName}`);
      }

      for (const association of AmuletKeywordData.associations) {
        const keyword = keywords.find((k) => k.keyword === association.keyword);
        if (!keyword) {
          throw new Error(`Keyword not found: ${association.keyword}`);
        }

        await AmuletKeyword.create({
          amuletId: Amulet.id,
          keywordId: keyword.id,
          damageValue: association.damageValue,
        });
      }
    }

    console.log("Database seeding completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
