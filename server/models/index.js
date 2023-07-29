const Ring = require("./Ring");
const Keyword = require("./Keyword");
const RingKeyword = require("./RingKeyword"); // Import the RingKeyword model

// Define the many-to-many relationship
Ring.belongsToMany(Keyword, { through: RingKeyword });
Keyword.belongsToMany(Ring, { through: RingKeyword });

module.exports = { Ring, Keyword, RingKeyword }; // Export the RingKeyword model
