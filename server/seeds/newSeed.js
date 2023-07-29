const sequelize = require('../config/connection');
const { Keyword, RingKeyword, Ring } = require('../models');

const keywordSeedData = require('./keywordSeedData.json');
const ringSeedData = require('./ringSeedData.json');
const ringKeywordSeedData = require('./ringKeywordSeedData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const keywords = await Keyword.bulkCreate(keywordSeedData);
    const rings = await Ring.bulkCreate(ringSeedData);

    // Process the RingKeyword associations
    for (const ringKeywordData of ringKeywordSeedData) {
      const ring = rings.find(r => r.name === ringKeywordData.ringName);
      if (!ring) {
        throw new Error(`Ring not found: ${ringKeywordData.ringName}`);
      }

      for (const association of ringKeywordData.associations) {
        const keyword = keywords.find(k => k.keyword === association.keyword);
        if (!keyword) {
          throw new Error(`Keyword not found: ${association.keyword}`);
        }

        await RingKeyword.create({
          ringId: ring.id,
          keywordId: keyword.id,
          damageValue: association.damageValue
        });
      }
    }

    console.log('Database seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
