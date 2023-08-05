const Ring = require("./Ring");
const Keyword = require("./Keyword");
const RingKeyword = require("./RingKeyword"); // Import the RingKeyword model
const Amulet = require("./Amulet");
const AmuletKeyword = require("./AmuletKeyword");

// Define the many-to-many relationship
Ring.belongsToMany(Keyword, { through: RingKeyword });
Keyword.belongsToMany(Ring, { through: RingKeyword });

Amulet.belongsToMany(Keyword, { through: AmuletKeyword });
Keyword.belongsToMany(Amulet, { through: AmuletKeyword });

module.exports = { Ring, Keyword, RingKeyword, Amulet, AmuletKeyword }; // Export the RingKeyword model
