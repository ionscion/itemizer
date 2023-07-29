const { Ring, Keyword, RingKeyword } = require("../../models");

const getAllRingsWithKeywords = async () => {
  try {
    const rings = await Ring.findAll({
      include: [
        {
          model: Keyword,
          through: {
            model: RingKeyword,
            attributes: ["damageValue"],
          },
        },
      ],
    });

    console.log("Rings with associated keywords:");
    rings.forEach((ring) => {
      console.log("Ring:", ring.name);
      console.log("Description:", ring.description);
      console.log("Keywords:");
      ring.keywords.forEach((keyword) => {
        console.log("-", keyword.keyword, "with damage value:", keyword.ring_keyword.damageValue);
      });
      console.log("---------------------");
    });

    return rings;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

getAllRingsWithKeywords();

// getAllRingsWithKeywords().then((rings) => {
//   console.log("Rings with associated keywords:");
//   rings.forEach((ring) => {
//     console.log("Ring:", ring.name);
//     console.log("Description:", ring.description);
//     console.log("Keywords:");
//     ring.Keywords.forEach((keyword) => {
//       console.log(
//         "-",
//         keyword.keyword,
//         "Damage Value:",
//         keyword.RingKeyword.damage_value
//       );
//     });
//     console.log("---------------------");
//   });
// });

// const getKeywordsForRing = async (ringName) => {
//   try {
//     const ring = await Ring.findOne({
//       where: { name: ringName },
//       include: [Keyword], // Include all associated keywords
//     });

//     if (ring) {
//       return ring.Keywords;
//     } else {
//       console.log("Ring not found.");
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// // Usage:
// const ringName = "Acid Stone";
// getKeywordsForRing(ringName).then((keywords) => console.log(keywords));

// const getRingsForKeyword = async (keywordName) => {
//   try {
//     const keyword = await Keyword.findOne({
//       where: { keyword: keywordName },
//       include: [Ring], // Include all associated rings
//     });

//     if (keyword) {
//       return keyword.Rings;
//     } else {
//       console.log("Keyword not found.");
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// // Usage:
// const keywordName = "Critical Chance";
// getRingsForKeyword(keywordName).then((rings) => console.log(rings));
