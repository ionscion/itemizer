const sequelize = require('../config/connection');
const { Keyword, RingKeyword, Ring } = require('../models');

const keywordSeedData = require('./keywordSeedData.json');
const ringSeedData = require('./ringSeedData.json');
const ringKeywordSeedData = require('./ringKeywordSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    const keywords = await Keyword.bulkCreate(keywordSeedData);
    
    const rings = await Ring.bulkCreate(ringSeedData);
    
    const ringKeywords = await RingKeyword.bulkCreate(ringKeywordSeedData);
    
    process.exit(0);
};

seedDatabase();