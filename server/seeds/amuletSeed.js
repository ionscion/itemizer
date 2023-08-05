const sequelize = require('../config/connection');
const { Keyword, AmuletKeyword, Amulet } = require('../models');

const keywordSeedData = require('./keywordSeedData.json');
const AmuletSeedData = require('./amuletSeedData.json');
const AmuletKeywordSeedData = require('./amuletKeywordSeedData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const keywords = await Keyword.bulkCreate(keywordSeedData);
    const Amulets = await Amulet.bulkCreate(AmuletSeedData);

    // Process the AmuletKeyword associations
    for (const AmuletKeywordData of AmuletKeywordSeedData) {
      const Amulet = Amulets.find(a => a.name === AmuletKeywordData.amuletName);
      if (!Amulet) {
        throw new Error(`Amulet not found: ${AmuletKeywordData.AmuletName}`);
      }

      for (const association of AmuletKeywordData.associations) {
        const keyword = keywords.find(k => k.keyword === association.keyword);
        if (!keyword) {
          throw new Error(`Keyword not found: ${association.keyword}`);
        }

        await AmuletKeyword.create({
          AmuletId: Amulet.id,
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
