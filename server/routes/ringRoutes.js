const router = require("express").Router();
const { Ring, Keyword, RingKeyword } = require("../models");
const multer = require("multer");
const base64Img = require('base64-img');
const Buffer = require('buffer').Buffer;


// Set up multer storage and upload
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

function bufferToBase64(buffer) {
    return Buffer.from(buffer).toString('base64');
  }

// GET all rings
router.get("/", async (req, res) => {
  try {
    const ringData = await Ring.findAll({
      include: [{ model: Keyword, through: RingKeyword, as: "keywords" }],
    });
    res.status(200).json(ringData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/images", async (req, res) => {
    try {
      const ringData = await Ring.findAll({
        include: [{ model: Keyword, through: RingKeyword, as: "keywords" }],
      });
  
      // Convert image data to base64 before sending the response
      const ringDataWithBase64Images = ringData.map((ring) => {
        if (ring.img && ring.img.data) {
          const imageFilePath = getImageFilePathById(ring.img.data); // Replace with your logic to get image file path
          console.log(imageFilePath)
          const base64String = base64Img.base64Sync(imageFilePath);
          console.log(base64String)
          return { ...ring.toJSON(), img: base64String };
        }
        return ring;
      });
      
      res.status(200).json(ringDataWithBase64Images);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/:id/image", async (req, res) => {
    try {
      const ringId = req.params.id;
      console.log("Requested ring ID:", ringId); // Log the requested ring ID
  
      const ring = await Ring.findByPk(ringId);
  
      if (!ring) {
        console.log("Ring not found for ID:", ringId); // Log that the ring was not found
        return res.status(404).json({ message: "Ring not found" });
      }
  
      if (!ring.img || !ring.img.data) {
        console.log("Image data not found for ring ID:", ringId); // Log that image data was not found
        return res.status(404).json({ message: "Image not found for this ring" });
      }
  
      // Convert the image Buffer to base64
      const base64Image = ring.img.data.toString("base64");
  
      // Send the base64-encoded image data
      res.status(200).json({ base64Image });
    } catch (err) {
      console.error("Error fetching ring image:", err); // Log the error for debugging purposes
      res.status(500).json({ message: "An error occurred while fetching the image" });
    }
  });
  
  

// ... (other routes)

router.post("/image", upload.single("img"), async (req, res) => {
  const { name, description, keywords } = req.body;
  console.log(req.body.jsonData); // Add this line to log the received data
  try {
    // Step 1: Create the ring record
    const ringData = await Ring.create({
      name: name,
      description: description,
      img: req.file.buffer,
    });

    console.log("Keywords:", keywords);
    // Step 2: Create the ring_keyword records for each keyword
    if (keywords && keywords.length > 0) {
      const keywordPromises = keywords.map(async (keywordData) => {
        const {
          keyword,
          ring_keyword: { damageValue },
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

          return RingKeyword.create({
            keywordId: newKeywordRecord.id,
            ringId: ringData.id,
            damageValue: damageValue,
          });
        }

        return RingKeyword.create({
          keywordId: keywordRecord.id,
          ringId: ringData.id,
          damageValue: damageValue,
        });
      });

      await Promise.all(keywordPromises);
    }

    res.status(200).json(ringData);
  } catch (err) {
    console.log(err); // Log the error for debugging purposes
    res.status(400).json(err); // Return an appropriate error response
  }
});

router.post("/", async (req, res) => {
    const { name, description, keywords } = req.body;
    console.log(req.body.jsonData); // Add this line to log the received data
    try {
      // Step 1: Create the ring record
      const ringData = await Ring.create({
        name: name,
        description: description,
      });
  
      console.log("Keywords:", keywords);
      // Step 2: Create the ring_keyword records for each keyword
      if (keywords && keywords.length > 0) {
        const keywordPromises = keywords.map(async (keywordData) => {
          const {
            keyword,
            ring_keyword: { damageValue },
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
  
            return RingKeyword.create({
              keywordId: newKeywordRecord.id,
              ringId: ringData.id,
              damageValue: damageValue,
            });
          }
  
          return RingKeyword.create({
            keywordId: keywordRecord.id,
            ringId: ringData.id,
            damageValue: damageValue,
          });
        });
  
        await Promise.all(keywordPromises);
      }
  
      res.status(200).json(ringData);
    } catch (err) {
      console.log(err); // Log the error for debugging purposes
      res.status(400).json(err); // Return an appropriate error response
    }
  });
  
  

module.exports = router;
